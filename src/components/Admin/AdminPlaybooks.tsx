"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, Plus, Edit2, Loader2, AlertCircle, X } from "lucide-react";
import Button from "@/components/Common/Button";
import {
  fetchAdminPlaybooks,
  createAdminPlaybook,
  updateAdminPlaybook,
  type AdminPlaybook,
} from "@/lib/adminApi";

export default function AdminPlaybooks() {
  const [playbooks, setPlaybooks] = useState<AdminPlaybook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<AdminPlaybook | null>(null);
  const [saving, setSaving] = useState(false);
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");

  const loadPlaybooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await fetchAdminPlaybooks();
      setPlaybooks(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load playbooks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlaybooks();
  }, []);

  const openAdd = () => {
    setFormName("");
    setFormDesc("");
    setShowAdd(true);
    setEditing(null);
  };

  const openEdit = (p: AdminPlaybook) => {
    setFormName(p.name);
    setFormDesc(p.description);
    setEditing(p);
    setShowAdd(false);
  };

  const closeModal = () => {
    setShowAdd(false);
    setEditing(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      if (editing) {
        const updated = await updateAdminPlaybook(editing.id, { name: formName, description: formDesc });
        setPlaybooks((prev) => prev.map((p) => (p.id === editing.id ? updated : p)));
        closeModal();
      } else {
        const created = await createAdminPlaybook({ name: formName, description: formDesc });
        setPlaybooks((prev) => [...prev, created]);
        closeModal();
      }
    } finally {
      setSaving(false);
    }
  };

  if (error && playbooks.length === 0) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 flex flex-col items-center gap-4">
        <AlertCircle className="h-10 w-10 text-red-400" />
        <p className="text-white">{error}</p>
        <button onClick={loadPlaybooks} className="rounded-lg bg-primary px-4 py-2 text-darkmode">Retry</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Playbooks</h1>
          <p className="text-sm text-muted mt-1">Manage template playbooks available to users</p>
        </div>
        <Button onClick={openAdd} className="flex items-center gap-2" variant="primary">
          <Plus className="h-4 w-4" />
          Add playbook
        </Button>
      </div>

      {loading && playbooks.length === 0 ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {playbooks.map((p) => (
            <div
              key={p.id}
              className="rounded-xl border border-dark_border bg-dark_grey/60 p-5 hover:border-primary/30 transition"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-lg bg-primary/20 p-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <button
                  onClick={() => openEdit(p)}
                  className="rounded p-1.5 text-muted hover:bg-black/30 hover:text-white"
                  title="Edit"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
              </div>
              <h3 className="mt-3 font-medium text-white">{p.name}</h3>
              <p className="mt-1 text-sm text-muted">{p.description}</p>
              <p className="mt-3 text-xs text-muted">Used {p.usageCount} times</p>
            </div>
          ))}
        </div>
      )}

      {(showAdd || editing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-xl border border-dark_border bg-dark_grey p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">{editing ? "Edit playbook" : "Add playbook"}</h2>
              <button onClick={closeModal} className="rounded p-1.5 text-muted hover:bg-black/30 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted mb-1">Name</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-dark_border bg-black/20 px-4 py-2.5 text-sm text-white focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-1">Description</label>
                <textarea
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-dark_border bg-black/20 px-4 py-2.5 text-sm text-white focus:border-primary outline-none resize-none"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <Button type="button" variant="secondary" onClick={closeModal}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : editing ? "Save" : "Create"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
