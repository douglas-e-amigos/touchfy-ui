import { serverApiRequest } from "@/src/infrastructure/http/server-http";
import {
  getHttpErrorResponseData,
  getHttpErrorStatus,
} from "@/src/shared/utils/http-error";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
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
    const range = request.headers.get("range");
    const response = await serverApiRequest<ArrayBuffer>({
      method: "GET",
      url: `/musicas/stream/${id}`,
      responseType: "arraybuffer",
      ...(range ? { headers: { Range: range } } : {}),
    });

    const headers = new Headers();
    headers.set(
      "Content-Type",
      getStringHeader(response.headers["content-type"]) ?? "audio/mpeg",
    );
    headers.set(
      "Accept-Ranges",
      getStringHeader(response.headers["accept-ranges"]) ?? "bytes",
    );
    setOptionalHeader(
      headers,
      "Content-Disposition",
      response.headers["content-disposition"],
    );
    setOptionalHeader(
      headers,
      "Content-Length",
      response.headers["content-length"],
    );
    setOptionalHeader(headers, "Content-Range", response.headers["content-range"]);

    return new NextResponse(response.data, {
      status: response.status,
      headers,
    });
  } catch (error: unknown) {
    console.error("STREAM ERROR:", getHttpErrorResponseData(error) ?? error);

    return NextResponse.json(
      { message: "Erro ao reproduzir música" },
      { status: getHttpErrorStatus(error) },
    );
  }
}

function getStringHeader(value: unknown): string | undefined {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value) && typeof value[0] === "string") {
    return value[0];
  }

  return undefined;
}

function setOptionalHeader(headers: Headers, name: string, value: unknown) {
  const stringValue = getStringHeader(value);

  if (stringValue) {
    headers.set(name, stringValue);
  }
}
