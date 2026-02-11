"use client";

import React, { useEffect, useState } from "react";
import { Search, Check, X, Loader2, AlertCircle } from "lucide-react";
import { fetchAdminJobs, approveJob, rejectJob, type AdminJob } from "@/lib/adminApi";

export default function AdminJobs() {
  const [jobs, setJobs] = useState<AdminJob[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionId, setActionId] = useState<string | number | null>(null);

  const loadJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await fetchAdminJobs({ search: search || undefined, status: statusFilter !== "all" ? statusFilter : undefined });
      setJobs(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [statusFilter]);

  const filtered = jobs.filter((j) => {
    const match =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase());
    if (statusFilter === "pending") return match && j.status === "pending";
    if (statusFilter === "approved") return match && j.status === "approved";
    return match;
  });

  const handleApprove = async (job: AdminJob) => {
    if (actionId !== null) return;
    setActionId(job.id);
    try {
      await approveJob(job.id);
      setJobs((prev) => prev.map((j) => (j.id === job.id ? { ...j, status: "approved" as const } : j)));
    } finally {
      setActionId(null);
    }
  };

  const handleReject = async (job: AdminJob) => {
    if (actionId !== null) return;
    setActionId(job.id);
    try {
      await rejectJob(job.id);
      setJobs((prev) => prev.map((j) => (j.id === job.id ? { ...j, status: "rejected" as const } : j)));
    } finally {
      setActionId(null);
    }
  };

  if (error && jobs.length === 0) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 flex flex-col items-center gap-4">
        <AlertCircle className="h-10 w-10 text-red-400" />
        <p className="text-white">{error}</p>
        <button onClick={loadJobs} className="rounded-lg bg-primary px-4 py-2 text-darkmode">Retry</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Jobs</h1>
        <p className="text-sm text-muted mt-1">Review and manage job listings</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="search"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-dark_border bg-black/20 pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-muted focus:border-primary outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "pending", "approved"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`rounded-lg px-4 py-2.5 text-sm font-medium capitalize ${
                statusFilter === f ? "bg-primary text-darkmode" : "border border-dark_border text-muted hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-dark_border bg-dark_grey/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-dark_border bg-black/20">
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Job</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Company</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Status</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Posted</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(loading && jobs.length === 0 ? [] : filtered).map((job) => (
                <tr key={job.id} className="border-b border-dark_border/50 hover:bg-black/10">
                  <td className="px-4 py-3 font-medium text-white">{job.title}</td>
                  <td className="px-4 py-3 text-sm text-muted">{job.company}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        job.status === "approved"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : job.status === "rejected"
                            ? "bg-red-500/20 text-red-300"
                            : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted">{job.posted}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {job.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(job)}
                            disabled={actionId !== null}
                            className="rounded-lg bg-emerald-500/20 p-2 text-emerald-300 hover:bg-emerald-500/30 disabled:opacity-50"
                            title="Approve"
                          >
                            {actionId === job.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={() => handleReject(job)}
                            disabled={actionId !== null}
                            className="rounded-lg bg-red-500/20 p-2 text-red-300 hover:bg-red-500/30 disabled:opacity-50"
                            title="Reject"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {loading && jobs.length === 0 && (
          <div className="px-4 py-12 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="px-4 py-12 text-center text-muted">No jobs match your filters.</div>
        )}
      </div>
    </div>
  );
}
