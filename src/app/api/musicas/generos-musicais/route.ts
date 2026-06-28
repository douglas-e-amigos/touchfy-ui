import { serverApiRequest } from "@/src/infrastructure/http/server-http";
import {
  getHttpErrorResponseData,
  getHttpErrorStatus,
} from "@/src/shared/utils/http-error";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await serverApiRequest({
      method: "GET",
      url: "/musicas/generos-musicais",
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error("ROUTE ERROR:", getHttpErrorResponseData(error) ?? error);
    return NextResponse.json(
      { message: "Erro ao buscar gêneros musicais" },
      { status: getHttpErrorStatus(error) },
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const response = await serverApiRequest({
      method: "POST",
      url: "/musicas/generos-musicais",
      data: body,
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    const errorResponseData = getHttpErrorResponseData(error);

    console.error("ROUTE ERROR:", errorResponseData ?? error);

    return NextResponse.json(
      errorResponseData ?? { message: "Erro ao criar gênero musical" },
      { status: getHttpErrorStatus(error) },
    );
  }
}
