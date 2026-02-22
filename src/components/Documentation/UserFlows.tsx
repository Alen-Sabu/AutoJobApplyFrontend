export const UserFlows = () => {
  return (
    <div id="user-flows" className="md:scroll-m-[130px] scroll-m-28 pb-10">
      <h3 className="text-2xl font-semibold mt-8 text-white">User Flows</h3>
      <div className="p-6 rounded-md border mt-6 border-dark_border border-opacity-60 space-y-6">
        <div>
          <h6 className="text-white font-medium mb-2">New user: sign up → setup → apply</h6>
          <ol className="list-decimal text-muted text-opacity-90 ps-6 space-y-1">
            <li>Land on home → Sign in / Sign up</li>
            <li>Sign up (or sign in) → Redirect to dashboard</li>
            <li>Dashboard shows “Complete your profile setup” if not done → Go to Setup</li>
            <li>Setup: Step 1 Personal details → Step 2 Upload resume → Step 3 Review &amp; complete</li>
            <li>After setup complete, user can open Jobs, Apply once or Attach to automation; create Automations; use Playbooks</li>
          </ol>
        </div>

        <div>
          <h6 className="text-white font-medium mb-2">Applying to a job</h6>
          <ol className="list-decimal text-muted text-opacity-90 ps-6 space-y-1">
            <li>Jobs page → search/filter → click “Apply once” or “Attach to automation”</li>
            <li>If setup incomplete → redirect to /setup</li>
            <li>If complete → API call (applyOnce or attachJobToAutomation) and UI update</li>
          </ol>
        </div>

        <div>
          <h6 className="text-white font-medium mb-2">Admin: login → moderate</h6>
          <ol className="list-decimal text-muted text-opacity-90 ps-6 space-y-1">
            <li>Admin goes to /admin/login → enters credentials → sets crypgo_admin → redirect to /admin</li>
            <li>Dashboard shows stats, activity, alerts; links to Users, Jobs, Settings, Audit</li>
            <li>Users: suspend/activate. Jobs: approve/reject. Automations: pause/resume. Playbooks: add/edit. Settings: save. Audit: view/filter.</li>
          </ol>
        </div>

        <div>
          <h6 className="text-white font-medium mb-2">Company: register → setup → manage</h6>
          <ol className="list-decimal text-muted text-opacity-90 ps-6 space-y-1">
            <li>Company visits /company/signup or is invited → creates company account and primary admin</li>
            <li>Complete company profile: company name, website, logo, address, billing/subscription details</li>
            <li>Invite team members (recruiters, hiring managers) → assign roles (member, manager, admin)</li>
            <li>Post jobs under company account → configure job details, application settings, and screening questions</li>
            <li>Manage applicants: view, shortlist, message, or export. Use company dashboard for analytics and billing.</li>
            <li>If company setup incomplete when trying to post jobs or access company dashboard → redirect to /company/setup</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
