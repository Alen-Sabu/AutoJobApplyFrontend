"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Signin from "@/components/Auth/SignIn";
import CompanyAuthLayout from "@/components/Company/CompanyAuthLayout";

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

export default function CompanySigninPage() {
  const router = useRouter();

  useEffect(() => {
    if (isCompanyAuthed()) {
      router.replace("/company");
    }
  }, [router]);

  return (
    <CompanyAuthLayout>
      <div className="w-full max-w-[420px] mx-auto">
        <div className="rounded-2xl border border-dark_border bg-dark_grey/90 backdrop-blur-sm shadow-xl shadow-black/20 p-6 sm:p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-2">
              Sign in
            </h1>
            <p className="text-sm text-muted">
              Manage your jobs and applicants
            </p>
          </div>
          <Signin />
          <p className="text-center text-sm text-muted mt-6">
            Don&apos;t have a company account?{" "}
            <Link href="/company/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </CompanyAuthLayout>
  );
}
