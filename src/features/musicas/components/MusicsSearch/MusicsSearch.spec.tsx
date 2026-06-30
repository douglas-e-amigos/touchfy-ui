import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import MusicsSearch from "./MusicsSearch";
import { useMusicaSearchContext } from "@/src/shared/contexts/MusicaSearch.context";

vi.mock("@/src/shared/contexts/MusicaSearch.context", () => ({
  useMusicaSearchContext: vi.fn(),
}));

const useMusicaSearchContextMock = vi.mocked(useMusicaSearchContext);
const setTermoBuscaMock = vi.fn();

beforeEach(() => {
  useMusicaSearchContextMock.mockReturnValue({
    termoBusca: "",
    setTermoBusca: setTermoBuscaMock,
  });
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("MusicsSearch", () => {
  it("renderiza campo de busca", () => {
    render(<MusicsSearch />);

    expect(
      screen.getByRole("searchbox", { name: "Buscar música" }),
    ).toBeInTheDocument();
  });

  it("chama setTermoBusca ao digitar", async () => {
    const user = userEvent.setup();

    render(<MusicsSearch />);

    const input = screen.getByRole("searchbox", { name: "Buscar música" });
    await user.type(input, "rock");

    expect(setTermoBuscaMock).toHaveBeenCalled();
  });

  it("exibe o termo atual no input", () => {
    useMusicaSearchContextMock.mockReturnValue({
      termoBusca: "jazz",
      setTermoBusca: setTermoBuscaMock,
    });

    render(<MusicsSearch />);

    expect(
      screen.getByRole("searchbox", { name: "Buscar música" }),
    ).toHaveValue("jazz");
  });
});
