import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import FyPlay from "./FyPlay";

const useFyPlayMock = vi.hoisted(() => vi.fn());

vi.mock("../../hooks/use-fyplay", () => ({
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
