"use client";

/**
 * Data Flow Diagram (DFD) Level 0: external entities, process, data flows.
 */
export const DataFlowDiagram = () => {
  return (
    <div className="my-6 overflow-x-auto">
      <div className="min-w-[700px] p-6 rounded-xl border border-dark_border bg-black/20">
        <p className="text-center text-xs text-muted mb-4 uppercase tracking-wider">DFD Level 0 — Context diagram</p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* External: User */}
          <div className="rounded-xl border-2 border-dashed border-primary/60 bg-primary/5 px-5 py-3 text-center">
            <p className="text-xs text-muted uppercase">Entity</p>
            <p className="text-sm font-semibold text-white">User</p>
          </div>

          <div className="flex flex-col gap-2 items-center flex-1 min-w-[200px]">
            <p className="text-[10px] text-muted">Login, profile, setup, jobs, automations</p>
            <div className="flex items-center gap-2 w-full">
              <span className="flex-1 border-t border-dashed border-primary/50" />
              <span className="text-primary text-lg">&rarr;</span>
              <span className="flex-1 border-t border-dashed border-primary/50" />
            </div>
          </div>

          {/* Central process: CrypGo System */}
          <div className="rounded-xl border-2 border-sky-500/60 bg-sky-500/15 px-8 py-5 text-center">
            <p className="text-xs text-muted uppercase">Process</p>
            <p className="text-base font-semibold text-white mt-1">CrypGo System</p>
            <p className="text-xs text-muted mt-1">(Web app + API)</p>
          </div>

          <div className="flex flex-col gap-2 items-center flex-1 min-w-[200px]">
            <p className="text-[10px] text-muted">Applications, status, matches</p>
            <div className="flex items-center gap-2 w-full">
              <span className="flex-1 border-t border-dashed border-emerald-500/50" />
              <span className="text-emerald-400 text-lg">&rarr;</span>
              <span className="flex-1 border-t border-dashed border-emerald-500/50" />
            </div>
          </div>

          {/* External: Job boards */}
          <div className="rounded-xl border-2 border-dashed border-amber-500/60 bg-amber-500/5 px-5 py-3 text-center">
            <p className="text-xs text-muted uppercase">Entity</p>
            <p className="text-sm font-semibold text-white">Job boards</p>
            <p className="text-[10px] text-muted">LinkedIn, Indeed, etc.</p>
          </div>
        </div>

        {/* Second row: Admin */}
        <div className="mt-8 pt-6 border-t border-dark_border flex flex-wrap items-center justify-center gap-6">
          <div className="rounded-xl border-2 border-dashed border-amber-500/60 bg-amber-500/5 px-5 py-3 text-center">
            <p className="text-xs text-muted uppercase">Entity</p>
            <p className="text-sm font-semibold text-white">Admin</p>
          </div>
          <p className="text-muted text-sm">manage users, jobs, automations, settings, audit</p>
          <span className="text-amber-400 text-lg">↔</span>
          <div className="rounded-xl border border-dark_border bg-dark_grey/40 px-4 py-2 text-center">
            <p className="text-xs text-white font-medium">CrypGo System</p>
          </div>
        </div>

        {/* Data stores */}
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <div className="rounded-lg border border-dark_border bg-dark_grey/60 px-4 py-2 flex items-center gap-2">
            <span className="text-muted text-xs">D1</span>
            <span className="text-sm text-white">User / Profile / Setup data</span>
          </div>
          <div className="rounded-lg border border-dark_border bg-dark_grey/60 px-4 py-2 flex items-center gap-2">
            <span className="text-muted text-xs">D2</span>
            <span className="text-sm text-white">Jobs &amp; Automations</span>
          </div>
          <div className="rounded-lg border border-dark_border bg-dark_grey/60 px-4 py-2 flex items-center gap-2">
            <span className="text-muted text-xs">D3</span>
            <span className="text-sm text-white">Audit log</span>
          </div>
        </div>
      </div>
    </div>
  );
};
