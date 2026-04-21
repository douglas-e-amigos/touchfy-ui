import httpClient from "@/src/app/infrastructure/http/http-client";
import { CriarUsuarioRequest } from "../models/dto.model";
import { NovoRecursoResponse } from "@/src/app/shared/models/http.model";

export class UsuarioService {
    async cadastrarUsuario(request: CriarUsuarioRequest) {
        const response = await httpClient.post<NovoRecursoResponse>('usuarios', request);
        console.log(response);
    }
}

export const usuarioService = new UsuarioService();