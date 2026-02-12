"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return !!(
    localStorage.getItem("crypgo_authed") || localStorage.getItem("access_token")
  );
}

/**
 * Wraps auth pages (signin/signup). If user is already logged in, redirect to dashboard
 * so signin/signup are not shown.
 */
export default function RedirectIfAuthed({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isAuthed()) {
      router.replace("/dashboard");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center bg-darkmode">
        <div className="animate-pulse text-muted">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}
