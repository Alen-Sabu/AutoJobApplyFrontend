export const Architecture = () => {
  return (
    <div id="architecture" className="md:scroll-m-[130px] scroll-m-28 pb-10">
      <h3 className="text-2xl font-semibold mt-8 text-white">Architecture</h3>
      <div className="p-6 rounded-md border mt-6 border-dark_border border-opacity-60 space-y-6">
        <div>
          <h6 className="text-white font-medium mb-2">App structure (Next.js App Router)</h6>
          <ul className="list-disc text-muted text-opacity-90 ps-6 space-y-1">
            <li><code className="text-primary bg-black/30 px-1 rounded">app/(site)/</code> — Main site: (auth) signin/signup, (dashboard) dashboard, profile, setup, settings, jobs, automations, playbooks; admin/* for admin panel; documentation for docs.</li>
            <li><code className="text-primary bg-black/30 px-1 rounded">app/api/</code> — API routes and context (e.g. Toast).</li>
            <li>Layouts: dashboard layout (sidebar + AuthGuard), auth layout (split screen), admin layout (AdminGuard, skip on /admin/login).</li>
          </ul>
        </div>
        <div>
          <h6 className="text-white font-medium mb-2">Auth &amp; guards</h6>
          <ul className="list-disc text-muted text-opacity-90 ps-6 space-y-1">
            <li><strong className="text-white">AuthGuard</strong> — Wraps dashboard routes; can enforce login (e.g. localStorage <code className="text-primary bg-black/30 px-1 rounded">crypgo_authed</code>).</li>
            <li><strong className="text-white">AdminGuard</strong> — Ensures <code className="text-primary bg-black/30 px-1 rounded">crypgo_admin === &quot;1&quot;</code>; redirects to /admin/login otherwise.</li>
            <li>ConditionalSiteLayout hides main header/footer on signin, signup, and admin paths.</li>
          </ul>
        </div>
        <div>
          <h6 className="text-white font-medium mb-2">API modules (src/lib)</h6>
          <ul className="list-disc text-muted text-opacity-90 ps-6 space-y-1">
            <li><strong className="text-white">axios.ts</strong> — api (same-origin), backendApi (external), auth header from localStorage.</li>
            <li><strong className="text-white">dashboardApi, profileApi, settingsApi, jobsApi, automationsApi, playbooksApi, setupApi</strong> — User-facing: mock data + endpoints ready to swap.</li>
            <li><strong className="text-white">adminApi</strong> — Admin: stats, users, jobs, automations, playbooks, settings, audit; all mock with delay.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
