import React from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import JobPlaybooks from "@/components/JobPlaybooks/JobPlaybooks";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playbooks | CrypGo",
};

const PlaybooksPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Playbooks"
        pageDescription="Examples of focused automations you can set up with CrypGo."
      />
      <JobPlaybooks />
    </>
  );
};

export default PlaybooksPage;
