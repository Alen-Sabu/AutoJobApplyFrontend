import { Configuration } from "./Configuration";
import { DocNavigation } from "./DocNavigation";
import { Introduction } from "./Introduction";
import { PackageStructure } from "./PackageStructure";
import { QuickStart } from "./QuickStart";
import { ProjectOverview } from "./ProjectOverview";
import { SystemDesign } from "./SystemDesign";
import { DfdSection } from "./DfdSection";
import { Architecture } from "./Architecture";
import { FeaturesList } from "./FeaturesList";
import { UserFlows } from "./UserFlows";
import { ApiReference } from "./ApiReference";
import { TechStack } from "./TechStack";

export const Documentation = () => {
  return (
    <div className="bg-darkmode md:pt-0 pt-12 min-h-screen">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md p-6 lg:pt-44 pt-16 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">CrypGo Documentation</h1>
          <p className="text-muted mt-1">Project overview, system design, DFD, architecture, features, and API reference.</p>
        </div>
        <div className="grid grid-cols-12 gap-6 items-start">
          <aside className="lg:col-span-3 col-span-12 lg:block hidden shrink-0">
            <DocNavigation />
          </aside>
          <div className="lg:col-span-9 col-span-12 min-w-0">
            <ProjectOverview />
            <SystemDesign />
            <DfdSection />
            <Architecture />
            <FeaturesList />
            <UserFlows />
            <ApiReference />
            <TechStack />
            <Introduction />
            <PackageStructure />
            <QuickStart />
            <Configuration />
          </div>
        </div>
      </div>
    </div>
  );
};