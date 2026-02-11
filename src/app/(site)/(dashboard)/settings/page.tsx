import React from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Settings from "@/components/JobPlatform/Settings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | CrypGo",
};

const SettingsPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Settings"
        pageDescription="Manage your account and security preferences."
      />
      <Settings />
    </>
  );
};

export default SettingsPage;
