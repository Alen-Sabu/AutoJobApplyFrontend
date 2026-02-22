/**
 * Admin API – integrates admin UI with backend endpoints.
 *
 * NOTE: Only the Users section is wired to real APIs for now.
 * Other parts (stats, jobs moderation, automations, playbooks, audit) still
 * use mock data and can be swapped to real endpoints later.
 */

import { backendApi } from "./axios";
const ADMIN_PREFIX = "/admin";

export const ADMIN_ENDPOINTS = {
  stats: `${ADMIN_PREFIX}/stats`,
  activity: `${ADMIN_PREFIX}/activity`,
  alerts: `${ADMIN_PREFIX}/alerts`,
  users: `${ADMIN_PREFIX}/users`,
  userDetail: (id: string) => `${ADMIN_PREFIX}/users/${id}`,
  userSuspend: (id: string) => `${ADMIN_PREFIX}/users/${id}/suspend`,
  userActivate: (id: string) => `${ADMIN_PREFIX}/users/${id}/activate`,
  jobs: `${ADMIN_PREFIX}/jobs`,
  jobApprove: (id: string) => `${ADMIN_PREFIX}/jobs/${id}/approve`,
  jobReject: (id: string) => `${ADMIN_PREFIX}/jobs/${id}/reject`,
  automations: `${ADMIN_PREFIX}/automations`,
  automationPause: (id: string) => `${ADMIN_PREFIX}/automations/${id}/pause`,
  automationResume: (id: string) => `${ADMIN_PREFIX}/automations/${id}/resume`,
  playbooks: `${ADMIN_PREFIX}/playbooks`,
  playbookCreate: `${ADMIN_PREFIX}/playbooks`,
  playbookUpdate: (id: string) => `${ADMIN_PREFIX}/playbooks/${id}`,
  settings: `${ADMIN_PREFIX}/settings`,
  audit: `${ADMIN_PREFIX}/audit`,
} as const;

// —— Types ——
export interface AdminStatCard {
  label: string;
  value: string;
  change: string;
  key: string;
}

export interface AdminActivityItem {
  id: string;
  time: string;
  action: string;
  detail: string;
  type: string;
}

export interface AdminAlert {
  id: string;
  message: string;
  severity: string;
  href: string;
}

export interface AdminUser {
  id: number | string;
  name: string;
  email: string;
  role: string;
  status: "active" | "suspended";
  joined: string;
}

export interface AdminJob {
  id: number | string;
  title: string;
  company: string;
  status: "pending" | "approved" | "rejected";
  posted: string;
  location?: string | null;
  salary?: string | null;    // CTC / salary range
  jobType?: string | null;
  description?: string | null;
  jobUrl?: string | null;
  source?: string | null;
}

export interface AdminAutomation {
  id: number | string;
  name: string;
  userId: number;
  userEmail: string;
  userName: string;
  status: "running" | "paused";
  applications: number;
  total_applied?: number;
  platforms: string[];
  target_titles?: string | null;
  locations?: string | null;
  daily_limit?: number;
  cover_letter_template?: string | null;
  created_at?: string;
  updated_at?: string | null;
}

export interface AdminAutomationUpdatePayload {
  name?: string;
  target_titles?: string;
  locations?: string;
  daily_limit?: number;
  platforms?: string[];
  cover_letter_template?: string;
  status?: "running" | "paused";
}

export interface AdminPlaybook {
  id: number | string;
  name: string;
  description: string;
  usageCount: number;
}

export interface AdminSiteSettings {
  maintenanceMode: boolean;
  newUserRegistration: boolean;
  requireEmailVerification: boolean;
  maxAutomationsPerUser: number;
  siteName: string;
  supportEmail: string;
}

export interface AdminAuditEntry {
  id: number | string;
  time: string;
  actor: string;
  action: string;
  target: string;
  ip: string;
}

// —— Dashboard ——
export async function fetchAdminStats(): Promise<AdminStatCard[]> {
  const { data } = await backendApi.get<AdminStatCard[]>(ADMIN_ENDPOINTS.stats);
  return data;
}

export async function fetchAdminActivity(): Promise<AdminActivityItem[]> {
  const { data } = await backendApi.get<AdminActivityItem[]>(ADMIN_ENDPOINTS.activity);
  return data;
}

export async function fetchAdminAlerts(): Promise<AdminAlert[]> {
  const { data } = await backendApi.get<AdminAlert[]>(ADMIN_ENDPOINTS.alerts);
  return data;
}

