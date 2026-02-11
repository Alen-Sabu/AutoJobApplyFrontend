"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  Zap,
  PlayCircle,
  Pause,
  Play,
  Loader2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import Button from "@/components/Common/Button";
import {
  fetchDashboardStats,
  fetchDashboardCampaigns,
  fetchDashboardActivity,
  pauseCampaign as apiPauseCampaign,
  resumeCampaign as apiResumeCampaign,
  type DashboardStat,
  type DashboardCampaign,
  type DashboardActivityItem,
} from "@/lib/dashboardApi";
import { fetchSetupStatus } from "@/lib/setupApi";

const STAT_ICONS: Record<string, React.ReactNode> = {
  applications_today: <Zap className="h-5 w-5 text-primary" />,
  this_week: <TrendingUp className="h-5 w-5 text-emerald-400" />,
  interviews: <CheckCircle2 className="h-5 w-5 text-sky-400" />,
  active_automations: <Clock className="h-5 w-5 text-violet-400" />,
};

const STAT_LINKS: Record<string, string> = {
  applications_today: "/automations",
  this_week: "/automations",
  interviews: "/dashboard",
  active_automations: "/automations",
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  if (status === "Running") {
    return (
      <span
        className={`${base} bg-emerald-500/10 text-emerald-300 border border-emerald-500/30`}
      >
        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Running
      </span>
    );
  }
  return (
    <span
      className={`${base} bg-amber-500/10 text-amber-200 border border-amber-500/30`}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-amber-300" />
      Paused
    </span>
  );
};

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [campaigns, setCampaigns] = useState<DashboardCampaign[]>([]);
  const [activity, setActivity] = useState<DashboardActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionId, setActionId] = useState<string | null>(null);
  const [setupComplete, setSetupComplete] = useState<boolean | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsRes, campaignsRes, activityRes] = await Promise.all([
        fetchDashboardStats(),
        fetchDashboardCampaigns(),
        fetchDashboardActivity(),
      ]);
      setStats(statsRes);
      setCampaigns(campaignsRes);
      setActivity(activityRes);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    fetchSetupStatus().then((s) => setSetupComplete(s.complete));
  }, []);

  const handlePauseResume = async (campaign: DashboardCampaign) => {
    if (actionId) return;
    setActionId(campaign.id);
    try {
      if (campaign.status === "Running") {
        await apiPauseCampaign(campaign.id);
        setCampaigns((prev) =>
          prev.map((c) =>
            c.id === campaign.id ? { ...c, status: "Paused" as const } : c
          )
        );
      } else {
        await apiResumeCampaign(campaign.id);
        setCampaigns((prev) =>
          prev.map((c) =>
            c.id === campaign.id ? { ...c, status: "Running" as const } : c
          )
        );
      }
    } catch {
      // optional: toast
    } finally {
      setActionId(null);
    }
  };

  if (loading && stats.length === 0) {
    return (
      <section className="pb-20 pt-10 md:pt-12 lg:pt-16 bg-darkmode min-h-[50vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-sm">Loading dashboard…</p>
        </div>
      </section>
    );
  }

  if (error && stats.length === 0) {
    return (
      <section className="pb-20 pt-10 md:pt-12 lg:pt-16 bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 flex flex-col items-center gap-4">
            <AlertCircle className="h-10 w-10 text-red-400" />
            <p className="text-white">{error}</p>
            <Button onClick={loadData} variant="secondary">
              Retry
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-20 pt-10 md:pt-12 lg:pt-16 bg-darkmode">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-2">
              Auto Job Apply
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
              Your job search control center
            </h1>
            <p className="mt-2 max-w-xl text-sm md:text-base text-muted">
              Monitor applications, track interviews, and manage automations
              across multiple job boards from a single, clean dashboard.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/automations">
              <Button className="flex items-center gap-2 w-full sm:w-auto" variant="primary">
                <PlayCircle className="h-4 w-4" />
                Start new automation
              </Button>
            </Link>
            <Link href="/jobs">
              <Button
                className="w-full sm:w-auto border border-dark_border bg-transparent text-muted hover:text-darkmode hover:bg-primary"
              >
                View jobs
              </Button>
            </Link>
          </div>
        </div>

        {setupComplete === false && (
          <Link href="/setup" className="block mb-8">
            <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-500/15 to-amber-500/5 p-5 flex flex-wrap items-center justify-between gap-4 hover:border-amber-500/60 transition-colors">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-500/20 p-3">
                  <ShieldCheck className="h-8 w-8 text-amber-300" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Complete your profile setup</h2>
                  <p className="text-sm text-amber-200/90 mt-0.5">
                    Add your resume and details to apply to jobs and create automations.
                  </p>
                </div>
              </div>
              <Button variant="primary" className="shrink-0">Go to setup</Button>
            </div>
          </Link>
        )}

        {/* Stats */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 mb-10">
          {stats.map((card) => {
            const href = STAT_LINKS[card.key] ?? "/automations";
            const icon = STAT_ICONS[card.key] ?? <Zap className="h-5 w-5 text-primary" />;
            return (
              <Link key={card.key} href={href}>
                <div
                  className="rounded-2xl border border-dark_border bg-gradient-to-br from-dark_grey/80 via-dark_grey/60 to-dark_grey/40 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)] hover:border-primary/40 transition-colors h-full block"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                      {card.label}
                    </p>
                    <div className="rounded-full bg-black/30 p-1.5">
                      {icon}
                    </div>
                  </div>
                  <p className="mt-4 text-2xl font-semibold text-white">
                    {card.value}
                  </p>
                  <p className="mt-1 text-xs text-green-300/80">{card.change}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Active campaigns */}
          <div className="lg:col-span-2 rounded-2xl border border-dark_border bg-dark_grey/60 p-5 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">
                Active campaigns
              </h2>
              <p className="text-xs text-muted">
                Optimized for LinkedIn, Indeed & more
              </p>
            </div>

            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="rounded-xl border border-dark_border bg-black/20 px-4 py-4 md:px-5 md:py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-white">{campaign.name}</p>
                      <StatusBadge status={campaign.status} />
                    </div>
                    <p className="text-xs text-muted">
                      Targeting{" "}
                      <span className="text-white/90">
                        {campaign.targetTitle}
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {campaign.locations.map((loc) => (
                        <span
                          key={loc}
                          className="inline-flex items-center rounded-full border border-dark_border bg-dark_grey/60 px-2.5 py-0.5 text-xs text-muted"
                        >
                          {loc}
                        </span>
                      ))}
                      <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs text-primary">
                        {campaign.dailyLimit}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2">
                    <div className="flex flex-wrap gap-2">
                      {campaign.platforms.map((platform) => (
                        <span
                          key={platform}
                          className="inline-flex items-center rounded-md bg-black/40 px-2.5 py-1 text-xs text-muted"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handlePauseResume(campaign)}
                        disabled={actionId !== null}
                        className="rounded-lg border border-dark_border px-2.5 py-1.5 text-xs text-muted hover:text-white hover:border-primary/50 disabled:opacity-50 flex items-center gap-1.5"
                        title={campaign.status === "Running" ? "Pause" : "Resume"}
                      >
                        {actionId === campaign.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : campaign.status === "Running" ? (
                          <Pause className="h-3.5 w-3.5" />
                        ) : (
                          <Play className="h-3.5 w-3.5" />
                        )}
                        {campaign.status === "Running" ? "Pause" : "Resume"}
                      </button>
                      <Link href={`/automations?campaign=${campaign.id}`}>
                        <Button
                          variant="secondary"
                          className="px-3 py-1 text-xs md:text-sm"
                        >
                          View details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="rounded-2xl border border-dark_border bg-dark_grey/60 p-5 md:p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">
              Recent activity
            </h2>
            <div className="space-y-4">
              {activity.map((item) => (
                <div
                  key={item.id}
                  className="relative rounded-xl bg-black/25 px-4 py-3 border border-dark_border/70"
                >
                  <p className="text-[11px] uppercase tracking-[0.16em] text-muted mb-1.5">
                    {item.time}
                  </p>
                  <p className="text-sm font-medium text-white">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-dark_border pt-4">
              <p className="text-xs text-muted mb-2">
                Tip: keep 2‑4 focused automations instead of 10+ noisy ones.
              </p>
              <Link href="/automations">
                <Button
                  variant="secondary"
                  className="w-full text-sm justify-center"
                >
                  View full activity log
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
