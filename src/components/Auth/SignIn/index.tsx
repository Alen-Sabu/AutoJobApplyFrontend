"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SocialSignIn from "../SocialSignIn";
import Loader from "@/components/Common/Loader";

const inputClass =
  "w-full rounded-lg border border-dark_border bg-black/20 px-4 py-3 text-sm text-white placeholder:text-muted outline-none transition focus:border-primary focus:ring-1 focus:ring-primary";

const Signin = ({ onSuccess }: { onSuccess?: () => void }) => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    checkboxToggle: false,
  });
  const [loading, setLoading] = useState(false);

  const loginUser = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    router.push("/dashboard");
    return;
  };

  return (
    <div className="space-y-6">
      <SocialSignIn />

      <div className="relative my-6">
        <span className="absolute inset-0 flex items-center" aria-hidden>
          <span className="w-full border-t border-dark_border/60" />
        </span>
        <span className="relative flex justify-center text-xs font-medium uppercase tracking-wider text-muted">
          Or continue with email
        </span>
      </div>

      <form onSubmit={loginUser} className="space-y-4">
        <div>
          <label htmlFor="signin-email" className="sr-only">
            Email
          </label>
          <input
            id="signin-email"
            type="email"
            autoComplete="email"
            placeholder="Email address"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
            className={inputClass}
            required
          />
        </div>
        <div>
          <label htmlFor="signin-password" className="sr-only">
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            className={inputClass}
            required
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <Link
            href="/forgot-password"
            className="text-muted hover:text-primary transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary bg-primary px-4 py-3 text-sm font-semibold text-darkmode transition hover:bg-transparent hover:text-primary disabled:opacity-70"
        >
          {loading ? <Loader /> : null}
          Sign in
        </button>
      </form>

      <p className="text-center text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Signin;
