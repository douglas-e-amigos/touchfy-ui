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
      url: "/musicas",
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error("ROUTE ERROR:", getHttpErrorResponseData(error) ?? error);
    return NextResponse.json(
      { message: "Erro ao buscar músicas" },
      { status: getHttpErrorStatus(error) },
    );
  }
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  if (!formData.get("nome")) {
    return NextResponse.json(
      { message: "Nome da música não informado" },
      { status: 400 },
    );
  }

  if (!formData.get("arquivo")) {
    return NextResponse.json(
      { message: "Arquivo da música não informado" },
      { status: 400 },
    );
  }

  try {
    const response = await serverApiRequest({
      method: "POST",
      url: "/musicas",
      data: formData,
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    const errorResponseData = getHttpErrorResponseData(error);

    console.error("ROUTE ERROR:", errorResponseData ?? error);

    return NextResponse.json(
      errorResponseData ?? { message: "Erro ao criar música" },
      { status: getHttpErrorStatus(error) },
    );
  }
}
