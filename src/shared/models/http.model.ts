export interface NovoRecursoResponse {
    mensagem: string;
    criado: boolean;
    criadoEm: Date;
}

export interface RecursoAtualizadoResponse {
    mensagem: string;
    atualizado: boolean;
    atualizadoEm: Date;
}

export interface RecursoDeletadoResponse {
    mensagem: string;
    deletado: boolean;
    deletadoEm: Date;
}