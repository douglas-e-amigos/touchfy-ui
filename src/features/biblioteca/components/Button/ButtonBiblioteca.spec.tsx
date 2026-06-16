import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { screen, within } from "@testing-library/dom";

import ButtonBiblioteca from "./ButtonBiblioteca";

function IconeTeste({
  size,
  color,
}: {
  readonly size?: number;
  readonly color?: string;
}) {
  return (
    <svg
      aria-label="Icone da biblioteca"
      data-color={color}
      data-size={size}
      role="img"
    />
  );
}

afterEach(() => {
  cleanup();
});

describe("ButtonBiblioteca", () => {
  it("renderiza o botao com icone e legenda", () => {
    render(<ButtonBiblioteca icon={IconeTeste} legenda="Nova playlist" />);

    const botao = screen.getByRole("button", { name: /Nova playlist/ });
    const icone = within(botao).getByRole("img", {
      name: "Icone da biblioteca",
    });

    expect(botao).toHaveClass("bg-zinc-700/50");
    expect(botao).toHaveTextContent("Nova playlist");
    expect(icone).toHaveAttribute("data-size", "32");
    expect(icone).toHaveAttribute("data-color", "#ff007f");
  });
});
