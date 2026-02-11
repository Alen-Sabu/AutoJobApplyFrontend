import { Documentation } from "@/components/Documentation/Documentation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation | CrypGo",
  description: "CrypGo docs: project overview, system design, DFD, architecture, features, user flows, API reference, and tech stack.",
};

export default function DocumentationPage() {
  return <Documentation />;
}
