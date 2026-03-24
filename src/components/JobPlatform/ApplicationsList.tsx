"use client";

import React, { useEffect, useState } from "react";
import { AlertCircle, Briefcase, CalendarDays, Loader2, MapPin } from "lucide-react";
import { fetchMyApplications, type UserJobWithJob } from "@/lib/jobsApi";

function prettyDate(value?: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString();
}

function statusClasses(status: string): string {
  switch (status) {
    case "submitted":
      return "bg-blue-500/15 text-blue-300 border-blue-500/30";
    case "reviewing":
      return "bg-indigo-500/15 text-indigo-300 border-indigo-500/30";
    case "interview":
      return "bg-amber-500/15 text-amber-300 border-amber-500/30";
    case "accepted":
      return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
    case "rejected":
      return "bg-rose-500/15 text-rose-300 border-rose-500/30";
    case "withdrawn":
      return "bg-slate-500/15 text-slate-300 border-slate-500/30";
    default:
      return "bg-primary/15 text-primary border-primary/30";
  }
}

export default function ApplicationsList() {
  const [items, setItems] = useState<UserJobWithJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const rows = await fetchMyApplications();
        if (!mounted) return;
        setItems(rows);
      } catch (e) {
        if (!mounted) return;
        setError(e instanceof Error ? e.message : "Failed to load applications");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="pb-20 pt-10 md:pt-12 lg:pt-16 bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl px-4 flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pb-20 pt-10 md:pt-12 lg:pt-16 bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 flex flex-col items-center gap-4">
            <AlertCircle className="h-10 w-10 text-red-400" />
            <p className="text-white">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-20 pt-10 md:pt-12 lg:pt-16 bg-darkmode">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        {items.length === 0 ? (
          <div className="rounded-xl border border-dark_border bg-dark_grey/60 p-10 text-center">
            <Briefcase className="h-12 w-12 text-muted mx-auto mb-4" />
            <p className="text-white font-medium">No applications yet</p>
            <p className="text-sm text-muted mt-1">Applied jobs will appear here with details and current status.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((application) => (
              <div
                key={application.id}
                className="rounded-2xl border border-dark_border bg-gradient-to-br from-dark_grey/80 via-dark_grey/60 to-dark_grey/40 p-4 md:p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-base md:text-lg font-semibold text-white">{application.job.title}</h2>
                    <p className="mt-1 text-sm text-muted">{application.job.company}</p>
                    <p className="mt-2 flex items-center gap-1 text-xs text-muted">
                      <MapPin className="h-3 w-3" />
                      {application.job.location ?? "Remote / Flexible"}
                    </p>
                  </div>
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${statusClasses(application.status)}`}
                  >
                    {application.status}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                  <div className="rounded-lg border border-dark_border bg-black/25 px-3 py-2">
                    <p className="text-xs text-muted">Job Type</p>
                    <p className="text-white mt-1">{application.job.job_type ?? "—"}</p>
                  </div>
                  <div className="rounded-lg border border-dark_border bg-black/25 px-3 py-2">
                    <p className="text-xs text-muted">Salary</p>
                    <p className="text-white mt-1">{application.job.salary_range ?? "—"}</p>
                  </div>
                  <div className="rounded-lg border border-dark_border bg-black/25 px-3 py-2">
                    <p className="text-xs text-muted">Source</p>
                    <p className="text-white mt-1">{application.job.source ?? "—"}</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 text-xs text-muted">
                  <p className="flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Applied: {prettyDate(application.applied_at)}
                  </p>
                  <p className="flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Created: {prettyDate(application.created_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
