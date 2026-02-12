"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Button from "@/components/Common/Button";
import { Briefcase, FileText, User, Sparkles, Loader2, AlertCircle, Download, ExternalLink, Upload } from "lucide-react";
import { fetchProfile, saveProfile, type ProfileData } from "@/lib/profileApi";
import { fetchSetupStatus, downloadResume, uploadResume, type SetupResume } from "@/lib/setupApi";

const ACCEPT_RESUME = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const inputClass =
  "w-full rounded-lg border border-dark_border bg-black/30 px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-primary";

const Profile: React.FC = () => {
  const [data, setData] = useState<ProfileData | null>(null);
  const [form, setForm] = useState<Partial<ProfileData>>({});
  const [setupResume, setSetupResume] = useState<SetupResume | null>(null);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [resumeUploading, setResumeUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const resumeFileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetchProfile();
        if (!cancelled) {
          setData(res);
          setForm({
            fullName: res.fullName,
            headline: res.headline,
            primaryLocation: res.primaryLocation,
            linkedInUrl: res.linkedInUrl,
            yearsExperience: res.yearsExperience,
            compensationCurrency: res.compensationCurrency,
            topSkills: res.topSkills,
            coverLetterTone: res.coverLetterTone,
          });
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load profile");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchSetupStatus().then((s) => {
      if (!cancelled && s.data?.resume) setSetupResume(s.data.resume);
    });
    return () => { cancelled = true; };
  }, []);

  const handleDownloadResume = async () => {
    if (!setupResume) return;
    setResumeLoading(true);
    try {
      const blob = await downloadResume();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = setupResume.fileName || "resume.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setResumeLoading(false);
    }
  };

  const handleChangeResume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    setResumeUploading(true);
    uploadResume(file, "Resume updated.")
      .then((res) => {
        setSetupResume({ fileName: res.fileName, uploadedAt: res.uploadedAt, url: res.url });
      })
      .finally(() => setResumeUploading(false));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await saveProfile(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading && !data) {
    return (
      <section className="pb-20 pt-10 md:pt-12 lg:pt-16 bg-darkmode min-h-[40vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </section>
    );
  }

  if (error && !data) {
    return (
      <section className="pb-20 pt-10 md:pt-12 lg:pt-16 bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 flex flex-col items-center gap-4">
            <AlertCircle className="h-10 w-10 text-red-400" />
            <p className="text-white">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  const profile = data ?? ({} as ProfileData);

  return (
    <section className="pb-20 pt-10 md:pt-12 lg:pt-16 bg-darkmode">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-2">
              Profile & preferences
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
              Tell CrypGo how to represent you
            </h1>
            <p className="mt-2 max-w-xl text-sm md:text-base text-muted">
              Your resume data and preferences for auto‑applications.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)]">
          <div className="space-y-4">
            <div className="rounded-2xl border border-dark_border bg-dark_grey/70 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary font-semibold">
                  {profile.initials || "JD"}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{form.fullName ?? profile.fullName}</p>
                  <p className="text-xs text-muted">{form.headline ?? profile.headline}</p>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-muted">
                <li className="flex items-center gap-2">
                  <Briefcase className="h-3.5 w-3.5 text-primary" />
                  Open to: Senior / Staff roles · Remote first
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-primary" />
                  Default resume: Full‑stack, TypeScript‑heavy
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  Highlight: shipping quickly with clean, pragmatic code
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-dark_border bg-gradient-to-br from-primary/10 via-dark_grey/80 to-dark_grey/60 p-5">
              <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                <User className="h-4 w-4 text-primary" />
                Matching preferences
              </h2>
              <ul className="space-y-2 text-xs text-muted">
                {(profile.matchingPreferences ?? []).map((pref, i) => (
                  <li key={i}>• {pref}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-dark_border bg-dark_grey/70 p-5">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                <FileText className="h-4 w-4 text-primary" />
                My resume
              </h2>
              {setupResume ? (
                <div className="space-y-3">
                  <input
                    ref={resumeFileInputRef}
                    type="file"
                    accept={ACCEPT_RESUME}
                    className="hidden"
                    onChange={handleChangeResume}
                  />
                  <p className="text-sm text-white break-all">{setupResume.fileName}</p>
                  <p className="text-xs text-muted">
                    Uploaded {setupResume.uploadedAt ? new Date(setupResume.uploadedAt).toLocaleDateString() : ""}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/resume">
                      <Button
                        type="button"
                        variant="secondary"
                        className="text-sm px-3 py-1.5 inline-flex items-center gap-1.5"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        View resume
                      </Button>
                    </Link>
                    <Button
                      type="button"
                      variant="secondary"
                      className="text-sm px-3 py-1.5 inline-flex items-center gap-1.5"
                      onClick={() => resumeFileInputRef.current?.click()}
                      disabled={resumeUploading}
                    >
                      {resumeUploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                      Change resume
                    </Button>
                    <Button
                      type="button"
                      className="text-sm px-3 py-1.5 inline-flex items-center gap-1.5"
                      onClick={handleDownloadResume}
                      disabled={resumeLoading}
                    >
                      {resumeLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
                      Download
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted mb-3">
                    No resume uploaded yet. Complete setup to upload your resume for job applications.
                  </p>
                  <Link href="/setup">
                    <Button variant="secondary" className="text-sm px-3 py-1.5">
                      Go to setup
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-dark_border bg-dark_grey/70 p-5">
              <h2 className="mb-3 text-sm font-semibold text-white">Basic information</h2>
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">Full name</label>
                  <input
                    value={form.fullName ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                    placeholder="Your full name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">Headline</label>
                  <input
                    value={form.headline ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, headline: e.target.value }))}
                    placeholder="Senior Full‑stack Engineer, 7+ years"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">Primary location</label>
                  <input
                    value={form.primaryLocation ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, primaryLocation: e.target.value }))}
                    placeholder="e.g. Berlin, Germany · CET"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">LinkedIn / portfolio URL</label>
                  <input
                    value={form.linkedInUrl ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, linkedInUrl: e.target.value }))}
                    placeholder="https://"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-dark_border bg-dark_grey/70 p-5">
              <h2 className="mb-3 text-sm font-semibold text-white">Experience focus</h2>
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">Years of experience</label>
                  <input
                    value={form.yearsExperience ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, yearsExperience: e.target.value }))}
                    placeholder="e.g. 7"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">Preferred compensation currency</label>
                  <input
                    value={form.compensationCurrency ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, compensationCurrency: e.target.value }))}
                    placeholder="USD, EUR, GBP..."
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className="mb-1.5 block text-xs font-medium text-muted">Top skills / stack</label>
                <textarea
                  value={form.topSkills ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, topSkills: e.target.value }))}
                  rows={3}
                  placeholder="React, TypeScript, Next.js, Node.js, PostgreSQL, AWS..."
                  className={inputClass + " resize-none"}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-dark_border bg-dark_grey/70 p-5">
              <h2 className="mb-3 text-sm font-semibold text-white">Default cover letter tone</h2>
              <textarea
                value={form.coverLetterTone ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, coverLetterTone: e.target.value }))}
                rows={4}
                placeholder="Short, confident, and specific about what you bring to the role."
                className={inputClass + " resize-none"}
              />
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <p className="text-[11px] text-muted">Saved via API when you integrate.</p>
                <Button
                  className="text-sm px-4 py-2"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : saved ? "Saved" : "Save preferences"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
