"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import CompanyGuard from "@/components/Auth/CompanyGuard";
import { companyNavData } from "@/components/Layout/Header/Navigation/companyNavData";
import Logo from "@/components/Layout/Header/Logo";
import CompanyFooter from "@/components/Layout/CompanyFooter";
import { LayoutDashboard, Briefcase, LogOut, Menu, X, Building2 } from "lucide-react";

const navIcons: Record<string, React.ReactNode> = {
  Dashboard: <LayoutDashboard className="h-4 w-4" />,
  "My jobs": <Briefcase className="h-4 w-4" />,
};

function handleCompanySignOut() {
  if (typeof window !== "undefined") {
    try {
      const userRaw = localStorage.getItem("crypgo_user");
      if (userRaw && JSON.parse(userRaw)?.role === "company") {
        localStorage.removeItem("crypgo_user");
      }
    } catch {}
    localStorage.removeItem("crypgo_authed");
    localStorage.removeItem("access_token");
    window.location.href = "/";
  }
}

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const isSigninPage = pathname === "/company/signin";
  const isSignupPage = pathname === "/company/signup";

  if (isSigninPage || isSignupPage) {
    return <>{children}</>;
  }

  const navLinks = (
    <>
      {companyNavData.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/company" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileNavOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary/20 text-primary border border-primary/30"
                : "text-muted hover:text-white hover:bg-black/20"
            }`}
          >
            {navIcons[item.label] ?? null}
            {item.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <CompanyGuard>
      <div className="min-h-screen bg-darkmode flex flex-col">
        {/* Sidebar - desktop (matches dashboard) */}
        <aside className="hidden lg:flex flex-col w-56 border-r border-dark_border bg-dark_grey/30 shrink-0 fixed left-0 top-0 h-full z-30 pt-20">
          <div className="p-4 border-b border-dark_border">
            <Link href="/company" className="flex items-center gap-2">
              <Logo />
              <span className="font-semibold text-white">Company</span>
            </Link>
          </div>
          <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
            {navLinks}
          </nav>
          <div className="p-4 border-t border-dark_border space-y-1">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted hover:text-white hover:bg-black/20"
            >
              View site
            </Link>
            <button
              onClick={handleCompanySignOut}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:text-white hover:bg-black/20 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </aside>

        {/* Mobile top bar with menu (matches dashboard) */}
        <div className="lg:hidden fixed top-0 left-0 right-0 h-14 border-b border-dark_border bg-dark_grey/80 z-20 flex items-center justify-between px-4">
          <Link href="/company" className="flex items-center gap-2">
            <Logo />
            <span className="font-semibold text-white">Company</span>
          </Link>
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="p-2 text-white hover:text-primary"
            aria-label="Toggle menu"
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile nav drawer (matches dashboard) */}
        {mobileNavOpen && (
          <>
            <div
              className="lg:hidden fixed inset-0 bg-black/50 z-30 pt-14"
              onClick={() => setMobileNavOpen(false)}
              aria-hidden="true"
            />
            <div className="lg:hidden fixed top-14 left-0 right-0 bottom-0 z-40 bg-dark_grey border-r border-dark_border overflow-y-auto">
              <nav className="p-4 space-y-1">
                {navLinks}
                <Link
                  href="/"
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted hover:text-white"
                  onClick={() => setMobileNavOpen(false)}
                >
                  View site
                </Link>
                <button
                  onClick={() => {
                    handleCompanySignOut();
                    setMobileNavOpen(false);
                  }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:text-white hover:bg-black/20 w-full transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </nav>
            </div>
          </>
        )}

        {/* Main content (matches dashboard: same padding, header, footer) */}
        <main className="flex-1 lg:pl-56 min-h-screen pt-14 lg:pt-0 flex flex-col">
          <header className="sticky top-0 z-10 border-b border-dark_border bg-darkmode/95 backdrop-blur px-4 py-3 lg:px-8">
            <div className="flex items-center justify-between">
              <Link href="/" className="max-w-[100px] hidden lg:block">
                <Logo />
              </Link>
              <p className="text-xs text-muted lg:absolute lg:right-8">
                Company account
              </p>
            </div>
          </header>
          <div className="p-4 lg:p-8 flex-1">{children}</div>
          <CompanyFooter />
        </main>
      </div>
    </CompanyGuard>
  );
}
