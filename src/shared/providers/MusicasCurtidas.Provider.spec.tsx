import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  MUSICAS_CURTIDAS_STORAGE_KEY,
  MusicasCurtidasProvider,
  useMusicasCurtidasContext,
} from "./MusicasCurtidas.Provider";
import type { MusicaAtual } from "./MusicaAtual.Provider";

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe("MusicasCurtidasProvider", () => {
  it("curte, descurte e persiste músicas curtidas", async () => {
    const user = userEvent.setup();

    render(
      <MusicasCurtidasProvider>
        <ConsumidorDeCurtidas />
      </MusicasCurtidasProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Curtir música" }));

    expect(screen.getByText("Curtidas: Nova faixa")).toBeInTheDocument();
    expect(screen.getByText("Estado: curtida")).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(MUSICAS_CURTIDAS_STORAGE_KEY) ?? "[]"))
      .toEqual([musica]);

    await user.click(screen.getByRole("button", { name: "Descurtir música" }));

    expect(screen.getByText("Curtidas: Nenhuma")).toBeInTheDocument();
    expect(screen.getByText("Estado: não curtida")).toBeInTheDocument();
  });

  it("carrega as músicas curtidas salvas no navegador", async () => {
    localStorage.setItem(
      MUSICAS_CURTIDAS_STORAGE_KEY,
      JSON.stringify([musica]),
    );

    render(
      <MusicasCurtidasProvider>
        <ConsumidorDeCurtidas />
      </MusicasCurtidasProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Curtidas: Nova faixa")).toBeInTheDocument();
    });
  });
});

const musica: MusicaAtual = {
  id: "musica-1",
  nomeMusica: "Nova faixa",
  nomeArtista: "Artista teste",
  imagemURL: "/capa.png",
  caminhoDoArquivo: "/audios/nova-faixa.mp3",
};

function ConsumidorDeCurtidas() {
  const {
    musicasCurtidas,
    isMusicaCurtida,
    alternarCurtida,
  } = useMusicasCurtidasContext();
  const curtida = isMusicaCurtida(musica.id);

  return (
    <div>
      <p>
        Curtidas:{" "}
        {musicasCurtidas.length > 0
          ? musicasCurtidas.map((item) => item.nomeMusica).join(", ")
          : "Nenhuma"}
      </p>
      <p>Estado: {curtida ? "curtida" : "não curtida"}</p>
      <button type="button" onClick={() => alternarCurtida(musica)}>
        {curtida ? "Descurtir música" : "Curtir música"}
      </button>
    </div>
  );
}
