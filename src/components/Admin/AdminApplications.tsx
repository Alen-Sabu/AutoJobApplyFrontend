"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Search, Loader2, AlertCircle } from "lucide-react";
import {
  fetchAdminApplications,
  updateAdminApplicationStatus,
  type AdminApplication,
  type AdminApplicationStatus,
} from "@/lib/adminApi";

const STATUS_OPTIONS: AdminApplicationStatus[] = [
  "saved",
  "draft",
  "submitted",
  "reviewing",
  "interview",
  "rejected",
  "accepted",
  "withdrawn",
];

function formatDate(value?: string | null): string {
  if (!value) return "—";
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return "—";
  return dt.toLocaleString();
}

export default function AdminApplications() {
  const [applications, setApplications] = useState<AdminApplication[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | AdminApplicationStatus>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionId, setActionId] = useState<number | null>(null);

  const loadApplications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const rows = await fetchAdminApplications({
        search: search || undefined,
        status: statusFilter,
        skip: 0,
        limit: 300,
      });
      setApplications(rows);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load applications");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const filtered = useMemo(() => applications, [applications]);

  const handleStatusChange = async (row: AdminApplication, nextStatus: AdminApplicationStatus) => {
    if (actionId !== null) return;
    setActionId(row.id);
    try {
      const updated = await updateAdminApplicationStatus(row.id, nextStatus);
      if (!updated) return;
      setApplications((prev) => prev.map((a) => (a.id === row.id ? updated : a)));
    } finally {
      setActionId(null);
    }
  };

  if (error && applications.length === 0) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 flex flex-col items-center gap-4">
        <AlertCircle className="h-10 w-10 text-red-400" />
        <p className="text-white">{error}</p>
        <button onClick={loadApplications} className="rounded-lg bg-primary px-4 py-2 text-darkmode">Retry</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Applications</h1>
        <p className="text-sm text-muted mt-1">Manage all user applications and update statuses</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="search"
            placeholder="Search user, email, job title, or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-dark_border bg-black/20 pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-muted focus:border-primary outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "all" | AdminApplicationStatus)}
          className="rounded-lg border border-dark_border bg-black/20 px-3 py-2.5 text-sm text-white"
        >
          <option value="all">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="rounded-xl border border-dark_border bg-dark_grey/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-dark_border bg-black/20">
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">User</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Job</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Application</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Status</th>
              </tr>
            </thead>
            <tbody>
              {(loading && applications.length === 0 ? [] : filtered).map((row) => (
                <tr key={row.id} className="border-b border-dark_border/50 hover:bg-black/10 align-top">
                  <td className="px-4 py-3 text-sm">
                    <p className="font-medium text-white">{row.userName || `User #${row.userId}`}</p>
                    <p className="text-muted">{row.userEmail}</p>
                    <p className="text-xs text-muted mt-1">User ID: {row.userId}</p>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <p className="font-medium text-white">{row.jobTitle}</p>
                    <p className="text-muted">{row.jobCompany}</p>
                    <p className="text-xs text-muted mt-1">
                      {row.jobLocation || "—"} {row.jobType ? `· ${row.jobType}` : ""}
                    </p>
                    <p className="text-xs text-muted mt-1">Job ID: {row.jobId}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted">
                    <p>Application ID: {row.id}</p>
                    <p className="mt-1">Applied: {formatDate(row.appliedAt)}</p>
                    <p className="mt-1">Created: {formatDate(row.createdAt)}</p>
                    <p className="mt-1">Automation: {row.automationId ?? "—"}</p>
                    <p className="mt-1 max-w-xs truncate" title={row.notes ?? ""}>Notes: {row.notes || "—"}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <select
                        value={row.status}
                        onChange={(e) => handleStatusChange(row, e.target.value as AdminApplicationStatus)}
                        disabled={actionId !== null}
                        className="rounded-lg border border-dark_border bg-black/20 px-3 py-1.5 text-xs text-white disabled:opacity-60"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {actionId === row.id ? <Loader2 className="h-4 w-4 animate-spin text-primary" /> : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {loading && applications.length === 0 && (
          <div className="px-4 py-12 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="px-4 py-12 text-center text-muted">No applications found.</div>
        )}
      </div>
    </div>
  );
}
