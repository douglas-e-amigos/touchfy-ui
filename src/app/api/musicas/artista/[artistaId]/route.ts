import { serverApiRequest } from "@/src/infrastructure/http/server-http";
import {
  getHttpErrorResponseData,
  getHttpErrorStatus,
} from "@/src/shared/utils/http-error";
import { getFromCache, setCache } from "@/src/app/api/musicas/artista/cache";
import type { MusicaBackend } from "@/src/shared/types/musica.types";
import { NextRequest, NextResponse } from "next/server";

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

  const cached = getFromCache(artistaId);
  if (cached) {
    return NextResponse.json(cached);
  }

  try {
    const response = await serverApiRequest<MusicaBackend[]>({
      method: "GET",
      url: `/musicas/artista/${artistaId}`,
    });

    setCache(artistaId, response.data);

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error("ROUTE ERROR:", getHttpErrorResponseData(error) ?? error);
    return NextResponse.json(
      { message: "Erro ao buscar músicas do artista" },
      { status: getHttpErrorStatus(error) },
    );
  }
}
