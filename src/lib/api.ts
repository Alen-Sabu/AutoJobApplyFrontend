import { backendApi } from "./axios";

export async function loginUser(email: string, password: string) {
  const res = await backendApi.post("/token", { email, password });
  return res.data;
}

export async function refreshToken(refresh: string) {
  const res = await backendApi.post("/token/refresh", { refresh });
  return res.data;
}

export { backendApi };
