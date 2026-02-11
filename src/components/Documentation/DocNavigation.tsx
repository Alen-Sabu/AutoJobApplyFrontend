"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const DOC_HASHES = [
  "overview",
  "system-design",
  "dfd",
  "architecture",
  "features",
  "user-flows",
  "api-reference",
  "tech-stack",
  "version",
  "structure",
  "start",
  "configuration",
];

const DocsNav = [
  { id: 0, navItem: "Project Overview", hash: "overview" },
  { id: 1, navItem: "System Design", hash: "system-design" },
  { id: 2, navItem: "Data Flow Diagram (DFD)", hash: "dfd" },
  { id: 3, navItem: "Architecture", hash: "architecture" },
  { id: 4, navItem: "Features", hash: "features" },
  { id: 5, navItem: "User Flows", hash: "user-flows" },
  { id: 6, navItem: "API Reference", hash: "api-reference" },
  { id: 7, navItem: "Tech Stack", hash: "tech-stack" },
  { id: 8, navItem: "Package Versions", hash: "version" },
  { id: 9, navItem: "Package Structure", hash: "structure" },
  { id: 10, navItem: "Quick Start", hash: "start" },
  { id: 11, navItem: "Project Configuration", hash: "configuration" },
];

export const DocNavigation = () => {
  const [navItem, setNavItem] = useState("overview");

  useEffect(() => {
    const updateActive = () => {
      const offset = 120;
      let active = DOC_HASHES[0];
      for (const hash of DOC_HASHES) {
        const el = document.getElementById(hash);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= offset + 50) active = hash;
      }
      setNavItem(active);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, []);

  return (
    <nav className="sticky top-24 flex flex-col gap-0.5 mt-4 items-start w-full max-h-[calc(100vh-7rem)] overflow-y-auto">
      {DocsNav.map((item) => (
        <Link
          key={item.id}
          href={`#${item.hash}`}
          onClick={() => setNavItem(item.hash)}
          className={`py-2.5 hover:bg-primary/20 hover:text-primary dark:hover:text-primary w-full xl:min-w-[14rem] lg:min-w-[13rem] px-4 rounded-md text-base font-medium transition-colors ${
            item.hash === navItem ? "bg-primary text-darkmode" : "text-muted text-opacity-60"
          }`}
        >
          {item.navItem}
        </Link>
      ))}
    </nav>
  );
};
