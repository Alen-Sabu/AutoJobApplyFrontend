import SignUp from "@/components/Auth/SignUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create account | CrypGo",
  description: "Set up your CrypGo account and get started in minutes.",
};

export default function SignupPage() {
  return (
    <div className="w-full max-w-[420px] mx-auto">
      <div className="rounded-2xl border border-dark_border bg-dark_grey/90 backdrop-blur-sm shadow-xl shadow-black/20 p-6 sm:p-8 md:p-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-2">
            Create account
          </h1>
          <p className="text-sm text-muted">
            Get started with CrypGo in a few steps
          </p>
        </div>
        <SignUp />
      </div>
    </div>
  );
}
