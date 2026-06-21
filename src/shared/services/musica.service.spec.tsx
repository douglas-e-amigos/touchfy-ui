import { beforeEach, describe, expect, it, vi } from "vitest";
import httpClient from "@/src/infrastructure/http/http-client";
import { musicaService } from "./musica.service";
import type { MusicaBackend } from "@/src/shared/types/musica.types";

vi.mock("@/src/infrastructure/http/http-client", () => ({
  default: {
    get: vi.fn(),
  },
}));

const getMock = vi.mocked(httpClient.get);

describe("MusicaService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    musicaService.limparCache();
  });

  it("busca músicas da API", async () => {
    const mockMusicas: MusicaBackend[] = [
      {
        id: "1",
        nome: "Musica 1",
        caminhoDoArquivo: "/path/1",
        letra: "",
        tags: [],
        generosMusicais: [],
      },
    ];

    getMock.mockResolvedValueOnce({ data: mockMusicas });

    const result = await musicaService.buscarTodas();

    expect(getMock).toHaveBeenCalledWith("/musicas");
    expect(result).toEqual(mockMusicas);
  });

  it("usa o cache na segunda chamada", async () => {
    const mockMusicas: MusicaBackend[] = [
      {
        id: "1",
        nome: "Musica 1",
        caminhoDoArquivo: "/path/1",
        letra: "",
        tags: [],
        generosMusicais: [],
      },
    ];

    getMock.mockResolvedValueOnce({ data: mockMusicas });

    await musicaService.buscarTodas();
    const result = await musicaService.buscarTodas();

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockMusicas);
  });

  it("recarrega após limpar cache", async () => {
    const mockMusicas: MusicaBackend[] = [
      {
        id: "1",
        nome: "Musica 1",
        caminhoDoArquivo: "/path/1",
        letra: "",
        tags: [],
        generosMusicais: [],
      },
    ];

    getMock.mockResolvedValue({ data: mockMusicas });

    await musicaService.buscarTodas();
    musicaService.limparCache();
    await musicaService.buscarTodas();

    expect(getMock).toHaveBeenCalledTimes(2);
  });
});
