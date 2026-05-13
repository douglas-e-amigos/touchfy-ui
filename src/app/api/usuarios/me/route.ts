import { UsuarioResponse } from "@/src/app/features/usuario/models/dto.model";
import { serverApiRequest } from "@/src/app/infrastructure/http/server-http";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  void request;

  try {
    const response = await serverApiRequest<UsuarioResponse>({
      method: "GET",
      url: "/usuarios/me",
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("ROUTE ERROR:", error?.response?.data || error);

    return NextResponse.json(
      { message: "Erro ao buscar usuário logado" },
      { status: error?.response?.status || 500 },
    );
  }
}