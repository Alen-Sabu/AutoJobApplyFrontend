/**
 * Jobs API – integrates frontend Job list with real backend endpoints.
 *
 * Backend:
 *  - GET    /jobs                          → job catalog
 *  - GET    /user-jobs                    → user's saved/applied jobs (with job nested)
 *  - POST   /user-jobs                    → create saved job for user
 *  - POST   /user-jobs/{id}/submit        → mark as submitted
 *  - DELETE /user-jobs/{id}               → remove from saved jobs
 */

import { backendApi } from "./axios";

export interface JobItem {
  id: number | string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  tags: string[];
  match?: "Good match" | "Average" | "Low";
  /** Internal: user_job id when this job is saved for the current user */
  userJobId?: number;
}

export interface JobsFilters {
  keyword?: string;
  location?: string;
  remoteOnly?: boolean;
}

// Backend shapes
interface JobResponse {
  id: number;
  title: string;
  company: string;
  location: string | null;
  description: string | null;
  job_url: string | null;
  salary_range: string | null;
  job_type: string | null;
  source: string | null;
  external_id?: string | null;
}

export interface UserJobWithJob {
  id: number;
  user_id: number;
  job_id: number;
  automation_id?: number | null;
  status: string;
  notes: string | null;
  resume_path: string | null;
  cover_letter_path: string | null;
  applied_at: string | null;
  created_at: string;
  updated_at: string | null;
  job: JobResponse;
}

function mapJobToItem(job: JobResponse): JobItem {
  return {
    id: job.id,
    title: job.title,
    company: job.company,
    location: job.location ?? "Remote / Flexible",
    type: job.job_type ?? "Unknown",
    salary: job.salary_range ?? "",
    // Simple tags: company + type + source for now
    tags: [job.company, job.job_type, job.source].filter((v): v is string => !!v),
  };
}

function mapUserJobToItem(uj: UserJobWithJob): JobItem {
  const base = mapJobToItem(uj.job);
  return {
    ...base,
    userJobId: uj.id,
  };
}

export async function fetchJobs(filters?: JobsFilters, skip = 0, limit = 100): Promise<JobItem[]> {
  const params: Record<string, unknown> = { skip, limit };
  if (filters?.keyword) params.query = filters.keyword;
  if (filters?.location) params.location = filters.location;

  const { data } = await backendApi.get<JobResponse[]>("/jobs", { params });
  let list = data.map(mapJobToItem);

  if (filters?.remoteOnly) {
    list = list.filter((j) => j.location.toLowerCase().includes("remote"));
  }

  return list;
}

export async function fetchSavedJobs(): Promise<JobItem[]> {
  const { data } = await backendApi.get<UserJobWithJob[]>("/user-jobs", {
    params: { status_filter: "saved", skip: 0, limit: 100 },
  });
  return data.map(mapUserJobToItem);
}

/**
 * Save job to favorites (creates a UserJob row).
 * Returns the created/ existing user_job id so the caller can track it.
 */
export async function saveJobToFavorites(jobId: string | number): Promise<{ userJobId: number }> {
  const numericId = Number(jobId);
  const { data } = await backendApi.post<UserJobWithJob>(
    "/user-jobs",
    { job_id: numericId },
    { toastSuccessMessage: "Saved to favorites." },
  );
  return { userJobId: data.id };
}

/**
 * Unsave job by its UserJob id.
 */
export async function unsaveJob(userJobId: number): Promise<void> {
  await backendApi.delete(`/user-jobs/${userJobId}`, {
    toastSuccessMessage: "Removed from favorites.",
  });
}

/**
 * Apply once – ensure there's a UserJob, then mark it as submitted.
 */
export async function applyOnce(jobId: string | number, existingUserJobId?: number): Promise<void> {
  let userJobId = existingUserJobId;
  if (!userJobId) {
    const created = await backendApi.post<UserJobWithJob>("/user-jobs", {
      job_id: Number(jobId),
    });
    userJobId = created.data.id;
  }

  await backendApi.post(
    `/user-jobs/${userJobId}/submit`,
    {},
    { toastSuccessMessage: "Application submitted." },
  );
}

/**
 * Attach a job to an automation (adds to user's list linked to that automation; status saved).
 * User can then submit from the automation's jobs page or from here.
 */
export async function attachJobToAutomation(jobId: string | number, automationId: string | number): Promise<{ userJobId: number }> {
  const { data } = await backendApi.post<UserJobWithJob>("/user-jobs", {
    job_id: Number(jobId),
    automation_id: Number(automationId),
  }, {
    toastSuccessMessage: "Job attached to automation.",
  });
  return { userJobId: data.id };
}

/**
 * Submit a user_job (mark as applied). Use when you already have the user_job id.
 */
export async function submitUserJob(userJobId: number): Promise<void> {
  await backendApi.post(
    `/user-jobs/${userJobId}/submit`,
    {},
    { toastSuccessMessage: "Application submitted." },
  );
}

/**
 * Fetch jobs linked to a specific automation (saved or applied).
 */
export async function fetchJobsForAutomation(automationId: number): Promise<UserJobWithJob[]> {
  const { data } = await backendApi.get<UserJobWithJob[]>(`/automations/${automationId}/jobs`, {
    params: { skip: 0, limit: 200 },
  });
  return data;
}

