export const SystemArchitectureDiagram = () => {
  return (
    <div id="system-architecture-diagram" className="my-10">
      <h3 className="text-2xl font-semibold text-white mb-4">System Architecture (Frontend + Backend)</h3>
      <div className="flex flex-col items-center bg-dark_grey rounded-lg p-6 border border-dark_border border-opacity-60">
        {/* Diagram grid */}
        <div className="relative w-full max-w-3xl min-h-[420px] flex flex-col items-center">
          {/* Frontend */}
          <div className="absolute left-1/2 -translate-x-1/2 top-4 w-72 z-10">
            <div className="bg-blue-900/80 border-2 border-blue-400 rounded-lg shadow-lg p-4 text-center">
              <div className="text-lg font-bold text-white">Frontend</div>
              <div className="text-blue-200 text-sm mt-1">Next.js (React, Tailwind CSS)</div>
              <div className="text-xs text-blue-300 mt-1">Runs on Vercel/Node.js</div>
            </div>
          </div>
          {/* Arrow: Frontend → Backend */}
          <svg className="absolute left-1/2 -translate-x-1/2 top-28 z-0" width="2" height="60" viewBox="0 0 2 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1" y1="0" x2="1" y2="55" stroke="#60a5fa" strokeWidth="2" />
            <polygon points="0,55 2,55 1,60" fill="#60a5fa" />
          </svg>
          {/* Backend */}
          <div className="absolute left-1/2 -translate-x-1/2 top-40 w-80 z-10">
            <div className="bg-purple-900/80 border-2 border-purple-400 rounded-lg shadow-lg p-4 text-center">
              <div className="text-lg font-bold text-white">Backend</div>
              <div className="text-purple-200 text-sm mt-1">FastAPI (Python)</div>
              <div className="text-xs text-purple-300 mt-1">Auth, Jobs, Automations, Admin, Company APIs</div>
            </div>
          </div>
          {/* Arrow: Backend → Database */}
          <svg className="absolute left-1/2 -translate-x-1/2 top-[290px] z-0" width="2" height="60" viewBox="0 0 2 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1" y1="0" x2="1" y2="55" stroke="#a78bfa" strokeWidth="2" />
            <polygon points="0,55 2,55 1,60" fill="#a78bfa" />
          </svg>
          {/* Database */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[340px] w-64 z-10">
            <div className="bg-green-900/80 border-2 border-green-400 rounded-lg shadow-lg p-4 text-center">
              <div className="text-lg font-bold text-white">Database</div>
              <div className="text-green-200 text-sm mt-1">PostgreSQL</div>
              <div className="text-xs text-green-300 mt-1">Persistent storage</div>
            </div>
          </div>
          {/* Integrations (right) */}
          <div className="absolute right-0 top-40 w-56 z-10">
            <div className="bg-yellow-900/80 border-2 border-yellow-400 rounded-lg shadow-lg p-4 text-center">
              <div className="text-lg font-bold text-white">Integrations</div>
              <div className="text-yellow-200 text-sm mt-1">SMTP, Adzuna API, etc.</div>
              <div className="text-xs text-yellow-300 mt-1">External services</div>
            </div>
          </div>
          {/* Arrow: Backend → Integrations */}
          <svg className="absolute top-[170px] left-1/2 z-0" style={{transform: 'translateX(80px)'}} width="80" height="2" viewBox="0 0 80 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="1" x2="75" y2="1" stroke="#facc15" strokeWidth="2" />
            <polygon points="75,0 80,1 75,2" fill="#facc15" />
          </svg>
        </div>
        <p className="text-muted text-center mt-6 text-sm">
          <em>Diagram: Complete system architecture showing frontend, backend, database, and integrations. Arrows indicate data flow.</em>
        </p>
      </div>
    </div>
  );
};