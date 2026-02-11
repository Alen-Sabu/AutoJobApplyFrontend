"use client";

import React, { useEffect, useState } from "react";
import { Users, Briefcase, Zap, TrendingUp, Activity, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { fetchAdminStats, fetchAdminActivity, fetchAdminAlerts, type AdminStatCard, type AdminActivityItem, type AdminAlert } from "@/lib/adminApi";

const STAT_ICONS: Record<string, React.ReactNode> = {
  users: <Users className="h-5 w-5 text-primary" />,
  jobs: <Briefcase className="h-5 w-5 text-primary" />,
  automations: <Zap className="h-5 w-5 text-primary" />,
  applications: <TrendingUp className="h-5 w-5 text-primary" />,
};

const STAT_HREFS: Record<string, string> = {
  users: "/admin/users",
  jobs: "/admin/jobs",
  automations: "/admin/automations",
  applications: "/admin/automations",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStatCard[]>([]);
  const [activity, setActivity] = useState<AdminActivityItem[]>([]);
  const [alerts, setAlerts] = useState<AdminAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [statsRes, activityRes, alertsRes] = await Promise.all([
          fetchAdminStats(),
          fetchAdminActivity(),
          fetchAdminAlerts(),
        ]);
        setStats(statsRes);
        setActivity(activityRes);
        setAlerts(alertsRes);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading && stats.length === 0) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error && stats.length === 0) {
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
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <p className="text-sm text-muted mt-1">System overview and key metrics</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((card) => (
          <Link
            key={card.key}
            href={STAT_HREFS[card.key] ?? "/admin"}
            className="rounded-xl border border-dark_border bg-dark_grey/60 p-5 transition hover:border-primary/30"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-muted">{card.label}</span>
              <div className="rounded-lg bg-black/30 p-2">{STAT_ICONS[card.key] ?? null}</div>
            </div>
            <p className="mt-3 text-2xl font-semibold text-white">{card.value}</p>
            <p className="mt-1 text-xs text-muted">{card.change}</p>
          </Link>
        ))}
      </div>

      {alerts.length > 0 && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-amber-200 mb-3">
            <AlertCircle className="h-4 w-4" />
            Attention needed
          </h2>
          <ul className="space-y-2">
            {alerts.map((a) => (
              <li key={a.id}>
                <Link href={a.href} className="text-sm text-amber-100 hover:underline">
                  {a.message}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-dark_border bg-dark_grey/60 p-5">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
            <Activity className="h-5 w-5 text-primary" />
            Recent activity
          </h2>
          <ul className="space-y-3">
            {activity.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-0.5 rounded-lg border border-dark_border/70 bg-black/20 px-4 py-3"
              >
                <p className="text-xs text-muted">{item.time}</p>
                <p className="text-sm font-medium text-white">{item.action}</p>
                <p className="text-xs text-muted">{item.detail}</p>
              </li>
            ))}
          </ul>
          <Link href="/admin/audit" className="mt-4 inline-block text-sm text-primary hover:underline">
            View full audit log →
          </Link>
        </div>

        <div className="rounded-xl border border-dark_border bg-dark_grey/60 p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Quick actions</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/admin/users"
              className="rounded-lg border border-dark_border bg-black/20 px-4 py-3 text-sm font-medium text-white hover:border-primary/50 hover:bg-primary/10 transition"
            >
              Manage users
            </Link>
            <Link
              href="/admin/jobs"
              className="rounded-lg border border-dark_border bg-black/20 px-4 py-3 text-sm font-medium text-white hover:border-primary/50 hover:bg-primary/10 transition"
            >
              Review jobs
            </Link>
            <Link
              href="/admin/settings"
              className="rounded-lg border border-dark_border bg-black/20 px-4 py-3 text-sm font-medium text-white hover:border-primary/50 hover:bg-primary/10 transition"
            >
              Site settings
            </Link>
            <Link
              href="/admin/audit"
              className="rounded-lg border border-dark_border bg-black/20 px-4 py-3 text-sm font-medium text-white hover:border-primary/50 hover:bg-primary/10 transition"
            >
              Audit log
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
