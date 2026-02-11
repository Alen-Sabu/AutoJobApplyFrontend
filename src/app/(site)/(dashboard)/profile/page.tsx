import React from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Profile from "@/components/JobPlatform/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | CrypGo",
};

const ProfilePage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Profile"
        pageDescription="Manage how CrypGo represents you when applying."
      />
      <Profile />
    </>
  );
};

export default ProfilePage;
