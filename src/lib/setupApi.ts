/**
 * Setup / KYC API – resume + required details before applying to jobs or creating automations.
 * Dummy implementation uses localStorage; replace with real endpoints when ready.
 */

const SETUP_COMPLETE_KEY = "crypgo_setup_complete";
const SETUP_DATA_KEY = "crypgo_setup_data";

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
  /** Dummy: no real file URL */
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

const defaultPersonal: SetupPersonalDetails = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  linkedInUrl: "",
  yearsExperience: "",
  topSkills: "",
};

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

function getStoredComplete(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SETUP_COMPLETE_KEY) === "1";
}

function getStoredData(): SetupData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SETUP_DATA_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SetupData;
  } catch {
    return null;
  }
}

function setStoredComplete(complete: boolean): void {
  if (typeof window === "undefined") return;
  if (complete) localStorage.setItem(SETUP_COMPLETE_KEY, "1");
  else localStorage.removeItem(SETUP_COMPLETE_KEY);
}

function setStoredData(data: SetupData | null): void {
  if (typeof window === "undefined") return;
  if (data) localStorage.setItem(SETUP_DATA_KEY, JSON.stringify(data));
  else localStorage.removeItem(SETUP_DATA_KEY);
}

/**
 * Returns current setup status (complete flag + saved data).
 * Safe to call on client only; uses localStorage in dummy mode.
 */
export function getSetupStatus(): SetupStatus {
  const complete = getStoredComplete();
  const data = getStoredData();
  return { complete, data };
}

/**
 * Async version for consistency with other APIs; resolves after a short delay.
 */
export async function fetchSetupStatus(): Promise<SetupStatus> {
  await delay(150);
  return getSetupStatus();
}

/**
 * Save personal details (step 1). Does not complete setup until resume is uploaded and user submits.
 */
export async function savePersonalDetails(personal: Partial<SetupPersonalDetails>): Promise<SetupData> {
  await delay(250);
  const existing = getStoredData();
  const nextPersonal: SetupPersonalDetails = {
    ...defaultPersonal,
    ...existing?.personal,
    ...personal,
  };
  const next: SetupData = {
    personal: nextPersonal,
    resume: existing?.resume ?? null,
  };
  setStoredData(next);
  return next;
}

/**
 * Dummy resume upload: accepts a file name and stores it. In production, upload file and store URL.
 */
export async function uploadResume(file: File): Promise<SetupResume> {
  await delay(400);
  const resume: SetupResume = {
    fileName: file.name,
    uploadedAt: new Date().toISOString(),
    url: undefined,
  };
  const existing = getStoredData();
  const next: SetupData = {
    personal: existing?.personal ?? { ...defaultPersonal },
    resume,
  };
  setStoredData(next);
  return resume;
}

/**
 * Mark setup as complete. Call after user has filled personal details and uploaded resume.
 */
export async function completeSetup(): Promise<void> {
  await delay(300);
  const data = getStoredData();
  if (!data?.resume) throw new Error("Please upload your resume before completing setup.");
  if (!data.personal.fullName?.trim() || !data.personal.email?.trim()) {
    throw new Error("Please fill in required personal details (name and email).");
  }
  setStoredComplete(true);
}

/**
 * Reset setup (for testing or "start over"). Clears completion flag and optionally data.
 */
export function resetSetup(clearData?: boolean): void {
  setStoredComplete(false);
  if (clearData) setStoredData(null);
}
