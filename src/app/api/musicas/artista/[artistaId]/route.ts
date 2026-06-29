import { serverApiRequest } from "@/src/infrastructure/http/server-http";
import {
  getHttpErrorResponseData,
  getHttpErrorStatus,
} from "@/src/shared/utils/http-error";
import type { MusicaBackend } from "@/src/shared/types/musica.types";
import { NextRequest, NextResponse } from "next/server";

const CACHE_TTL_MS = 5 * 60 * 1000;

const cache = new Map<string, { data: MusicaBackend[]; expiresAt: number }>();

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ artistaId: string }> },
) {
  const { artistaId } = await params;

  if (!artistaId) {
    return NextResponse.json(
      { message: "ID do artista não informado" },
      { status: 400 },
    );
  }

  const cached = cache.get(artistaId);
  if (cached && cached.expiresAt > Date.now()) {
    return NextResponse.json(cached.data);
  }

  try {
    const response = await serverApiRequest<MusicaBackend[]>({
      method: "GET",
      url: `/musicas/artista/${artistaId}`,
    });

    cache.set(artistaId, {
      data: response.data,
      expiresAt: Date.now() + CACHE_TTL_MS,
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error("ROUTE ERROR:", getHttpErrorResponseData(error) ?? error);
    return NextResponse.json(
      { message: "Erro ao buscar músicas do artista" },
      { status: getHttpErrorStatus(error) },
    );
  }
}
