import React from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import JobList from "@/components/JobPlatform/JobList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs | CrypGo",
};

const JobsPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Jobs"
        pageDescription="Search curated roles and attach them to your automations."
      />
      <JobList />
    </>
  );
};

export default JobsPage;
