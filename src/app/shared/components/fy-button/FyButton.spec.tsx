import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
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

    it("nao renderiza o botao quando recebe texto vazio", () => {
        render(<FyButton>{""}</FyButton>);
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it.each([true, false, null, undefined])("não renderiza o botão quando recebe %s", (children) => {
        render(<FyButton>{children}</FyButton>);
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    })
});