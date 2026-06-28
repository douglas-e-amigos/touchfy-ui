import { beforeEach, describe, expect, it, vi } from "vitest";
import { serverApiRequest } from "@/src/infrastructure/http/server-http";
import { GET } from "./route";

vi.mock("@/src/infrastructure/http/server-http", () => ({
  serverApiRequest: vi.fn(),
}));

const serverApiRequestMock = vi.mocked(serverApiRequest);

describe("GET /api/musicas", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retorna a lista de músicas do backend", async () => {
    const mockMusicas = [
      {
        id: "1",
        nome: "Musica 1",
        caminhoDoArquivo: "/path/1",
        letra: "",
        tags: [],
        generosMusicais: [],
      },
    ];

    serverApiRequestMock.mockResolvedValueOnce({
      data: mockMusicas,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    } as any);

    const response = await GET();

    expect(serverApiRequestMock).toHaveBeenCalledWith({
      method: "GET",
      url: "/musicas",
    });
    await expect(response.json()).resolves.toEqual(mockMusicas);
  });

  it("retorna erro quando o backend falha", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    serverApiRequestMock.mockRejectedValueOnce({
      isAxiosError: true,
      response: {
        data: { message: "Erro interno" },
        status: 500,
      },
    });

    try {
      const response = await GET();

      expect(response.status).toBe(500);
      await expect(response.json()).resolves.toEqual({
        message: "Erro ao buscar músicas",
      });
    } finally {
      consoleError.mockRestore();
    }
  });
});
