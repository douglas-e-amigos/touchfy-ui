import { beforeEach, describe, expect, it, vi } from "vitest";
import httpClient from "@/src/infrastructure/http/http-client";
import { musicaService } from "./musica.service";
import type { MusicaBackend } from "@/src/shared/types/musica.types";

vi.mock("@/src/infrastructure/http/http-client", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

const getMock = vi.mocked(httpClient.get);
const postMock = vi.mocked(httpClient.post);

describe("MusicaService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("busca músicas da API", async () => {
    const mockMusicas: MusicaBackend[] = [
      {
        id: "1",
        nome: "Musica 1",
        caminhoDoArquivo: "/path/1",
        letra: "",
        artistaId: "00000000-0000-0000-0000-000000000000",
        tags: [],
        generosMusicais: [],
      },
    ];

    getMock.mockResolvedValueOnce({ data: mockMusicas });

    const result = await musicaService.buscarTodas();

    expect(getMock).toHaveBeenCalledWith("/musicas");
    expect(result).toEqual(mockMusicas);
  });

  it("busca música por nome na rota de músicas", async () => {
    const mockMusica: MusicaBackend = {
      id: "1",
      nome: "Around the World",
      caminhoDoArquivo: "/path/1",
      letra: "",
      artistaId: "00000000-0000-0000-0000-000000000000",
      tags: [],
      generosMusicais: [],
    };

    getMock.mockResolvedValueOnce({ data: mockMusica });

    const result = await musicaService.buscarPorNome("around");

    expect(getMock).toHaveBeenCalledWith("/musicas", {
      params: { nome: "around" },
    });
    expect(result).toEqual(mockMusica);
  });

  it("retorna null quando a música não é encontrada por nome", async () => {
    getMock.mockResolvedValue({ data: null });

    const result = await musicaService.buscarPorNome("Something About Us");

    expect(getMock).toHaveBeenCalledWith("/musicas", {
      params: { nome: "Something About Us" },
    });
    expect(result).toBeNull();
  });

  it("cria música com multipart form data", async () => {
    const arquivo = new File(["audio"], "musica.mp3", { type: "audio/mpeg" });
    postMock.mockResolvedValueOnce({
      data: {
        mensagem: "Música criada",
        criado: true,
        criadoEm: new Date("2026-01-01"),
      },
    });

    const result = await musicaService.criar({
      nome: "Nova música",
      letra: "",
      tagIds: ["tag-1"],
      generoMusicalIds: ["genero-1"],
      arquivo,
    });

    expect(postMock).toHaveBeenCalledWith(
      "/musicas",
      expect.any(FormData),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    const formData = postMock.mock.calls[0][1] as FormData;
    expect(formData.get("nome")).toBe("Nova música");
    expect(formData.get("letra")).toBeNull();
    expect(formData.getAll("tagIds")).toEqual(["tag-1"]);
    expect(formData.getAll("generoMusicalIds")).toEqual(["genero-1"]);
    expect(formData.get("arquivo")).toBe(arquivo);
    expect(result.criado).toBe(true);
  });

  it("busca tags e gêneros musicais", async () => {
    const tags = [{ id: "tag-1", nome: "Rock" }];
    const generosMusicais = [{ id: "genero-1", nome: "MPB" }];
    getMock
      .mockResolvedValueOnce({ data: tags })
      .mockResolvedValueOnce({ data: generosMusicais });

    await expect(musicaService.buscarTags()).resolves.toEqual(tags);
    await expect(musicaService.buscarGenerosMusicais()).resolves.toEqual(
      generosMusicais,
    );

    expect(getMock).toHaveBeenNthCalledWith(1, "/musicas/tags");
    expect(getMock).toHaveBeenNthCalledWith(2, "/musicas/generos-musicais");
  });

  it("cria tag e gênero musical", async () => {
    postMock
      .mockResolvedValueOnce({ data: { mensagem: "Tag criada", criado: true } })
      .mockResolvedValueOnce({
        data: { mensagem: "Gênero criado", criado: true },
      });

    await musicaService.criarTag("Rock");
    await musicaService.criarGeneroMusical("MPB");

    expect(postMock).toHaveBeenNthCalledWith(1, "/musicas/tags", {
      nome: "Rock",
    });
    expect(postMock).toHaveBeenNthCalledWith(
      2,
      "/musicas/generos-musicais",
      { nome: "MPB" },
    );
  });
});
