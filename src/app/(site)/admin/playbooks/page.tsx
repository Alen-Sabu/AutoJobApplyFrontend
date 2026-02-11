import { Metadata } from "next";
import AdminPlaybooks from "@/components/Admin/AdminPlaybooks";

export const metadata: Metadata = {
  title: "Playbooks | Admin | CrypGo",
};

export default function AdminPlaybooksPage() {
  return <AdminPlaybooks />;
}
