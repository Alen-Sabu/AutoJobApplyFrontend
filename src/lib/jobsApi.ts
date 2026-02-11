/**
 * Jobs API – replace with your real endpoints when ready.
 */

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export const JOBS_ENDPOINTS = {
  list: "/jobs",
  saved: "/jobs/saved",
  attach: (jobId: string | number) => `/jobs/${jobId}/attach`,
  apply: (jobId: string | number) => `/jobs/${jobId}/apply`,
  save: (jobId: string | number) => `/jobs/${jobId}/save`,
  unsave: (jobId: string | number) => `/jobs/${jobId}/unsave`,
} as const;

export interface JobItem {
  id: number | string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  tags: string[];
  match?: "Good match" | "Average" | "Low";
}

export interface JobsFilters {
  keyword?: string;
  location?: string;
  remoteOnly?: boolean;
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const MOCK_JOBS: JobItem[] = [
  { id: 1, title: "Senior React Engineer", company: "Acme Labs", location: "Remote · Europe", type: "Full‑time", salary: "$110k – $140k", tags: ["React", "TypeScript", "Next.js"], match: "Good match" },
  { id: 2, title: "Backend Engineer (Python / Django)", company: "Nova Systems", location: "Remote · US", type: "Full‑time", salary: "$120k – $150k", tags: ["Python", "Django", "PostgreSQL"], match: "Good match" },
  { id: 3, title: "Full‑stack TypeScript Engineer", company: "StackFlow", location: "Hybrid · Berlin", type: "Hybrid", salary: "€80k – €100k", tags: ["React", "Node.js", "TypeScript"], match: "Good match" },
  { id: 4, title: "Frontend Lead", company: "DataCo", location: "Remote", type: "Full‑time", salary: "€90k – €120k", tags: ["React", "TypeScript"], match: "Average" },
];

export async function fetchJobs(filters?: JobsFilters): Promise<JobItem[]> {
  await delay(350);
  // const { data } = await api.get(BASE + JOBS_ENDPOINTS.list, { params: filters });
  // return data;
  let list = [...MOCK_JOBS];
  if (filters?.keyword) {
    const k = filters.keyword.toLowerCase();
    list = list.filter((j) => j.title.toLowerCase().includes(k) || j.company.toLowerCase().includes(k) || j.tags.some((t) => t.toLowerCase().includes(k)));
  }
  if (filters?.location) {
    const l = filters.location.toLowerCase();
    list = list.filter((j) => j.location.toLowerCase().includes(l));
  }
  if (filters?.remoteOnly) {
    list = list.filter((j) => j.location.toLowerCase().includes("remote"));
  }
  return list;
}

export async function fetchSavedJobs(): Promise<JobItem[]> {
  await delay(300);
  // return (await api.get(BASE + JOBS_ENDPOINTS.saved)).data;
  return MOCK_JOBS.slice(0, 2);
}

export async function attachJobToAutomation(jobId: string | number, automationId: string): Promise<void> {
  await delay(300);
  // await api.post(BASE + JOBS_ENDPOINTS.attach(jobId), { automationId });
}

export async function applyOnce(jobId: string | number): Promise<void> {
  await delay(400);
  // await api.post(BASE + JOBS_ENDPOINTS.apply(jobId));
}

export async function saveJobToFavorites(jobId: string | number): Promise<void> {
  await delay(250);
  // await api.post(BASE + JOBS_ENDPOINTS.save(jobId));
}

export async function unsaveJob(jobId: string | number): Promise<void> {
  await delay(250);
  // await api.post(BASE + JOBS_ENDPOINTS.unsave(jobId));
}
