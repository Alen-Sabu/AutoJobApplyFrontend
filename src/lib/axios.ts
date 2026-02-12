import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    toastSuccessMessage?: string;
  }
}

/** Only import toast when in browser to avoid SSR issues */
function showErrorToast(message: string) {
  if (typeof window !== "undefined") {
    import("react-hot-toast").then(({ default: toast }) => toast.error(message));
  }
}

function showSuccessToast(message: string) {
  if (typeof window !== "undefined") {
    import("react-hot-toast").then(({ default: toast }) => toast.success(message));
  }
}

function getSuccessMessage(config: InternalAxiosRequestConfig, method: string): string | null {
  const custom = config.toastSuccessMessage;
  if (custom) return custom;
  const m = (method || "").toLowerCase();
  if (m === "put" || m === "patch" || m === "delete") return "Saved successfully.";
  if (m === "post") return null; // Let the caller show a specific message for POST (e.g. register).
  return null;
}

/** Extract user-facing message from API error (FastAPI detail can be string or array of { msg } or strings) */
function getErrorMessage(err: unknown): string {
  const ax = err as { response?: { data?: { detail?: string | unknown[] } }; message?: string };
  const detail = ax?.response?.data?.detail;
  if (detail != null) {
    if (Array.isArray(detail)) {
      const first = detail[0];
      if (typeof first === "string") return first;
      const withMsg = first as { msg?: string };
      if (typeof withMsg?.msg === "string") return withMsg.msg;
    }
    if (typeof detail === "string") return detail;
  }
  const status = (err as { response?: { status?: number } })?.response?.status;
  if (status === 401) return "Invalid email or password.";
  if (status === 403) return "You don't have permission to do this.";
  if (status === 404) return "Resource not found.";
  if (status && status >= 500) return "Server error. Please try again later.";
  return (err as Error)?.message ?? "An error occurred.";
}

/**
 * Base URL for same-origin requests (Next.js API routes).
 * In the browser, "" keeps requests relative to the current origin.
 */
const getAppBaseURL = () => {
  if (typeof window !== "undefined") return "";
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
};

/**
 * Base URL for the external backend API.
 */
const getBackendBaseURL = () => {
  return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";
};

const defaultHeaders = {
  "Content-Type": "application/json",
};

// —— App API client (Next.js API routes: /api/register, /api/forgot-password/*, etc.) ——
export const api: AxiosInstance = axios.create({
  baseURL: getAppBaseURL(),
  headers: defaultHeaders,
  withCredentials: true,
});

// —— Backend API client (external backend, e.g. Django/FastAPI) ——
export const backendApi: AxiosInstance = axios.create({
  baseURL: getBackendBaseURL(),
  headers: defaultHeaders,
  withCredentials: true,
});

// Optional: attach auth token to backend requests if present
backendApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (res) => {
    const msg = getSuccessMessage(res.config, res.config.method ?? "");
    if (msg) showSuccessToast(msg);
    return res;
  },
  (err) => {
    showErrorToast(getErrorMessage(err));
    return Promise.reject(err);
  }
);

backendApi.interceptors.response.use(
  (res) => {
    const msg = getSuccessMessage(res.config, res.config.method ?? "");
    if (msg) showSuccessToast(msg);
    return res;
  },
  (err) => {
    showErrorToast(getErrorMessage(err));
    return Promise.reject(err);
  }
);

// —— Helpers for app API (same-origin) ——
export const get = api.get.bind(api);
export const post = api.post.bind(api);
export const put = api.put.bind(api);
export const patch = api.patch.bind(api);
export const del = api.delete.bind(api);

// —— Helpers for backend API ——
export const backendGet = backendApi.get.bind(backendApi);
export const backendPost = backendApi.post.bind(backendApi);
export const backendPut = backendApi.put.bind(backendApi);
export const backendPatch = backendApi.patch.bind(backendApi);
export const backendDelete = backendApi.delete.bind(backendApi);

export default api;
