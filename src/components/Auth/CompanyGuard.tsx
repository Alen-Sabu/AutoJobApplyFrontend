"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function isCompanyAuthed(): boolean {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem("access_token");
  if (!token) return false;
  try {
    const raw = localStorage.getItem("crypgo_user");
    if (!raw) return false;
    const user = JSON.parse(raw);
    return user?.role === "company";
  } catch {
    return false;
  }
}

export default function CompanyGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.replace("/company/signin");
      setAllowed(false);
      return;
    }
    if (!isCompanyAuthed()) {
      router.replace("/company/signin");
      setAllowed(false);
      return;
    }
    setAllowed(true);
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
