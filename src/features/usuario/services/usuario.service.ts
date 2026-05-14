import httpClient from "@/src/infrastructure/http/http-client";
import {
  AtualizarUsuarioParcialmenteRequest,
  CriarUsuarioRequest,
  UsuarioResponse,
} from "../models/dto.model";
import {
  NovoRecursoResponse,
  RecursoAtualizadoResponse,
  RecursoDeletadoResponse,
} from "@/src/shared/models/http.model";

export class UsuarioService {
  async cadastrarUsuario(
    request: CriarUsuarioRequest,
  ): Promise<NovoRecursoResponse> {
    const response = await httpClient.post<NovoRecursoResponse>(
      "usuarios",
      request,
    );
    return response.data;
  }

  async atualizarUsuarioParcialmente(
    request: AtualizarUsuarioParcialmenteRequest,
    id: string,
  ): Promise<RecursoAtualizadoResponse> {
    const response = await httpClient.patch<RecursoAtualizadoResponse>(
      `usuarios/${id}`,
      request,
    );

    return response.data;
  }

  async buscarUsuario(id: string): Promise<UsuarioResponse> {
    const response = await httpClient.get<UsuarioResponse>(`/usuarios/${id}`);
    return response.data;
  }

  async buscarUsuarioLogado(): Promise<UsuarioResponse> {
    const response = await httpClient.get<UsuarioResponse>("/usuarios/me");
    return response.data;
  }

  async atualizarFotoPerfil(
    id: string,
    fotoPerfil: File,
  ): Promise<RecursoAtualizadoResponse> {
    const formData = new FormData();
    formData.append("foto", fotoPerfil);

    const response = await httpClient.patch<RecursoAtualizadoResponse>(
      `/usuarios/${id}/foto-de-perfil`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  }

  async desativarUsuario(id: string): Promise<RecursoDeletadoResponse> {
    const response = await httpClient.delete<RecursoDeletadoResponse>(
      `/usuarios/${id}`,
    );
    return response.data;
  }
}

export const usuarioService = new UsuarioService();
