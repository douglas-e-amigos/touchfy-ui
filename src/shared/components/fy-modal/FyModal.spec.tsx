import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import FyModal from "./FyModal";

afterEach(() => {
    cleanup();
    document.body.style.overflow = "auto";
});

describe("FyModal", () => {
    it("não renderiza conteúdo quando está fechado", () => {
        render(
            <FyModal open={false} onClose={() => undefined}>
                <span>Conteúdo</span>
            </FyModal>,
        );

        expect(screen.queryByText("Conteúdo")).not.toBeInTheDocument();
    });

    it("renderiza conteúdo e fecha ao clicar no backdrop", () => {
        const onClose = vi.fn();

        render(
            <FyModal open={true} onClose={onClose}>
                <span>Conteúdo</span>
            </FyModal>,
        );

        fireEvent.click(screen.getByLabelText("Fechar modal"));

        expect(screen.getByText("Conteúdo")).toBeInTheDocument();
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("fecha ao pressionar escape e bloqueia scroll da página", () => {
        const onClose = vi.fn();

        render(
            <FyModal open={true} onClose={onClose}>
                <span>Conteúdo</span>
            </FyModal>,
        );

        fireEvent.keyDown(document, { key: "Escape" });

        expect(document.body.style.overflow).toBe("hidden");
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
