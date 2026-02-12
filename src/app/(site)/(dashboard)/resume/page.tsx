import React from "react";
import ResumeViewer from "@/components/JobPlatform/ResumeViewer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "View resume | CrypGo",
  description: "View your uploaded resume.",
};

export default function ResumePage() {
  return <ResumeViewer />;
}
