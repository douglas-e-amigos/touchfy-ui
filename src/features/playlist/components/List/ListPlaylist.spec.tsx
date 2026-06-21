import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { MusicaType } from "@/src/shared/types/musica.types";
import ListPlaylist from "./ListPlaylist";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

const musicas: MusicaType[] = [
  {
    id: "1",
    nomeMusica: "Midnight Dreams",
    nomeArtista: "Luna Sky",
    album: "Neon Nights",
    duracao: "3:55",
    imagemURL: "/midnight-dreams.png",
  },
  {
    id: "2",
    nomeMusica: "Smooth Jazz",
    nomeArtista: "Marcus Blue",
    album: "Late Night Sessions",
    duracao: "5:24",
    imagemURL: "/smooth-jazz.png",
  },
];

describe("ListPlaylist", () => {
  it("renderiza as músicas da playlist", () => {
    render(<ListPlaylist musicas={musicas} onClick={() => undefined} />);

    expect(screen.getByText("Midnight Dreams")).toBeInTheDocument();
    expect(screen.getByText("Luna Sky")).toBeInTheDocument();
    expect(screen.getByText("Neon Nights")).toBeInTheDocument();
    expect(screen.getByText("3:55")).toBeInTheDocument();
  });

  it("envia a música selecionada ao clicar na linha", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<ListPlaylist musicas={musicas} onClick={onClick} />);

    await user.click(
      screen.getByRole("button", {
        name: "Tocar Midnight Dreams de Luna Sky",
      })
    );

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(musicas[0]);
  });

  it("marca a música atual como selecionada", () => {
    render(
      <ListPlaylist
        musicas={musicas}
        onClick={() => undefined}
        musicaAtualId={musicas[0].id}
      />
    );

    const musicaSelecionada = screen.getByRole("button", {
      name: "Tocar Midnight Dreams de Luna Sky",
    });

    expect(musicaSelecionada).toHaveAttribute("aria-current", "true");
    expect(musicaSelecionada).toHaveClass("bg-white/10");
    expect(musicaSelecionada.firstElementChild).toHaveClass(
      "font-semibold",
      "text-primary"
    );
  });
});
