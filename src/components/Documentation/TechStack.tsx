export const TechStack = () => {
  const stack = [
    { category: "Framework", items: "Next.js 14 (App Router), React 18" },
    { category: "Language", items: "TypeScript" },
    { category: "Styling", items: "Tailwind CSS" },
    { category: "HTTP", items: "Axios" },
    { category: "Auth (optional)", items: "NextAuth" },
    { category: "UI / Icons", items: "Lucide React, Framer Motion, React Slick" },
    { category: "Charts", items: "Recharts, Lightweight Charts" },
    { category: "Env", items: "NEXT_PUBLIC_API_URL for backend base URL" },
  ];
  return (
    <div id="tech-stack" className="md:scroll-m-[130px] scroll-m-28 pb-10">
      <h3 className="text-2xl font-semibold mt-8 text-white">Tech Stack</h3>
      <div className="p-6 rounded-md border mt-6 border-dark_border border-opacity-60">
        <ul className="space-y-3">
          {stack.map((s) => (
            <li key={s.category} className="flex flex-wrap gap-2">
              <span className="font-medium text-white min-w-[100px]">{s.category}:</span>
              <span className="text-muted text-opacity-90">{s.items}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
