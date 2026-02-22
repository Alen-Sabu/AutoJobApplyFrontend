export const QuickStart = () => {
  return (
    <div className="pb-10 md:scroll-m-[180px] scroll-m-28" id="start">
      <h3 className=" text-white text-2xl font-semibold mt-8">Quick Start</h3>

      {/* 1. Requirements */}
      <div className="p-6 rounded-md border mt-6 border-dark_border border-opacity-60">
        <h6 className="text-white text-lg font-medium">1. Requirements</h6>
        <p className="text-base font-medium text-muted text-opacity-60">
          CrypGo consists of a Next.js frontend and a FastAPI backend.
          You need a recent Node.js and Python installation plus a PostgreSQL database.
        </p>
        <h6 className="mt-4 mb-2 text-white font-medium text-base">
          Recommended environment:
        </h6>
        <ul className="list-disc text-muted text-opacity-60 ps-6 space-y-1">
          <li>
            <span className="text-white font-medium">Node.js</span> 20+ and{" "}
            <span className="text-white font-medium">npm</span> 10+
            {" ("}
            <a href="https://nodejs.org/" className="text-primary">
              download
            </a>
            {")"}
          </li>
          <li>
            <span className="text-white font-medium">Python</span> 3.11+
          </li>
          <li>
            <span className="text-white font-medium">PostgreSQL</span> 14+ (local instance)
          </li>
        </ul>
      </div>

      {/* 2. Backend setup (FastAPI) */}
      <div className="p-6 rounded-md border mt-6 border-dark_border border-opacity-60 space-y-4">
        <h6 className="text-white text-lg font-medium">2. Backend setup (FastAPI)</h6>
        <p className="text-base font-medium text-muted text-opacity-60">
          The backend lives in <code className="text-primary bg-black/30 px-1 rounded">AutoJobApplyBackend/</code>.
          It exposes the job catalog, user jobs, setup, automations, and admin APIs.
        </p>
        <ol className="list-decimal text-muted text-opacity-80 ps-6 space-y-2 text-sm md:text-base">
          <li>
            Create and activate a virtual environment:
            <div className="mt-2 py-3 px-3 rounded-md bg-dark_grey font-mono text-xs md:text-sm text-gray-300 space-y-1">
              <p>
                <span className="text-yellow-500">cd</span> AutoJobApplyBackend
              </p>
              <p>py -3 -m venv .venv</p>
              <p>.\.venv\Scripts\Activate.ps1</p>
            </div>
          </li>
          <li>
            Install dependencies:
            <div className="mt-2 py-3 px-3 rounded-md bg-dark_grey font-mono text-xs md:text-sm text-gray-300 space-y-1">
              <p>pip install -r requirements.txt</p>
            </div>
          </li>
          <li>
            Configure environment:
            <div className="mt-2 py-3 px-3 rounded-md bg-dark_grey font-mono text-xs md:text-sm text-gray-300 space-y-1">
              <p>copy .env.example app\.env</p>
            </div>
            <p className="mt-2">
              Edit <code className="text-primary bg-black/30 px-1 rounded">app/.env</code> and set:
            </p>
            <ul className="list-disc ps-6 text-muted text-opacity-80 text-sm md:text-base space-y-1">
              <li>
                <code className="text-primary bg-black/30 px-1 rounded">DATABASE_URL</code>{" "}
                (e.g.{" "}
                <code className="text-primary bg-black/30 px-1 rounded">
                  postgresql://postgres:password@localhost:5432/autojobapply
                </code>
                )
              </li>
              <li>
                <code className="text-primary bg-black/30 px-1 rounded">SECRET_KEY</code> (strong random string)
              </li>
              <li>
                Optional: Adzuna keys (for external job fetching) and SMTP/env values as needed.
              </li>
            </ul>
          </li>
          <li>
            Run database migrations:
            <div className="mt-2 py-3 px-3 rounded-md bg-dark_grey font-mono text-xs md:text-sm text-gray-300 space-y-1">
              <p>
                .\.venv\Scripts\python.exe -m alembic -c app\alembic.ini upgrade head
              </p>
            </div>
          </li>
          <li>
            Start the backend server:
            <div className="mt-2 py-3 px-3 rounded-md bg-dark_grey font-mono text-xs md:text-sm text-gray-300 space-y-1">
              <p>.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000</p>
            </div>
            <p className="mt-2 text-muted text-opacity-80 text-sm md:text-base">
              The FastAPI backend will be available at{" "}
              <span className="text-white font-mono">http://localhost:8000</span>{" "}
              and its OpenAPI docs at{" "}
              <span className="text-white font-mono">/docs</span>.
            </p>
          </li>
        </ol>
      </div>

      {/* 3. Frontend setup (Next.js) */}
      <div className="p-6 rounded-md border mt-6 border-dark_border border-opacity-60 space-y-4">
        <h6 className="text-white text-lg font-medium">3. Frontend setup (Next.js)</h6>
        <p className="text-base font-medium text-muted text-opacity-60">
          The frontend lives in <code className="text-primary bg-black/30 px-1 rounded">Crypgo-1.0.0/</code>.
          It talks to the backend via{" "}
          <code className="text-primary bg-black/30 px-1 rounded">backendApi</code> and{" "}
          <code className="text-primary bg-black/30 px-1 rounded">NEXT_PUBLIC_API_URL</code>.
        </p>
        <ol className="list-decimal text-muted text-opacity-80 ps-6 space-y-2 text-sm md:text-base">
          <li>
            Install dependencies:
            <div className="mt-2 py-3 px-3 rounded-md bg-dark_grey font-mono text-xs md:text-sm text-gray-300 space-y-1">
              <p>
                <span className="text-yellow-500">cd</span> Crypgo-1.0.0
              </p>
              <p>npm install</p>
              <p className="text-gray-500">// or: yarn install</p>
            </div>
          </li>
          <li>
            Configure frontend environment:
            <div className="mt-2 py-3 px-3 rounded-md bg-dark_grey font-mono text-xs md:text-sm text-gray-300 space-y-1">
              <p>copy .env.example .env (if present) or create .env</p>
            </div>
            <p className="mt-2">
              Ensure at least:
            </p>
            <ul className="list-disc ps-6 text-muted text-opacity-80 text-sm md:text-base space-y-1">
              <li>
                <code className="text-primary bg-black/30 px-1 rounded">
                  NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
                </code>
              </li>
              <li>
                Optionally set <code className="text-primary bg-black/30 px-1 rounded">NEXT_PUBLIC_APP_URL</code> (used for same-origin links).
              </li>
            </ul>
          </li>
          <li>
            Start the frontend dev server:
            <div className="mt-2 py-3 px-3 rounded-md bg-dark_grey font-mono text-xs md:text-sm text-gray-300 space-y-1">
              <p>npm run dev</p>
              <p className="text-gray-500">// or: yarn dev</p>
            </div>
            <p className="mt-2 text-muted text-opacity-80 text-sm md:text-base">
              The app will be served at{" "}
              <span className="text-white font-mono">http://localhost:3000</span>.
            </p>
          </li>
        </ol>
      </div>

      {/* 4. Build / Deployment */}
      <div className="p-6 rounded-md border mt-6 border-dark_border border-opacity-60">
        <h6 className="text-white text-lg font-medium">
          4. Build / Deployment
        </h6>
        <p className="text-base font-medium text-muted text-opacity-60 mb-4">
          For production you typically deploy the backend and frontend separately.
        </p>

        <div className="py-4 px-3 rounded-md bg-dark_grey font-mono text-xs md:text-sm text-gray-300 space-y-1">
          <p className="text-gray-400">// Backend (FastAPI)</p>
          <p>uvicorn app.main:app --host 0.0.0.0 --port 8000</p>
          <p className="mt-3 text-gray-400">// Frontend (Next.js)</p>
          <p>npm run build</p>
          <p>npm run start</p>
        </div>
        <p className="text-base font-medium text-muted text-opacity-60 mt-6">
          Once both services are deployed (and{" "}
          <code className="text-primary bg-black/30 px-1 rounded">
            NEXT_PUBLIC_API_URL
          </code>{" "}
          points at the backend), CrypGo is ready for real users. 🥳
        </p>
      </div>
    </div>
  );
};
