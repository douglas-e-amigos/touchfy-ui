import publicHttpServer from "@/src/infrastructure/http/http-server";
import {
  getHttpErrorResponseData,
  getHttpErrorStatus,
} from "@/src/shared/utils/http-error";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const caminho = request.nextUrl.searchParams.get("caminho");

  if (!caminho) {
    return NextResponse.json(
      { message: "Caminho do arquivo não informado" },
      { status: 400 },
    );
  }

  try {
    const response = await publicHttpServer.get<ArrayBuffer>("/arquivos", {
      params: { caminho },
      responseType: "arraybuffer",
    });

    const contentTypeHeader = response.headers["content-type"];
    const contentDispositionHeader = response.headers["content-disposition"];
    const contentType =
      typeof contentTypeHeader === "string"
        ? contentTypeHeader
        : "application/octet-stream";
    const contentDisposition =
      typeof contentDispositionHeader === "string"
        ? contentDispositionHeader
        : undefined;

    return new NextResponse(response.data, {
      status: response.status,
      headers: {
        "Content-Type": contentType,
        ...(contentDisposition
          ? { "Content-Disposition": contentDisposition }
          : {}),
      },
    });
  } catch (error: unknown) {
    console.error("ROUTE ERROR:", getHttpErrorResponseData(error) ?? error);

    return NextResponse.json(
      { message: "Erro ao buscar arquivo" },
      { status: getHttpErrorStatus(error) },
    );
  }
}
