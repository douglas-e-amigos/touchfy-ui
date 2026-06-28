import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import RenderMusica from "./RenderMusica";
import type { MusicaBackend } from "@/src/shared/types/musica.types";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

const mockMusicas: MusicaBackend[] = [
  {
    id: "1",
    nome: "Musica 1",
    caminhoDoArquivo: "/path/1",
    letra: "",
    tags: [{ id: "t1", nome: "Artista 1" }],
    generosMusicais: [],
  },
  {
    id: "2",
    nome: "Musica 2",
    caminhoDoArquivo: "/path/2",
    letra: "",
    tags: [],
    generosMusicais: [],
  },
];

vi.mock("@/src/shared/hooks/Musica/useMusicas", () => ({
  default: () => ({ musicasAleatorias: mockMusicas }),
}));

describe("RenderMusica", () => {
  it("renderiza nome e artista de cada música", () => {
    render(<RenderMusica aoSelecionarMusica={() => {}} />);

    expect(screen.getByText("Musica 1")).toBeInTheDocument();
    expect(screen.getByText("Artista 1")).toBeInTheDocument();
    expect(screen.getByText("Musica 2")).toBeInTheDocument();
    expect(screen.getByText("Artista Desconhecido")).toBeInTheDocument();
  });

  it("chama aoSelecionarMusica com a música e a fila ao clicar no card", () => {
    const fn = vi.fn();

    render(<RenderMusica aoSelecionarMusica={fn} />);

    fireEvent.click(screen.getByText("Musica 1"));

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(mockMusicas[0], mockMusicas);
  });
});
