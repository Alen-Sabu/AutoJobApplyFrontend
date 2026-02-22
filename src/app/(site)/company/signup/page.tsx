"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CompanyAuthLayout from "@/components/Company/CompanyAuthLayout";
import Loader from "@/components/Common/Loader";
import { registerCompany, type CompanyRegisterPayload } from "@/lib/authApi";

const inputClass =
  "w-full rounded-lg border border-dark_border bg-black/20 px-4 py-3 text-sm text-white placeholder:text-muted outline-none transition focus:border-primary focus:ring-1 focus:ring-primary";

function isCompanyAuthed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem("crypgo_user");
    if (!raw) return false;
    const user = JSON.parse(raw);
    return user?.role === "company" && !!localStorage.getItem("access_token");
  } catch {
    return false;
  }
}

export default function CompanySignupPage() {
  const router = useRouter();
  const [form, setForm] = useState<CompanyRegisterPayload>({
    email: "",
    password: "",
    full_name: "",
    company_name: "",
    description: "",
    website: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isCompanyAuthed()) {
      router.replace("/company");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await registerCompany({
        email: form.email,
        password: form.password,
        full_name: form.full_name || null,
        company_name: form.company_name,
        description: form.description || null,
        website: form.website || null,
      });
      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("crypgo_authed", "1");
        if (res.user) {
          localStorage.setItem("crypgo_user", JSON.stringify(res.user));
        }
      }
      router.push("/company");
    } catch {
      // Error toast from axios
    } finally {
      setLoading(false);
    }
  };

  return (
    <CompanyAuthLayout>
      <div className="w-full max-w-[420px] mx-auto">
        <div className="rounded-2xl border border-dark_border bg-dark_grey/90 backdrop-blur-sm shadow-xl shadow-black/20 p-6 sm:p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-2">
              Create account
            </h1>
            <p className="text-sm text-muted">
              Create your company account and start posting jobs
            </p>
          </div>

          <div className="relative my-6">
            <span className="absolute inset-0 flex items-center" aria-hidden>
              <span className="w-full border-t border-dark_border/60" />
            </span>
            <span className="relative flex justify-center text-xs font-medium uppercase tracking-wider text-muted">
              Continue with email
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="company_name" className="sr-only">
                Company name
              </label>
              <input
                id="company_name"
                type="text"
                value={form.company_name}
                onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                className={inputClass}
                placeholder="Company name"
                required
              />
            </div>
            <div>
              <label htmlFor="company-email" className="sr-only">
                Email
              </label>
              <input
                id="company-email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
                placeholder="Email address"
                required
              />
            </div>
            <div>
              <label htmlFor="company-password" className="sr-only">
                Password
              </label>
              <input
                id="company-password"
                type="password"
                autoComplete="new-password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={inputClass}
                placeholder="Password (min. 8 characters)"
                required
                minLength={8}
              />
            </div>
            <div>
              <label htmlFor="full_name" className="sr-only">
                Your name
              </label>
              <input
                id="full_name"
                type="text"
                autoComplete="name"
                value={form.full_name ?? ""}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                className={inputClass}
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="description" className="sr-only">
                Company description
              </label>
              <textarea
                id="description"
                rows={2}
                value={form.description ?? ""}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className={inputClass}
                placeholder="Company description (optional)"
              />
            </div>
            <div>
              <label htmlFor="website" className="sr-only">
                Website
              </label>
              <input
                id="website"
                type="url"
                value={form.website ?? ""}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                className={inputClass}
                placeholder="Website (optional)"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary bg-primary px-4 py-3 text-sm font-semibold text-darkmode transition hover:bg-transparent hover:text-primary disabled:opacity-70"
            >
              {loading ? <Loader /> : null}
              Create account
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            Already have an account?{" "}
            <Link href="/company/signin" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </CompanyAuthLayout>
  );
}
