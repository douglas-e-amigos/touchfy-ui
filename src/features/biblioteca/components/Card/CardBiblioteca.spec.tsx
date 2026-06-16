import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";

import CardBiblioteca from "./CardBiblioteca";

function IconeTeste({
  size,
  color,
}: {
  readonly size?: number;
  readonly color?: string;
}) {
  return (
    <img
      aria-label="Icone do card"
      data-color={color}
      data-size={size}
    />
  );
}

afterEach(() => {
  cleanup();
});

describe("CardBiblioteca", () => {
  it("renderiza icone, quantidade e legenda", () => {
    render(
      <CardBiblioteca
        icon={IconeTeste}
        legenda="Músicas curtidas"
        quantidade={3}
      />,
    );

    expect(
      screen.getByRole("img", { name: "Icone do card" }),
    ).toHaveAttribute("data-color", "#ff007f");
    expect(screen.getByText("3")).toHaveClass("font-bold");
    expect(screen.getByText("Músicas curtidas")).toHaveClass("font-semibold");
  });
});
