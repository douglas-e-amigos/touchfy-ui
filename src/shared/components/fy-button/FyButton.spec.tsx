import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import FyButton from "./FyButton";

afterEach(() => {
    cleanup();
});

describe("FyButton", () => {
    it("renderiza o botao com o texto informado", () => {
        render(<FyButton>FyButton</FyButton>);

        const button = screen.getByRole("button", { name: "FyButton" });

        expect(button).toBeInTheDocument();
    });

    it("renderiza o botao mesmo quando recebe texto vazio", () => {
        render(<FyButton>{""}</FyButton>);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it.each([true, false, null, undefined])("renderiza o botão quando recebe %s", (children) => {
        render(<FyButton>{children}</FyButton>);
        expect(screen.getByRole("button")).toBeInTheDocument();
    })

    it("dispara onClick quando clicado", async () => {
        const onClick = vi.fn();
        const user = userEvent.setup();

        render(<FyButton onClick={onClick}>Salvar</FyButton>);

        await user.click(screen.getByRole("button", { name: "Salvar" }));

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});