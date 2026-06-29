import type { MusicaBackend } from "@/src/shared/types/musica.types";

const CACHE_TTL_MS = 5 * 60 * 1000;

const cache = new Map<string, { data: MusicaBackend[]; expiresAt: number }>();

export function getFromCache(artistaId: string): MusicaBackend[] | null {
  const cached = cache.get(artistaId);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }
  return null;
}

export function setCache(artistaId: string, data: MusicaBackend[]): void {
  cache.set(artistaId, {
    data,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
}

export function limparCacheMusicasArtista(): void {
  cache.clear();
}
