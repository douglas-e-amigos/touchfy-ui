export interface CriarUsuarioRequest {
    nome: string;
    email: string;
    senha: string;
    senhaNovamente: string;
    dataNascimento: Date;
}