import { Metadata } from "next";
import AdminDashboard from "@/components/Admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard | CrypGo",
};

export default function AdminDashboardPage() {
  return <AdminDashboard />;
}
