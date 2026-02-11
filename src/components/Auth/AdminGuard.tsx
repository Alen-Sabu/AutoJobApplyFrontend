"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isAdmin = localStorage.getItem("crypgo_admin") === "1";
    if (!isAdmin) {
      router.replace("/admin/login");
      return;
    }
    setAllowed(true);
  }, [router]);

  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-darkmode">
        <div className="animate-pulse text-muted">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}
