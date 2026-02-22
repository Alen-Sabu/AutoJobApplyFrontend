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
          <h6 className="text-white font-medium mb-2">Backend (FastAPI + PostgreSQL)</h6>
          <ul className="list-disc text-muted text-opacity-90 ps-6 space-y-1">
            <li>
              <code className="text-primary bg-black/30 px-1 rounded">AutoJobApplyBackend/app/main.py</code>{" "}
              exposes the FastAPI app under <code className="text-primary bg-black/30 px-1 rounded">/api/v1</code>.
            </li>
            <li>
              <code className="text-primary bg-black/30 px-1 rounded">app/api/v1/</code> — routers for{" "}
              auth, profiles, setup, settings, jobs, user-jobs, automations, admin.
            </li>
            <li>
              <code className="text-primary bg-black/30 px-1 rounded">app/models/</code> — SQLAlchemy models
              (User, Profile, Job, UserJob, UserSetup, Automation).
            </li>
            <li>
              <code className="text-primary bg-black/30 px-1 rounded">app/services/</code> — business logic
              (AuthService, JobService, UserJobService, UserSetupService, AutomationService, AdzunaService).
            </li>
            <li>
              <code className="text-primary bg-black/30 px-1 rounded">app/core/</code> — config, DB engine,
              Alembic metadata, settings loaded from <code className="text-primary bg-black/30 px-1 rounded">app/.env</code>.
            </li>
            <li>
              Database: PostgreSQL with migrations in{" "}
              <code className="text-primary bg-black/30 px-1 rounded">app/alembic</code> (run{" "}
              <code className="text-primary bg-black/30 px-1 rounded">alembic upgrade head</code>).
            </li>
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
            <li><strong className="text-white">axios.ts</strong> — <code className="text-primary bg-black/30 px-1 rounded">api</code> (same-origin) and <code className="text-primary bg-black/30 px-1 rounded">backendApi</code> (FastAPI base). Attaches <code className="text-primary bg-black/30 px-1 rounded">Authorization: Bearer access_token</code> from <code className="text-primary bg-black/30 px-1 rounded">localStorage</code>.</li>
            <li><strong className="text-white">jobsApi</strong> — Integrates with backend <code className="text-primary bg-black/30 px-1 rounded">/jobs</code> and <code className="text-primary bg-black/30 px-1 rounded">/user-jobs</code> for catalog, saved jobs, apply once, attach to automation.</li>
            <li><strong className="text-white">automationsApi</strong> — Integrates with backend <code className="text-primary bg-black/30 px-1 rounded">/automations</code> for listing, creating, pausing/resuming automations and fetching a single automation.</li>
            <li><strong className="text-white">setupApi</strong> — Uses backend <code className="text-primary bg-black/30 px-1 rounded">/setup/status</code>, <code className="text-primary bg-black/30 px-1 rounded">/setup/personal</code>, <code className="text-primary bg-black/30 px-1 rounded">/setup/resume</code>, and <code className="text-primary bg-black/30 px-1 rounded">/setup/complete</code> for onboarding.</li>
            <li><strong className="text-white">dashboardApi, profileApi, settingsApi, playbooksApi, adminApi</strong> — Frontend-only mock/stub modules which can be wired to real backend endpoints similarly.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
