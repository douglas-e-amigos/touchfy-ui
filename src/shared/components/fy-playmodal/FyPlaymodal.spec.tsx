import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import FyPlaymodal from "./FyPlaymodal";
import { MusicaAtual } from "@/src/shared/types/musica.types";

vi.mock("../fy-play/FyPlay", () => ({
  default: () => <section aria-label="Ações da música" />,
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("FyPlaymodal", () => {
  it("renderiza o modal da música atual", () => {
    const musicaAtual = montarMusicaAtual();

    render(<FyPlaymodal setAltera={() => undefined} musicaAtual={musicaAtual} />);

    expect(
      screen.getByRole("dialog", {
        name: `Player da música ${musicaAtual.nomeMusica}`,
      })
    ).toBeInTheDocument();
  });

  it("executa setAltera ao clicar em fechar", async () => {
    const user = userEvent.setup();
    const setAltera = vi.fn();

    render(
      <FyPlaymodal setAltera={setAltera} musicaAtual={montarMusicaAtual()} />
    );

    await user.click(screen.getByRole("button", { name: "Fechar modal" }));

    expect(setAltera).toHaveBeenCalledTimes(1);
  });
});

function montarMusicaAtual(): MusicaAtual {
  return {
    id: "1",
    imagemURL: "/capa.png",
    nomeMusica: "Música atual",
    nomeArtista: "Artista atual",
  };
}
