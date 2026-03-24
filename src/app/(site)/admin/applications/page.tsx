import { Metadata } from "next";
import AdminApplications from "@/components/Admin/AdminApplications";

export const metadata: Metadata = {
  title: "Applications | Admin | CrypGo",
};

export default function AdminApplicationsPage() {
  return <AdminApplications />;
}
