import { SystemDesignDiagram } from "./SystemDesignDiagram";

export const SystemDesign = () => {
  return (
    <div id="system-design" className="md:scroll-m-[130px] scroll-m-28 pb-10">
      <h3 className="text-2xl font-semibold mt-8 text-white">System Design</h3>
      <div className="p-6 rounded-md border mt-6 border-dark_border border-opacity-60 space-y-4">
        <p className="text-base font-medium text-muted text-opacity-90">
          The system is built as a three-tier flow: <strong className="text-white">client (browser)</strong> talks to the <strong className="text-white">Next.js application</strong>, which uses an <strong className="text-white">API layer</strong> (Axios) to call a backend or mock data. The backend can be any REST API; job boards are external systems integrated later.
        </p>
        <ul className="list-disc text-muted text-opacity-90 ps-6 space-y-1">
          <li><strong className="text-white">Frontend:</strong> Next.js 14 (App Router), React, Tailwind. Handles routes, auth guards (AuthGuard, AdminGuard), and all UI.</li>
          <li><strong className="text-white">API layer:</strong> Centralized in <code className="text-primary bg-black/30 px-1 rounded">src/lib/</code> (axios.ts, dashboardApi, jobsApi, setupApi, adminApi, etc.).</li>
          <li><strong className="text-white">Backend:</strong> Configured via <code className="text-primary bg-black/30 px-1 rounded">NEXT_PUBLIC_API_URL</code>. Currently dummy/mock; replace with real endpoints when ready.</li>
          <li><strong className="text-white">Data:</strong> Dummy state and localStorage for setup/KYC; production would use backend DB.</li>
        </ul>
        <SystemDesignDiagram />
      </div>
    </div>
  );
};
