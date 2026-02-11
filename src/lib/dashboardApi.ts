/**
 * Dashboard API – replace BASE_URL and ENDPOINTS with your real API base and paths.
 * Replace the mock implementations with: api.get(BASE_URL + ENDPOINTS.stats) etc.
 */

// —— Replace with your actual API base (e.g. from env or backendApi) ——
const DASHBOARD_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export const DASHBOARD_ENDPOINTS = {
  stats: "/dashboard/stats",
  campaigns: "/dashboard/campaigns",
  activity: "/dashboard/activity",
  campaignDetail: (id: string) => `/dashboard/campaigns/${id}`,
  pauseCampaign: (id: string) => `/dashboard/campaigns/${id}/pause`,
  resumeCampaign: (id: string) => `/dashboard/campaigns/${id}/resume`,
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
}

export interface DashboardActivityItem {
  id: string;
  time: string;
  title: string;
  description: string;
}

// —— Mock data (replace with real API calls) ——
const MOCK_STATS: DashboardStat[] = [
  { label: "Applications today", value: "18", change: "+6 vs yesterday", key: "applications_today" },
  { label: "This week", value: "86", change: "+24 vs last week", key: "this_week" },
  { label: "Interviews booked", value: "7", change: "Last 14 days", key: "interviews" },
  { label: "Active automations", value: "4", change: "Across 3 job boards", key: "active_automations" },
];

const MOCK_CAMPAIGNS: DashboardCampaign[] = [
  {
    id: "1",
    name: "Senior React Engineer",
    targetTitle: "Frontend / React",
    locations: ["Remote", "Europe"],
    dailyLimit: "25 / day",
    platforms: ["LinkedIn", "Wellfound"],
    status: "Running",
  },
  {
    id: "2",
    name: "Backend Python / Django",
    targetTitle: "Backend Engineer",
    locations: ["Remote", "US"],
    dailyLimit: "20 / day",
    platforms: ["LinkedIn", "Indeed"],
    status: "Paused",
  },
  {
    id: "3",
    name: "Full‑stack TypeScript",
    targetTitle: "Full‑stack",
    locations: ["Remote"],
    dailyLimit: "30 / day",
    platforms: ["LinkedIn"],
    status: "Running",
  },
];

const MOCK_ACTIVITY: DashboardActivityItem[] = [
  { id: "1", time: "2 min ago", title: "Applied to 3 new React roles", description: "Using “Senior React Engineer” automation on LinkedIn." },
  { id: "2", time: "28 min ago", title: "New interview scheduled", description: "Frontend Engineer @ Acme – Thursday, 15:30." },
  { id: "3", time: "1 hr ago", title: "Daily limit reached for Indeed", description: "Backend Python / Django campaign hit 20 applications." },
];

/** Simulate network delay */
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Fetch dashboard stats.
 * TODO: replace with: const { data } = await api.get(DASHBOARD_BASE + DASHBOARD_ENDPOINTS.stats); return data;
 */
export async function fetchDashboardStats(): Promise<DashboardStat[]> {
  await delay(300);
  // return (await api.get(DASHBOARD_BASE + DASHBOARD_ENDPOINTS.stats)).data;
  return MOCK_STATS;
}

/**
 * Fetch active campaigns.
 * TODO: replace with: const { data } = await api.get(DASHBOARD_BASE + DASHBOARD_ENDPOINTS.campaigns); return data;
 */
export async function fetchDashboardCampaigns(): Promise<DashboardCampaign[]> {
  await delay(300);
  // return (await api.get(DASHBOARD_BASE + DASHBOARD_ENDPOINTS.campaigns)).data;
  return MOCK_CAMPAIGNS;
}

/**
 * Fetch recent activity.
 * TODO: replace with: const { data } = await api.get(DASHBOARD_BASE + DASHBOARD_ENDPOINTS.activity); return data;
 */
export async function fetchDashboardActivity(): Promise<DashboardActivityItem[]> {
  await delay(300);
  // return (await api.get(DASHBOARD_BASE + DASHBOARD_ENDPOINTS.activity)).data;
  return MOCK_ACTIVITY;
}

/**
 * Pause a campaign (optional – for "View details" / campaign actions).
 * TODO: replace with: await api.post(DASHBOARD_BASE + DASHBOARD_ENDPOINTS.pauseCampaign(id));
 */
export async function pauseCampaign(id: string): Promise<void> {
  await delay(200);
  // await api.post(DASHBOARD_BASE + DASHBOARD_ENDPOINTS.pauseCampaign(id));
}

/**
 * Resume a campaign.
 * TODO: replace with: await api.post(DASHBOARD_BASE + DASHBOARD_ENDPOINTS.resumeCampaign(id));
 */
export async function resumeCampaign(id: string): Promise<void> {
  await delay(200);
  // await api.post(DASHBOARD_BASE + DASHBOARD_ENDPOINTS.resumeCampaign(id));
}
