import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, waitFor } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";
import PlayFooter, { PlayFooterMusica } from "./PlayFooter";
import {
  MusicasCurtidasProvider,
  useMusicasCurtidasContext,
} from "@/src/shared/providers/MusicasCurtidas.Provider";

const useAudioMock = vi.hoisted(() => vi.fn());
const fyProgressMock = vi.hoisted(() => vi.fn());
const fyPlayMock = vi.hoisted(() => vi.fn());

vi.mock("../fy-play/FyPlay", () => ({
  default: (props: FyPlayMockProps) => {
    fyPlayMock(props);

    return (
      <section aria-label="Ações da música">
        <button
          type="button"
          aria-pressed={props.favorite}
          onClick={() => props.setFavorite?.(!props.favorite)}
        >
          {props.favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        </button>
        <button type="button" onClick={props.onNext}>
          Avançar música
        </button>
        <button type="button" onClick={props.onPrevious}>
          Voltar música
        </button>
      </section>
    );
  },
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

vi.mock("../fy-progress/FyProgress", () => ({
  default: (props: FyProgressMockProps) => {
    fyProgressMock(props);
    return (
      <div aria-label="Progresso renderizado">
        {props.currentTime}/{props.duration}
      </div>
    );
  },
}));

vi.mock("../../hooks/Audio/useAudio", () => ({
  default: useAudioMock,
}));

beforeEach(() => {
  localStorage.clear();
  useAudioMock.mockReturnValue({
    isPlaying: false,
    duration: 0,
    currentTime: 0,
  });
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.clearAllMocks();
});

describe("PlayFooter", () => {
  it("inicia a reprodução quando recebe uma música selecionada", async () => {
    const musica = montarMusica();

    renderPlayFooter(<PlayFooter musica={musica} />);

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

    renderPlayFooter(<PlayFooter musica={musica} />);

    expect(
      screen.getByLabelText("Player da música selecionada")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: `Abrir player da música ${musica.nomeMusica}`,
      })
    ).toBeInTheDocument();
  });

  it("repassa o tempo da música para o progresso", () => {
    const musica = montarMusica();
    useAudioMock.mockReturnValue({
      isPlaying: true,
      duration: 240,
      currentTime: 60,
    });

    renderPlayFooter(<PlayFooter musica={musica} />);

    expect(fyProgressMock).toHaveBeenCalledWith({
      currentTime: 60,
      duration: 240,
    });
  });

  it("abre e fecha o modal da música", async () => {
    const user = userEvent.setup();
    const musica = montarMusica();

    renderPlayFooter(<PlayFooter musica={musica} />);

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

  it("encaminha ações de próxima e anterior para os controles", async () => {
    const user = userEvent.setup();
    const onNext = vi.fn();
    const onPrevious = vi.fn();
    const musica = montarMusica();

    renderPlayFooter(
      <PlayFooter
        musica={musica}
        onNext={onNext}
        onPrevious={onPrevious}
      />
    );

    await user.click(screen.getByRole("button", { name: "Avançar música" }));
    await user.click(screen.getByRole("button", { name: "Voltar música" }));

    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onPrevious).toHaveBeenCalledTimes(1);
  });

  it("curte a música selecionada pelo controle do player", async () => {
    const user = userEvent.setup();
    const musica = montarMusica();

    renderPlayFooter(
      <>
        <PlayFooter musica={musica} />
        <ResumoCurtidas />
      </>,
    );

    await user.click(
      screen.getByRole("button", { name: "Adicionar aos favoritos" }),
    );

    expect(screen.getByText("Curtidas: Nova faixa")).toBeInTheDocument();
    expect(fyPlayMock).toHaveBeenLastCalledWith(
      expect.objectContaining({
        favorite: true,
        setFavorite: expect.any(Function),
      }),
    );
  });
});

interface FyPlayMockProps {
  readonly favorite?: boolean;
  readonly setFavorite?: (favorite: boolean) => void;
  readonly onNext?: () => void;
  readonly onPrevious?: () => void;
}

interface FyPlaymodalMockProps {
  readonly setAltera: () => void;
  readonly musicaAtual: PlayFooterMusica;
}

interface FyProgressMockProps {
  readonly currentTime: number;
  readonly duration: number;
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

function renderPlayFooter(ui: ReactElement) {
  return render(<MusicasCurtidasProvider>{ui}</MusicasCurtidasProvider>);
}

function ResumoCurtidas() {
  const { musicasCurtidas } = useMusicasCurtidasContext();

  return (
    <p>
      Curtidas:{" "}
      {musicasCurtidas.length > 0
        ? musicasCurtidas.map((musica) => musica.nomeMusica).join(", ")
        : "Nenhuma"}
    </p>
  );
}
