import React from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Dashboard from "@/components/JobPlatform/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | CrypGo",
};

const DashboardPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Dashboard"
        pageDescription="Overview of your activity and active campaigns."
      />
      <Dashboard />
    </>
  );
};

export default DashboardPage;
