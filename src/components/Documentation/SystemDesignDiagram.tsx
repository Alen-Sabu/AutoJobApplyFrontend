"use client";

/**
 * High-level system design diagram: Client → Next.js → API layer → Backend / External.
 * Styled with Tailwind for dark theme.
 */
export const SystemDesignDiagram = () => {
  return (
    <div className="my-6 overflow-x-auto">
      <div className="min-w-[640px] p-6 rounded-xl border border-dark_border bg-black/20">
        <div className="flex flex-col gap-6 items-center">
          {/* Row 1: User + Admin */}
          <div className="flex justify-center gap-12">
            <div className="rounded-xl border-2 border-primary/50 bg-primary/10 px-6 py-3 text-center min-w-[120px]">
              <p className="text-xs font-medium text-muted uppercase tracking-wider">External</p>
              <p className="text-sm font-semibold text-white mt-1">User</p>
            </div>
            <div className="rounded-xl border-2 border-amber-500/50 bg-amber-500/10 px-6 py-3 text-center min-w-[120px]">
              <p className="text-xs font-medium text-muted uppercase tracking-wider">External</p>
              <p className="text-sm font-semibold text-white mt-1">Admin</p>
            </div>
          </div>
          <p className="text-muted text-xs">▼ HTTPS / Browser</p>
          {/* Row 2: Next.js App */}
          <div className="rounded-xl border-2 border-sky-500/50 bg-sky-500/10 px-8 py-4 text-center w-full max-w-md">
            <p className="text-xs font-medium text-muted uppercase tracking-wider">Frontend</p>
            <p className="text-sm font-semibold text-white mt-1">Next.js 14 App (React)</p>
            <p className="text-xs text-muted mt-1">Routes, Auth guards, UI components</p>
          </div>
          <p className="text-muted text-xs">▼ API calls (Axios)</p>
          {/* Row 3: API layer + Backend */}
          <div className="flex flex-wrap justify-center gap-6">
            <div className="rounded-xl border-2 border-emerald-500/50 bg-emerald-500/10 px-6 py-4 text-center min-w-[160px]">
              <p className="text-xs font-medium text-muted uppercase tracking-wider">API layer</p>
              <p className="text-sm font-semibold text-white mt-1">dashboardApi, jobsApi, setupApi, adminApi, …</p>
            </div>
            <div className="rounded-xl border-2 border-violet-500/50 bg-violet-500/10 px-6 py-4 text-center min-w-[140px]">
              <p className="text-xs font-medium text-muted uppercase tracking-wider">Backend</p>
              <p className="text-sm font-semibold text-white mt-1">REST API (plug-in)</p>
              <p className="text-xs text-muted mt-1">NEXT_PUBLIC_API_URL</p>
            </div>
          </div>
          <p className="text-muted text-xs">▼</p>
          {/* Row 4: Data + External */}
          <div className="flex flex-wrap justify-center gap-6">
            <div className="rounded-xl border border-dark_border bg-dark_grey/60 px-5 py-3 text-center">
              <p className="text-xs font-medium text-muted uppercase">Data store</p>
              <p className="text-sm text-white mt-1">DB / localStorage (dummy)</p>
            </div>
            <div className="rounded-xl border border-dark_border bg-dark_grey/60 px-5 py-3 text-center">
              <p className="text-xs font-medium text-muted uppercase">External</p>
              <p className="text-sm text-white mt-1">Job boards (LinkedIn, Indeed, …)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
