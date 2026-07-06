import {
  getHttpErrorResponseData,
  getHttpErrorStatus,
} from "@/src/shared/utils/http-error";
import { buscarMusicasArtistaComCache } from "@/src/app/api/musicas/artista/cache";
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

  try {
    const musicas = await buscarMusicasArtistaComCache(artistaId);

    return NextResponse.json(musicas);
  } catch (error: unknown) {
    console.error("ROUTE ERROR:", getHttpErrorResponseData(error) ?? error);
    return NextResponse.json(
      { message: "Erro ao buscar músicas do artista" },
      { status: getHttpErrorStatus(error) },
    );
  }
}
