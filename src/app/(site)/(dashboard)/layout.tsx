"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AuthGuard from "@/components/Auth/AuthGuard";
import { dashboardNavData } from "@/components/Layout/Header/Navigation/dashboardNavData";
import {
  LayoutDashboard,
  User,
  Settings,
  Briefcase,
  Zap,
  BookOpen,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";

const navIcons: Record<string, React.ReactNode> = {
  Dashboard: <LayoutDashboard className="h-4 w-4" />,
  Profile: <User className="h-4 w-4" />,
  Setup: <ShieldCheck className="h-4 w-4" />,
  Settings: <Settings className="h-4 w-4" />,
  Jobs: <Briefcase className="h-4 w-4" />,
  Automations: <Zap className="h-4 w-4" />,
  Playbooks: <BookOpen className="h-4 w-4" />,
};

function handleSignOut() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("crypgo_authed");
    window.location.href = "/";
  }
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navLinks = (
    <>
      {dashboardNavData.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(item.href));
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
    <AuthGuard>
      <div className="min-h-screen bg-darkmode flex">
        {/* Sidebar - desktop */}
        <aside className="hidden lg:flex flex-col w-56 border-r border-dark_border bg-dark_grey/30 shrink-0 fixed left-0 top-0 h-full z-30 pt-24">
          <nav className="p-4 space-y-1">
            {navLinks}
          </nav>
          <div className="mt-auto p-4 border-t border-dark_border">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:text-white hover:bg-black/20 w-full transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </aside>

        {/* Mobile top bar with menu */}
        <div className="lg:hidden fixed top-0 left-0 right-0 h-14 border-b border-dark_border bg-dark_grey/80 z-20 flex items-center justify-between px-4">
          <Link href="/dashboard" className="text-sm font-medium text-primary">
            CrypGo
          </Link>
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="p-2 text-white hover:text-primary"
            aria-label="Toggle menu"
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile nav drawer */}
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
                <button
                  onClick={() => {
                    handleSignOut();
                    setMobileNavOpen(false);
                  }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:text-white hover:bg-black/20 w-full transition-colors mt-4"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </nav>
            </div>
          </>
        )}

        {/* Main content */}
        <main className="flex-1 lg:pl-56 min-h-screen pt-14 lg:pt-0">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
