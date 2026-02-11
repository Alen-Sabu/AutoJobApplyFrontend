import { Metadata } from "next";
import AdminUsers from "@/components/Admin/AdminUsers";

export const metadata: Metadata = {
  title: "Users | Admin | CrypGo",
};

export default function AdminUsersPage() {
  return <AdminUsers />;
}
