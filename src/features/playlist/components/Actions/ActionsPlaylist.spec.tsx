import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import ActionsPlaylist from "./ActionsPlaylist";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("ActionsPlaylist", () => {
  it("renderiza as ações da playlist com labels acessíveis", () => {
    render(<ActionsPlaylist onPlay={() => undefined} />);

    expect(screen.getByLabelText("Ações da playlist")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Tocar playlist" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Editar playlist" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Excluir playlist" })
    ).toBeInTheDocument();
  });

  it("executa callbacks ao clicar nas ações", async () => {
    const user = userEvent.setup();
    const onPlay = vi.fn();
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <ActionsPlaylist
        onPlay={onPlay}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );

    await user.click(screen.getByRole("button", { name: "Tocar playlist" }));
    await user.click(screen.getByRole("button", { name: "Editar playlist" }));
    await user.click(screen.getByRole("button", { name: "Excluir playlist" }));

    expect(onPlay).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
