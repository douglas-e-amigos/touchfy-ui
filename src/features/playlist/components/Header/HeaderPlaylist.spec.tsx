import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { Lock } from "lucide-react";

import HeaderPlaylist from "./HeaderPlaylist";

afterEach(() => {
  cleanup();
});

const props = {
  icon: Lock,
  titulo: "Chill Nights",
  descricao: "Relaxe e aproveite a noite",
  autor: "Você",
  imagemURL: "/playlist.png",
  quantidadeMusicas: 4,
};

describe("HeaderPlaylist", () => {
  it("renderiza as informações principais da playlist", () => {
    render(<HeaderPlaylist {...props} />);

    expect(
      screen.getByRole("img", { name: "Capa da playlist" })
    ).toHaveAttribute("src", props.imagemURL);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: props.titulo,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(props.descricao)).toBeInTheDocument();
    expect(screen.getByText(props.autor)).toBeInTheDocument();
    expect(screen.getByText("4 músicas")).toBeInTheDocument();
  });

  it("renderiza quantidade no singular quando a playlist tem uma música", () => {
    render(<HeaderPlaylist {...props} quantidadeMusicas={1} />);

    expect(screen.getByText("1 música")).toBeInTheDocument();
  });
});
