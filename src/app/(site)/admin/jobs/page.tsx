import { Metadata } from "next";
import AdminJobs from "@/components/Admin/AdminJobs";

export const metadata: Metadata = {
  title: "Jobs | Admin | CrypGo",
};

export default function AdminJobsPage() {
  return <AdminJobs />;
}
