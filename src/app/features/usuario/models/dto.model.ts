export interface CriarUsuarioRequest {
    nome: string;
    email: string;
    senha: string;
    senhaNovamente: string;
    dataNascimento: Date;
}

export interface AutenticarUsuarioRequest {
    nomeUsuario: string;
    senha: string;
}

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}