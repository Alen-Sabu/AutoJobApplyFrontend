"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AdminGuard from "@/components/Auth/AdminGuard";
import { adminNavData } from "@/components/Layout/Header/Navigation/adminNavData";
import Logo from "@/components/Layout/Header/Logo";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Zap,
  BookOpen,
  Settings,
  FileText,
  LogOut,
  Menu,
  X,
  Shield,
} from "lucide-react";

const navIcons: Record<string, React.ReactNode> = {
  Dashboard: <LayoutDashboard className="h-4 w-4" />,
  Users: <Users className="h-4 w-4" />,
  Jobs: <Briefcase className="h-4 w-4" />,
  Automations: <Zap className="h-4 w-4" />,
  Playbooks: <BookOpen className="h-4 w-4" />,
  Settings: <Settings className="h-4 w-4" />,
  "Audit log": <FileText className="h-4 w-4" />,
};

function handleAdminSignOut() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("crypgo_admin");
    localStorage.removeItem("crypgo_authed");
    localStorage.removeItem("access_token");
    window.location.href = "/";
  }
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navLinks = (
    <>
      {adminNavData.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/admin" && pathname.startsWith(item.href));
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
    <AdminGuard>
      <div className="min-h-screen bg-darkmode flex">
        <aside className="hidden lg:flex flex-col w-56 border-r border-dark_border bg-dark_grey/30 shrink-0 fixed left-0 top-0 h-full z-30 pt-20">
          <div className="p-4 border-b border-dark_border">
            <Link href="/admin" className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-semibold text-white">Admin</span>
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
              onClick={handleAdminSignOut}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:text-white hover:bg-black/20 w-full transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Exit admin
            </button>
          </div>
        </aside>

        <div className="lg:hidden fixed top-0 left-0 right-0 h-14 border-b border-dark_border bg-dark_grey/80 z-20 flex items-center justify-between px-4">
          <Link href="/admin" className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-semibold text-white">Admin</span>
          </Link>
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="p-2 text-white hover:text-primary"
            aria-label="Toggle menu"
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileNavOpen && (
          <>
            <div
              className="lg:hidden fixed inset-0 bg-black/50 z-30 pt-14"
              onClick={() => setMobileNavOpen(false)}
              aria-hidden
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
                    handleAdminSignOut();
                    setMobileNavOpen(false);
                  }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted hover:text-white w-full"
                >
                  <LogOut className="h-4 w-4" />
                  Exit admin
                </button>
              </nav>
            </div>
          </>
        )}

        <main className="flex-1 lg:pl-56 min-h-screen pt-14 lg:pt-0">
          <header className="sticky top-0 z-10 border-b border-dark_border bg-darkmode/95 backdrop-blur px-4 py-3 lg:px-8">
            <div className="flex items-center justify-between">
              <Link href="/" className="max-w-[100px] hidden lg:block">
                <Logo />
              </Link>
              <p className="text-xs text-muted lg:absolute lg:right-8">
                Admin panel
              </p>
            </div>
          </header>
          <div className="p-4 lg:p-8">{children}</div>
        </main>
      </div>
    </AdminGuard>
  );
}
