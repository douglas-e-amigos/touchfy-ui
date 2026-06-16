import { afterEach, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { cleanup, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";

import Busca from "./Busca";

afterEach(() => {
  cleanup();
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
});
