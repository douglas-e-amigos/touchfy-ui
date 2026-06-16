import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { cleanup, render } from "@testing-library/react";
import { screen, within } from "@testing-library/dom";

import Biblioteca from "./Biblioteca";

vi.mock("./components/Card/CardBiblioteca", () => ({
  default: ({
    quantidade,
    legenda,
  }: {
    quantidade: number;
    legenda: string;
  }) => (
    <article aria-label={legenda}>
      <span>{quantidade}</span>
      <span>{legenda}</span>
    </article>
  ),
}));

vi.mock("./components/Button/ButtonBiblioteca", () => ({
  default: ({
    legenda,
    onClick,
  }: {
    legenda: string;
    onClick?: () => void;
  }) => (
    <button type="button" onClick={onClick}>
      {legenda}
    </button>
  ),
}));

vi.mock("@/src/shared/components/fy-imagecard/ImageCard", () => ({
  Variantes: {
    CIRCULAR: "rounded-md w-[11rem] h-auto",
    QUADRADO_MD: "rounded-md w-[17rem] h-[23rem]",
    QUADRADO_SM: "rounded-sm w-[11rem] h-auto",
  },
  default: ({
    nomeCard,
    tituloCard,
    descritor,
    abrirPlaylist,
  }: {
    nomeCard: string;
    tituloCard: string;
    descritor: string;
    abrirPlaylist: () => void;
  }) => (
    <button
      aria-label={`Card de grupo de músicas ${nomeCard}`}
      onClick={abrirPlaylist}
      type="button"
    >
      <span>{tituloCard}</span>
      <span>{descritor}</span>
    </button>
  ),
}));

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Biblioteca", () => {
  it("renderiza a biblioteca do usuario com resumo, playlists, albuns e acao de nova playlist", async () => {
    const consoleLog = vi
      .spyOn(console, "log")
      .mockImplementation(() => undefined);
    const user = userEvent.setup();

    render(<Biblioteca usuario={{ id: "1", nome: "Maria" }} />);

    expect(
      screen.getByRole("region", { name: "Biblioteca do usuário Maria" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Sua biblioteca" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Suas músicas, álbuns e playlists favoritas"),
    ).toBeInTheDocument();

    const resumo = screen.getByRole("region", {
      name: "Informações da biblioteca",
    });
    expect(
      within(resumo).getByRole("article", { name: "Músicas curtidas" }),
    ).toHaveTextContent("3");
    expect(
      within(resumo).getByRole("article", { name: "Playlists" }),
    ).toHaveTextContent("3");
    expect(
      within(resumo).getByRole("article", { name: "Álbuns salvos" }),
    ).toHaveTextContent("2");

    const playlists = screen.getByRole("region", { name: "Playlists salvas" });
    const albuns = screen.getByRole("region", { name: "Álbuns salvos" });

    expect(
      within(playlists)
        .getAllByRole("button")
        .map((card) => card.textContent),
    ).toEqual([
      "Title Default 1CreateBy Default",
      "Title Default 2CreateBy Default",
      "Title Default 3CreateBy Default",
      "Title Default 4CreateBy Default",
      "Title Default 5CreateBy Default",
      "Title Default 6CreateBy Default",
    ]);
    expect(
      within(albuns)
        .getAllByRole("button")
        .map((card) => card.textContent),
    ).toHaveLength(6);

    await user.click(within(playlists).getAllByRole("button")[0]);
    await user.click(within(albuns).getAllByRole("button")[0]);
    await user.click(screen.getByRole("button", { name: "Nova playlist" }));

    expect(consoleLog).toHaveBeenCalledWith("Clique do btn em biblioteca");
  });
});
