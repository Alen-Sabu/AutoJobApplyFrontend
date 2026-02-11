/**
 * Profile API – replace with your real endpoints when ready.
 */

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export const PROFILE_ENDPOINTS = {
  get: "/profile",
  save: "/profile",
  preferences: "/profile/preferences",
} as const;

export interface ProfileData {
  fullName: string;
  headline: string;
  primaryLocation: string;
  linkedInUrl: string;
  yearsExperience: string;
  compensationCurrency: string;
  topSkills: string;
  coverLetterTone: string;
  matchingPreferences: string[];
  initials: string;
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const MOCK_PROFILE: ProfileData = {
  fullName: "Jane Doe",
  headline: "Senior Full‑stack Engineer · 7+ years",
  primaryLocation: "Berlin, Germany · CET",
  linkedInUrl: "https://linkedin.com/in/janedoe",
  yearsExperience: "7",
  compensationCurrency: "EUR",
  topSkills: "React, TypeScript, Next.js, Node.js, PostgreSQL, AWS",
  coverLetterTone: "Short, confident, and specific about what I bring to the role.",
  matchingPreferences: [
    "Prefer roles with clear salary ranges",
    "Exclude unpaid internships and bootcamps",
    "Prefer product companies over short‑term agencies",
  ],
  initials: "JD",
};

export async function fetchProfile(): Promise<ProfileData> {
  await delay(300);
  // return (await api.get(BASE + PROFILE_ENDPOINTS.get)).data;
  return MOCK_PROFILE;
}

export async function saveProfile(data: Partial<ProfileData>): Promise<ProfileData> {
  await delay(400);
  // return (await api.put(BASE + PROFILE_ENDPOINTS.save, data)).data;
  return { ...MOCK_PROFILE, ...data };
}
