"use client";

import React, { useEffect, useState } from "react";
import { Search, MoreVertical, UserCheck, UserX, Loader2, AlertCircle } from "lucide-react";
import {
  fetchAdminUsers,
  suspendUser,
  activateUser,
  type AdminUser,
} from "@/lib/adminApi";

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "suspended">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionId, setActionId] = useState<string | number | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await fetchAdminUsers({ search: search || undefined, status: filter !== "all" ? filter : undefined });
      setUsers(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [filter]);

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    if (filter === "active") return matchSearch && u.status === "active";
    if (filter === "suspended") return matchSearch && u.status === "suspended";
    return matchSearch;
  });

  const handleSuspend = async (user: AdminUser) => {
    if (actionId !== null) return;
    setActionId(user.id);
    try {
      await suspendUser(user.id);
      setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, status: "suspended" as const } : u)));
    } finally {
      setActionId(null);
    }
  };

  const handleActivate = async (user: AdminUser) => {
    if (actionId !== null) return;
    setActionId(user.id);
    try {
      await activateUser(user.id);
      setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, status: "active" as const } : u)));
    } finally {
      setActionId(null);
    }
  };

  if (error && users.length === 0) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 flex flex-col items-center gap-4">
        <AlertCircle className="h-10 w-10 text-red-400" />
        <p className="text-white">{error}</p>
        <button onClick={loadUsers} className="rounded-lg bg-primary px-4 py-2 text-darkmode">Retry</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Users</h1>
          <p className="text-sm text-muted mt-1">Manage user accounts and roles</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="search"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-dark_border bg-black/20 pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "active", "suspended"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-4 py-2.5 text-sm font-medium capitalize transition ${
                filter === f ? "bg-primary text-darkmode" : "border border-dark_border text-muted hover:text-white"
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
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">User</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Email</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Role</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Status</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Joined</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted w-28">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(loading && users.length === 0 ? [] : filtered).map((user) => (
                <tr key={user.id} className="border-b border-dark_border/50 hover:bg-black/10">
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{user.name}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted">{user.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user.role === "admin" ? "bg-primary/20 text-primary" : "bg-dark_border/30 text-muted"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user.status === "active" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted">{user.joined}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {user.status === "active" ? (
                        <button
                          onClick={() => handleSuspend(user)}
                          disabled={actionId !== null || user.role === "admin"}
                          className="rounded p-1.5 text-amber-300 hover:bg-black/30 disabled:opacity-50"
                          title="Suspend"
                        >
                          {actionId === user.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserX className="h-4 w-4" />}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivate(user)}
                          disabled={actionId !== null}
                          className="rounded p-1.5 text-emerald-300 hover:bg-black/30 disabled:opacity-50"
                          title="Activate"
                        >
                          {actionId === user.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserCheck className="h-4 w-4" />}
                        </button>
                      )}
                      <button className="rounded p-1.5 text-muted hover:bg-black/30 hover:text-white" title="More">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {loading && users.length === 0 && (
          <div className="px-4 py-12 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="px-4 py-12 text-center text-muted">No users match your filters.</div>
        )}
      </div>
    </div>
  );
}
