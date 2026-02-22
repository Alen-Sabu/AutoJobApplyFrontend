"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Users, Loader2, AlertCircle, Mail, User, FileText, X } from "lucide-react";
import { fetchCompanyJob, fetchJobApplicants, fetchApplicantResumeBlob, type CompanyJob, type ApplicantSummary } from "@/lib/companyApi";
import { format } from "date-fns";
import ResumePreview from "@/components/Common/ResumePreview";

export default function CompanyJobApplicants({ jobId }: { jobId: string }) {
  const id = parseInt(jobId, 10);
  const [job, setJob] = useState<CompanyJob | null>(null);
  const [applicants, setApplicants] = useState<ApplicantSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewingResume, setViewingResume] = useState<{
    applicantId: number;
    userName: string;
    blobUrl: string;
    fileName: string;
  } | null>(null);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const viewingBlobUrlRef = useRef<string | null>(null);

  // Revoke blob URL when closing viewer or unmounting
  useEffect(() => {
    return () => {
      if (viewingBlobUrlRef.current) {
        URL.revokeObjectURL(viewingBlobUrlRef.current);
        viewingBlobUrlRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (Number.isNaN(id)) {
      setError("Invalid job");
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const [jobRes, applicantsRes] = await Promise.all([
          fetchCompanyJob(id),
          fetchJobApplicants(id),
        ]);
        setJob(jobRes);
        setApplicants(applicantsRes);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load applicants");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading && !job) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 flex flex-col items-center gap-4">
        <AlertCircle className="h-10 w-10 text-red-400" />
        <p className="text-white">{error}</p>
        <Link href="/company/jobs" className="text-primary hover:underline">Back to jobs</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/company/jobs"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-white transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to jobs
      </Link>
      <div>
        <h1 className="text-2xl font-semibold text-white">
          Applicants {job ? `· ${job.title}` : ""}
        </h1>
        <p className="text-sm text-muted mt-1">
          Users who have applied to this job
        </p>
      </div>

      {applicants.length === 0 ? (
        <div className="rounded-xl border border-dark_border bg-dark_grey/60 p-10 text-center">
          <Users className="h-12 w-12 text-muted mx-auto mb-4" />
          <p className="text-white font-medium">No applicants yet</p>
          <p className="text-sm text-muted mt-1">Applications will appear here when users apply to this job.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-dark_border overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-dark_border bg-dark_grey/60">
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Applicant</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Email</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Status</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted">Applied</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted w-20 text-center">Resume</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((a) => (
                <tr key={a.id} className="border-b border-dark_border last:border-0 hover:bg-black/20">
                  <td className="px-4 py-3">
                    <span className="font-medium text-white flex items-center gap-2">
                      <User className="h-4 w-4 text-muted" />
                      {a.user_name || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${a.user_email}`} className="text-primary hover:underline flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {a.user_email}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-primary/20 text-primary">
                      {a.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted text-sm">
                    {a.applied_at ? format(new Date(a.applied_at), "PPp") : format(new Date(a.created_at), "PPp")}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {a.has_resume ? (
                      <button
                        type="button"
                        onClick={async () => {
                          setResumeLoading(true);
                          setResumeError(null);
                          try {
                            const { blob, fileName } = await fetchApplicantResumeBlob(id, a.id);
                            const isPdf = fileName.toLowerCase().endsWith(".pdf");
                            const blobForUrl =
                              isPdf && blob.type !== "application/pdf"
                                ? new Blob([await blob.arrayBuffer()], { type: "application/pdf" })
                                : blob;
                            const url = URL.createObjectURL(blobForUrl);
                            if (viewingBlobUrlRef.current) URL.revokeObjectURL(viewingBlobUrlRef.current);
                            viewingBlobUrlRef.current = url;
                            setViewingResume({
                              applicantId: a.id,
                              userName: a.user_name || "Applicant",
                              blobUrl: url,
                              fileName,
                            });
                          } catch (e) {
                            setResumeError(e instanceof Error ? e.message : "Failed to load resume");
                          } finally {
                            setResumeLoading(false);
                          }
                        }}
                        disabled={resumeLoading}
                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-primary hover:bg-primary/20 transition-colors disabled:opacity-50"
                        title="View resume"
                      >
                        {resumeLoading ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <FileText className="h-5 w-5" />
                        )}
                      </button>
                    ) : (
                      <span className="inline-flex items-center justify-center w-9 h-9 text-muted/50" title="No resume">
                        <FileText className="h-5 w-5" />
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Resume viewer modal (same as user resume page) */}
      {viewingResume && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={() => {
            if (viewingBlobUrlRef.current) {
              URL.revokeObjectURL(viewingBlobUrlRef.current);
              viewingBlobUrlRef.current = null;
            }
            setViewingResume(null);
          }}
        >
          <div
            className="bg-dark_grey border border-dark_border rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-dark_border shrink-0">
              <h3 className="text-lg font-semibold text-white">
                Resume · {viewingResume.userName}
              </h3>
              <button
                type="button"
                onClick={() => {
                  if (viewingBlobUrlRef.current) {
                    URL.revokeObjectURL(viewingBlobUrlRef.current);
                    viewingBlobUrlRef.current = null;
                  }
                  setViewingResume(null);
                }}
                className="p-2 rounded-lg text-muted hover:text-white hover:bg-black/20 transition"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 overflow-auto flex-1 min-h-0">
              <ResumePreview
                blobUrl={viewingResume.blobUrl}
                fileName={viewingResume.fileName}
                title={viewingResume.userName}
                minHeight="60vh"
                showHeader={true}
              />
            </div>
          </div>
        </div>
      )}

      {resumeError && (
        <div
          className="fixed bottom-4 right-4 z-50 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 flex items-center gap-2 text-red-200 text-sm"
          role="alert"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          {resumeError}
          <button
            type="button"
            onClick={() => setResumeError(null)}
            className="ml-2 text-red-300 hover:text-white"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
