import { Metadata } from "next";
import AdminAutomations from "@/components/Admin/AdminAutomations";

export const metadata: Metadata = {
  title: "Automations | Admin | CrypGo",
};

export default function AdminAutomationsPage() {
  return <AdminAutomations />;
}
