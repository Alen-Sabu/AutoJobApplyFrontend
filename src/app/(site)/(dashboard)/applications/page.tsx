import React from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import ApplicationsList from "@/components/JobPlatform/ApplicationsList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Applications | CrypGo",
};

const ApplicationsPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Applications"
        pageDescription="Track the jobs you applied to, with full details and current status."
      />
      <ApplicationsList />
    </>
  );
};

export default ApplicationsPage;
