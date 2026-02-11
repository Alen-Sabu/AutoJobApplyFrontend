export const FeaturesList = () => {
  return (
    <div id="features" className="md:scroll-m-[130px] scroll-m-28 pb-10">
      <h3 className="text-2xl font-semibold mt-8 text-white">Features</h3>
      <div className="p-6 rounded-md border mt-6 border-dark_border border-opacity-60 space-y-6">
        <div>
          <h6 className="text-primary font-medium mb-2">User (job seeker)</h6>
          <ul className="list-disc text-muted text-opacity-90 ps-6 space-y-1">
            <li>Sign in / Sign up (full-page auth)</li>
            <li>Dashboard — stats, campaigns, activity, pause/resume campaigns</li>
            <li>Profile — edit profile data (headline, location, skills, preferences)</li>
            <li>Setup (KYC) — personal details + resume upload; required before apply/automations</li>
            <li>Settings — account, email, password, 2FA, delete account</li>
            <li>Jobs — search, filters, save to favorites, apply once, attach to automation</li>
            <li>Automations — list, create, pause/resume, edit link</li>
            <li>Playbooks — list, use playbook (redirect to automations with template)</li>
          </ul>
        </div>
        <div>
          <h6 className="text-amber-400 font-medium mb-2">Admin</h6>
          <ul className="list-disc text-muted text-opacity-90 ps-6 space-y-1">
            <li>Admin login — sets crypgo_authed + crypgo_admin, redirect to /admin</li>
            <li>Dashboard — stats, activity, alerts, quick actions</li>
            <li>Users — list, search, filter (all/active/suspended), suspend/activate</li>
            <li>Jobs — list, filter, approve/reject</li>
            <li>Automations — list, pause/resume</li>
            <li>Playbooks — list, add, edit</li>
            <li>Settings — site-wide (maintenance, registration, email verification, limits, site name, support email)</li>
            <li>Audit log — list, search, filter by action</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
