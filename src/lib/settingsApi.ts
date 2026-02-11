/**
 * Settings API – replace with your real endpoints when ready.
 */

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export const SETTINGS_ENDPOINTS = {
  get: "/settings",
  account: "/settings/account",
  email: "/settings/email",
  password: "/settings/password",
  twoFactor: "/settings/2fa",
  deleteAccount: "/settings/account/delete",
} as const;

export interface SettingsData {
  displayName: string;
  username: string;
  email: string;
  emailVerified: boolean;
  passwordLastChanged?: string;
  twoFactorEnabled: boolean;
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const MOCK_SETTINGS: SettingsData = {
  displayName: "Jane Doe",
  username: "janedoe",
  email: "jane@example.com",
  emailVerified: true,
  passwordLastChanged: "30 days ago",
  twoFactorEnabled: false,
};

export async function fetchSettings(): Promise<SettingsData> {
  await delay(300);
  // return (await api.get(BASE + SETTINGS_ENDPOINTS.get)).data;
  return MOCK_SETTINGS;
}

export async function saveAccount(data: { displayName?: string; username?: string }): Promise<void> {
  await delay(400);
  // await api.patch(BASE + SETTINGS_ENDPOINTS.account, data);
}

export async function updateEmail(email: string): Promise<void> {
  await delay(400);
  // await api.post(BASE + SETTINGS_ENDPOINTS.email, { email });
}

export async function verifyEmail(): Promise<void> {
  await delay(400);
  // await api.post(BASE + SETTINGS_ENDPOINTS.email + '/verify');
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  await delay(400);
  // await api.post(BASE + SETTINGS_ENDPOINTS.password, { currentPassword, newPassword });
}

export async function enable2FA(): Promise<void> {
  await delay(400);
  // await api.post(BASE + SETTINGS_ENDPOINTS.twoFactor);
}

export async function deleteAccount(confirmation: string): Promise<void> {
  await delay(400);
  // await api.delete(BASE + SETTINGS_ENDPOINTS.deleteAccount, { data: { confirmation } });
}
