import { Metadata } from "next";
import CompanyJobCreate from "@/components/Company/CompanyJobCreate";

export const metadata: Metadata = {
  title: "Add job | Company | CrypGo",
  description: "Create a new job posting.",
};

export default function CompanyJobNewPage() {
  return <CompanyJobCreate />;
}
