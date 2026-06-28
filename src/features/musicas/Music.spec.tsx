import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import Music from "./Music";

afterEach(() => {
  cleanup();
});

describe("Music", () => {
  it("renderiza a base da página de músicas", () => {
    render(<Music />);

    expect(
      screen.getByRole("main", { name: "Página de músicas" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Músicas" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Gerencie suas músicas publicadas na plataforma."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("searchbox", { name: "Buscar música" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Adicionar música" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Lista de músicas" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Nenhuma música cadastrada")).toBeInTheDocument();
  });
});
