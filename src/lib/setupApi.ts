/**
 * Setup API – onboarding: personal details, resume upload, completion.
 * Uses backend API with auth.
 */
import { backendApi } from "./axios";

const SETUP_BASE = "/setup";

export interface SetupPersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedInUrl: string;
  yearsExperience: string;
  topSkills: string;
}

export interface SetupResume {
  fileName: string;
  uploadedAt: string;
  url?: string;
}

export interface SetupData {
  personal: SetupPersonalDetails;
  resume: SetupResume | null;
}

export interface SetupStatus {
  complete: boolean;
  data: SetupData | null;
}

/** Backend response (snake_case) */
interface SetupPersonalDetailsResponse {
  full_name?: string | null;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  linkedin_url?: string | null;
  years_experience?: string | null;
  top_skills?: string | null;
}

interface SetupResumeResponse {
  fileName: string;
  uploadedAt: string;
  url?: string;
}

interface SetupDataResponse {
  personal: SetupPersonalDetailsResponse;
  resume: SetupResumeResponse | null;
}

interface SetupStatusResponse {
  complete: boolean;
  data: SetupDataResponse | null;
}

function mapPersonalToFrontend(p: SetupPersonalDetailsResponse): SetupPersonalDetails {
  return {
    fullName: p.full_name ?? "",
    email: p.email ?? "",
    phone: p.phone ?? "",
    location: p.location ?? "",
    linkedInUrl: p.linkedin_url ?? "",
    yearsExperience: p.years_experience ?? "",
    topSkills: p.top_skills ?? "",
  };
}

function mapDataToFrontend(d: SetupDataResponse | null): SetupData | null {
  if (!d) return null;
  return {
    personal: mapPersonalToFrontend(d.personal),
    resume: d.resume
      ? {
          fileName: d.resume.fileName,
          uploadedAt: d.resume.uploadedAt,
          url: d.resume.url,
        }
      : null,
  };
}

/** Request body for PUT personal (snake_case for backend) */
function personalToBackend(p: Partial<SetupPersonalDetails>): Record<string, string> {
  const out: Record<string, string> = {};
  if (p.fullName !== undefined) out.full_name = p.fullName;
  if (p.email !== undefined) out.email = p.email;
  if (p.phone !== undefined) out.phone = p.phone;
  if (p.location !== undefined) out.location = p.location;
  if (p.linkedInUrl !== undefined) out.linkedin_url = p.linkedInUrl;
  if (p.yearsExperience !== undefined) out.years_experience = p.yearsExperience;
  if (p.topSkills !== undefined) out.top_skills = p.topSkills;
  return out;
}

export async function fetchSetupStatus(): Promise<SetupStatus> {
  const { data } = await backendApi.get<SetupStatusResponse>(`${SETUP_BASE}/status`);
  return {
    complete: data.complete,
    data: mapDataToFrontend(data.data),
  };
}

export async function savePersonalDetails(
  personal: Partial<SetupPersonalDetails>
): Promise<SetupData> {
  const payload = personalToBackend(personal);
  const { data } = await backendApi.put<SetupDataResponse>(`${SETUP_BASE}/personal`, payload, {
    toastSuccessMessage: "Personal details saved.",
  });
  return mapDataToFrontend(data)!;
}

/**
 * Upload or replace resume. Same API for first upload and changing resume.
 * @param file - PDF or DOC/DOCX file (max 5MB)
 * @param successMessage - Optional toast message (default: "Resume uploaded.")
 */
export async function uploadResume(
  file: File,
  successMessage: string = "Resume uploaded."
): Promise<SetupResume> {
  const form = new FormData();
  form.append("file", file);
  const { data } = await backendApi.post<SetupResumeResponse>(`${SETUP_BASE}/resume`, form, {
    headers: { "Content-Type": "multipart/form-data" },
    toastSuccessMessage: successMessage,
  });
  return {
    fileName: data.fileName,
    uploadedAt: data.uploadedAt,
    url: data.url,
  };
}

export async function completeSetup(): Promise<void> {
  await backendApi.post(`${SETUP_BASE}/complete`, {}, {
    toastSuccessMessage: "Setup complete. Welcome!",
  });
}

/**
 * Download the user's resume (authenticated). Returns blob for PDF/view or download.
 */
export async function downloadResume(): Promise<Blob> {
  const { data } = await backendApi.get<Blob>(`${SETUP_BASE}/resume`, {
    responseType: "blob",
  });
  return data;
}

/**
 * Base URL for setup resume (for building download link with auth).
 * Prefer using downloadResume() and creating a blob URL for viewing.
 */
export function getResumeDownloadApiPath(): string {
  return SETUP_BASE + "/resume";
}