// —— Users ——
export async function fetchAdminUsers(params?: { search?: string; status?: string }): Promise<AdminUser[]> {
  const query: Record<string, string> = {};
  if (params?.search) query.search = params.search;
  if (params?.status && params.status !== "all") query.status = params.status;

  const { data } = await backendApi.get<AdminUser[]>(ADMIN_ENDPOINTS.users, { params: query });
  return data;
}

export async function suspendUser(userId: string | number): Promise<void> {
  await backendApi.post(
    ADMIN_ENDPOINTS.userSuspend(String(userId)),
    {},
    { toastSuccessMessage: "User suspended." },
  );
}

export async function activateUser(userId: string | number): Promise<void> {
  await backendApi.post(
    ADMIN_ENDPOINTS.userActivate(String(userId)),
    {},
    { toastSuccessMessage: "User activated." },
  );
}

// —— Jobs ——
export async function fetchAdminJobs(params?: { search?: string; status?: string }): Promise<AdminJob[]> {
  const query: Record<string, string> = {};
  if (params?.search) query.search = params.search;
  if (params?.status && params.status !== "all") query.status = params.status;

  const { data } = await backendApi.get<AdminJob[]>(ADMIN_ENDPOINTS.jobs, { params: query });
  return data;
}

export async function createAdminJob(payload: {
  title: string;
  company: string;
  location?: string;
  salary?: string;
  jobType?: string;
  description?: string;
  jobUrl?: string;
  source?: string;
  status?: "pending" | "approved" | "rejected";
}): Promise<AdminJob> {
  const { data } = await backendApi.post<AdminJob>(
    ADMIN_ENDPOINTS.jobs,
    payload,
    { toastSuccessMessage: "Job created." },
  );
  return data;
}

export async function updateAdminJob(
  id: string | number,
  payload: {
    title?: string;
    company?: string;
    location?: string;
    salary?: string;
    jobType?: string;
    description?: string;
    jobUrl?: string;
    source?: string;
    status?: "pending" | "approved" | "rejected";
  },
): Promise<AdminJob> {
  const { data } = await backendApi.put<AdminJob>(
    `${ADMIN_ENDPOINTS.jobs}/${id}`,
    payload,
    { toastSuccessMessage: "Job updated." },
  );
  return data;
}

export async function deleteAdminJob(id: string | number): Promise<void> {
  await backendApi.delete(
    `${ADMIN_ENDPOINTS.jobs}/${id}`,
    { toastSuccessMessage: "Job deleted." },
  );
}

export async function approveJob(jobId: string | number): Promise<void> {
  await backendApi.post(
    ADMIN_ENDPOINTS.jobApprove(String(jobId)),
    {},
    { toastSuccessMessage: "Job approved." },
  );
}

export async function rejectJob(jobId: string | number): Promise<void> {
  await backendApi.post(
    ADMIN_ENDPOINTS.jobReject(String(jobId)),
    {},
    { toastSuccessMessage: "Job rejected." },
  );
}

// —— Automations ——
interface AdminAutomationResponse {
  id: number;
  user_id: number;
  user_email: string;
  user_name: string;
  name: string;
  target_titles: string | null;
  locations: string | null;
  daily_limit: number;
  platforms: string[];
  cover_letter_template: string | null;
  status: "running" | "paused";
  total_applied: number;
  created_at: string;
  updated_at: string | null;
}

function mapAdminAutomation(a: AdminAutomationResponse): AdminAutomation {
  return {
    id: a.id,
    name: a.name,
    userId: a.user_id,
    userEmail: a.user_email ?? "",
    userName: a.user_name ?? "",
    status: a.status,
    applications: a.total_applied ?? 0,
    total_applied: a.total_applied,
    platforms: a.platforms ?? [],
    target_titles: a.target_titles,
    locations: a.locations,
    daily_limit: a.daily_limit,
    cover_letter_template: a.cover_letter_template,
    created_at: a.created_at,
    updated_at: a.updated_at,
  };
}

export async function fetchAdminAutomations(params?: { search?: string }): Promise<AdminAutomation[]> {
  const { data } = await backendApi.get<AdminAutomationResponse[]>(ADMIN_ENDPOINTS.automations, {
    params: params?.search ? { search: params.search } : undefined,
  });
  return data.map(mapAdminAutomation);
}

export async function fetchAdminAutomation(id: string | number): Promise<AdminAutomation> {
  const { data } = await backendApi.get<AdminAutomationResponse>(`${ADMIN_ENDPOINTS.automations}/${id}`);
  return mapAdminAutomation(data);
}

