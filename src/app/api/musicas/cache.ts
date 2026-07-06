import { revalidateTag, unstable_cache } from "next/cache";
import {
  getServerAccessToken,
  serverApiRequestWithAccessToken,
} from "@/src/infrastructure/http/server-http";
import type { MusicaBackend } from "@/src/shared/types/musica.types";

export const MUSICAS_CACHE_TAG = "musicas";
const CACHE_TTL_SECONDS = 5 * 60;

export async function buscarMusicasComCache(): Promise<MusicaBackend[]> {
  const requestConfig = {
    method: "GET",
    url: "/musicas",
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
    ["musicas"],
    {
      tags: [MUSICAS_CACHE_TAG],
      revalidate: CACHE_TTL_SECONDS,
    },
  )();
}

export function limparCacheMusicas() {
  revalidateTag(MUSICAS_CACHE_TAG, { expire: 0 });
}
