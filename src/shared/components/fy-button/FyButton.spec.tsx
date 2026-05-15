import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FyButton from "./FyButton";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

describe("FyButton", () => {
    it("renderiza o botão com o texto informado", () => {
        render(<FyButton>FyButton</FyButton>);

        const button = screen.getByRole("button", { name: "FyButton" });

        expect(button).toBeInTheDocument();
    });

    it.each(["", "   "])(
        "não renderiza o botão quando recebe texto vazio: '%s'",
        (children) => {
            const consoleError = vi
                .spyOn(console, "error")
                .mockImplementation(() => {});

            render(<FyButton>{children}</FyButton>);

            expect(screen.queryByRole("button")).not.toBeInTheDocument();
            expect(consoleError).toHaveBeenCalledWith(
                "Texto do botão não pode ser vazio"
            );
        }
    );

    it.each([true, false, null, undefined])(
        "não renderiza o botão quando recebe %s",
        (children) => {
            const consoleError = vi
                .spyOn(console, "error")
                .mockImplementation(() => {});

            render(<FyButton>{children}</FyButton>);

            expect(screen.queryByRole("button")).not.toBeInTheDocument();
            expect(consoleError).toHaveBeenCalledWith(
                "Texto do botão não pode ser vazio"
            );
        }
    );

    it("dispara onClick quando clicado", async () => {
        const onClick = vi.fn();
        const user = userEvent.setup();

        render(<FyButton onClick={onClick}>Salvar</FyButton>);

        await user.click(screen.getByRole("button", { name: "Salvar" }));

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});