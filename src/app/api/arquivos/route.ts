import httpServer from "@/src/app/infrastructure/http/http-server";
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
    const response = await httpServer.get<ArrayBuffer>("/arquivos", {
      params: { caminho },
      responseType: "arraybuffer",
    });

    const contentType = response.headers["content-type"] || "application/octet-stream";
    const contentDisposition = response.headers["content-disposition"];

    return new NextResponse(response.data, {
      status: response.status,
      headers: {
        "Content-Type": contentType,
        ...(contentDisposition
          ? { "Content-Disposition": contentDisposition }
          : {}),
      },
    });
  } catch (error: any) {
    console.error("ROUTE ERROR:", error?.response?.data || error);

    return NextResponse.json(
      { message: "Erro ao buscar arquivo" },
      { status: error?.response?.status || 500 },
    );
  }
}