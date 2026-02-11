/**
 * Admin API – replace BASE and use real endpoints when ready.
 * All functions use mock data; swap with api.get(BASE + ENDPOINTS.xyz) etc.
 */

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";
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

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

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
}

export interface AdminAutomation {
  id: number | string;
  name: string;
  userId: number;
  status: "running" | "paused";
  applications: number;
  platforms: string[];
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
  await delay(280);
  return [
    { label: "Total users", value: "1,247", change: "+12% this month", key: "users" },
    { label: "Active jobs", value: "342", change: "Live listings", key: "jobs" },
    { label: "Automations", value: "89", change: "Running", key: "automations" },
    { label: "Applications (30d)", value: "4.2k", change: "+8%", key: "applications" },
  ];
}

export async function fetchAdminActivity(): Promise<AdminActivityItem[]> {
  await delay(250);
  return [
    { id: "1", time: "5 min ago", action: "New user registered", detail: "john@example.com", type: "user" },
    { id: "2", time: "12 min ago", action: "Job listing approved", detail: "Senior React Engineer @ Acme", type: "job" },
    { id: "3", time: "1 hr ago", action: "Automation paused", detail: "User #882 – Backend Python campaign", type: "automation" },
    { id: "4", time: "2 hr ago", action: "Settings updated", detail: "Maintenance window scheduled", type: "settings" },
  ];
}

export async function fetchAdminAlerts(): Promise<AdminAlert[]> {
  await delay(200);
  return [
    { id: "1", message: "3 jobs pending review", severity: "warning", href: "/admin/jobs" },
    { id: "2", message: "1 user report in queue", severity: "info", href: "/admin/users" },
  ];
}

// —— Users ——
export async function fetchAdminUsers(_params?: { search?: string; status?: string }): Promise<AdminUser[]> {
  await delay(300);
  return [
    { id: 1, name: "Jane Doe", email: "jane@example.com", role: "user", status: "active", joined: "2024-01-15" },
    { id: 2, name: "John Smith", email: "john@example.com", role: "user", status: "active", joined: "2024-02-01" },
    { id: 3, name: "Alice Brown", email: "alice@example.com", role: "user", status: "suspended", joined: "2024-02-10" },
    { id: 4, name: "Bob Wilson", email: "bob@example.com", role: "admin", status: "active", joined: "2023-12-01" },
  ];
}

export async function suspendUser(userId: string | number): Promise<void> {
  await delay(300);
  // await api.post(BASE + ADMIN_ENDPOINTS.userSuspend(String(userId)));
}

export async function activateUser(userId: string | number): Promise<void> {
  await delay(300);
  // await api.post(BASE + ADMIN_ENDPOINTS.userActivate(String(userId)));
}

// —— Jobs ——
export async function fetchAdminJobs(_params?: { search?: string; status?: string }): Promise<AdminJob[]> {
  await delay(300);
  return [
    { id: 1, title: "Senior React Engineer", company: "Acme Labs", status: "pending", posted: "2024-03-01" },
    { id: 2, title: "Backend Engineer", company: "Nova Systems", status: "approved", posted: "2024-02-28" },
    { id: 3, title: "Full-stack TypeScript", company: "StackFlow", status: "approved", posted: "2024-02-27" },
    { id: 4, title: "DevOps Engineer", company: "CloudCo", status: "pending", posted: "2024-03-02" },
  ];
}

export async function approveJob(jobId: string | number): Promise<void> {
  await delay(280);
  // await api.post(BASE + ADMIN_ENDPOINTS.jobApprove(String(jobId)));
}

export async function rejectJob(jobId: string | number): Promise<void> {
  await delay(280);
  // await api.post(BASE + ADMIN_ENDPOINTS.jobReject(String(jobId)));
}

// —— Automations ——
export async function fetchAdminAutomations(_params?: { search?: string }): Promise<AdminAutomation[]> {
  await delay(300);
  return [
    { id: 1, name: "Senior React Engineer", userId: 101, status: "running", applications: 24, platforms: ["LinkedIn", "Wellfound"] },
    { id: 2, name: "Backend Python", userId: 102, status: "paused", applications: 18, platforms: ["LinkedIn"] },
    { id: 3, name: "Full-stack TypeScript", userId: 103, status: "running", applications: 31, platforms: ["LinkedIn", "Indeed"] },
  ];
}

export async function adminPauseAutomation(id: string | number): Promise<void> {
  await delay(250);
  // await api.post(BASE + ADMIN_ENDPOINTS.automationPause(String(id)));
}

export async function adminResumeAutomation(id: string | number): Promise<void> {
  await delay(250);
  // await api.post(BASE + ADMIN_ENDPOINTS.automationResume(String(id)));
}

// —— Playbooks ——
export async function fetchAdminPlaybooks(): Promise<AdminPlaybook[]> {
  await delay(280);
  return [
    { id: 1, name: "Senior Frontend (React)", description: "Target React/TypeScript roles", usageCount: 156 },
    { id: 2, name: "Backend Python/Django", description: "Backend and API roles", usageCount: 89 },
    { id: 3, name: "Full-stack TypeScript", description: "Full-stack Node + React", usageCount: 203 },
  ];
}

export async function createAdminPlaybook(payload: { name: string; description: string }): Promise<AdminPlaybook> {
  await delay(400);
  // return (await api.post(BASE + ADMIN_ENDPOINTS.playbookCreate, payload)).data;
  return { id: Date.now(), name: payload.name, description: payload.description, usageCount: 0 };
}

export async function updateAdminPlaybook(id: string | number, payload: { name?: string; description?: string }): Promise<AdminPlaybook> {
  await delay(350);
  // return (await api.patch(BASE + ADMIN_ENDPOINTS.playbookUpdate(String(id)), payload)).data;
  return { id, name: payload.name ?? "Playbook", description: payload.description ?? "", usageCount: 0 };
}

// —— Settings ——
export async function fetchAdminSettings(): Promise<AdminSiteSettings> {
  await delay(280);
  return {
    maintenanceMode: false,
    newUserRegistration: true,
    requireEmailVerification: false,
    maxAutomationsPerUser: 10,
    siteName: "CrypGo",
    supportEmail: "support@crypgo.com",
  };
}

export async function saveAdminSettings(settings: Partial<AdminSiteSettings>): Promise<void> {
  await delay(400);
  // await api.put(BASE + ADMIN_ENDPOINTS.settings, settings);
}

// —— Audit ——
export async function fetchAdminAudit(_params?: { search?: string; action?: string }): Promise<AdminAuditEntry[]> {
  await delay(300);
  return [
    { id: 1, time: "2024-03-02 14:32:00", actor: "admin@crypgo.com", action: "job.approved", target: "Job #442", ip: "192.168.1.1" },
    { id: 2, time: "2024-03-02 14:28:00", actor: "system", action: "user.registered", target: "user@example.com", ip: "-" },
    { id: 3, time: "2024-03-02 14:15:00", actor: "admin@crypgo.com", action: "settings.updated", target: "maintenance_mode", ip: "192.168.1.1" },
    { id: 4, time: "2024-03-02 13:55:00", actor: "user@example.com", action: "automation.created", target: "Campaign #89", ip: "10.0.0.5" },
    { id: 5, time: "2024-03-02 13:40:00", actor: "admin@crypgo.com", action: "user.suspended", target: "User #12", ip: "192.168.1.1" },
  ];
}
