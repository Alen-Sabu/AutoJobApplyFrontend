"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Search, Pause, Play, Loader2, AlertCircle, Pencil, X } from "lucide-react";
import {
  fetchAdminAutomations,
  adminPauseAutomation,
  adminResumeAutomation,
  updateAdminAutomation,
  type AdminAutomation,
  type AdminAutomationUpdatePayload,
} from "@/lib/adminApi";

const PLATFORM_OPTIONS = ["LinkedIn", "Indeed", "Wellfound", "RemoteOK"];

export default function AdminAutomations() {
  const [automations, setAutomations] = useState<AdminAutomation[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionId, setActionId] = useState<string | number | null>(null);
  const [editId, setEditId] = useState<string | number | null>(null);
  const [editForm, setEditForm] = useState<AdminAutomationUpdatePayload>({});
  const [editSaving, setEditSaving] = useState(false);

  const loadAutomations = useCallback(async () => {
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
  }, [search]);

  useEffect(() => {
    loadAutomations();
  }, [loadAutomations]);

  const handleToggle = async (a: AdminAutomation) => {
    if (actionId !== null) return;
    setActionId(a.id);
    try {
      const updated =
        a.status === "running"
          ? await adminPauseAutomation(a.id)
          : await adminResumeAutomation(a.id);
      setAutomations((prev) => prev.map((x) => (x.id === a.id ? updated : x)));
    } finally {
      setActionId(null);
    }
  };

  const openEdit = async (a: AdminAutomation) => {
    setEditId(a.id);
    setEditForm({
      name: a.name,
      target_titles: a.target_titles ?? undefined,
      locations: a.locations ?? undefined,
      daily_limit: a.daily_limit ?? a.applications ?? 25,
      platforms: a.platforms?.length ? a.platforms : undefined,
      cover_letter_template: a.cover_letter_template ?? undefined,
      status: a.status,
    });
  };

  const closeEdit = () => {
    setEditId(null);
    setEditForm({});
  };

  const handleEditSave = async () => {
    if (editId == null) return;
    setEditSaving(true);
    try {
      const payload: AdminAutomationUpdatePayload = {
        name: editForm.name,
        target_titles: editForm.target_titles || undefined,
        locations: editForm.locations || undefined,
        daily_limit: editForm.daily_limit,
        platforms: editForm.platforms?.length ? editForm.platforms : undefined,
        cover_letter_template: editForm.cover_letter_template || undefined,
        status: editForm.status,
      };
      const updated = await updateAdminAutomation(editId, payload);
      setAutomations((prev) => prev.map((x) => (x.id === editId ? updated : x)));
      closeEdit();
    } finally {
      setEditSaving(false);
    }
  };

  const togglePlatform = (platform: string) => {
    const list = editForm.platforms ?? [];
    const next = list.includes(platform) ? list.filter((p) => p !== platform) : [...list, platform];
    setEditForm((f) => ({ ...f, platforms: next }));
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
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">User</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Status</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Applied</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Limit/day</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Platforms</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted w-28">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(loading && automations.length === 0 ? [] : automations).map((a) => (
                <tr key={a.id} className="border-b border-dark_border/50 hover:bg-black/10">
                  <td className="px-4 py-3 font-medium text-white">{a.name}</td>
                  <td className="px-4 py-3 text-sm text-muted">
                    <span className="text-white">{a.userName || a.userEmail || `#${a.userId}`}</span>
                    {a.userEmail && <span className="block text-xs text-muted">{a.userEmail}</span>}
                  </td>
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
                  <td className="px-4 py-3 text-sm text-muted">{a.daily_limit ?? "—"}</td>
                  <td className="px-4 py-3 text-sm text-muted">{a.platforms?.join(", ") || "—"}</td>
                  <td className="px-4 py-3 flex items-center gap-1">
                    <button
                      onClick={() => openEdit(a)}
                      className="rounded p-1.5 text-muted hover:bg-black/30 hover:text-primary"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
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
        {!loading && automations.length === 0 && (
          <div className="px-4 py-12 text-center text-muted">No automations found.</div>
        )}
      </div>

      {/* Edit modal */}
      {editId != null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={closeEdit}>
          <div
            className="rounded-xl border border-dark_border bg-dark_grey p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Edit automation</h2>
              <button onClick={closeEdit} className="p-1 text-muted hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted mb-1">Name</label>
                <input
                  value={editForm.name ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-lg border border-dark_border bg-black/30 px-3 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-1">Target titles / keywords</label>
                <input
                  value={editForm.target_titles ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, target_titles: e.target.value }))}
                  placeholder="React, Frontend..."
                  className="w-full rounded-lg border border-dark_border bg-black/30 px-3 py-2 text-sm text-white placeholder:text-muted"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-1">Locations</label>
                <input
                  value={editForm.locations ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, locations: e.target.value }))}
                  placeholder="Remote, EU..."
                  className="w-full rounded-lg border border-dark_border bg-black/30 px-3 py-2 text-sm text-white placeholder:text-muted"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-1">Daily limit</label>
                <input
                  type="number"
                  min={1}
                  max={500}
                  value={editForm.daily_limit ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, daily_limit: parseInt(e.target.value, 10) || undefined }))}
                  className="w-full rounded-lg border border-dark_border bg-black/30 px-3 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-1">Platforms</label>
                <div className="flex flex-wrap gap-2">
                  {PLATFORM_OPTIONS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => togglePlatform(p)}
                      className={`rounded-full border px-3 py-1 text-xs transition ${
                        (editForm.platforms ?? []).includes(p)
                          ? "border-primary bg-primary/20 text-primary"
                          : "border-dark_border bg-black/30 text-muted hover:text-white"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-1">Status</label>
                <select
                  value={editForm.status ?? "paused"}
                  onChange={(e) => setEditForm((f) => ({ ...f, status: e.target.value as "running" | "paused" }))}
                  className="w-full rounded-lg border border-dark_border bg-black/30 px-3 py-2 text-sm text-white"
                >
                  <option value="paused">Paused</option>
                  <option value="running">Running</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-1">Cover letter template (optional)</label>
                <textarea
                  value={editForm.cover_letter_template ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, cover_letter_template: e.target.value }))}
                  rows={3}
                  placeholder="Short intro..."
                  className="w-full rounded-lg border border-dark_border bg-black/30 px-3 py-2 text-sm text-white placeholder:text-muted resize-none"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeEdit}
                className="rounded-lg border border-dark_border px-4 py-2 text-sm text-muted hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleEditSave}
                disabled={editSaving}
                className="rounded-lg bg-primary px-4 py-2 text-sm text-darkmode font-medium disabled:opacity-50"
              >
                {editSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
