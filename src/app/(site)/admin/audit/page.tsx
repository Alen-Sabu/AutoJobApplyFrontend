import { Metadata } from "next";
import AdminAuditLog from "@/components/Admin/AdminAuditLog";

export const metadata: Metadata = {
  title: "Audit log | Admin | CrypGo",
};

export default function AdminAuditPage() {
  return <AdminAuditLog />;
}
