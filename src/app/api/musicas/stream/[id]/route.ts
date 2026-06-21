import { serverApiRequest } from "@/src/infrastructure/http/server-http";
import {
  getHttpErrorResponseData,
  getHttpErrorStatus,
} from "@/src/shared/utils/http-error";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { message: "ID da música não informado" },
      { status: 400 },
    );
  }

  try {
    const response = await serverApiRequest<ArrayBuffer>({
      method: "GET",
      url: `/musicas/stream/${id}`,
      responseType: "arraybuffer",
    });

    const contentType =
      typeof response.headers["content-type"] === "string"
        ? response.headers["content-type"]
        : "audio/mpeg";
    const contentDisposition =
      typeof response.headers["content-disposition"] === "string"
        ? response.headers["content-disposition"]
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
    console.error("STREAM ERROR:", getHttpErrorResponseData(error) ?? error);

    return NextResponse.json(
      { message: "Erro ao reproduzir música" },
      { status: getHttpErrorStatus(error) },
    );
  }
}
