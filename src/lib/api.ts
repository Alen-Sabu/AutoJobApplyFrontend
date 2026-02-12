import { login, type Token } from "./authApi";

export async function loginUser(email: string, password: string): Promise<Token> {
  return login(email, password);
}

export { backendApi } from "./axios";
