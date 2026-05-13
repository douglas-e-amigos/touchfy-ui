import {
  AtualizarUsuarioParcialmenteRequest,
  UsuarioResponse,
} from "@/src/app/features/usuario/models/dto.model";
import { serverApiRequest } from "@/src/app/infrastructure/http/server-http";
import {
  RecursoAtualizadoResponse,
  RecursoDeletadoResponse,
} from "@/src/app/shared/models/http.model";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  void request;
  const { id } = await params;

  try {
    const response = await serverApiRequest<UsuarioResponse>({
      method: "GET",
      url: `/usuarios/${id}`,
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("ROUTE ERROR:", error?.response?.data || error);

    return NextResponse.json(
      { message: "Erro ao buscar usuário" },
      { status: error?.response?.status || 500 },
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
  } catch (error: any) {
    console.error("ROUTE ERROR:", error?.response?.data || error);

    return NextResponse.json(
      { message: "Erro ao atualizar usuário" },
      { status: error?.response?.status || 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  void request;
  const { id } = await params;

  try {
    const response = await serverApiRequest<RecursoDeletadoResponse>({
      method: "DELETE",
      url: `/usuarios/${id}`,
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    // console.log(error.response, 'erro teste')
    console.error("ROUTE ERROR:", error?.response?.data || error);

    return NextResponse.json(
      { message: "Erro ao desativar usuário" },
      { status: error?.response?.status || 500 },
    );
  }
}
