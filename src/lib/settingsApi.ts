/**
 * Settings API – user account, email, password, 2FA, delete account.
 * Uses backend API with auth; maps snake_case <-> camelCase.
 */
import { backendApi } from "./axios";

const SETTINGS_BASE = "/settings";

export const SETTINGS_ENDPOINTS = {
  get: SETTINGS_BASE,
  account: `${SETTINGS_BASE}/account`,
  email: `${SETTINGS_BASE}/email`,
  emailVerify: `${SETTINGS_BASE}/email/verify`,
  password: `${SETTINGS_BASE}/password`,
  twoFactor: `${SETTINGS_BASE}/2fa`,
  deleteAccount: `${SETTINGS_BASE}/account/delete`,
} as const;

export interface SettingsData {
  displayName: string;
  username: string;
  email: string;
  emailVerified: boolean;
  passwordLastChanged?: string;
  twoFactorEnabled: boolean;
}

/** Backend response (snake_case) */
interface SettingsDataResponse {
  display_name: string;
  username: string | null;
  email: string;
  email_verified: boolean;
  password_last_changed: string | null;
  two_factor_enabled: boolean;
}

function mapResponseToSettings(r: SettingsDataResponse): SettingsData {
  return {
    displayName: r.display_name ?? "",
    username: r.username ?? "",
    email: r.email ?? "",
    emailVerified: Boolean(r.email_verified),
    passwordLastChanged: r.password_last_changed ?? undefined,
    twoFactorEnabled: Boolean(r.two_factor_enabled),
  };
}

export async function fetchSettings(): Promise<SettingsData> {
  const { data } = await backendApi.get<SettingsDataResponse>(SETTINGS_ENDPOINTS.get);
  return mapResponseToSettings(data);
}

export async function saveAccount(payload: { displayName?: string; username?: string }): Promise<SettingsData> {
  const body: Record<string, string> = {};
  if (payload.displayName !== undefined) body.display_name = payload.displayName;
  if (payload.username !== undefined) body.username = payload.username;
  const { data } = await backendApi.patch<SettingsDataResponse>(SETTINGS_ENDPOINTS.account, body, {
    toastSuccessMessage: "Account updated.",
  });
  return mapResponseToSettings(data);
}

export async function updateEmail(email: string): Promise<SettingsData> {
  const { data } = await backendApi.post<SettingsDataResponse>(SETTINGS_ENDPOINTS.email, { email }, {
    toastSuccessMessage: "Email updated. You may need to sign in again with your new email.",
  });
  return mapResponseToSettings(data);
}

export async function verifyEmail(): Promise<void> {
  await backendApi.post(SETTINGS_ENDPOINTS.emailVerify, {}, {
    toastSuccessMessage: "Verification email sent.",
  });
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  await backendApi.post(
    SETTINGS_ENDPOINTS.password,
    { current_password: currentPassword, new_password: newPassword },
    { toastSuccessMessage: "Password updated." }
  );
}

export async function enable2FA(): Promise<void> {
  await backendApi.post(SETTINGS_ENDPOINTS.twoFactor, {}, {
    toastSuccessMessage: "2FA enabled.",
  });
}

export async function deleteAccount(confirmation: string): Promise<void> {
  await backendApi.delete(SETTINGS_ENDPOINTS.deleteAccount, {
    data: { confirmation },
    toastSuccessMessage: "Account deactivated.",
  });
}
