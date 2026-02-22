/**
 * Company (employer) API – profile, jobs, applicants.
 */
import { backendApi } from "./axios";

const PREFIX = "/company";

export interface CompanyProfile {
  id: number;
  user_id: number;
  company_name: string;
  slug: string | null;
  description: string | null;
  website: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface CompanyJob {
  id: number;
  title: string;
  company: string;
  location: string | null;
  description: string | null;
  job_url: string | null;
  salary_range: string | null;
  job_type: string | null;
  source: string | null;
  status: string;
  created_at: string;
  updated_at: string | null;
}

export interface ApplicantSummary {
  id: number;
  user_id: number;
  user_email: string;
  user_name: string;
  status: string;
  applied_at: string | null;
  created_at: string;
  has_resume?: boolean;
}

export interface CompanyStats {
  total_jobs: number;
  total_applicants: number;
}

export async function fetchCompanyProfile(): Promise<CompanyProfile> {
  const { data } = await backendApi.get<CompanyProfile>(`${PREFIX}/profile`);
  return data;
}

export async function fetchCompanyStats(): Promise<CompanyStats> {
  const { data } = await backendApi.get<CompanyStats>(`${PREFIX}/stats`);
  return data;
}

export async function updateCompanyProfile(payload: Partial<CompanyProfile>): Promise<CompanyProfile> {
  const { data } = await backendApi.put<CompanyProfile>(`${PREFIX}/profile`, payload, {
    toastSuccessMessage: "Profile updated.",
  });
  return data;
}

export async function fetchCompanyJobs(): Promise<CompanyJob[]> {
  const { data } = await backendApi.get<CompanyJob[]>(`${PREFIX}/jobs`);
  return data;
}

export async function createCompanyJob(payload: {
  title: string;
  company: string;
  location?: string | null;
  description?: string | null;
  job_url?: string | null;
  salary_range?: string | null;
  job_type?: string | null;
  source?: string | null;
  status?: string | null;
}): Promise<CompanyJob> {
  const { data } = await backendApi.post<CompanyJob>(`${PREFIX}/jobs`, payload, {
    toastSuccessMessage: "Job created.",
  });
  return data;
}

export async function fetchCompanyJob(jobId: number): Promise<CompanyJob> {
  const { data } = await backendApi.get<CompanyJob>(`${PREFIX}/jobs/${jobId}`);
  return data;
}

export async function fetchJobApplicants(jobId: number): Promise<ApplicantSummary[]> {
  const { data } = await backendApi.get<ApplicantSummary[]>(`${PREFIX}/jobs/${jobId}/applicants`);
  return data;
}

/** Fetch applicant resume as blob (for viewer). */
export async function fetchApplicantResumeBlob(
  jobId: number,
  applicantId: number
): Promise<{ blob: Blob; fileName: string }> {
  const res = await backendApi.get<Blob>(`${PREFIX}/jobs/${jobId}/applicants/${applicantId}/resume`, {
    responseType: "blob",
    toastSuccessMessage: undefined,
  });
  const blob = res.data;
  let fileName = `applicant-${applicantId}-resume.pdf`;
  const disposition = res.headers["content-disposition"];
  if (typeof disposition === "string") {
    const match = /filename[^;=\n]*=([^;\n"]+|"[^"]+")/i.exec(disposition);
    if (match?.[1]) fileName = match[1].replace(/^"+|"+$/g, "").trim();
  }
  return { blob, fileName };
}

/** Download applicant resume (triggers file save). */
export async function downloadApplicantResume(jobId: number, applicantId: number): Promise<void> {
  const { blob, fileName } = await fetchApplicantResumeBlob(jobId, applicantId);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
