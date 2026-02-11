import Signin from "@/components/Auth/SignIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in | CrypGo",
  description: "Access your CrypGo dashboard, jobs, and automations.",
};

export default function SigninPage() {
  return (
    <div className="w-full max-w-[420px] mx-auto">
      <div className="rounded-2xl border border-dark_border bg-dark_grey/90 backdrop-blur-sm shadow-xl shadow-black/20 p-6 sm:p-8 md:p-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-2">
            Sign in
          </h1>
          <p className="text-sm text-muted">
            Access your dashboard and automations
          </p>
        </div>
        <Signin />
      </div>
    </div>
  );
}
