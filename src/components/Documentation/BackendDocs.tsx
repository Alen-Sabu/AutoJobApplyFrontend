export const BackendDocs = () => {
  return (
    <div id="backend" className="md:scroll-m-[130px] scroll-m-28 pb-10">
      <h3 className="text-2xl font-semibold mt-8 text-white">Backend Documentation</h3>

      <div className="p-6 rounded-md border mt-6 border-dark_border border-opacity-60 space-y-6">
        <section>
          <h6 className="text-white font-medium mb-2">Overview</h6>
          <p className="text-muted text-opacity-80">
            The backend is a FastAPI service (located in <code className="text-primary bg-black/30 px-1 rounded">AutoJobApplyBackend/</code>)
            providing authentication, job catalog, user setup, automations, company management, and admin APIs.
          </p>
        </section>

        <section>
          <h6 className="text-white font-medium mb-2">Frameworks & Libraries</h6>
          <ul className="list-disc ps-6 text-muted text-opacity-80">
            <li>FastAPI — web framework and OpenAPI generation</li>
            <li>Uvicorn — ASGI server</li>
            <li>SQLAlchemy / SQLModel — ORM and data models (project uses SQLAlchemy style models)</li>
            <li>Alembic — database migrations</li>
            <li>Pydantic — request/response validation (used via FastAPI)</li>
            <li>pytest — tests</li>
            <li>Other utilities: python-dotenv, passlib, jose (JWT), httpx/requests</li>
          </ul>
        </section>

        <section>
          <h6 className="text-white font-medium mb-2">Features</h6>
          <ul className="list-disc ps-6 text-muted text-opacity-80">
            <li>Role-based auth: user, admin, company (company features include team management and billing)</li>
            <li>Job CRUD and publishing flow (approve/reject for admin)</li>
            <li>User setup flow (profiles, resume uploads)</li>
            <li>Automation engine endpoints (attach jobs to automations, playbooks)</li>
            <li>Audit logging for admin review</li>
            <li>Company accounts, team invites, and company dashboard endpoints</li>
          </ul>
        </section>

        <section>
          <h6 className="text-white font-medium mb-2">Project layout</h6>
          <p className="text-muted text-opacity-80">
            Key backend folders: <code className="text-primary bg-black/30 px-1 rounded">app/</code> contains modules for
            models, schemas, services, API routes, core configuration and alembic migrations.
          </p>
        </section>

        <section>
          <h6 className="text-white font-medium mb-2">Setup & Run</h6>
          <ol className="list-decimal ps-6 text-muted text-opacity-80">
            <li>Create and activate virtualenv inside <code className="text-primary bg-black/30 px-1 rounded">AutoJobApplyBackend/</code></li>
            <li>Install deps: <code className="text-primary bg-black/30 px-1 rounded">pip install -r requirements.txt</code></li>
            <li>Copy <code className="text-primary bg-black/30 px-1 rounded">.env.example</code> to <code className="text-primary bg-black/30 px-1 rounded">app/.env</code> and set DATABASE_URL, SECRET_KEY, SMTP and any external keys</li>
            <li>Run migrations: <code className="text-primary bg-black/30 px-1 rounded">python -m alembic -c app/alembic.ini upgrade head</code></li>
            <li>Seed data (optional): run the seed script in <code className="text-primary bg-black/30 px-1 rounded">app/seed/run.py</code></li>
            <li>Start server: <code className="text-primary bg-black/30 px-1 rounded">uvicorn app.main:app --reload --host 0.0.0.0 --port 8000</code></li>
          </ol>
        </section>

        <section>
          <h6 className="text-white font-medium mb-2">API & Endpoints (high-level)</h6>
          <ul className="list-disc ps-6 text-muted text-opacity-80">
            <li><code className="text-primary bg-black/30 px-1 rounded">/api/v1/auth</code> — login, refresh, register</li>
            <li><code className="text-primary bg-black/30 px-1 rounded">/api/v1/users</code> — user profiles, setup</li>
            <li><code className="text-primary bg-black/30 px-1 rounded">/api/v1/jobs</code> — job list, apply, attach to automation</li>
            <li><code className="text-primary bg-black/30 px-1 rounded">/api/v1/companies</code> — company registration, invites, team management</li>
            <li><code className="text-primary bg-black/30 px-1 rounded">/api/v1/admin</code> — admin-only endpoints: users, jobs, settings, audit</li>
          </ul>
        </section>

        <section>
          <h6 className="text-white font-medium mb-2">Testing & CI</h6>
          <p className="text-muted text-opacity-80">Use pytest to run unit and integration tests. For CI, create a test database and run migrations before tests.</p>
        </section>

        <section>
          <h6 className="text-white font-medium mb-2">Developer tips</h6>
          <ul className="list-disc ps-6 text-muted text-opacity-80">
            <li>Keep secrets out of source; use environment variables or protected vaults for production.</li>
            <li>Run alembic autogenerate carefully and review migrations before applying in production.</li>
            <li>Use background task processing for heavy jobs (emails, external API polling) — Celery or RQ are options.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
