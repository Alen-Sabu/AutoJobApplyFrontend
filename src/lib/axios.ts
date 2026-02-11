import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";

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
  return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";
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

// Reject with error so callers can handle (e.g. toast in component)
api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

backendApi.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
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
