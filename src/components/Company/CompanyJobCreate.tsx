"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Briefcase } from "lucide-react";
import { fetchCompanyProfile, createCompanyJob } from "@/lib/companyApi";
import Button from "@/components/Common/Button";

const inputClass =
  "w-full rounded-lg border border-dark_border bg-black/20 px-4 py-3 text-sm text-white placeholder:text-muted outline-none transition focus:border-primary focus:ring-1 focus:ring-primary";

export default function CompanyJobCreate() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    job_url: "",
    salary_range: "",
    job_type: "",
    source: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const profile = await fetchCompanyProfile();
        setCompanyName(profile.company_name);
        setForm((f) => ({ ...f, company: profile.company_name }));
      } catch {
        setForm((f) => ({ ...f, company: "My Company" }));
      } finally {
        setLoadingProfile(false);
      }
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createCompanyJob({
        title: form.title,
        company: form.company || companyName,
        location: form.location || null,
        description: form.description || null,
        job_url: form.job_url || null,
        salary_range: form.salary_range || null,
        job_type: form.job_type || null,
        source: form.source || null,
      });
      router.push("/company/jobs");
    } catch {
      // toast from axios
    } finally {
      setLoading(false);
    }
  };

  if (loadingProfile) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link
            href="/company/jobs"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-white transition mb-3"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to jobs
          </Link>
          <h1 className="text-2xl font-semibold text-white">Add job</h1>
          <p className="text-sm text-muted mt-1">
            Create a new job posting. It will appear in your jobs list for applicants to see.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-dark_border bg-dark_grey/60 overflow-hidden">
        <div className="border-b border-dark_border bg-black/20 px-4 py-3 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          <span className="font-medium text-white">Job details</span>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-white mb-1.5">
              Job title <span className="text-primary">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClass}
              placeholder="e.g. Senior Backend Engineer"
              required
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-white mb-1.5">
              Company name
            </label>
            <input
              id="company"
              type="text"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className={inputClass}
              placeholder="Your company name"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-white mb-1.5">
              Location
            </label>
            <input
              id="location"
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className={inputClass}
              placeholder="e.g. Remote, New York"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-white mb-1.5">
              Description
            </label>
            <textarea
              id="description"
              rows={5}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={inputClass}
              placeholder="Job description and requirements"
            />
          </div>
          <div>
            <label htmlFor="job_url" className="block text-sm font-medium text-white mb-1.5">
              Job URL
            </label>
            <input
              id="job_url"
              type="url"
              value={form.job_url}
              onChange={(e) => setForm({ ...form, job_url: e.target.value })}
              className={inputClass}
              placeholder="https://..."
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="salary_range" className="block text-sm font-medium text-white mb-1.5">
                Salary range
              </label>
              <input
                id="salary_range"
                type="text"
                value={form.salary_range}
                onChange={(e) => setForm({ ...form, salary_range: e.target.value })}
                className={inputClass}
                placeholder="e.g. $120k - $160k"
              />
            </div>
            <div>
              <label htmlFor="job_type" className="block text-sm font-medium text-white mb-1.5">
                Job type
              </label>
              <input
                id="job_type"
                type="text"
                value={form.job_type}
                onChange={(e) => setForm({ ...form, job_type: e.target.value })}
                className={inputClass}
                placeholder="Full-time, Contract, etc."
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-dark_border">
            <Button type="submit" disabled={loading} className="flex items-center gap-2">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Create job
            </Button>
            <Link
              href="/company/jobs"
              className="inline-flex items-center rounded-lg border border-dark_border px-4 py-2.5 text-sm font-medium text-muted hover:text-white transition"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
