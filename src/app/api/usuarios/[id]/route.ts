import {
  AtualizarUsuarioParcialmenteRequest,
  UsuarioResponse,
} from "@/src/features/usuario/models/dto.model";
import { serverApiRequest } from "@/src/infrastructure/http/server-http";
import {
  RecursoAtualizadoResponse,
  RecursoDeletadoResponse,
} from "@/src/shared/models/http.model";
import {
  getHttpErrorResponseData,
  getHttpErrorStatus,
} from "@/src/shared/utils/http-error";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;

  try {
    const response = await serverApiRequest<UsuarioResponse>({
      method: "GET",
      url: `/usuarios/${id}`,
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error("ROUTE ERROR:", getHttpErrorResponseData(error) ?? error);

    return NextResponse.json(
      { message: "Erro ao buscar usuário" },
      { status: getHttpErrorStatus(error) },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: Params,
) {
  const { id } = await params;
  const body: AtualizarUsuarioParcialmenteRequest = await request.json();

  try {
    const response = await serverApiRequest<RecursoAtualizadoResponse>({
      method: 'PATCH',
      url: `/usuarios/${id}`,
      data: body,
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error("ROUTE ERROR:", getHttpErrorResponseData(error) ?? error);

    return NextResponse.json(
      { message: "Erro ao atualizar usuário" },
      { status: getHttpErrorStatus(error) },
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;

  try {
    const response = await serverApiRequest<RecursoDeletadoResponse>({
      method: "DELETE",
      url: `/usuarios/${id}`,
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error("ROUTE ERROR:", getHttpErrorResponseData(error) ?? error);

    return NextResponse.json(
      { message: "Erro ao desativar usuário" },
      { status: getHttpErrorStatus(error) },
    );
  }
}
