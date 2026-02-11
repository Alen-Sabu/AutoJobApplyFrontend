/**
 * Playbooks API – replace with your real endpoints when ready.
 */

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export const PLAYBOOKS_ENDPOINTS = {
  list: "/playbooks",
  get: (id: string) => `/playbooks/${id}`,
  use: (id: string) => `/playbooks/${id}/use`,
} as const;

export interface Playbook {
  id: string;
  title: string;
  description: string;
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const MOCK_PLAYBOOKS: Playbook[] = [
  { id: "1", title: "Senior React roles · Remote EU", description: "Targets React / TypeScript roles with salary bands and remote‑friendly companies." },
  { id: "2", title: "Backend Python · US only", description: "Filters for Python / Django roles with clear compensation and remote or hybrid options." },
  { id: "3", title: "Staff‑level engineering roles", description: "Focuses on Staff / Lead / Principal titles across frontend, backend, and platform." },
];

export async function fetchPlaybooks(): Promise<Playbook[]> {
  await delay(300);
  // return (await api.get(BASE + PLAYBOOKS_ENDPOINTS.list)).data;
  return MOCK_PLAYBOOKS;
}

/** Use a playbook as template for a new automation (returns template payload or redirects). */
export async function usePlaybook(playbookId: string): Promise<{ redirectTo?: string; template?: Record<string, unknown> }> {
  await delay(300);
  // return (await api.post(BASE + PLAYBOOKS_ENDPOINTS.use(playbookId))).data;
  return { redirectTo: "/automations?playbook=" + playbookId };
}
