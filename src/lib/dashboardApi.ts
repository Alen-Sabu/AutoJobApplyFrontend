import { backendApi, backendGet, backendPost } from "./axios";

export const DASHBOARD_ENDPOINTS = {
  stats: "/dashboard/stats",
  campaigns: "/dashboard/campaigns",
  activity: "/dashboard/activity",
  campaignDetail: (id: string) => `/dashboard/campaigns/${id}`,
  pauseCampaign: (id: string) => `/dashboard/campaigns/${id}/pause`,
  resumeCampaign: (id: string) => `/dashboard/campaigns/${id}/resume`,
  runCampaign: (id: string) => `/automations/${id}/run`,
} as const;

// —— Types (align with your backend DTOs) ——
export interface DashboardStat {
  label: string;
  value: string;
  change: string;
  key: string;
}

export interface DashboardCampaign {
  id: string;
  name: string;
  targetTitle: string;
  locations: string[];
  dailyLimit: string;
  platforms: string[];
  status: "Running" | "Paused";
  /** Applications submitted today (for "limit exceeded" UI). */
  applicationsToday?: number;
  /** Numeric daily limit (e.g. 25) for comparison. */
  dailyLimitNumber?: number;
}

export interface DashboardRunResult {
  applied_count: number;
  limit_reached: boolean;
  message: string;
  applications_today: number;
}

export interface DashboardActivityItem {
  id: string;
  time: string;
  title: string;
  description: string;
}

/**
 * Fetch dashboard stats.
 */
export async function fetchDashboardStats(): Promise<DashboardStat[]> {
  const { data } = await backendGet<DashboardStat[]>(DASHBOARD_ENDPOINTS.stats);
  return data;
}

/**
 * Fetch active campaigns.
 */
export async function fetchDashboardCampaigns(): Promise<DashboardCampaign[]> {
  const { data } = await backendGet<DashboardCampaign[]>(DASHBOARD_ENDPOINTS.campaigns);
  return data;
}

/**
 * Fetch recent activity.
 */
export async function fetchDashboardActivity(): Promise<DashboardActivityItem[]> {
  const { data } = await backendGet<DashboardActivityItem[]>(DASHBOARD_ENDPOINTS.activity);
  return data;
}

/**
 * Pause a campaign (optional – for "View details" / campaign actions).
 */
export async function pauseCampaign(id: string): Promise<void> {
  await backendPost(DASHBOARD_ENDPOINTS.pauseCampaign(id));
}

/**
 * Resume a campaign.
 */
export async function resumeCampaign(id: string): Promise<void> {
  await backendPost(DASHBOARD_ENDPOINTS.resumeCampaign(id));
}

/**
 * Run campaign (automation) once: apply to matching jobs up to daily limit.
 * Returns result with message to show in toast.
 */
export async function runCampaign(id: string): Promise<DashboardRunResult> {
  const { data } = await backendApi.post<DashboardRunResult>(
    DASHBOARD_ENDPOINTS.runCampaign(id),
    {}
  );
  return data;
}
