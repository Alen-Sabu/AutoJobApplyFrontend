"use client";

import React, { useEffect, useState } from "react";
import { Search, Check, X, Loader2, AlertCircle, Plus, Trash2, Edit3 } from "lucide-react";
import {
  fetchAdminJobs,
  approveJob,
  rejectJob,
  createAdminJob,
  updateAdminJob,
  deleteAdminJob,
  type AdminJob,
} from "@/lib/adminApi";

export default function AdminJobs() {
  const [jobs, setJobs] = useState<AdminJob[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionId, setActionId] = useState<string | number | null>(null);
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newSalary, setNewSalary] = useState("");
  const [newJobType, setNewJobType] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newJobUrl, setNewJobUrl] = useState("");
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCompany, setEditCompany] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editSalary, setEditSalary] = useState("");
  const [editJobType, setEditJobType] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editJobUrl, setEditJobUrl] = useState("");

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

  const startCreate = () => {
    setCreating(true);
    setNewTitle("");
    setNewCompany("");
    setNewLocation("");
    setNewSalary("");
    setNewJobType("");
    setNewDescription("");
    setNewJobUrl("");
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCompany.trim()) return;
    setActionId("create");
    try {
      const job = await createAdminJob({
        title: newTitle.trim(),
        company: newCompany.trim(),
        location: newLocation.trim() || undefined,
        salary: newSalary.trim() || undefined,
        jobType: newJobType.trim() || undefined,
        description: newDescription.trim() || undefined,
        jobUrl: newJobUrl.trim() || undefined,
        status: "pending",
      });
      setJobs((prev) => [job, ...prev]);
      setCreating(false);
      setNewTitle("");
      setNewCompany("");
      setNewLocation("");
      setNewSalary("");
      setNewJobType("");
      setNewDescription("");
      setNewJobUrl("");
    } finally {
      setActionId(null);
    }
  };

  const startEdit = (job: AdminJob) => {
    setEditingId(job.id);
    setEditTitle(job.title);
    setEditCompany(job.company);
    setEditLocation(job.location ?? "");
    setEditSalary(job.salary ?? "");
    setEditJobType(job.jobType ?? "");
    setEditDescription(job.description ?? "");
    setEditJobUrl(job.jobUrl ?? "");
  };

  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    setActionId(editingId);
    try {
      const updated = await updateAdminJob(editingId, {
        title: editTitle.trim(),
        company: editCompany.trim(),
        location: editLocation.trim() || undefined,
        salary: editSalary.trim() || undefined,
        jobType: editJobType.trim() || undefined,
        description: editDescription.trim() || undefined,
        jobUrl: editJobUrl.trim() || undefined,
      });
      setJobs((prev) => prev.map((j) => (j.id === updated.id ? updated : j)));
      setEditingId(null);
      setEditTitle("");
      setEditCompany("");
      setEditLocation("");
      setEditSalary("");
      setEditJobType("");
      setEditDescription("");
      setEditJobUrl("");
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (job: AdminJob) => {
    if (actionId !== null) return;
    if (!confirm(`Delete job "${job.title}" at ${job.company}?`)) return;
    setActionId(job.id);
    try {
      await deleteAdminJob(job.id);
      setJobs((prev) => prev.filter((j) => j.id !== job.id));
    } finally {
      setActionId(null);
    }
  };

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
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Jobs</h1>
          <p className="text-sm text-muted mt-1">Review and manage job listings</p>
        </div>
        <button
          type="button"
          onClick={startCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-darkmode hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          New job
        </button>
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

      {creating && (
        <form
          onSubmit={handleCreate}
          className="rounded-xl border border-dark_border bg-dark_grey/70 p-4 space-y-3"
        >
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-xs font-medium text-muted">Job title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Senior React Engineer"
                className="w-full rounded-lg border border-dark_border bg-black/20 px-3 py-2 text-sm text-white placeholder:text-muted focus:border-primary outline-none"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-muted">Company</label>
              <input
                type="text"
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                placeholder="Acme Labs"
                className="w-full rounded-lg border border-dark_border bg-black/20 px-3 py-2 text-sm text-white placeholder:text-muted focus:border-primary outline-none"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-muted">Location</label>
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder="Remote · Europe"
                className="w-full rounded-lg border border-dark_border bg-black/20 px-3 py-2 text-sm text-white placeholder:text-muted focus:border-primary outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-muted">CTC / salary range</label>
              <input
                type="text"
                value={newSalary}
                onChange={(e) => setNewSalary(e.target.value)}
                placeholder="$110k – $140k"
                className="w-full rounded-lg border border-dark_border bg-black/20 px-3 py-2 text-sm text-white placeholder:text-muted focus:border-primary outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-muted">Job type</label>
              <input
                type="text"
                value={newJobType}
                onChange={(e) => setNewJobType(e.target.value)}
                placeholder="Full-time · Remote"
                className="w-full rounded-lg border border-dark_border bg-black/20 px-3 py-2 text-sm text-white placeholder:text-muted focus:border-primary outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-muted">Source / platform</label>
              <input
                type="text"
                value={newJobUrl}
                onChange={(e) => setNewJobUrl(e.target.value)}
                placeholder="https://jobs.example.com/..."
                className="w-full rounded-lg border border-dark_border bg-black/20 px-3 py-2 text-sm text-white placeholder:text-muted focus:border-primary outline-none"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-medium text-muted">Description</label>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              rows={3}
              placeholder="Short description of responsibilities, tech stack, and requirements."
              className="w-full rounded-lg border border-dark_border bg-black/20 px-3 py-2 text-sm text-white placeholder:text-muted focus:border-primary outline-none resize-y"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="rounded-lg border border-dark_border bg-black/20 px-3 py-1.5 text-xs text-muted hover:text-white"
              onClick={() => setCreating(false)}
              disabled={actionId === "create"}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-darkmode hover:bg-primary/90 disabled:opacity-60"
              disabled={actionId === "create"}
            >
              {actionId === "create" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
              Create job
            </button>
          </div>
        </form>
      )}

      <div className="rounded-xl border border-dark_border bg-dark_grey/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-dark_border bg-black/20">
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Job</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Company</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Location</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">CTC</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Status</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Posted</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted w-40">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(loading && jobs.length === 0 ? [] : filtered).map((job) => (
                <tr key={job.id} className="border-b border-dark_border/50 hover:bg-black/10">
                  <td className="px-4 py-3 font-medium text-white">
                    {editingId === job.id ? (
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full rounded-lg border border-dark_border bg-black/20 px-3 py-1.5 text-sm text-white placeholder:text-muted focus:border-primary outline-none"
                      />
                    ) : (
                      job.title
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted">
                    {editingId === job.id ? (
                      <input
                        type="text"
                        value={editCompany}
                        onChange={(e) => setEditCompany(e.target.value)}
                        className="w-full rounded-lg border border-dark_border bg-black/20 px-3 py-1.5 text-sm text-white placeholder:text-muted focus:border-primary outline-none"
                      />
                    ) : (
                      job.company
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted">
                    {editingId === job.id ? (
                      <input
                        type="text"
                        value={editLocation}
                        onChange={(e) => setEditLocation(e.target.value)}
                        className="w-full rounded-lg border border-dark_border bg-black/20 px-3 py-1.5 text-sm text-white placeholder:text-muted focus:border-primary outline-none"
                      />
                    ) : (
                      job.location ?? "-"
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted">
                    {editingId === job.id ? (
                      <input
                        type="text"
                        value={editSalary}
                        onChange={(e) => setEditSalary(e.target.value)}
                        className="w-full rounded-lg border border-dark_border bg-black/20 px-3 py-1.5 text-sm text-white placeholder:text-muted focus:border-primary outline-none"
                      />
                    ) : (
                      job.salary ?? "-"
                    )}
                  </td>
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
                      {editingId === job.id ? (
                        <>
                          <button
                            onClick={handleEditSave}
                            disabled={actionId !== null}
                            className="rounded-lg bg-primary/20 px-3 py-1.5 text-xs text-primary hover:bg-primary/30 disabled:opacity-50"
                            title="Save"
                          >
                            {actionId === job.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingId(null);
                              setEditTitle("");
                              setEditCompany("");
                            }}
                            className="rounded-lg bg-black/30 px-3 py-1.5 text-xs text-muted hover:text-white"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
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
                          <button
                            onClick={() => startEdit(job)}
                            disabled={actionId !== null}
                            className="rounded-lg bg-black/20 p-2 text-muted hover:bg-black/30 hover:text-white disabled:opacity-50"
                            title="Edit"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(job)}
                            disabled={actionId !== null}
                            className="rounded-lg bg-red-500/10 p-2 text-red-300 hover:bg-red-500/20 disabled:opacity-50"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
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
