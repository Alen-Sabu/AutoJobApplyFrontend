import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import AdminSettings from "@/components/Admin/AdminSettings";

export const metadata: Metadata = {
  title: "Settings | Admin | CrypGo",
};

export default function AdminSettingsPage() {
  return (
    <>
      <Breadcrumb
        pageName="Settings"
        pageDescription="Site-wide configuration: maintenance, registration, and limits."
      />
      <AdminSettings />
    </>
  );
}
