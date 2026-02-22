"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FileText, Loader2, AlertCircle, Download, ArrowLeft, Upload } from "lucide-react";
import { fetchSetupStatus, downloadResume, uploadResume } from "@/lib/setupApi";
import ResumePreview from "@/components/Common/ResumePreview";

const ACCEPT_RESUME = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export default function ResumeViewer() {
  const [resumeInfo, setResumeInfo] = useState<{ fileName: string; uploadedAt: string } | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    let url: string | null = null;

    (async () => {
      try {
        const status = await fetchSetupStatus();
        if (cancelled) return;
        if (!status.data?.resume) {
          setResumeInfo(null);
          setBlobUrl(null);
          setLoading(false);
          return;
        }
        setResumeInfo({
          fileName: status.data.resume.fileName,
          uploadedAt: status.data.resume.uploadedAt,
        });
        const blob = await downloadResume();
        if (cancelled) return;
        const lower = (status.data.resume.fileName || "").toLowerCase();
        const isPdfFile = lower.endsWith(".pdf");
        // Ensure PDF blob has correct type so the browser will render it in iframe/object
        const blobForUrl =
          isPdfFile && blob.type !== "application/pdf"
            ? new Blob([await blob.arrayBuffer()], { type: "application/pdf" })
            : blob;
        url = URL.createObjectURL(blobForUrl);
        setBlobUrl(url);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load resume");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, [refreshKey]);

  const handleDownload = () => {
    if (!resumeInfo || !blobUrl) return;
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = resumeInfo.fileName || "resume.pdf";
    a.click();
  };

  const handleChangeResume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    setUploading(true);
    uploadResume(file, "Resume updated.")
      .then(() => setRefreshKey((k) => k + 1))
      .finally(() => setUploading(false));
  };

  if (loading) {
    return (
      <section className="pb-20 pt-10 md:pt-12 lg:pt-16 bg-darkmode min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-sm">Loading resume…</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pb-20 pt-10 md:pt-12 lg:pt-16 bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 flex flex-col items-center gap-4">
            <AlertCircle className="h-10 w-10 text-red-400" />
            <p className="text-white">{error}</p>
            <Link href="/profile" className="text-primary hover:underline text-sm">
              Back to profile
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (!resumeInfo || !blobUrl) {
    return (
      <section className="pb-20 pt-10 md:pt-12 lg:pt-16 bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div className="rounded-2xl border border-dark_border bg-dark_grey/70 p-8 text-center max-w-md mx-auto">
            <FileText className="h-12 w-12 text-muted mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-white mb-2">No resume uploaded</h2>
            <p className="text-sm text-muted mb-6">
              Complete setup to upload your resume, then you can view it here.
            </p>
            <Link href="/setup">
              <button className="rounded-lg border border-primary bg-primary/10 text-primary px-4 py-2 text-sm font-medium hover:bg-primary/20">
                Go to setup
              </button>
            </Link>
            <p className="mt-4">
              <Link href="/profile" className="text-sm text-muted hover:text-primary inline-flex items-center gap-1">
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to profile
              </Link>
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-20 pt-10 md:pt-12 lg:pt-16 bg-darkmode min-h-screen mt-20">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-1">
              Resume
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold text-white">
              View your resume
            </h1>
            <p className="text-sm text-muted mt-1">
              {resumeInfo.fileName}
              {resumeInfo.uploadedAt && (
                <span className="ml-2">
                  · Uploaded {new Date(resumeInfo.uploadedAt).toLocaleDateString()}
                </span>
              )}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPT_RESUME}
              className="hidden"
              onChange={handleChangeResume}
            />
            <Link
              href="/profile"
              className="inline-flex items-center gap-2 rounded-lg border border-dark_border bg-black/20 px-4 py-2 text-sm text-muted hover:text-white hover:border-primary/50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to profile
            </Link>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 rounded-lg border border-dark_border bg-black/20 px-4 py-2 text-sm text-muted hover:text-white hover:border-primary/50 disabled:opacity-50"
            >
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              Change resume
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-lg border border-primary bg-primary/10 text-primary px-4 py-2 text-sm font-medium hover:bg-primary/20"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
          </div>
        </div>

        <ResumePreview
          blobUrl={blobUrl}
          fileName={resumeInfo.fileName}
          showHeader={false}
          minHeight="70vh"
        />
      </div>
    </section>
  );
}
