export const ApiReference = () => {
  const modules = [
    { name: "api.ts", desc: "Auth: loginUser, refreshToken (backendApi)." },
    { name: "axios.ts", desc: "api, backendApi instances; get/post/put/patch/del; auth header from localStorage.access_token." },
    { name: "dashboardApi.ts", desc: "fetchDashboardStats, fetchDashboardCampaigns, fetchDashboardActivity, pauseCampaign, resumeCampaign." },
    { name: "profileApi.ts", desc: "fetchProfile, saveProfile; ProfileData type." },
    { name: "settingsApi.ts", desc: "fetchSettings, saveAccount, updateEmail, verifyEmail, changePassword, enable2FA, deleteAccount." },
    { name: "setupApi.ts", desc: "getSetupStatus, fetchSetupStatus, savePersonalDetails, uploadResume, completeSetup; localStorage-backed dummy." },
    { name: "jobsApi.ts", desc: "fetchJobs, fetchSavedJobs, attachJobToAutomation, applyOnce, saveJobToFavorites, unsaveJob." },
    { name: "automationsApi.ts", desc: "fetchAutomations, createAutomation, updateAutomation, pauseAutomation, resumeAutomation." },
    { name: "playbooksApi.ts", desc: "fetchPlaybooks, usePlaybook (returns redirectTo)." },
    { name: "adminApi.ts", desc: "Stats, activity, alerts; users (fetch, suspend, activate); jobs (fetch, approve, reject); automations (fetch, pause, resume); playbooks (fetch, create, update); settings (fetch, save); audit (fetch)." },
  ];
  return (
    <div id="api-reference" className="md:scroll-m-[130px] scroll-m-28 pb-10">
      <h3 className="text-2xl font-semibold mt-8 text-white">API Reference</h3>
      <div className="p-6 rounded-md border mt-6 border-dark_border border-opacity-60 space-y-4">
        <p className="text-base font-medium text-muted text-opacity-90">
          All API modules live in <code className="text-primary bg-black/30 px-1 rounded">src/lib/</code>. Each exposes endpoints constants and async functions; currently they use mock data and optional <code className="text-primary bg-black/30 px-1 rounded">delay()</code>. Replace with real <code className="text-primary bg-black/30 px-1 rounded">api.get(BASE + path)</code> / post/put/patch/del when backend is ready.
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
