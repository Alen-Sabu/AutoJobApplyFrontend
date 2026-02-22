"use client";

import React, { useEffect, useState } from "react";
import { Briefcase, Users, Building2, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { fetchCompanyProfile, fetchCompanyJobs, fetchCompanyStats, type CompanyProfile, type CompanyJob } from "@/lib/companyApi";

export default function CompanyDashboard() {
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [jobs, setJobs] = useState<CompanyJob[]>([]);
  const [totalApplicants, setTotalApplicants] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [profileRes, jobsRes, statsRes] = await Promise.all([
          fetchCompanyProfile(),
          fetchCompanyJobs(),
          fetchCompanyStats(),
        ]);
        setProfile(profileRes);
        setJobs(jobsRes);
        setTotalApplicants(statsRes.total_applicants);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading && !profile) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 flex flex-col items-center gap-4">
        <AlertCircle className="h-10 w-10 text-red-400" />
        <p className="text-white">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Company Dashboard</h1>
        <p className="text-sm text-muted mt-1">
          {profile?.company_name ? `${profile.company_name} – manage jobs and applicants` : "Manage your jobs and applicants"}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/company/jobs"
          className="rounded-xl border border-dark_border bg-dark_grey/60 p-5 transition hover:border-primary/30"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-muted">My jobs</span>
            <Briefcase className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-3 text-2xl font-semibold text-white">{jobs.length}</p>
          <p className="text-sm text-muted mt-1">View and manage job listings</p>
        </Link>
        <Link
          href="/company/jobs"
          className="rounded-xl border border-dark_border bg-dark_grey/60 p-5 transition hover:border-primary/30"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-muted">Applicants</span>
            <Users className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-3 text-2xl font-semibold text-white">
            {totalApplicants !== null ? totalApplicants : "—"}
          </p>
          <p className="text-sm text-muted mt-1">View applicants per job</p>
        </Link>
      </div>

      {profile && (
        <div className="rounded-xl border border-dark_border bg-dark_grey/60 p-5">
          <div className="flex items-center gap-3 mb-3">
            <Building2 className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-medium text-white">Company profile</h2>
          </div>
          <dl className="grid gap-2 text-sm">
            <div>
              <dt className="text-muted">Name</dt>
              <dd className="text-white font-medium">{profile.company_name}</dd>
            </div>
            {profile.description && (
              <div>
                <dt className="text-muted">Description</dt>
                <dd className="text-white">{profile.description}</dd>
              </div>
            )}
            {profile.website && (
              <div>
                <dt className="text-muted">Website</dt>
                <dd>
                  <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {profile.website}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>
      )}

      {jobs.length > 0 && (
        <div>
          <h2 className="text-lg font-medium text-white mb-3">Recent jobs</h2>
          <ul className="space-y-2">
            {jobs.slice(0, 5).map((job) => (
              <li key={job.id}>
                <Link
                  href={`/company/jobs/${job.id}/applicants`}
                  className="block rounded-lg border border-dark_border bg-dark_grey/40 px-4 py-3 hover:border-primary/30 transition"
                >
                  <span className="font-medium text-white">{job.title}</span>
                  <span className="text-muted text-sm ml-2">· {job.location || "—"}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/company/jobs" className="inline-block mt-3 text-sm text-primary hover:underline">
            View all jobs →
          </Link>
        </div>
      )}
    </div>
  );
}
