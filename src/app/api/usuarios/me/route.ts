import { UsuarioResponse } from "@/src/features/usuario/models/dto.model";
import { serverApiRequest } from "@/src/infrastructure/http/server-http";
import {
  getHttpErrorResponseData,
  getHttpErrorStatus,
} from "@/src/shared/utils/http-error";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await serverApiRequest<UsuarioResponse>({
      method: "GET",
      url: "/usuarios/me",
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error("ROUTE ERROR:", getHttpErrorResponseData(error) ?? error);

    return NextResponse.json(
      { message: "Erro ao buscar usuário logado" },
      { status: getHttpErrorStatus(error) },
    );
  }
}
