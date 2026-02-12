"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return !!(
    localStorage.getItem("crypgo_authed") || localStorage.getItem("access_token")
  );
}

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const authed = isAuthed();
    if (!authed) {
      router.replace("/signin");
      setAllowed(false);
    } else {
      setAllowed(true);
    }
  }, [router, pathname]);

  if (allowed === null) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-darkmode">
        <div className="animate-pulse text-muted">Loading...</div>
      </div>
    );
  }

  if (!allowed) {
    return null;
  }

  return <>{children}</>;
}
