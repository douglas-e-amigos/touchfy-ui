import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import DeactivateAccountModal from "./DeactivateAccountModal";

afterEach(() => {
    cleanup();
});

describe("DeactivateAccountModal", () => {
    it("renderiza o conteúdo de confirmação", () => {
        render(
            <DeactivateAccountModal
                open={true}
                onClose={() => undefined}
                onConfirmar={() => undefined}
            />,
        );

        expect(screen.getByText("Desativar Conta")).toBeInTheDocument();
        expect(screen.getByText(/Seu perfil ficará oculto/i)).toBeInTheDocument();
    });

    it("dispara callbacks de cancelar e confirmar", async () => {
        const onClose = vi.fn();
        const onConfirmar = vi.fn();
        const user = userEvent.setup();

        render(
            <DeactivateAccountModal
                open={true}
                onClose={onClose}
                onConfirmar={onConfirmar}
            />,
        );

        await user.click(screen.getByRole("button", { name: /Cancelar/i }));
        await user.click(screen.getByRole("button", { name: /Confirmar Desativação/i }));

        expect(onClose).toHaveBeenCalled();
        expect(onConfirmar).toHaveBeenCalledTimes(1);
    });
});