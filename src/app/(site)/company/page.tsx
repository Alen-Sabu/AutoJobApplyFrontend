import { Metadata } from "next";
import CompanyDashboard from "@/components/Company/CompanyDashboard";

export const metadata: Metadata = {
  title: "Company Dashboard | CrypGo",
  description: "Manage your jobs and view applicants.",
};

export default function CompanyDashboardPage() {
  return <CompanyDashboard />;
}
