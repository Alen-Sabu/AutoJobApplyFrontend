export const ProjectOverview = () => {
  return (
    <div id="overview" className="md:scroll-m-[130px] scroll-m-28 pb-10">
      <h3 className="text-2xl font-semibold mt-8 text-white">Project Overview</h3>
      <div className="p-6 rounded-md border mt-6 border-dark_border border-opacity-60 space-y-4">
        <p className="text-base font-medium text-muted text-opacity-90">
          <strong className="text-white">CrypGo</strong> is an auto job-apply platform that helps users automate their job search across multiple job boards. Users complete a one-time profile and resume setup (KYC-style), then create automations to target roles, set daily limits, and attach jobs to campaigns. Admins can manage users, review jobs, control automations, and configure site settings.
        </p>
        <h6 className="text-white text-lg font-medium mt-4">Goals</h6>
        <ul className="list-disc text-muted text-opacity-90 ps-6 space-y-1">
          <li>Streamline job applications via rules-based automations</li>
          <li>Require profile and resume setup before applying or creating automations</li>
          <li>Provide a clear dashboard for stats, campaigns, and activity</li>
          <li>Offer admin tools for moderation, audit, and configuration</li>
        </ul>
        <h6 className="text-white text-lg font-medium mt-4">Audience</h6>
        <ul className="list-disc text-muted text-opacity-90 ps-6 space-y-1">
          <li><strong className="text-white">Job seekers</strong> — Sign up, complete setup, browse jobs, save favorites, apply once or attach to automations</li>
          <li><strong className="text-white">Admins</strong> — Login to admin panel, manage users (suspend/activate), review jobs (approve/reject), manage automations and playbooks, site settings, audit log</li>
        </ul>
      </div>
    </div>
  );
};
