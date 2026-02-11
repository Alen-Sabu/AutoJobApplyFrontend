"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SocialSignUp from "../SocialSignUp";
import { useState } from "react";
import Loader from "@/components/Common/Loader";
import { api } from "@/lib/axios";

const inputClass =
  "w-full rounded-lg border border-dark_border bg-black/20 px-4 py-3 text-sm text-white placeholder:text-muted outline-none transition focus:border-primary focus:ring-1 focus:ring-primary";

const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const finalData = Object.fromEntries(data.entries());

    try {
      await api.post("/api/register", finalData);
      toast.success("Account created. Please sign in.");
      router.push("/signin");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ??
        (err as Error).message ??
        "Registration failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <SocialSignUp />

      <div className="relative my-6">
        <span className="absolute inset-0 flex items-center" aria-hidden>
          <span className="w-full border-t border-dark_border/60" />
        </span>
        <span className="relative flex justify-center text-xs font-medium uppercase tracking-wider text-muted">
          Or continue with email
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="signup-name" className="sr-only">
            Full name
          </label>
          <input
            id="signup-name"
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Full name"
            className={inputClass}
            required
          />
        </div>
        <div>
          <label htmlFor="signup-email" className="sr-only">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email address"
            className={inputClass}
            required
          />
        </div>
        <div>
          <label htmlFor="signup-password" className="sr-only">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="Password (min. 8 characters)"
            className={inputClass}
            required
            minLength={8}
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

      <p className="text-center text-xs text-muted">
        By signing up you agree to our{" "}
        <a href="/#" className="text-primary hover:underline">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="/#" className="text-primary hover:underline">
          Terms
        </a>
        .
      </p>

      <p className="text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/signin" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
