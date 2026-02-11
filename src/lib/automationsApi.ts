/**
 * Automations API – replace with your real endpoints when ready.
 */

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export const AUTOMATIONS_ENDPOINTS = {
  list: "/automations",
  create: "/automations",
  get: (id: string) => `/automations/${id}`,
  update: (id: string) => `/automations/${id}`,
  pause: (id: string) => `/automations/${id}/pause`,
  resume: (id: string) => `/automations/${id}/resume`,
} as const;

export interface Automation {
  id: string;
  name: string;
  platforms: string[];
  criteria: string;
  limit: string;
  status: "running" | "paused";
}

export interface CreateAutomationPayload {
  name: string;
  targetTitles: string;
  locations: string;
  dailyLimit: string;
  platforms: string[];
  coverLetterTemplate?: string;
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const MOCK_AUTOMATIONS: Automation[] = [
  { id: "1", name: "Senior React roles", platforms: ["LinkedIn", "Wellfound"], criteria: "React · TypeScript · Remote · Europe", limit: "25 / day", status: "running" },
  { id: "2", name: "Backend Python (US)", platforms: ["LinkedIn", "Indeed"], criteria: "Python · Django · Remote · US", limit: "20 / day", status: "paused" },
  { id: "3", name: "Staff / Lead level", platforms: ["LinkedIn"], criteria: "Staff · Lead · Principal · Remote", limit: "10 / day", status: "running" },
];

export async function fetchAutomations(): Promise<Automation[]> {
  await delay(300);
  // return (await api.get(BASE + AUTOMATIONS_ENDPOINTS.list)).data;
  return MOCK_AUTOMATIONS;
}

export async function createAutomation(payload: CreateAutomationPayload): Promise<Automation> {
  await delay(500);
  // return (await api.post(BASE + AUTOMATIONS_ENDPOINTS.create, payload)).data;
  return {
    id: String(Date.now()),
    name: payload.name || "New automation",
    platforms: payload.platforms.length ? payload.platforms : ["LinkedIn"],
    criteria: [payload.targetTitles, payload.locations].filter(Boolean).join(" · ") || "—",
    limit: payload.dailyLimit ? `${payload.dailyLimit} / day` : "25 / day",
    status: "paused",
  };
}

export async function updateAutomation(id: string, payload: Partial<CreateAutomationPayload>): Promise<Automation> {
  await delay(400);
  // return (await api.patch(BASE + AUTOMATIONS_ENDPOINTS.update(id), payload)).data;
  const existing = MOCK_AUTOMATIONS.find((a) => a.id === id);
  return existing ? { ...existing, ...payload, name: payload.name ?? existing.name } : (MOCK_AUTOMATIONS[0] as Automation);
}

export async function pauseAutomation(id: string): Promise<void> {
  await delay(250);
  // await api.post(BASE + AUTOMATIONS_ENDPOINTS.pause(id));
}

export async function resumeAutomation(id: string): Promise<void> {
  await delay(250);
  // await api.post(BASE + AUTOMATIONS_ENDPOINTS.resume(id));
}
