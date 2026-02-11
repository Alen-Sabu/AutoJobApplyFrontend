"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  FileText,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Upload,
  Loader2,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import Button from "@/components/Common/Button";
import {
  fetchSetupStatus,
  savePersonalDetails,
  uploadResume,
  completeSetup,
  type SetupData,
  type SetupPersonalDetails,
} from "@/lib/setupApi";

const STEPS = [
  { id: 1, label: "Personal details", icon: User },
  { id: 2, label: "Resume", icon: FileText },
  { id: 3, label: "Review & finish", icon: CheckCircle2 },
];

const defaultPersonal: SetupPersonalDetails = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  linkedInUrl: "",
  yearsExperience: "",
  topSkills: "",
};

export default function SetupFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<{ complete: boolean; data: SetupData | null } | null>(null);
  const [personal, setPersonal] = useState<SetupPersonalDetails>(defaultPersonal);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [uploadedResumeName, setUploadedResumeName] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSetupStatus().then((s) => {
      setStatus(s);
      if (s.complete) {
        router.replace("/dashboard");
        return;
      }
      if (s.data) {
        setPersonal(s.data.personal);
        if (s.data.resume) {
          setResumeUploaded(true);
          setUploadedResumeName(s.data.resume.fileName);
        }
      }
    });
  }, [router]);

  const handleSavePersonal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await savePersonalDetails(personal);
      setStep(2);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleResumeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setResumeUploaded(false);
    }
  };

  const handleUploadResume = async () => {
    if (!resumeFile) return;
    setSaving(true);
    setError(null);
    try {
      const res = await uploadResume(resumeFile);
      setUploadedResumeName(res.fileName);
      setResumeUploaded(true);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setSaving(false);
    }
  };

  const handleComplete = async () => {
    if (!resumeUploaded) {
      setError("Please upload your resume before completing setup.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await completeSetup();
      router.replace("/dashboard");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not complete setup");
    } finally {
      setSaving(false);
    }
  };

  if (status === null) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (status.complete) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted mb-2">
          <ShieldCheck className="h-4 w-4 text-primary" />
          One-time setup required
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-white">
          Complete your profile to apply to jobs
        </h1>
        <p className="mt-2 text-sm text-muted">
          Add your resume and key details. You’ll need this before applying to jobs or creating automations.
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const active = step === s.id;
          const done = step > s.id;
          return (
            <React.Fragment key={s.id}>
              <button
                type="button"
                onClick={() => setStep(s.id)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active ? "bg-primary/20 text-primary border border-primary/40" : "text-muted hover:text-white"
                }`}
              >
                <span className={`flex h-8 w-8 items-center justify-center rounded-full ${active ? "bg-primary/30" : done ? "bg-emerald-500/20" : "bg-black/30"}`}>
                  {done ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Icon className="h-4 w-4" />}
                </span>
                {s.label}
              </button>
              {i < STEPS.length - 1 && <ChevronRight className="h-4 w-4 text-dark_border" />}
            </React.Fragment>
          );
        })}
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 flex items-center gap-2 text-sm text-red-200">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Step 1: Personal details */}
      {step === 1 && (
        <form onSubmit={handleSavePersonal} className="rounded-2xl border border-dark_border bg-dark_grey/60 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-4">Personal details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-muted mb-1.5">Full name *</label>
              <input
                type="text"
                value={personal.fullName}
                onChange={(e) => setPersonal((p) => ({ ...p, fullName: e.target.value }))}
                required
                placeholder="Jane Doe"
                className="w-full rounded-lg border border-dark_border bg-black/20 px-4 py-2.5 text-sm text-white placeholder:text-muted focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">Email *</label>
              <input
                type="email"
                value={personal.email}
                onChange={(e) => setPersonal((p) => ({ ...p, email: e.target.value }))}
                required
                placeholder="jane@example.com"
                className="w-full rounded-lg border border-dark_border bg-black/20 px-4 py-2.5 text-sm text-white placeholder:text-muted focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">Phone</label>
              <input
                type="tel"
                value={personal.phone}
                onChange={(e) => setPersonal((p) => ({ ...p, phone: e.target.value }))}
                placeholder="+1 234 567 8900"
                className="w-full rounded-lg border border-dark_border bg-black/20 px-4 py-2.5 text-sm text-white placeholder:text-muted focus:border-primary outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-muted mb-1.5">Location / timezone</label>
              <input
                type="text"
                value={personal.location}
                onChange={(e) => setPersonal((p) => ({ ...p, location: e.target.value }))}
                placeholder="Berlin, Germany · CET"
                className="w-full rounded-lg border border-dark_border bg-black/20 px-4 py-2.5 text-sm text-white placeholder:text-muted focus:border-primary outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-muted mb-1.5">LinkedIn profile URL</label>
              <input
                type="url"
                value={personal.linkedInUrl}
                onChange={(e) => setPersonal((p) => ({ ...p, linkedInUrl: e.target.value }))}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full rounded-lg border border-dark_border bg-black/20 px-4 py-2.5 text-sm text-white placeholder:text-muted focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">Years of experience</label>
              <input
                type="text"
                value={personal.yearsExperience}
                onChange={(e) => setPersonal((p) => ({ ...p, yearsExperience: e.target.value }))}
                placeholder="5"
                className="w-full rounded-lg border border-dark_border bg-black/20 px-4 py-2.5 text-sm text-white placeholder:text-muted focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">Top skills (comma-separated)</label>
              <input
                type="text"
                value={personal.topSkills}
                onChange={(e) => setPersonal((p) => ({ ...p, topSkills: e.target.value }))}
                placeholder="React, TypeScript, Node.js"
                className="w-full rounded-lg border border-dark_border bg-black/20 px-4 py-2.5 text-sm text-white placeholder:text-muted focus:border-primary outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Continue to resume"}
            </Button>
          </div>
        </form>
      )}

      {/* Step 2: Resume */}
      {step === 2 && (
        <div className="rounded-2xl border border-dark_border bg-dark_grey/60 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Upload your resume</h2>
          <p className="text-sm text-muted mb-4">
            We use your resume to tailor applications. PDF or DOCX, max 5MB (dummy: any file accepted).
          </p>
          <div className="rounded-xl border border-dashed border-dark_border bg-black/20 p-8 text-center">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeSelect}
              className="hidden"
              id="resume-upload"
            />
            <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center gap-2">
              <Upload className="h-10 w-10 text-muted" />
              <span className="text-sm text-muted">
                {resumeFile ? resumeFile.name : "Choose file (PDF or DOCX)"}
              </span>
            </label>
            {resumeFile && !resumeUploaded && (
              <Button
                className="mt-4"
                onClick={handleUploadResume}
                disabled={saving}
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Upload"}
              </Button>
            )}
            {resumeUploaded && (
              <p className="mt-4 text-sm text-emerald-300 flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Resume uploaded
              </p>
            )}
          </div>
          <div className="flex justify-between pt-6">
            <Button variant="secondary" onClick={() => setStep(1)}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <Button onClick={() => setStep(3)} disabled={!resumeUploaded}>
              Review & finish
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div className="rounded-2xl border border-dark_border bg-dark_grey/60 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-white">Review & finish</h2>
          <div className="rounded-xl border border-dark_border bg-black/20 p-4 space-y-3">
            <p className="text-xs font-medium text-muted uppercase tracking-wider">Personal</p>
            <p className="text-white font-medium">{personal.fullName}</p>
            <p className="text-sm text-muted">{personal.email}</p>
            {personal.phone && <p className="text-sm text-muted">{personal.phone}</p>}
            {personal.location && <p className="text-sm text-muted">{personal.location}</p>}
            {personal.linkedInUrl && (
              <a href={personal.linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                LinkedIn
              </a>
            )}
            {personal.yearsExperience && <p className="text-sm text-muted">Experience: {personal.yearsExperience} years</p>}
            {personal.topSkills && <p className="text-sm text-muted">Skills: {personal.topSkills}</p>}
          </div>
          <div className="rounded-xl border border-dark_border bg-black/20 p-4">
            <p className="text-xs font-medium text-muted uppercase tracking-wider">Resume</p>
            <p className="text-sm text-white">{uploadedResumeName || status?.data?.resume?.fileName || "Uploaded"}</p>
          </div>
          <div className="flex justify-between pt-2">
            <Button variant="secondary" onClick={() => setStep(2)}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <Button onClick={handleComplete} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Complete setup"}
            </Button>
          </div>
        </div>
      )}

      <p className="mt-6 text-center text-xs text-muted">
        Already have an account? <Link href="/dashboard" className="text-primary hover:underline">Go to dashboard</Link>
      </p>
    </div>
  );
}
