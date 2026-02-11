"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

const AUTH_PATHS = ["/signin", "/signup"];
const ADMIN_PATH = "/admin";

export default function ConditionalSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "";
  const isAuthPage = AUTH_PATHS.some((p) => pathname.startsWith(p));
  const isAdminPage = pathname.startsWith(ADMIN_PATH);

  if (isAuthPage || isAdminPage) {
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
