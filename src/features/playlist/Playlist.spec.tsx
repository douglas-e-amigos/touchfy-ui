import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Playlist from "./Playlist";
import {
  MUSICAS_CURTIDAS_STORAGE_KEY,
  MusicasCurtidasProvider,
} from "@/src/shared/providers/MusicasCurtidas.Provider";
import { useMusicaAtualContext } from "@/src/shared/providers/MusicaAtual.Provider";
import type { MusicaAtual } from "@/src/shared/providers/MusicaAtual.Provider";

vi.mock("@/src/shared/providers/MusicaAtual.Provider", () => ({
  useMusicaAtualContext: vi.fn(),
}));

const useMusicaAtualContextMock = vi.mocked(useMusicaAtualContext);
const selecionarMusicaMock = vi.fn();

beforeEach(() => {
  localStorage.clear();
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

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.clearAllMocks();
});

describe("Playlist", () => {
  it("renderiza as músicas curtidas na playlist favorites", async () => {
    const user = userEvent.setup();
    localStorage.setItem(
      MUSICAS_CURTIDAS_STORAGE_KEY,
      JSON.stringify([musicaCurtida]),
    );

    render(
      <MusicasCurtidasProvider>
        <Playlist slug="favorites" />
      </MusicasCurtidasProvider>,
    );

    expect(
      screen.getByRole("heading", { name: "Músicas curtidas" }),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Faixa curtida"),
    ).toBeInTheDocument();
    expect(screen.getByText("Artista teste")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "Tocar Faixa curtida de Artista teste",
      }),
    );

    expect(selecionarMusicaMock).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "musica-1",
        nomeMusica: "Faixa curtida",
      }),
      [
        expect.objectContaining({
          id: "musica-1",
          nomeMusica: "Faixa curtida",
        }),
      ],
    );
  });

  it("mostra estado vazio quando não há músicas curtidas", async () => {
    render(
      <MusicasCurtidasProvider>
        <Playlist slug="favorites" />
      </MusicasCurtidasProvider>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("Nenhuma música curtida ainda"),
      ).toBeInTheDocument();
    });
  });
});

const musicaCurtida: MusicaAtual = {
  id: "musica-1",
  nomeMusica: "Faixa curtida",
  nomeArtista: "Artista teste",
  imagemURL: "/capa.png",
  caminhoDoArquivo: "/audios/faixa.mp3",
};
