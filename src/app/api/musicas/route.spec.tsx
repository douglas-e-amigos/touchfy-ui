import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AxiosResponse } from "axios";
import type { NextRequest } from "next/server";
import { serverApiRequest } from "@/src/infrastructure/http/server-http";
import { GET, POST, limparCacheMusicas } from "./route";

vi.mock("@/src/infrastructure/http/server-http", () => ({
  serverApiRequest: vi.fn(),
}));

const serverApiRequestMock = vi.mocked(serverApiRequest);

function createAxiosResponse<T>(data: T): AxiosResponse<T> {
  return {
    data,
    status: 200,
    statusText: "OK",
    headers: {},
    config: {} as AxiosResponse<T>["config"],
  };
}

function createPostRequest(formData: FormData): NextRequest {
  return new Request("http://localhost/api/musicas", {
    method: "POST",
    body: formData,
  }) as unknown as NextRequest;
}

function createGetRequest(nome: string): NextRequest {
  return new Request(
    `http://localhost/api/musicas?nome=${encodeURIComponent(nome)}`,
  ) as unknown as NextRequest;
}

describe("GET /api/musicas", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    limparCacheMusicas();
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

    serverApiRequestMock.mockResolvedValueOnce(createAxiosResponse(mockMusicas));

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

  it("mantém todas as músicas em cache na rota Next", async () => {
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

    serverApiRequestMock.mockResolvedValueOnce(createAxiosResponse(mockMusicas));

    const firstResponse = await GET();
    const secondResponse = await GET();

    expect(serverApiRequestMock).toHaveBeenCalledTimes(1);
    await expect(firstResponse.json()).resolves.toEqual(mockMusicas);
    await expect(secondResponse.json()).resolves.toEqual(mockMusicas);
  });

  it("busca música por nome usando o cache da rota Next", async () => {
    const mockMusicas = [
      {
        id: "1",
        nome: "Around the World",
        caminhoDoArquivo: "/path/1",
        letra: "",
        tags: [],
        generosMusicais: [],
      },
      {
        id: "2",
        nome: "One More Time",
        caminhoDoArquivo: "/path/2",
        letra: "",
        tags: [],
        generosMusicais: [],
      },
    ];

    serverApiRequestMock.mockResolvedValueOnce(createAxiosResponse(mockMusicas));

    const firstResponse = await GET(createGetRequest("around"));
    const secondResponse = await GET(createGetRequest("one"));

    expect(serverApiRequestMock).toHaveBeenCalledTimes(1);
    await expect(firstResponse.json()).resolves.toEqual(mockMusicas[0]);
    await expect(secondResponse.json()).resolves.toEqual(mockMusicas[1]);
  });
});

describe("POST /api/musicas", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    limparCacheMusicas();
  });

  it("repassa o cadastro de música para o backend", async () => {
    const formData = new FormData();
    formData.append("nome", "Nova música");
    formData.append("arquivo", "musica.mp3");

    serverApiRequestMock.mockResolvedValueOnce(
      createAxiosResponse({ mensagem: "Música criada", criado: true }),
    );

    const response = await POST(createPostRequest(formData));

    await expect(response.json()).resolves.toEqual({
      mensagem: "Música criada",
      criado: true,
    });

    const requestConfig = serverApiRequestMock.mock.calls[0][0];
    expect(requestConfig.method).toBe("POST");
    expect(requestConfig.url).toBe("/musicas");
    expect((requestConfig.data as FormData).get("nome")).toBe("Nova música");
    expect((requestConfig.data as FormData).get("arquivo")).toBe("musica.mp3");
  });

  it("retorna erro quando nome ou arquivo não são informados", async () => {
    const response = await POST(createPostRequest(new FormData()));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      message: "Nome da música não informado",
    });
    expect(serverApiRequestMock).not.toHaveBeenCalled();
  });

  it("limpa o cache de músicas após cadastrar uma música", async () => {
    const musicasAntes = [
      {
        id: "1",
        nome: "Musica 1",
        caminhoDoArquivo: "/path/1",
        letra: "",
        tags: [],
        generosMusicais: [],
      },
    ];
    const musicasDepois = [
      ...musicasAntes,
      {
        id: "2",
        nome: "Musica 2",
        caminhoDoArquivo: "/path/2",
        letra: "",
        tags: [],
        generosMusicais: [],
      },
    ];
    const formData = new FormData();
    formData.append("nome", "Musica 2");
    formData.append("arquivo", "musica.mp3");

    serverApiRequestMock
      .mockResolvedValueOnce(createAxiosResponse(musicasAntes))
      .mockResolvedValueOnce(
        createAxiosResponse({ mensagem: "Música criada", criado: true }),
      )
      .mockResolvedValueOnce(createAxiosResponse(musicasDepois));

    await GET();
    await POST(createPostRequest(formData));
    const response = await GET();

    expect(serverApiRequestMock).toHaveBeenCalledTimes(3);
    await expect(response.json()).resolves.toEqual(musicasDepois);
  });
});
