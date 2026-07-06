import { revalidateTag, unstable_cache } from "next/cache";
import { MUSICAS_CACHE_TAG } from "@/src/app/api/musicas/cache";
import {
  getServerAccessToken,
  serverApiRequestWithAccessToken,
} from "@/src/infrastructure/http/server-http";
import type { MusicaBackend } from "@/src/shared/types/musica.types";

const MUSICAS_ARTISTAS_CACHE_TAG = "musicas-artistas";
const CACHE_TTL_SECONDS = 5 * 60;

function getMusicasArtistaCacheTag(artistaId: string) {
  return `${MUSICAS_ARTISTAS_CACHE_TAG}:${artistaId}`;
}

export async function buscarMusicasArtistaComCache(
  artistaId: string,
): Promise<MusicaBackend[]> {
  const requestConfig = {
    method: "GET",
    url: `/musicas/artista/${artistaId}`,
  };
  const accessToken = await getServerAccessToken(requestConfig);

  return unstable_cache(
    async () => {
      const response = await serverApiRequestWithAccessToken<MusicaBackend[]>(
        requestConfig,
        accessToken,
      );

      return response.data;
    },
    ["musicas-artista", artistaId],
    {
      tags: [
        MUSICAS_CACHE_TAG,
        MUSICAS_ARTISTAS_CACHE_TAG,
        getMusicasArtistaCacheTag(artistaId),
      ],
      revalidate: CACHE_TTL_SECONDS,
    },
  )();
}

export function limparCacheMusicasArtista(artistaId?: string): void {
  revalidateTag(
    artistaId
      ? getMusicasArtistaCacheTag(artistaId)
      : MUSICAS_ARTISTAS_CACHE_TAG,
    { expire: 0 },
  );
}
