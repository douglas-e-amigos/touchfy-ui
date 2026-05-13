import { serverApiRequest } from "@/src/app/infrastructure/http/server-http";
import { RecursoAtualizadoResponse } from "@/src/app/shared/models/http.model";
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
  } catch (error: any) {
    console.error("ROUTE ERROR:", error?.response?.data || error);

    return NextResponse.json(
      { message: "Erro ao atualizar foto de perfil" },
      { status: error?.response?.status || 500 },
    );
  }
}