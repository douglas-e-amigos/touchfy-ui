import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import FyProgress from "./FyProgress";

afterEach(() => {
  cleanup();
});

describe("FyProgress", () => {
  it("preenche a barra conforme o tempo atual da música", () => {
    render(<FyProgress currentTime={75} duration={300} />);

    const progress = screen.getByRole("progressbar", {
      name: "Progresso da música",
    });

    expect(progress).toHaveAttribute("aria-valuenow", "25");
    expect(progress).toHaveStyle({ "--progress": "25%" });
    expect(screen.getByText("1:15")).toBeInTheDocument();
    expect(screen.getByText("5:00")).toBeInTheDocument();
  });

  it("mantém a barra vazia quando a duração ainda não foi carregada", () => {
    render(<FyProgress currentTime={30} duration={0} />);

    const progress = screen.getByRole("progressbar", {
      name: "Progresso da música",
    });

    expect(progress).toHaveAttribute("aria-valuenow", "0");
    expect(progress).toHaveStyle({ "--progress": "0%" });
    expect(screen.getByText("0:30")).toBeInTheDocument();
    expect(screen.getByText("0:00")).toBeInTheDocument();
  });
});
