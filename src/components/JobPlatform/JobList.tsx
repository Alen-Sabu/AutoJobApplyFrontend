"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, MapPin, Briefcase, Filter, Star, Loader2, AlertCircle, ShieldCheck } from "lucide-react";
import Button from "@/components/Common/Button";
import {
  fetchJobs,
  fetchSavedJobs,
  attachJobToAutomation,
  applyOnce,
  saveJobToFavorites,
  unsaveJob,
  type JobItem,
  type JobsFilters,
} from "@/lib/jobsApi";
import { fetchSetupStatus } from "@/lib/setupApi";
import { fetchAutomations, type Automation } from "@/lib/automationsApi";

const JobList: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const savedOnly = searchParams.get("saved") === "1";
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string | number>>(new Set());
  const [savedMap, setSavedMap] = useState<Map<string | number, number>>(new Map());
  const [actioningId, setActioningId] = useState<string | number | null>(null);
  const [attachModal, setAttachModal] = useState<JobItem | null>(null);
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [setupComplete, setSetupComplete] = useState<boolean | null>(null);

  const filters: JobsFilters = { keyword: keyword || undefined, location: location || undefined, remoteOnly };

  const loadJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = savedOnly ? await fetchSavedJobs() : await fetchJobs(filters);
      setJobs(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [keyword, location, remoteOnly, savedOnly]);

  useEffect(() => {
    fetchSavedJobs()
      .then((saved) => {
        setSavedIds(new Set(saved.map((j) => j.id)));
        setSavedMap(
          new Map(
            saved
              .filter((j) => j.userJobId != null)
              .map((j) => [j.id, j.userJobId!] as [string | number, number]),
          ),
        );
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchSetupStatus().then((s) => setSetupComplete(s.complete));
  }, []);

  useEffect(() => {
    if (attachModal) {
      fetchAutomations().then((list) => setAutomations(list)).catch(() => setAutomations([]));
    }
  }, [attachModal]);

  const handleSaveToggle = async (job: JobItem) => {
    if (actioningId !== null) return;
    setActioningId(job.id);
    try {
      if (savedIds.has(job.id)) {
        const userJobId = savedMap.get(job.id);
        if (!userJobId) return;
        await unsaveJob(userJobId);
        setSavedIds((prev) => {
          const next = new Set(prev);
          next.delete(job.id);
          return next;
        });
        setSavedMap((prev) => {
          const next = new Map(prev);
          next.delete(job.id);
          return next;
        });
      } else {
        const { userJobId } = await saveJobToFavorites(job.id);
        setSavedIds((prev) => new Set(prev).add(job.id));
        setSavedMap((prev) => {
          const next = new Map(prev);
          next.set(job.id, userJobId);
          return next;
        });
      }
    } finally {
      setActioningId(null);
    }
  };

  const handleApplyOnce = async (job: JobItem) => {
    if (actioningId !== null) return;
    setActioningId(job.id);
    try {
      const userJobId = savedMap.get(job.id);
      await applyOnce(job.id, userJobId);
    } finally {
      setActioningId(null);
    }
  };

  const handleAttach = (job: JobItem) => {
    if (setupComplete === false) return;
    setAttachModal(job);
  };

  const confirmAttach = async (automationId: number) => {
    if (!attachModal) return;
    setActioningId(attachModal.id);
    try {
      const { userJobId } = await attachJobToAutomation(attachModal.id, automationId);
      setSavedIds((prev) => new Set(prev).add(attachModal.id));
      setSavedMap((prev) => {
        const next = new Map(prev);
        next.set(attachModal.id, userJobId);
        return next;
      });
      setAttachModal(null);
    } finally {
      setActioningId(null);
    }
  };

  if (error && jobs.length === 0) {
    return (
      <section className="pb-20 pt-10 md:pt-12 lg:pt-16 bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 flex flex-col items-center gap-4">
            <AlertCircle className="h-10 w-10 text-red-400" />
            <p className="text-white">{error}</p>
            <Button onClick={loadJobs}>Retry</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-20 pt-10 md:pt-12 lg:pt-16 bg-darkmode">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-2">
              {savedOnly ? "Saved roles" : "Job feed"}
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
              {savedOnly ? "Your saved jobs" : "Curated roles for your automations"}
            </h1>
            <p className="mt-2 max-w-xl text-sm md:text-base text-muted">
              Search for roles, filter by location and type, then attach them to an automation or save for later.
            </p>
          </div>
          <Link href={savedOnly ? "/jobs" : "/jobs?saved=1"}>
            <Button variant="secondary" className="hidden md:inline-flex">
              {savedOnly ? "All jobs" : "Saved roles"}
            </Button>
          </Link>
        </div>

        {setupComplete === false && (
          <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-amber-200">
              <ShieldCheck className="h-5 w-5 shrink-0" />
              <p className="text-sm">
                Complete your profile setup (resume + details) to apply to jobs or attach roles to automations.
              </p>
            </div>
            <Link href="/setup">
              <Button variant="primary" className="shrink-0">Complete setup</Button>
            </Link>
          </div>
        )}

        <div className="rounded-2xl border border-dark_border bg-dark_grey/70 p-4 md:p-5 mb-6">
          <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)_minmax(0,1fr)] items-center">
            <div className="flex items-center gap-3 rounded-xl bg-black/30 px-3 py-2.5 border border-dark_border">
              <Search className="h-4 w-4 text-muted" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search by title, tech stack, or company"
                className="flex-1 bg-transparent text-sm text-white placeholder:text-muted focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-black/30 px-3 py-2.5 border border-dark_border">
              <MapPin className="h-4 w-4 text-muted" />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Any location"
                className="flex-1 bg-transparent text-sm text-white placeholder:text-muted focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setRemoteOnly((prev) => !prev)}
                className={`flex flex-1 items-center justify-between rounded-xl border px-3 py-2.5 text-xs md:text-sm transition ${
                  remoteOnly ? "border-primary bg-primary/10 text-primary" : "border-dark_border bg-black/20 text-muted"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Remote only
                </span>
                <span className={`inline-flex h-4 w-7 items-center rounded-full border ${remoteOnly ? "border-primary bg-primary/80" : "border-dark_border bg-black/40"}`}>
                  <span className={`h-3 w-3 rounded-full bg-darkmode transition-transform ${remoteOnly ? "translate-x-3" : "translate-x-0.5"}`} />
                </span>
              </button>
              <button type="button" className="hidden md:inline-flex items-center justify-center rounded-xl border border-dark_border bg-black/30 px-3 py-2.5 text-xs md:text-sm text-muted hover:border-primary hover:text-primary">
                <Filter className="mr-2 h-4 w-4" />
                More filters
              </button>
            </div>
          </div>
        </div>

        {loading && jobs.length === 0 ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="rounded-2xl border border-dark_border bg-gradient-to-br from-dark_grey/80 via-dark_grey/60 to-dark_grey/40 p-4 md:p-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base md:text-lg font-semibold text-white">{job.title}</h2>
                    {job.match && (
                      <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300 border border-emerald-500/30">
                        {job.match}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted">{job.company} · {job.type}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                    <MapPin className="h-3 w-3" />
                    {job.location}
                  </p>
                  <p className="mt-1 text-xs md:text-sm text-primary">{job.salary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center rounded-md bg-black/40 px-2.5 py-1 text-[11px] text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-stretch gap-2 md:w-52">
                  <Button
                    className="w-full text-xs md:text-sm justify-center"
                    onClick={() => {
                      if (setupComplete === false) { router.push("/setup"); return; }
                      handleAttach(job);
                    }}
                    disabled={actioningId !== null}
                  >
                    Attach to automation
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-full text-xs md:text-sm justify-center"
                    onClick={() => {
                      if (setupComplete === false) { router.push("/setup"); return; }
                      handleApplyOnce(job);
                    }}
                    disabled={actioningId !== null}
                  >
                    {actioningId === job.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Apply once"}
                  </Button>
                  <button
                    type="button"
                    className="mt-1 inline-flex items-center justify-center gap-1 text-[11px] text-muted hover:text-primary disabled:opacity-50"
                    onClick={() => handleSaveToggle(job)}
                    disabled={actioningId !== null}
                  >
                    {actioningId === job.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Star className={`h-3.5 w-3.5 ${savedIds.has(job.id) ? "fill-primary text-primary" : ""}`} />}
                    {savedIds.has(job.id) ? "Saved" : "Save to favorites"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {attachModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setAttachModal(null)}>
          <div className="rounded-xl border border-dark_border bg-dark_grey p-6 max-w-sm w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-2">Attach to automation</h3>
            <p className="text-sm text-muted mb-4">{attachModal.title} → choose an automation</p>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {automations.length === 0 && actioningId === null ? (
                <p className="text-sm text-muted">Loading automations…</p>
              ) : (
                automations.map((auto) => (
                  <button
                    key={auto.id}
                    type="button"
                    className="w-full rounded-lg border border-dark_border bg-black/30 px-4 py-2 text-sm text-white hover:border-primary text-left flex items-center justify-between gap-2"
                    onClick={() => confirmAttach(auto.id)}
                    disabled={actioningId !== null}
                  >
                    <span>{auto.name}</span>
                    <span className="text-[11px] text-muted">
                      {auto.status === "running" ? "Running" : "Paused"} · {auto.dailyLimit}/day
                    </span>
                  </button>
                ))
              )}
            </div>
            {automations.length === 0 && !actioningId && (
              <p className="mt-2 text-xs text-muted">Create an automation from the Automations page first.</p>
            )}
            <button type="button" className="mt-4 w-full text-sm text-muted hover:text-primary" onClick={() => setAttachModal(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default JobList;
