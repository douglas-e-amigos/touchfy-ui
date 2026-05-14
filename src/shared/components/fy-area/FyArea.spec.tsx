import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import FyArea from "./FyArea";

afterEach(() => {
    cleanup();
});

describe("FyArea", () => {
    it("renderiza o conteúdo recebido", () => {
        render(<FyArea><span>Área</span></FyArea>);

        expect(screen.getByText("Área")).toBeInTheDocument();
    });

    it("aplica o estilo vermelho quando informado", () => {
        const { container } = render(<FyArea color="red">Conteúdo</FyArea>);

        expect(container.firstChild).toHaveClass("bg-danger-black");
        expect(container.firstChild).toHaveClass("border-danger");
    });
});