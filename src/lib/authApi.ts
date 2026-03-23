/**
 * Auth API – login and register against FastAPI backend.
 * Matches autojobapply/app/api/v1/endpoints/auth.py and schemas/auth.py.
 */
import { backendApi, safeBackendData } from "./axios";

export interface UserInfo {
  id: number;
  email: string;
  full_name: string | null;
  role: string;
  is_superuser: boolean;
}

export interface Token {
  access_token: string;
  token_type: string;
  user?: UserInfo;
}

export interface UserCreate {
  email: string;
  password: string;
  full_name?: string | null;
}

export interface UserResponse {
  id: number;
  email: string;
  full_name: string | null;
  is_active: boolean;
}

const AUTH = {
  login: "/auth/login",
  register: "/auth/register",
  registerCompany: "/auth/register/company",
  adminLogin: "/auth/admin-login",
} as const;

/**
 * Login: POST /auth/login with OAuth2 form (username=email, password).
 * Returns JWT; store access_token in localStorage for backendApi interceptor.
 */
export async function login(email: string, password: string): Promise<Token | undefined> {
  const params = new URLSearchParams();
  params.append("username", email);
  params.append("password", password);
  return safeBackendData(() =>
    backendApi.post<Token>(AUTH.login, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      toastSuccessMessage: "Signed in successfully.",
    })
  );
}

/**
 * Admin login: POST /auth/admin-login with OAuth2 form.
 * Only succeeds for users with is_superuser=True.
 */
export async function loginAdmin(email: string, password: string): Promise<Token | undefined> {
  const params = new URLSearchParams();
  params.append("username", email);
  params.append("password", password);
  return safeBackendData(() =>
    backendApi.post<Token>(AUTH.adminLogin, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      toastSuccessMessage: "Signed in as admin.",
    })
  );
}

/**
 * Register: POST /auth/register with JSON { email, password, full_name? }.
 */
export async function register(payload: UserCreate): Promise<UserResponse | undefined> {
  return safeBackendData(() =>
    backendApi.post<UserResponse>(AUTH.register, payload, {
      toastSuccessMessage: "Account created. Please sign in.",
    })
  );
}

export interface CompanyRegisterPayload {
  email: string;
  password: string;
  full_name?: string | null;
  company_name: string;
  description?: string | null;
  website?: string | null;
}

/**
 * Company signup: POST /auth/register/company. Returns token + user; store and redirect to /company.
 */
export async function registerCompany(payload: CompanyRegisterPayload): Promise<Token | undefined> {
  return safeBackendData(() =>
    backendApi.post<Token>(AUTH.registerCompany, payload, {
      toastSuccessMessage: "Company account created.",
    })
  );
}
