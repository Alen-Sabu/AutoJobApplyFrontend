import { Metadata } from "next";
import CompanyJobApplicants from "@/components/Company/CompanyJobApplicants";

export const metadata: Metadata = {
  title: "Applicants | Company | CrypGo",
  description: "View applicants for this job.",
};

export default function CompanyJobApplicantsPage({
  params,
}: {
  params: { id: string };
}) {
  return <CompanyJobApplicants jobId={params.id} />;
}
