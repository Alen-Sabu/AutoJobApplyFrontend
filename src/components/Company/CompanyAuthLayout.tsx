"use client";

import Link from "next/link";
import Logo from "@/components/Layout/Header/Logo";

/**
 * Same two-panel layout as (auth) signin/signup: left branding (desktop), right form area.
 */
export default function CompanyAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-darkmode flex flex-col lg:flex-row">
      {/* Left panel: branding (desktop) */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[50%] flex-col justify-center p-10 xl:p-16 border-r border-dark_border bg-gradient-to-br from-dark_grey/80 to-darkmode">
        <Link
          href="/"
          className="inline-block max-w-[140px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded mb-10"
        >
          <Logo />
        </Link>
        <div>
          <h1 className="text-3xl xl:text-4xl font-semibold text-white mb-3">
            For Companies
          </h1>
          <p className="text-muted text-base max-w-md">
            Post jobs and manage applicants on CrypGo. Reach candidates who auto-apply to roles that match.
          </p>
        </div>
      </div>

      {/* Right panel: form area */}
      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
