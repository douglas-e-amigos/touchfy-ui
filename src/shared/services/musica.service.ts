import httpClient from "@/src/infrastructure/http/http-client";
import type { NovoRecursoResponse } from "@/src/shared/models/http.model";
import type {
  CriarMusicaRequest,
  GeneroMusical,
  MusicaBackend,
  Tag,
} from "@/src/shared/types/musica.types";

const CACHE_TTL = 5 * 60 * 1000;

let cache: MusicaBackend[] | null = null;
let cacheTimestamp = 0;

class MusicaService {
  async criar(request: CriarMusicaRequest): Promise<NovoRecursoResponse> {
    const formData = new FormData();
    formData.append("nome", request.nome);

    if (request.letra.trim()) {
      formData.append("letra", request.letra);
    }

    request.tagIds.forEach((tagId) => formData.append("tagIds", tagId));
    request.generoMusicalIds.forEach((generoMusicalId) =>
      formData.append("generoMusicalIds", generoMusicalId),
    );
    formData.append("arquivo", request.arquivo);

    const response = await httpClient.post<NovoRecursoResponse>(
      "/musicas",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    this.limparCache();

    return response.data;
  }

  async buscarTodas(): Promise<MusicaBackend[]> {
    if (cache && Date.now() - cacheTimestamp < CACHE_TTL) {
      return cache;
    }

    const response = await httpClient.get<MusicaBackend[]>("/musicas");
    cache = response.data;
    cacheTimestamp = Date.now();
    return response.data;
  }

  async buscarTags(): Promise<Tag[]> {
    const response = await httpClient.get<Tag[]>("/musicas/tags");
    return response.data;
  }

  async criarTag(nome: string): Promise<NovoRecursoResponse> {
    const response = await httpClient.post<NovoRecursoResponse>(
      "/musicas/tags",
      { nome },
    );
    return response.data;
  }

  async buscarGenerosMusicais(): Promise<GeneroMusical[]> {
    const response = await httpClient.get<GeneroMusical[]>(
      "/musicas/generos-musicais",
    );
    return response.data;
  }

  async criarGeneroMusical(nome: string): Promise<NovoRecursoResponse> {
    const response = await httpClient.post<NovoRecursoResponse>(
      "/musicas/generos-musicais",
      { nome },
    );
    return response.data;
  }

  limparCache(): void {
    cache = null;
    cacheTimestamp = 0;
  }
}

export const musicaService = new MusicaService();