export async function updateAdminAutomation(
  id: string | number,
  payload: AdminAutomationUpdatePayload,
): Promise<AdminAutomation> {
  const body: Record<string, unknown> = {};
  if (payload.name !== undefined) body.name = payload.name;
  if (payload.target_titles !== undefined) body.target_titles = payload.target_titles;
  if (payload.locations !== undefined) body.locations = payload.locations;
  if (payload.daily_limit !== undefined) body.daily_limit = payload.daily_limit;
  if (payload.platforms !== undefined) body.platforms = payload.platforms;
  if (payload.cover_letter_template !== undefined) body.cover_letter_template = payload.cover_letter_template;
  if (payload.status !== undefined) body.status = payload.status;

  const { data } = await backendApi.put<AdminAutomationResponse>(
    `${ADMIN_ENDPOINTS.automations}/${id}`,
    body,
    { toastSuccessMessage: "Automation updated." },
  );
  return mapAdminAutomation(data);
}

export async function adminPauseAutomation(id: string | number): Promise<AdminAutomation> {
  const { data } = await backendApi.post<AdminAutomationResponse>(
    ADMIN_ENDPOINTS.automationPause(String(id)),
    {},
  );
  return mapAdminAutomation(data);
}

export async function adminResumeAutomation(id: string | number): Promise<AdminAutomation> {
  const { data } = await backendApi.post<AdminAutomationResponse>(
    ADMIN_ENDPOINTS.automationResume(String(id)),
    {},
  );
  return mapAdminAutomation(data);
}

// —— Playbooks ——
// NOTE: Playbooks are still mocked for now.
export async function fetchAdminPlaybooks(): Promise<AdminPlaybook[]> {
  return [
    { id: 1, name: "Senior Frontend (React)", description: "Target React/TypeScript roles", usageCount: 156 },
    { id: 2, name: "Backend Python/Django", description: "Backend and API roles", usageCount: 89 },
    { id: 3, name: "Full-stack TypeScript", description: "Full-stack Node + React", usageCount: 203 },
  ];
}

export async function createAdminPlaybook(payload: { name: string; description: string }): Promise<AdminPlaybook> {
  // return (await backendApi.post(ADMIN_ENDPOINTS.playbookCreate, payload)).data;
  return { id: Date.now(), name: payload.name, description: payload.description, usageCount: 0 };
}

export async function updateAdminPlaybook(id: string | number, payload: { name?: string; description?: string }): Promise<AdminPlaybook> {
  // return (await backendApi.patch(ADMIN_ENDPOINTS.playbookUpdate(String(id)), payload)).data;
  return { id, name: payload.name ?? "Playbook", description: payload.description ?? "", usageCount: 0 };
}

// —— Settings ——
interface AdminSiteSettingsResponse {
  maintenance_mode: boolean;
  new_user_registration: boolean;
  require_email_verification: boolean;
  max_automations_per_user: number;
  site_name: string;
  support_email: string;
}

function mapAdminSettings(r: AdminSiteSettingsResponse): AdminSiteSettings {
  return {
    maintenanceMode: r.maintenance_mode,
    newUserRegistration: r.new_user_registration,
    requireEmailVerification: r.require_email_verification,
    maxAutomationsPerUser: r.max_automations_per_user,
    siteName: r.site_name,
    supportEmail: r.support_email,
  };
}

export async function fetchAdminSettings(): Promise<AdminSiteSettings> {
  const { data } = await backendApi.get<AdminSiteSettingsResponse>(ADMIN_ENDPOINTS.settings);
  return mapAdminSettings(data);
}

export async function saveAdminSettings(settings: Partial<AdminSiteSettings>): Promise<AdminSiteSettings> {
  const body: AdminSiteSettingsResponse = {
    maintenance_mode: settings.maintenanceMode ?? false,
    new_user_registration: settings.newUserRegistration ?? true,
    require_email_verification: settings.requireEmailVerification ?? false,
    max_automations_per_user: settings.maxAutomationsPerUser ?? 10,
    site_name: settings.siteName ?? "CrypGo",
    support_email: settings.supportEmail ?? "support@crypgo.com",
  };
  const { data } = await backendApi.put<AdminSiteSettingsResponse>(
    ADMIN_ENDPOINTS.settings,
    body,
    { toastSuccessMessage: "Settings saved." },
  );
  return mapAdminSettings(data);
}

// —— Audit ——
export async function fetchAdminAudit(params?: { search?: string; action?: string }): Promise<AdminAuditEntry[]> {
  const query: Record<string, string> = {};
  if (params?.search) query.search = params.search;
  if (params?.action) query.action = params.action;

  const { data } = await backendApi.get<AdminAuditEntry[]>(ADMIN_ENDPOINTS.audit, {
    params: Object.keys(query).length ? query : undefined,
  });
  return data;
}
