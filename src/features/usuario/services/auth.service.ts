import httpClient from "@/src/infrastructure/http/http-client";
import { AutenticarUsuarioRequest, TokenResponse } from "../models/dto.model";

export class AuthService {
  async autenticarUsuario(request: AutenticarUsuarioRequest) {
    await httpClient.post<TokenResponse>("auth/login", request);
  }

  async logout() {
    await httpClient.post("auth/logout");
  }
}

export const authService = new AuthService();
