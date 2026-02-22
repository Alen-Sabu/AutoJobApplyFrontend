"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase, Plus, Users, Loader2, AlertCircle } from "lucide-react";
import { fetchCompanyJobs, type CompanyJob } from "@/lib/companyApi";

export default function CompanyJobsList() {
  const [jobs, setJobs] = useState<CompanyJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCompanyJobs();
        setJobs(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load jobs");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading && jobs.length === 0) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error && jobs.length === 0) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 flex flex-col items-center gap-4">
        <AlertCircle className="h-10 w-10 text-red-400" />
        <p className="text-white">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">My jobs</h1>
          <p className="text-sm text-muted mt-1">Manage your job postings and view applicants</p>
        </div>
        <Link
          href="/company/jobs/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition shrink-0"
        >
          <Plus className="h-4 w-4" />
          Add job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="rounded-xl border border-dark_border bg-dark_grey/60 p-10 text-center">
          <Briefcase className="h-12 w-12 text-muted mx-auto mb-4" />
          <p className="text-white font-medium">No jobs yet</p>
          <p className="text-sm text-muted mt-1 mb-4">Create your first job posting to start receiving applications.</p>
          <Link
            href="/company/jobs/new"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Add job
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border border-dark_border overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-dark_border bg-dark_grey/60">
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Title</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Location</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Status</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted w-28">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b border-dark_border last:border-0 hover:bg-black/20">
                  <td className="px-4 py-3">
                    <span className="font-medium text-white">{job.title}</span>
                  </td>
                  <td className="px-4 py-3 text-muted">{job.location || "—"}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-primary/20 text-primary">
                      {job.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/company/jobs/${job.id}/applicants`}
                      className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                    >
                      <Users className="h-4 w-4" />
                      Applicants
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
