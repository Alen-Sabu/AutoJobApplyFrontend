"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Briefcase, Loader2, AlertCircle, Send, MapPin, CheckCircle2 } from "lucide-react";
import Button from "@/components/Common/Button";
import { fetchAutomation, type Automation } from "@/lib/automationsApi";
import {
  fetchJobsForAutomation,
  submitUserJob,
  type UserJobWithJob,
} from "@/lib/jobsApi";

function jobStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    saved: "Saved",
    draft: "Draft",
    submitted: "Applied",
    reviewing: "Reviewing",
    interview: "Interview",
    rejected: "Rejected",
    accepted: "Accepted",
    withdrawn: "Withdrawn",
  };
  return labels[status] ?? status;
}

function canSubmit(status: string): boolean {
  return status === "saved" || status === "draft";
}

export default function AutomationJobsPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === "string" ? parseInt(params.id, 10) : NaN;
  const [automation, setAutomation] = useState<Automation | null>(null);
  const [jobs, setJobs] = useState<UserJobWithJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submittingId, setSubmittingId] = useState<number | null>(null);

  useEffect(() => {
    if (!Number.isFinite(id)) {
      setError("Invalid automation");
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    Promise.all([fetchAutomation(id), fetchJobsForAutomation(id)])
      .then(([auto, list]) => {
        if (!cancelled) {
          setAutomation(auto);
          setJobs(list);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleSubmit = async (uj: UserJobWithJob) => {
    if (submittingId !== null || !canSubmit(uj.status)) return;
    setSubmittingId(uj.id);
    try {
      await submitUserJob(uj.id);
      setJobs((prev) =>
        prev.map((j) =>
          j.id === uj.id
            ? { ...j, status: "submitted", applied_at: new Date().toISOString() }
            : j
        )
      );
    } catch {
      // toast handled by axios
    } finally {
      setSubmittingId(null);
    }
  };

  if (!Number.isFinite(id)) {
    return (
      <section className="pb-20 pt-10 md:pt-12 lg:pt-16 bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <p className="text-muted">Invalid automation.</p>
          <Link href="/automations">
            <Button variant="secondary" className="mt-4">Back to automations</Button>
          </Link>
        </div>
      </section>
    );
  }

  if (error && !automation) {
    return (
      <section className="pb-20 pt-10 md:pt-12 lg:pt-16 bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 flex flex-col items-center gap-4">
            <AlertCircle className="h-10 w-10 text-red-400" />
            <p className="text-white">{error}</p>
            <Link href="/automations">
              <Button>Back to automations</Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-20 pt-10 md:pt-12 lg:pt-16 bg-darkmode">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <Link
          href="/automations"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to automations
        </Link>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-2">
              Jobs for this automation
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
              {automation?.name ?? "…"}
            </h1>
            <p className="mt-2 max-w-xl text-sm md:text-base text-muted">
              Jobs attached or applied via this automation. Submit any saved/draft entry to mark as applied.
            </p>
          </div>
          <Link href="/jobs">
            <Button variant="secondary" className="shrink-0">
              <Briefcase className="mr-2 h-4 w-4" />
              Browse & attach jobs
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="rounded-2xl border border-dark_border bg-dark_grey/70 p-8 text-center">
            <Briefcase className="h-12 w-12 text-muted mx-auto mb-4" />
            <p className="text-white font-medium">No jobs yet</p>
            <p className="text-sm text-muted mt-1">
              Attach jobs from the Jobs page or run this automation to add applications here.
            </p>
            <Link href="/jobs" className="mt-4 inline-block">
              <Button variant="primary">Go to Jobs</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((uj) => (
              <div
                key={uj.id}
                className="rounded-2xl border border-dark_border bg-dark_grey/70 p-4 md:p-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base md:text-lg font-semibold text-white">
                      {uj.job.title}
                    </h2>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium border ${
                        uj.status === "submitted" || uj.status === "reviewing" || uj.status === "interview"
                          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                          : uj.status === "saved" || uj.status === "draft"
                          ? "border-amber-500/40 bg-amber-500/10 text-amber-200"
                          : "border-dark_border bg-black/30 text-muted"
                      }`}
                    >
                      {uj.status === "submitted" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                      {jobStatusLabel(uj.status)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {uj.job.company}
                    {uj.job.job_type ? ` · ${uj.job.job_type}` : ""}
                  </p>
                  {uj.job.location && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                      <MapPin className="h-3 w-3" />
                      {uj.job.location}
                    </p>
                  )}
                  {uj.applied_at && (
                    <p className="mt-1 text-xs text-muted">
                      Applied {new Date(uj.applied_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-stretch gap-2 md:w-40">
                  {canSubmit(uj.status) && (
                    <Button
                      className="w-full text-sm justify-center"
                      onClick={() => handleSubmit(uj)}
                      disabled={submittingId !== null}
                    >
                      {submittingId === uj.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Apply now
                        </>
                      )}
                    </Button>
                  )}
                  {uj.job.job_url && (
                    <a
                      href={uj.job.job_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center text-sm text-primary hover:underline"
                    >
                      View posting
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
