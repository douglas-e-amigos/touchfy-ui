import httpClient from "@/src/infrastructure/http/http-client";
import type { MusicaBackend } from "@/src/shared/types/musica.types";

const CACHE_TTL = 5 * 60 * 1000;

let cache: MusicaBackend[] | null = null;
let cacheTimestamp = 0;

class MusicaService {
  async buscarTodas(): Promise<MusicaBackend[]> {
    if (cache && Date.now() - cacheTimestamp < CACHE_TTL) {
      return cache;
    }

    const response = await httpClient.get<MusicaBackend[]>("/musicas");
    cache = response.data;
    cacheTimestamp = Date.now();
    return response.data;
  }

  limparCache(): void {
    cache = null;
    cacheTimestamp = 0;
  }
}

export const musicaService = new MusicaService();
