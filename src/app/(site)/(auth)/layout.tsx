import Link from "next/link";
import Logo from "@/components/Layout/Header/Logo";
import RedirectIfAuthed from "@/components/Auth/RedirectIfAuthed";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RedirectIfAuthed>
    <div className="min-h-screen bg-darkmode flex flex-col lg:flex-row">
      {/* Left panel: branding (desktop) */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[50%] flex-col justify-between p-10 xl:p-16 border-r border-dark_border bg-gradient-to-br from-dark_grey/80 to-darkmode">
        <Link href="/" className="inline-block max-w-[140px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
          <Logo />
        </Link>
        <div>
          <h1 className="text-3xl xl:text-4xl font-semibold text-white mb-3">
            Welcome to CrypGo
          </h1>
          <p className="text-muted text-base max-w-md">
            Manage your dashboard, automations, and job applications in one place.
          </p>
        </div>
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} CrypGo. All rights reserved.
        </p>
      </div>

      {/* Right panel: form area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile: back + logo */}
        <header className="lg:hidden flex items-center justify-between px-4 py-4 border-b border-dark_border bg-dark_grey/30">
          <Link
            href="/"
            className="text-sm text-muted hover:text-primary transition-colors"
          >
            ← Back to home
          </Link>
          <Link href="/" className="max-w-[120px]">
            <Logo />
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
    </RedirectIfAuthed>
  );
}
