"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Globe2, Link2, Pause, Play, Settings2, Loader2, AlertCircle, ShieldCheck, Briefcase, Zap } from "lucide-react";
import Button from "@/components/Common/Button";
import {
  fetchAutomations,
  createAutomation,
  pauseAutomation,
  resumeAutomation,
  runAutomation,
  type Automation,
  type CreateAutomationPayload,
} from "@/lib/automationsApi";
import toast from "react-hot-toast";
import { fetchSetupStatus } from "@/lib/setupApi";

const Automations: React.FC = () => {
  const router = useRouter();
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionId, setActionId] = useState<string | null>(null);
  const [setupComplete, setSetupComplete] = useState<boolean | null>(null);
  const [form, setForm] = useState<CreateAutomationPayload>({
    name: "",
    targetTitles: "",
    locations: "",
    dailyLimit: 25,
    platforms: [],
    coverLetterTemplate: "",
  });
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const loadAutomations = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await fetchAutomations();
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

  useEffect(() => {
    fetchSetupStatus().then((s) => setSetupComplete(s.complete));
  }, []);

  const showMsg = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  const toggleStatus = async (a: Automation) => {
    if (actionId) return;
    setActionId(String(a.id));
    try {
      if (a.status === "running") {
        const updated = await pauseAutomation(a.id);
        setAutomations((prev) => prev.map((x) => (x.id === a.id ? updated : x)));
      } else {
        const updated = await resumeAutomation(a.id);
        setAutomations((prev) => prev.map((x) => (x.id === a.id ? updated : x)));
      }
    } catch (e) {
      showMsg(e instanceof Error ? e.message : "Action failed");
    } finally {
      setActionId(null);
    }
  };

  const handleRunNow = async (a: Automation) => {
    if (actionId) return;
    setActionId(String(a.id));
    try {
      const result = await runAutomation(a.id);
      toast.success(result.message);
      await loadAutomations();
    } catch {
      // error toast handled by axios
    } finally {
      setActionId(null);
    }
  };

  const togglePlatform = (name: string) => {
    setForm((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(name) ? prev.platforms.filter((p) => p !== name) : [...prev.platforms, name],
    }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (setupComplete === false) {
      router.push("/setup");
      return;
    }
    setCreating(true);
    try {
      const created = await createAutomation(form);
      setAutomations((prev) => [...prev, created]);
      setForm({ name: "", targetTitles: "", locations: "", dailyLimit: 25, platforms: [], coverLetterTemplate: "" });
      showMsg("Automation created (paused). Start it from the list.");
    } catch (e) {
      showMsg(e instanceof Error ? e.message : "Failed to create");
    } finally {
      setCreating(false);
    }
  };

  if (error && automations.length === 0) {
    return (
      <section className="pb-20 pt-10 md:pt-12 lg:pt-16 bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 flex flex-col items-center gap-4">
            <AlertCircle className="h-10 w-10 text-red-400" />
            <p className="text-white">{error}</p>
            <Button onClick={loadAutomations}>Retry</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-20 pt-10 md:pt-12 lg:pt-16 bg-darkmode">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        {message && (
          <div className="mb-6 rounded-lg border border-primary/50 bg-primary/10 px-4 py-2 text-sm text-primary">
            {message}
          </div>
        )}
        {setupComplete === false && (
          <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-amber-200">
              <ShieldCheck className="h-5 w-5 shrink-0" />
              <p className="text-sm">
                Complete your profile setup (resume + details) before creating automations.
              </p>
            </div>
            <Button variant="primary" onClick={() => router.push("/setup")}>Complete setup</Button>
          </div>
        )}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-2">Automations</p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
              Define how CrypGo applies for you
            </h1>
            <p className="mt-2 max-w-xl text-sm md:text-base text-muted">
              Create focused, controllable rules. Tune titles, locations, tech stack, and daily limits per job board.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
          <div className="rounded-2xl border border-dark_border bg-dark_grey/70 p-5 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Existing automations</h2>
              <p className="text-xs text-muted">
                {automations.length} {automations.length === 1 ? "automation" : "automations"}
              </p>
            </div>

            {loading && automations.length === 0 ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-4">
                {automations.map((automation) => (
                  <div
                    key={automation.id}
                    className="rounded-xl border border-dark_border bg-black/25 px-4 py-4 md:px-5 md:py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium text-white">{automation.name}</p>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium border ${
                            automation.status === "running"
                              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                              : "border-amber-500/40 bg-amber-500/10 text-amber-200"
                          }`}
                        >
                          <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${automation.status === "running" ? "bg-emerald-400" : "bg-amber-300"}`} />
                          {automation.status === "running" ? "Running" : "Paused"}
                        </span>
                        {typeof automation.applicationsToday === "number" &&
                          automation.applicationsToday >= automation.dailyLimit &&
                          automation.dailyLimit > 0 && (
                            <span className="inline-flex items-center rounded-full bg-amber-500/20 text-amber-200 border border-amber-500/40 px-2.5 py-0.5 text-[11px] font-medium">
                              Limit exceeded
                            </span>
                          )}
                      </div>
                      <p className="text-xs text-muted">
                        {[automation.targetTitles, automation.locations].filter(Boolean).join(" · ") || "—"}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {automation.platforms.map((platform) => (
                          <span key={platform} className="inline-flex items-center rounded-md bg-black/40 px-2.5 py-1 text-[11px] text-muted">
                            <Globe2 className="mr-1.5 h-3 w-3" />
                            {platform}
                          </span>
                        ))}
                        <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-[11px] text-primary border border-primary/40">
                          <Link2 className="mr-1.5 h-3 w-3" />
                          Limit: {automation.dailyLimit} / day
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-stretch gap-2 md:w-40">
                      <button
                        type="button"
                        onClick={() => handleRunNow(automation)}
                        disabled={actionId !== null}
                        className="inline-flex w-full items-center justify-center rounded-lg px-3 py-2 text-xs md:text-sm font-medium border border-primary/60 bg-primary/15 text-primary hover:bg-primary/25"
                      >
                        {actionId === String(automation.id) ? (
                          <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                        ) : (
                          <><Zap className="mr-1.5 h-4 w-4" /> Run now</>
                        )}
                      </button>
                      <Link href={`/automations/${automation.id}/jobs`} className="inline-flex w-full">
                        <Button variant="secondary" className="w-full text-xs md:text-sm inline-flex items-center justify-center gap-2">
                          <Briefcase className="h-4 w-4 shrink-0" />
                          View applied jobs
                        </Button>
                      </Link>
                      <Link href={`/automations?edit=${automation.id}`} className="inline-flex w-full">
                        <Button variant="secondary" className="w-full text-xs md:text-sm inline-flex items-center justify-center gap-2">
                          <Settings2 className="h-4 w-4 shrink-0" />
                          Edit rule
                        </Button>
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggleStatus(automation)}
                        disabled={actionId !== null}
                        className={`inline-flex w-full items-center justify-center rounded-lg px-3 py-2 text-xs md:text-sm font-medium border transition ${
                          automation.status === "running"
                            ? "border-amber-500/60 bg-amber-500/15 text-amber-200 hover:bg-amber-500/25"
                            : "border-emerald-500/60 bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25"
                        }`}
                      >
                        {actionId === String(automation.id) ? (
                          <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                        ) : automation.status === "running" ? (
                          <><Pause className="mr-1.5 h-4 w-4" /> Pause</>
                        ) : (
                          <><Play className="mr-1.5 h-4 w-4" /> Resume</>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-dark_border bg-dark_grey/70 p-5 md:p-6">
            <h2 className="text-lg font-semibold text-white mb-3">Quick create</h2>
            <p className="text-xs text-muted mb-5">
              Create a new automation. It will start paused until you resume it.
            </p>

            <form className="space-y-4" onSubmit={handleCreate}>
              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">Automation name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Senior React roles in Europe"
                  className="w-full rounded-lg border border-dark_border bg-black/30 px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">Target titles / keywords</label>
                <textarea
                  value={form.targetTitles}
                  onChange={(e) => setForm((f) => ({ ...f, targetTitles: e.target.value }))}
                  rows={2}
                  placeholder="React, Frontend Engineer, Senior Frontend..."
                  className="w-full rounded-lg border border-dark_border bg-black/30 px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-primary resize-none"
                />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">Preferred locations</label>
                  <input
                    value={form.locations}
                    onChange={(e) => setForm((f) => ({ ...f, locations: e.target.value }))}
                    placeholder="Remote, EU, UK..."
                    className="w-full rounded-lg border border-dark_border bg-black/30 px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">Daily limit</label>
                  <input
                    type="number"
                    min={1}
                    max={500}
                    value={form.dailyLimit}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        dailyLimit: Number(e.target.value || 0),
                      }))
                    }
                    placeholder="e.g. 50"
                    className="w-full rounded-lg border border-dark_border bg-black/30 px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-primary"
                  />
                  <p className="mt-1 text-[11px] text-muted">
                    How many applications per day this automation can send (e.g. 50, 100).
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-2">Job boards</label>
                <div className="flex flex-wrap gap-2">
                  {["LinkedIn", "Indeed", "Wellfound", "RemoteOK"].map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => togglePlatform(name)}
                      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs transition ${
                        form.platforms.includes(name)
                          ? "border-primary bg-primary/20 text-primary"
                          : "border-dark_border bg-black/30 text-muted hover:border-primary hover:text-primary"
                      }`}
                    >
                      <Globe2 className="mr-1.5 h-3 w-3" />
                      {name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">Basic cover letter template</label>
                <textarea
                  value={form.coverLetterTemplate ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, coverLetterTemplate: e.target.value }))}
                  rows={3}
                  placeholder="Short personalized intro..."
                  className="w-full rounded-lg border border-dark_border bg-black/30 px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-primary resize-none"
                />
              </div>
              <div className="pt-2">
                <Button type="submit" className="w-full justify-center text-sm" disabled={creating}>
                  {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create automation"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Automations;
