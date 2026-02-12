/**
 * Profile API – GET/PUT /profiles/me with auth.
 */
import { backendApi } from "./axios";

export const PROFILE_ENDPOINTS = {
  get: "/profiles/me",
  save: "/profiles/me",
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

/** Backend response (snake_case) */
interface ProfileResponse {
  id: number;
  user_id: number;
  full_name: string | null;
  headline: string | null;
  primary_location: string | null;
  linkedin_url: string | null;
  years_experience: string | null;
  compensation_currency: string | null;
  top_skills: string | null;
  cover_letter_tone: string | null;
  matching_preferences: string[] | null;
  initials: string | null;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  address?: string | null;
  resume_path?: string | null;
  cover_letter_path?: string | null;
  github_url?: string | null;
  portfolio_url?: string | null;
  bio?: string | null;
}

function mapResponseToProfile(r: ProfileResponse): ProfileData {
  return {
    fullName: r.full_name ?? "",
    headline: r.headline ?? "",
    primaryLocation: r.primary_location ?? "",
    linkedInUrl: r.linkedin_url ?? "",
    yearsExperience: r.years_experience ?? "",
    compensationCurrency: r.compensation_currency ?? "",
    topSkills: r.top_skills ?? "",
    coverLetterTone: r.cover_letter_tone ?? "",
    matchingPreferences: Array.isArray(r.matching_preferences) ? r.matching_preferences : [],
    initials: r.initials ?? "",
  };
}

/** Convert partial camelCase payload to snake_case for backend */
function toSnakePayload(data: Partial<ProfileData>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (data.fullName !== undefined) out.full_name = data.fullName;
  if (data.headline !== undefined) out.headline = data.headline;
  if (data.primaryLocation !== undefined) out.primary_location = data.primaryLocation;
  if (data.linkedInUrl !== undefined) out.linkedin_url = data.linkedInUrl;
  if (data.yearsExperience !== undefined) out.years_experience = data.yearsExperience;
  if (data.compensationCurrency !== undefined) out.compensation_currency = data.compensationCurrency;
  if (data.topSkills !== undefined) out.top_skills = data.topSkills;
  if (data.coverLetterTone !== undefined) out.cover_letter_tone = data.coverLetterTone;
  if (data.matchingPreferences !== undefined) out.matching_preferences = data.matchingPreferences;
  return out;
}

export async function fetchProfile(): Promise<ProfileData> {
  const { data } = await backendApi.get<ProfileResponse>(PROFILE_ENDPOINTS.get);
  return mapResponseToProfile(data);
}

export async function saveProfile(data: Partial<ProfileData>): Promise<ProfileData> {
  const payload = toSnakePayload(data);
  const { data: res } = await backendApi.put<ProfileResponse>(PROFILE_ENDPOINTS.save, payload, {
    toastSuccessMessage: "Profile saved.",
  });
  return mapResponseToProfile(res);
}
