"use client";

import React, { useEffect, useState } from "react";
import { Search, Filter, FileText, Loader2, AlertCircle } from "lucide-react";
import { fetchAdminAudit, type AdminAuditEntry } from "@/lib/adminApi";

export default function AdminAuditLog() {
  const [logs, setLogs] = useState<AdminAuditEntry[]>([]);
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAudit = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await fetchAdminAudit();
      setLogs(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load audit log");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAudit();
  }, [loadAudit]);

  const actions = Array.from(new Set(logs.map((l) => l.action)));
  const filtered = logs.filter((log) => {
    const matchSearch =
      !search ||
      log.actor.toLowerCase().includes(search.toLowerCase()) ||
      log.target.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase());
    const matchAction = actionFilter === "all" || log.action === actionFilter;
    return matchSearch && matchAction;
  });

  if (error && logs.length === 0) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 flex flex-col items-center gap-4">
        <AlertCircle className="h-10 w-10 text-red-400" />
        <p className="text-white">{error}</p>
        <button
          onClick={() => loadAudit()}
          className="rounded-lg bg-primary px-4 py-2 text-darkmode"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Audit log</h1>
        <p className="text-sm text-muted mt-1">Track all important actions in the system</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="search"
            placeholder="Search by actor, action, or target..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-dark_border bg-black/20 pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-muted focus:border-primary outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted" />
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="rounded-lg border border-dark_border bg-black/20 px-4 py-2.5 text-sm text-white focus:border-primary outline-none"
          >
            <option value="all">All actions</option>
            {actions.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-dark_border bg-dark_grey/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-dark_border bg-black/20">
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Time</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Actor</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Action</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Target</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">IP</th>
              </tr>
            </thead>
            <tbody>
              {(loading && logs.length === 0 ? [] : filtered).map((log) => (
                <tr key={log.id} className="border-b border-dark_border/50 hover:bg-black/10">
                  <td className="px-4 py-3 text-sm text-muted whitespace-nowrap">{log.time}</td>
                  <td className="px-4 py-3 text-sm text-white">{log.actor}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted">{log.target}</td>
                  <td className="px-4 py-3 text-xs text-muted">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {loading && logs.length === 0 && (
          <div className="px-4 py-12 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="px-4 py-12 text-center text-muted flex flex-col items-center gap-2">
            <FileText className="h-10 w-10 text-dark_border" />
            No audit entries match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
