"use client";

import React, { useEffect, useState } from "react";
import { Search, Pause, Play, Loader2, AlertCircle } from "lucide-react";
import {
  fetchAdminAutomations,
  adminPauseAutomation,
  adminResumeAutomation,
  type AdminAutomation,
} from "@/lib/adminApi";

export default function AdminAutomations() {
  const [automations, setAutomations] = useState<AdminAutomation[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionId, setActionId] = useState<string | number | null>(null);

  const loadAutomations = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await fetchAdminAutomations({ search: search || undefined });
      setAutomations(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load automations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAutomations();
  }, []);

  const filtered = automations.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      String(a.userId).includes(search)
  );

  const handleToggle = async (a: AdminAutomation) => {
    if (actionId !== null) return;
    setActionId(a.id);
    try {
      if (a.status === "running") {
        await adminPauseAutomation(a.id);
        setAutomations((prev) => prev.map((x) => (x.id === a.id ? { ...x, status: "paused" as const } : x)));
      } else {
        await adminResumeAutomation(a.id);
        setAutomations((prev) => prev.map((x) => (x.id === a.id ? { ...x, status: "running" as const } : x)));
      }
    } finally {
      setActionId(null);
    }
  };

  if (error && automations.length === 0) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 flex flex-col items-center gap-4">
        <AlertCircle className="h-10 w-10 text-red-400" />
        <p className="text-white">{error}</p>
        <button onClick={loadAutomations} className="rounded-lg bg-primary px-4 py-2 text-darkmode">Retry</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Automations</h1>
        <p className="text-sm text-muted mt-1">View and manage all user automations</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
        <input
          type="search"
          placeholder="Search automations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-dark_border bg-black/20 pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-muted focus:border-primary outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="rounded-xl border border-dark_border bg-dark_grey/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-dark_border bg-black/20">
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Name</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">User ID</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Status</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Applications</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Platforms</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(loading && automations.length === 0 ? [] : filtered).map((a) => (
                <tr key={a.id} className="border-b border-dark_border/50 hover:bg-black/10">
                  <td className="px-4 py-3 font-medium text-white">{a.name}</td>
                  <td className="px-4 py-3 text-sm text-muted">#{a.userId}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        a.status === "running" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted">{a.applications}</td>
                  <td className="px-4 py-3 text-sm text-muted">{a.platforms.join(", ")}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleToggle(a)}
                      disabled={actionId !== null}
                      className="rounded p-1.5 text-muted hover:bg-black/30 hover:text-white disabled:opacity-50"
                      title={a.status === "running" ? "Pause" : "Resume"}
                    >
                      {actionId === a.id ? <Loader2 className="h-4 w-4 animate-spin" /> : a.status === "running" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {loading && automations.length === 0 && (
          <div className="px-4 py-12 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="px-4 py-12 text-center text-muted">No automations found.</div>
        )}
      </div>
    </div>
  );
}
