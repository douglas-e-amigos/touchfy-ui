export interface RegisterForm {
    nome: string;
    nomeUsuario: string;
    email: string;
    senha: string;
    senhaNovamente: string;
    dataNascimento: string;
}

export interface LoginForm {
    nomeUsuario: string;
    senha: string;
}