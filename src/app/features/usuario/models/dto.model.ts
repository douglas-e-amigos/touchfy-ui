export interface CriarUsuarioRequest {
  nome: string;
  nomeUsuario: string;
  email: string;
  senha: string;
  senhaNovamente: string;
  dataNascimento: string;
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

export interface UsuarioResponse {
  id?: string;
  nome: string;
  nomeUsuario: string;
  dataNascimento: string;
  fotoPerfil: string | null;
  email: string;
}
