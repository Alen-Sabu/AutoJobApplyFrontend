"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

const AUTH_PATHS = ["/signin", "/signup"];
const COMPANY_AUTH_PATHS = ["/company/signin", "/company/signup"];
const ADMIN_PATH = "/admin";
/** Company area: no site navbar/footer (signin, signup, dashboard, jobs, etc.) */
const COMPANY_PATH = "/company";
/** User section: dashboard and app pages — show Header, no Footer after login */
const USER_SECTION_PATHS = ["/dashboard", "/profile", "/resume", "/settings", "/jobs", "/automations", "/playbooks", "/setup"];

export default function ConditionalSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "";
  const isAuthPage = AUTH_PATHS.some((p) => pathname.startsWith(p));
  const isCompanyAuthPage = COMPANY_AUTH_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
  const isCompanyPage = pathname.startsWith(COMPANY_PATH);
  const isAdminPage = pathname.startsWith(ADMIN_PATH);
  const isUserSection = USER_SECTION_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));

  if (isAuthPage || isCompanyPage || isAdminPage || isCompanyAuthPage) {
    return <>{children}</>;
  }

  if (isUserSection) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
