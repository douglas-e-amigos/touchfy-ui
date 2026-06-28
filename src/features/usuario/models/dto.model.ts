import type { Pessoa } from "@/src/shared/types/pessoa.types";

export type UsuarioRole = "OUVINTE" | "ARTISTA" | "MODERADOR" | "ADMIN";

export interface CriarUsuarioRequest {
  nome: string;
  nomeUsuario: string;
  email: string;
  senha: string;
  senhaNovamente: string;
  dataNascimento: string;
}

export interface CriarUsuarioComRoleRequest extends CriarUsuarioRequest {
  role: UsuarioRole;
}

export interface AtualizarUsuarioParcialmenteRequest {
  nome: string;
  nomeUsuario: string;
  dataNascimento: string;
}

export interface AutenticarUsuarioRequest {
  nomeUsuario: string;
  senha: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface UsuarioResponse extends Pessoa {}
