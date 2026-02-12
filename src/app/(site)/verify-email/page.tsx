"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Loader2, AlertCircle, MailCheck } from "lucide-react";
import { backendApi } from "@/lib/axios";

type Status = "idle" | "verifying" | "success" | "error";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage("Missing verification token.");
      return;
    }

    setStatus("verifying");
    setMessage("Verifying your email…");

    backendApi
      .get("/settings/email/verify/confirm", {
        params: { token },
      })
      .then(() => {
        setStatus("success");
        setMessage("Your email has been verified. Redirecting you to your dashboard…");
        // Small delay then redirect to dashboard
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
        setMessage("This verification link is invalid or has expired.");
      });
  }, [searchParams, router]);

  return (
    <section className="min-h-screen bg-darkmode flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-dark_border bg-dark_grey/80 p-6 shadow-xl">
        <div className="flex items-center justify-center mb-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <MailCheck className="h-3.5 w-3.5" />
            Email verification
          </span>
        </div>

        {status === "verifying" && (
          <div className="flex flex-col items-center text-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <h1 className="text-lg font-semibold text-white">Verifying your email…</h1>
            <p className="text-sm text-muted">{message}</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center text-center gap-3">
            <CheckCircle2 className="h-10 w-10 text-emerald-400" />
            <h1 className="text-lg font-semibold text-white">Email verified</h1>
            <p className="text-sm text-muted">{message}</p>
            <Link
              href="/dashboard"
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
            >
              Go to dashboard
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center text-center gap-3">
            <AlertCircle className="h-10 w-10 text-red-400" />
            <h1 className="text-lg font-semibold text-white">Verification problem</h1>
            <p className="text-sm text-muted">{message}</p>
            <p className="text-xs text-muted">
              You can request a new verification email from your{" "}
              <Link href="/settings" className="text-primary hover:underline">
                Settings
              </Link>{" "}
              page.
            </p>
            <div className="mt-2 flex gap-2">
              <Link
                href="/settings"
                className="inline-flex items-center justify-center rounded-lg border border-dark_border bg-black/30 px-4 py-2 text-sm font-medium text-muted hover:text-white hover:bg-black/40"
              >
                Back to settings
              </Link>
              <Link
                href="/signin"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
              >
                Sign in
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

