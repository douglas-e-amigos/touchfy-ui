import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import type { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { serverApiRequest } from "@/src/infrastructure/http/server-http";
import { GET } from "./route";

vi.mock("@/src/infrastructure/http/server-http", () => ({
  serverApiRequest: vi.fn(),
}));

const serverApiRequestMock = vi.mocked(serverApiRequest);

function createRequest(range?: string): NextRequest {
  return new Request("http://localhost/api/musicas/stream/musica-id", {
    headers: range ? { Range: range } : undefined,
  }) as unknown as NextRequest;
}

function createParams(id = "musica-id") {
  return {
    params: Promise.resolve({ id }),
  };
}

function createAudioResponse(
  headers: AxiosResponse<ArrayBuffer>["headers"],
  status = 206,
): AxiosResponse<ArrayBuffer> {
  return {
    data: new Uint8Array([1, 2, 3]).buffer,
    status,
    statusText: status === 206 ? "Partial Content" : "OK",
    headers,
    config: {} as InternalAxiosRequestConfig,
  };
}

describe("GET /api/musicas/stream/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("repassa Range para o backend e preserva headers de streaming", async () => {
    serverApiRequestMock.mockResolvedValueOnce(
      createAudioResponse({
        "content-type": "audio/mpeg",
        "content-disposition": 'inline; filename="musica.mp3"',
        "content-length": "1024",
        "accept-ranges": "bytes",
        "content-range": "bytes 0-1023/4096",
      }),
    );

    const response = await GET(createRequest("bytes=0-1023"), createParams());

    expect(serverApiRequestMock).toHaveBeenCalledWith({
      method: "GET",
      url: "/musicas/stream/musica-id",
      responseType: "arraybuffer",
      headers: { Range: "bytes=0-1023" },
    });
    expect(response.status).toBe(206);
    expect(response.headers.get("content-type")).toBe("audio/mpeg");
    expect(response.headers.get("content-disposition")).toBe(
      'inline; filename="musica.mp3"',
    );
    expect(response.headers.get("content-length")).toBe("1024");
    expect(response.headers.get("accept-ranges")).toBe("bytes");
    expect(response.headers.get("content-range")).toBe("bytes 0-1023/4096");
  });
});
