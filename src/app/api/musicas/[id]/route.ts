import { RecursoAtualizadoResponse, RecursoDeletadoResponse } from "@/src/shared/models/http.model";
import { serverApiRequest } from "@/src/infrastructure/http/server-http";
import {
  getHttpErrorResponseData,
  getHttpErrorStatus,
} from "@/src/shared/utils/http-error";
import { limparCacheMusicas } from "@/src/app/api/musicas/route";
import { limparCacheMusicasArtista } from "@/src/app/api/musicas/artista/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const response = await serverApiRequest<RecursoDeletadoResponse>({
      method: "DELETE",
      url: `/musicas/${id}`,
    });

    limparCacheMusicas();
    limparCacheMusicasArtista();

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error("ROUTE ERROR:", getHttpErrorResponseData(error) ?? error);
    return NextResponse.json(
      { message: "Erro ao deletar música" },
      { status: getHttpErrorStatus(error) },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const formData = await request.formData();

  try {
    const response = await serverApiRequest<RecursoAtualizadoResponse>({
      method: "PATCH",
      url: `/musicas/${id}`,
      data: formData,
    });

    limparCacheMusicas();
    limparCacheMusicasArtista();

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error("ROUTE ERROR:", getHttpErrorResponseData(error) ?? error);
    return NextResponse.json(
      getHttpErrorResponseData(error) ?? { message: "Erro ao atualizar música" },
      { status: getHttpErrorStatus(error) },
    );
  }
}
