import { serverApiRequest } from "@/src/infrastructure/http/server-http";
import {
  getHttpErrorResponseData,
  getHttpErrorStatus,
} from "@/src/shared/utils/http-error";
import { limparCacheMusicasArtista } from "@/src/app/api/musicas/artista/cache";
import type { MusicaBackend } from "@/src/shared/types/musica.types";
import { NextRequest, NextResponse } from "next/server";

const CACHE_TTL_MS = 5 * 60 * 1000;

let musicasCache: {
  data: MusicaBackend[];
  expiresAt: number;
} | null = null;

export function limparCacheMusicas() {
  musicasCache = null;
}

async function buscarMusicasComCache(): Promise<MusicaBackend[]> {
  if (musicasCache && musicasCache.expiresAt > Date.now()) {
    return musicasCache.data;
  }

  const response = await serverApiRequest<MusicaBackend[]>({
    method: "GET",
    url: "/musicas",
  });

  musicasCache = {
    data: response.data,
    expiresAt: Date.now() + CACHE_TTL_MS,
  };

  return response.data;
}

function buscarMusicaPorNome(musicas: MusicaBackend[], nome: string) {
  const termoBusca = nome.trim().toLowerCase();

  if (!termoBusca) {
    return null;
  }

  return (
    musicas.find((musica) => musica.nome.toLowerCase().includes(termoBusca)) ??
    null
  );
}

export async function GET(request?: NextRequest) {
  try {
    const musicas = await buscarMusicasComCache();
    const nome = request
      ? new URL(request.url).searchParams.get("nome")
      : null;

    if (nome) {
      return NextResponse.json(buscarMusicaPorNome(musicas, nome));
    }

    return NextResponse.json(musicas);
  } catch (error: unknown) {
    console.error("ROUTE ERROR:", getHttpErrorResponseData(error) ?? error);
    return NextResponse.json(
      { message: "Erro ao buscar músicas" },
      { status: getHttpErrorStatus(error) },
    );
  }
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  if (!formData.get("nome")) {
    return NextResponse.json(
      { message: "Nome da música não informado" },
      { status: 400 },
    );
  }

  if (!formData.get("arquivo")) {
    return NextResponse.json(
      { message: "Arquivo da música não informado" },
      { status: 400 },
    );
  }

  try {
    const response = await serverApiRequest({
      method: "POST",
      url: "/musicas",
      data: formData,
    });

    limparCacheMusicas();
    limparCacheMusicasArtista();

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    const errorResponseData = getHttpErrorResponseData(error);

    console.error("ROUTE ERROR:", errorResponseData ?? error);

    return NextResponse.json(
      errorResponseData ?? { message: "Erro ao criar música" },
      { status: getHttpErrorStatus(error) },
    );
  }
}
