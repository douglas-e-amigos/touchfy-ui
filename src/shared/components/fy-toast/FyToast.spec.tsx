import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render, waitFor } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import FyToast from "./FyToast";
import { notificationService } from "../../services/notification.service";

let pathname = "/dashboard";

vi.mock("next/navigation", () => ({
    usePathname: () => pathname,
}));

beforeEach(() => {
    notificationService.clear();
    pathname = "/dashboard";
});

afterEach(() => {
    cleanup();
    notificationService.clear();
});

describe("FyToast", () => {
    it("renderiza notificações emitidas pelo service", async () => {
        render(<FyToast />);

        await act(async () => {
            notificationService.showSuccess({
                title: "Operação concluída",
                message: "Tudo certo",
            });
        });

        await waitFor(() => {
            expect(screen.getByText("Operação concluída")).toBeInTheDocument();
        });

        expect(screen.getByText("Tudo certo")).toBeInTheDocument();
        expect(screen.getByText("Sucesso")).toBeInTheDocument();
    });

    it("remove a notificação ao clicar em fechar", async () => {
        const user = userEvent.setup();

        render(<FyToast />);

        await act(async () => {
            notificationService.showError({ title: "Erro crítico" });
        });

        await waitFor(() => {
            expect(screen.getByText("Erro crítico")).toBeInTheDocument();
        });

        await user.click(screen.getByRole("button", { name: /Fechar notificação Erro crítico/i }));

        await waitFor(() => {
            expect(screen.queryByText("Erro crítico")).not.toBeInTheDocument();
        });
    });

    it("limpa notificações quando a rota muda", async () => {
        const { rerender } = render(<FyToast />);

        await act(async () => {
            notificationService.showInfo({ title: "Aviso" });
        });

        await waitFor(() => {
            expect(screen.getByText("Aviso")).toBeInTheDocument();
        });

        pathname = "/profile";
        await act(async () => {
            rerender(<FyToast />);
        });

        await waitFor(() => {
            expect(screen.queryByText("Aviso")).not.toBeInTheDocument();
        });
    });
});