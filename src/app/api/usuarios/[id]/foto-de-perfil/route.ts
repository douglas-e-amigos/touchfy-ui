import { serverApiRequest } from "@/src/infrastructure/http/server-http";
import { RecursoAtualizadoResponse } from "@/src/shared/models/http.model";
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

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const formData = await request.formData();

  if (!formData.get("foto")) {
    return NextResponse.json(
      { message: "Arquivo de foto de perfil não informado" },
      { status: 400 },
    );
  }

  try {
    const response = await serverApiRequest<RecursoAtualizadoResponse>({
      method: "PATCH",
      url: `/usuarios/${id}/foto-de-perfil`,
      data: formData,
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    const errorResponseData = getHttpErrorResponseData(error);

    console.error("ROUTE ERROR:", errorResponseData ?? error);

    return NextResponse.json(
      errorResponseData ?? {
        message: "Erro ao atualizar foto de perfil",
      },
      { status: getHttpErrorStatus(error) },
    );
  }
}
