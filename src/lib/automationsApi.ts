/**
 * Automations API – real backend integration.
 */
import { backendApi } from "./axios";

const AUTOMATIONS_BASE = "/automations";

export interface Automation {
  id: number;
  name: string;
  platforms: string[];
  targetTitles: string;
  locations: string;
  dailyLimit: number;
  coverLetterTemplate?: string;
  status: "running" | "paused";
  totalApplied: number;
  /** Applications submitted today for this automation (for "limit exceeded" UI). */
  applicationsToday?: number;
  createdAt: string;
  updatedAt?: string | null;
}

export interface AutomationRunResult {
  applied_count: number;
  limit_reached: boolean;
  message: string;
  applications_today: number;
}

export interface CreateAutomationPayload {
  name: string;
  targetTitles: string;
  locations: string;
  /** Per‑day limit, e.g. 25, 50, 100 applications per day */
  dailyLimit: number;
  platforms: string[];
  coverLetterTemplate?: string;
}

// Backend response (snake_case)
interface AutomationResponse {
  id: number;
  name: string;
  platforms: string[];
  target_titles: string | null;
  locations: string | null;
  daily_limit: number;
  cover_letter_template?: string | null;
  status: "running" | "paused";
  total_applied: number;
  applications_today?: number | null;
  created_at: string;
  updated_at: string | null;
}

function mapAutomation(a: AutomationResponse): Automation {
  return {
    id: a.id,
    name: a.name,
    platforms: a.platforms ?? [],
    targetTitles: a.target_titles ?? "",
    locations: a.locations ?? "",
    dailyLimit: a.daily_limit,
    coverLetterTemplate: a.cover_letter_template ?? undefined,
    status: a.status,
    totalApplied: a.total_applied ?? 0,
    applicationsToday: a.applications_today ?? undefined,
    createdAt: a.created_at,
    updatedAt: a.updated_at,
  };
}

export async function fetchAutomations(): Promise<Automation[]> {
  const { data } = await backendApi.get<AutomationResponse[]>(AUTOMATIONS_BASE);
  return data.map(mapAutomation);
}

export async function fetchAutomation(id: number): Promise<Automation> {
  const { data } = await backendApi.get<AutomationResponse>(`${AUTOMATIONS_BASE}/${id}`);
  return mapAutomation(data);
}

export async function createAutomation(payload: CreateAutomationPayload): Promise<Automation> {
  const body = {
    name: payload.name,
    target_titles: payload.targetTitles,
    locations: payload.locations,
    daily_limit: payload.dailyLimit,
    platforms: payload.platforms,
    cover_letter_template: payload.coverLetterTemplate,
  };
  const { data } = await backendApi.post<AutomationResponse>(AUTOMATIONS_BASE, body, {
    toastSuccessMessage: "Automation created.",
  });
  return mapAutomation(data);
}

export async function pauseAutomation(id: number): Promise<Automation> {
  const { data } = await backendApi.post<AutomationResponse>(`${AUTOMATIONS_BASE}/${id}/pause`, {});
  return mapAutomation(data);
}

export async function resumeAutomation(id: number): Promise<Automation> {
  const { data } = await backendApi.post<AutomationResponse>(`${AUTOMATIONS_BASE}/${id}/resume`, {});
  return mapAutomation(data);
}

/**
 * Run automation once: find matching jobs and apply up to daily limit.
 * Returns result with message to show in toast (e.g. "Applied to 5 jobs (only 5 similar jobs available).").
 */
export async function runAutomation(id: number): Promise<AutomationRunResult> {
  const { data } = await backendApi.post<AutomationRunResult>(`${AUTOMATIONS_BASE}/${id}/run`, {});
  return data;
}
