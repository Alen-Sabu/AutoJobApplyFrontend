import { Metadata } from "next";
import AdminSettings from "@/components/Admin/AdminSettings";

export const metadata: Metadata = {
  title: "Settings | Admin | CrypGo",
};

export default function AdminSettingsPage() {
  return <AdminSettings />;
}
