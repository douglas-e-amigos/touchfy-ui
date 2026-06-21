import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import FyPlay from "./FyPlay";

const useFyPlayMock = vi.hoisted(() => vi.fn());

vi.mock("../../hooks/FyPlay/useFyPlay", () => ({
  default: useFyPlayMock,
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("FyPlay", () => {
  it("renderiza as ações da música", () => {
    useFyPlayMock.mockReturnValue(montarEstado());

    render(<FyPlay />);

    expect(screen.getByLabelText("Ações da música")).toBeInTheDocument();
  });

  it("aciona a reprodução ao clicar em tocar", async () => {
    const user = userEvent.setup();
    const setPlay = vi.fn();
    useFyPlayMock.mockReturnValue(montarEstado({ play: false, setPlay }));

    render(<FyPlay />);

    await user.click(screen.getByRole("button", { name: "Tocar música" }));

    expect(setPlay).toHaveBeenCalledWith(true);
  });

  it("pausa a reprodução ao clicar em pausar", async () => {
    const user = userEvent.setup();
    const setPlay = vi.fn();
    useFyPlayMock.mockReturnValue(montarEstado({ play: true, setPlay }));

    render(<FyPlay />);

    await user.click(screen.getByRole("button", { name: "Pausar música" }));

    expect(setPlay).toHaveBeenCalledWith(false);
  });
});

interface EstadoFyPlay {
  right: number;
  setRight: (right: number) => void;
  left: number;
  setLeft: (left: number) => void;
  play: boolean;
  setPlay: (play: boolean) => void;
  favorite: boolean;
  setFavorite: (favorite: boolean) => void;
  shuffle: boolean;
  setShuffle: (shuffle: boolean) => void;
  repeat: boolean;
  setRepeat: (repeat: boolean) => void;
}

function montarEstado(estado: Partial<EstadoFyPlay> = {}): EstadoFyPlay {
  return {
    right: 0,
    setRight: vi.fn(),
    left: 0,
    setLeft: vi.fn(),
    play: true,
    setPlay: vi.fn(),
    favorite: true,
    setFavorite: vi.fn(),
    shuffle: false,
    setShuffle: vi.fn(),
    repeat: false,
    setRepeat: vi.fn(),
    ...estado,
  };
}
