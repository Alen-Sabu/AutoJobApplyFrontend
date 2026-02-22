export const ApiReference = () => {
  const modules = [
    { name: "api.ts", desc: "High-level auth helpers (loginUser, refreshToken) using backendApi." },
    { name: "axios.ts", desc: "api (same-origin) and backendApi (FastAPI base); shared interceptors; auth header from localStorage.access_token." },
    { name: "setupApi.ts", desc: "Onboarding: fetchSetupStatus, savePersonalDetails, uploadResume, completeSetup; backed by /setup/* endpoints." },
    { name: "jobsApi.ts", desc: "Job feed & saved roles: fetchJobs, fetchSavedJobs, saveJobToFavorites, unsaveJob, applyOnce, attachJobToAutomation, fetchJobsForAutomation, submitUserJob." },
    { name: "automationsApi.ts", desc: "Automations: fetchAutomations, fetchAutomation, createAutomation, pauseAutomation, resumeAutomation." },
    { name: "dashboardApi.ts", desc: "Dashboard widgets (currently mocked): stats, campaigns, activity, pause/resume campaign." },
    { name: "profileApi.ts", desc: "Profile view/edit (mock): fetchProfile, saveProfile; ProfileData type." },
    { name: "settingsApi.ts", desc: "Account & security (mock): settings, email/password update, 2FA, delete account." },
    { name: "playbooksApi.ts", desc: "Playbooks (mock): fetchPlaybooks, usePlaybook (returns redirectTo for automation templates)." },
    { name: "adminApi.ts", desc: "Admin panel (mock): stats, activity, users, jobs, automations, playbooks, settings, audit; ready to be wired to real admin endpoints." },
  ];
  return (
    <div id="api-reference" className="md:scroll-m-[130px] scroll-m-28 pb-10">
      <h3 className="text-2xl font-semibold mt-8 text-white">API Reference</h3>
      <div className="p-6 rounded-md border mt-6 border-dark_border border-opacity-60 space-y-4">
        <p className="text-base font-medium text-muted text-opacity-90">
          All API modules live in <code className="text-primary bg-black/30 px-1 rounded">src/lib/</code>. Each exposes endpoint constants and async functions. Core user flows
          (setup, jobs, automations) are already wired to the FastAPI backend via{" "}
          <code className="text-primary bg-black/30 px-1 rounded">backendApi</code>, while some dashboard/admin modules remain mocked and can be migrated later.
        </p>
        <div className="rounded-lg bg-black/30 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-dark_border">
                <th className="px-4 py-2 text-muted font-medium">Module</th>
                <th className="px-4 py-2 text-muted font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((m) => (
                <tr key={m.name} className="border-b border-dark_border/50">
                  <td className="px-4 py-2 text-primary font-mono">{m.name}</td>
                  <td className="px-4 py-2 text-muted">{m.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
