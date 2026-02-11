import React from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Automations from "@/components/JobPlatform/Automations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automations | CrypGo",
};

const AutomationsPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Automations"
        pageDescription="Configure how CrypGo auto‑applies to roles on your behalf."
      />
      <Automations />
    </>
  );
};

export default AutomationsPage;
