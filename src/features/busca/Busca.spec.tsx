import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { cleanup, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";

import Busca from "./Busca";
import { musicaService } from "@/src/shared/services/musica.service";
import { useMusicaAtualContext } from "@/src/shared/providers/MusicaAtual.Provider";

vi.mock("@/src/shared/services/musica.service", () => ({
  musicaService: {
    buscarPorNome: vi.fn(),
  },
}));

vi.mock("@/src/shared/providers/MusicaAtual.Provider", () => ({
  useMusicaAtualContext: vi.fn(),
}));

const musicaServiceMock = vi.mocked(musicaService);
const useMusicaAtualContextMock = vi.mocked(useMusicaAtualContext);
const selecionarMusicaMock = vi.fn();

const musicaEncontrada = {
  id: "musica-1",
  nome: "Around the World",
  caminhoDoArquivo: "/musicas/around.mp3",
  letra: "",
  tags: [{ id: "tag-1", nome: "Daft Punk" }],
  generosMusicais: [],
};

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

beforeEach(() => {
  useMusicaAtualContextMock.mockReturnValue({
    musicaAtual: null,
    setMusicaAtual: vi.fn(),
    filaMusicas: [],
    indiceMusicaAtual: -1,
    selecionarMusica: selecionarMusicaMock,
    tocarProxima: vi.fn(),
    tocarAnterior: vi.fn(),
  });
});

describe("Busca", () => {
  it("renderiza o titulo, campo de busca e texto de apoio", () => {
    render(<Busca />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Buscar" }),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("O que você quer ouvir?"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Busque por músicas, artistas, álbuns ou playlists"),
    ).toBeInTheDocument();
  });

  it("mantem o valor digitado no campo de busca", async () => {
    const user = userEvent.setup();

    render(<Busca />);

    const input = screen.getByRole("textbox", { name: "" });

    await user.type(input, "Daft Punk");

    expect(screen.getByDisplayValue("Daft Punk")).toBeInTheDocument();
  });

  it("busca música por nome e renderiza o resultado", async () => {
    const user = userEvent.setup();
    musicaServiceMock.buscarPorNome.mockResolvedValueOnce(musicaEncontrada);

    render(<Busca />);

    const input = screen.getByRole("textbox", { name: "" });

    await user.type(input, "Around");
    await user.click(screen.getByRole("button", { name: "Buscar música" }));

    expect(musicaServiceMock.buscarPorNome).toHaveBeenCalledWith("Around");
    expect(await screen.findByText("Around the World")).toBeInTheDocument();
    expect(screen.getByText("Daft Punk")).toBeInTheDocument();
  });

  it("seleciona a música encontrada para tocar pelo stream", async () => {
    const user = userEvent.setup();
    musicaServiceMock.buscarPorNome.mockResolvedValueOnce(musicaEncontrada);

    render(<Busca />);

    await user.type(screen.getByRole("textbox", { name: "" }), "Around");
    await user.click(screen.getByRole("button", { name: "Buscar música" }));
    await user.click(
      await screen.findByRole("button", {
        name: "Tocar música Around the World de Daft Punk",
      }),
    );

    expect(selecionarMusicaMock).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "musica-1",
        nomeMusica: "Around the World",
        nomeArtista: "Daft Punk",
      }),
      [
        expect.objectContaining({
          id: "musica-1",
          nomeMusica: "Around the World",
        }),
      ],
    );
  });
});
