"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Loader } from "lucide-react";

// Demo: in production, validate against your backend
const DEMO_ADMIN_EMAIL = "admin@crypgo.com";
const DEMO_ADMIN_PASSWORD = "admin123";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Demo check – replace with real API call in production
    if (email === DEMO_ADMIN_EMAIL && password === DEMO_ADMIN_PASSWORD) {
      if (typeof window !== "undefined") {
        localStorage.setItem("crypgo_authed", "1");
        localStorage.setItem("crypgo_admin", "1");
      }
      router.push("/admin");
      return;
    }

    setError("Invalid admin credentials.");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-darkmode flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[400px] rounded-2xl border border-dark_border bg-dark_grey/90 backdrop-blur-sm shadow-xl p-6 sm:p-8">
        <div className="text-center mb-8">
          <div className="inline-flex rounded-full bg-primary/20 p-3 mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold text-white">Admin login</h1>
          <p className="text-sm text-muted mt-1">Sign in with your admin account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-500/20 border border-red-500/30 px-4 py-2.5 text-sm text-red-200">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="admin-email" className="sr-only">Email</label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Admin email"
              className="w-full rounded-lg border border-dark_border bg-black/20 px-4 py-3 text-sm text-white placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="sr-only">Password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-lg border border-dark_border bg-black/20 px-4 py-3 text-sm text-white placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-primary bg-primary py-3 text-sm font-semibold text-darkmode hover:bg-transparent hover:text-primary disabled:opacity-70 transition"
          >
            {loading ? <Loader className="h-4 w-4 animate-spin" /> : null}
            Sign in to admin
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted">
          Demo: {DEMO_ADMIN_EMAIL} / {DEMO_ADMIN_PASSWORD}
        </p>

        <Link
          href="/"
          className="mt-4 block text-center text-sm text-primary hover:underline"
        >
          ← Back to site
        </Link>
      </div>
    </div>
  );
}
