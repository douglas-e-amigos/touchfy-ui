import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, waitFor } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import PlayFooter, { PlayFooterMusica } from "./PlayFooter";

const useAudioMock = vi.hoisted(() => vi.fn());

vi.mock("../fy-play/FyPlay", () => ({
  default: () => <section aria-label="Ações da música" />,
}));

vi.mock("../fy-playmodal/FyPlaymodal", () => ({
  default: ({ setAltera, musicaAtual }: FyPlaymodalMockProps) => (
    <dialog open aria-label={`Player da música ${musicaAtual.nomeMusica}`}>
      <button type="button" aria-label="Fechar modal" onClick={setAltera}>
        Fechar
      </button>
    </dialog>
  ),
}));

vi.mock("../../hooks/Audio/useAudio", () => ({
  default: useAudioMock,
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("PlayFooter", () => {
  it("inicia a reprodução quando recebe uma música selecionada", async () => {
    const musica = montarMusica();

    render(<PlayFooter musica={musica} />);

    await waitFor(() => {
      expect(useAudioMock).toHaveBeenLastCalledWith(
        `/api/musicas/stream/${musica.id}`,
        true,
        expect.any(Function),
      );
    });
  });

  it("renderiza o player da música selecionada", () => {
    const musica = montarMusica();

    render(<PlayFooter musica={musica} />);

    expect(
      screen.getByLabelText("Player da música selecionada")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: `Abrir player da música ${musica.nomeMusica}`,
      })
    ).toBeInTheDocument();
  });

  it("abre e fecha o modal da música", async () => {
    const user = userEvent.setup();
    const musica = montarMusica();

    render(<PlayFooter musica={musica} />);

    await user.click(
      screen.getByRole("button", {
        name: `Abrir player da música ${musica.nomeMusica}`,
      })
    );

    expect(
      screen.getByRole("dialog", {
        name: `Player da música ${musica.nomeMusica}`,
      })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Fechar modal" }));

    expect(
      screen.queryByRole("dialog", {
        name: `Player da música ${musica.nomeMusica}`,
      })
    ).not.toBeInTheDocument();
  });
});

interface FyPlaymodalMockProps {
  readonly setAltera: () => void;
  readonly musicaAtual: PlayFooterMusica;
}

function montarMusica(): PlayFooterMusica {
  return {
    id: "1",
    imagemURL: "/musica.png",
    nomeMusica: "Nova faixa",
    nomeArtista: "Artista teste",
    caminhoDoArquivo: "/audios/teste.mp3",
  };
}
