import { Metadata } from "next";
import CompanyJobsList from "@/components/Company/CompanyJobsList";

export const metadata: Metadata = {
  title: "My jobs | Company | CrypGo",
  description: "List and manage your job postings.",
};

export default function CompanyJobsPage() {
  return <CompanyJobsList />;
}
