"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //   const authed = localStorage.getItem("crypgo_authed");
  //   if (!authed) {
  //     router.replace("/signin");
  //   } else {
  //     setAllowed(true);
  //   }
  // }, [router]);

  // if (!allowed) {
  //   return (
  //     <div className="min-h-[60vh] flex items-center justify-center bg-darkmode">
  //       <div className="animate-pulse text-muted">Loading...</div>
  //     </div>
  //   );
  // }

  return <>{children}</>;
}
