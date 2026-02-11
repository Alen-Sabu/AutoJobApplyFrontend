import { DataFlowDiagram } from "./DataFlowDiagram";

export const DfdSection = () => {
  return (
    <div id="dfd" className="md:scroll-m-[130px] scroll-m-28 pb-10">
      <h3 className="text-2xl font-semibold mt-8 text-white">Data Flow Diagram (DFD)</h3>
      <div className="p-6 rounded-md border mt-6 border-dark_border border-opacity-60 space-y-4">
        <p className="text-base font-medium text-muted text-opacity-90">
          The context diagram (Level 0) shows external entities, the central process (CrypGo System), and main data flows. <strong className="text-white">Users</strong> send login, profile, setup, job search, and automation data into the system; the system returns applications, status, and matches. <strong className="text-white">Admins</strong> interact for user/job/automation management and audit. <strong className="text-white">Job boards</strong> are external; the system may send applications and receive listings (integration point). Data stores D1–D3 represent user/profile/setup, jobs/automations, and audit log.
        </p>
        <DataFlowDiagram />
      </div>
    </div>
  );
};
