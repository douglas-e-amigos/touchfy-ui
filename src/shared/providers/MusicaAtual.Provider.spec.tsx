import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import {
  MusicaAtualProvider,
  useMusicaAtualContext,
  type MusicaAtual,
} from "./MusicaAtual.Provider";

afterEach(() => {
  cleanup();
});

describe("MusicaAtualProvider", () => {
  it("mantem uma fila e navega entre músicas", async () => {
    const user = userEvent.setup();

    render(
      <MusicaAtualProvider>
        <ConsumidorDeFila />
      </MusicaAtualProvider>
    );

    await user.click(screen.getByRole("button", { name: "Selecionar segunda" }));

    expect(screen.getByText("Atual: Segunda")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Próxima" }));

    expect(screen.getByText("Atual: Terceira")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Anterior" }));

    expect(screen.getByText("Atual: Segunda")).toBeInTheDocument();
  });
});

const fila: MusicaAtual[] = [
  montarMusica("1", "Primeira"),
  montarMusica("2", "Segunda"),
  montarMusica("3", "Terceira"),
];

function ConsumidorDeFila() {
  const {
    musicaAtual,
    selecionarMusica,
    tocarProxima,
    tocarAnterior,
  } = useMusicaAtualContext();

  return (
    <div>
      <p>Atual: {musicaAtual?.nomeMusica ?? "Nenhuma"}</p>
      <button type="button" onClick={() => selecionarMusica(fila[1], fila)}>
        Selecionar segunda
      </button>
      <button type="button" onClick={tocarProxima}>
        Próxima
      </button>
      <button type="button" onClick={tocarAnterior}>
        Anterior
      </button>
    </div>
  );
}

function montarMusica(id: string, nomeMusica: string): MusicaAtual {
  return {
    id,
    nomeMusica,
    nomeArtista: "Artista",
    imagemURL: "/capa.png",
    caminhoDoArquivo: `/audios/${id}.mp3`,
  };
}
