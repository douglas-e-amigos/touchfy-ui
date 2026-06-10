import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import EditProfileModal from "./EditProfileModal";

afterEach(() => {
    cleanup();
});

describe("EditProfileModal", () => {
    it("renderiza os campos e valores do formulário", () => {
        render(
            <EditProfileModal
                open={true}
                nome="Maria"
                nomeUsuario="maria"
                dataNascimento="2026-05-13"
                onClose={() => undefined}
                onSalvar={() => undefined}
                onNomeChange={() => undefined}
                onNomeUsuarioChange={() => undefined}
                onDataNascimentoChange={() => undefined}
            />,
        );

        expect(screen.getByDisplayValue("Maria")).toBeInTheDocument();
        expect(screen.getByDisplayValue("maria")).toBeInTheDocument();
        expect(screen.getByDisplayValue("2026-05-13")).toBeInTheDocument();
    });

    it("dispara callbacks dos campos e ações", async () => {
        const onClose = vi.fn();
        const onSalvar = vi.fn();
        const onNomeChange = vi.fn();
        const onNomeUsuarioChange = vi.fn();
        const onDataNascimentoChange = vi.fn();
        const user = userEvent.setup();

        render(
            <EditProfileModal
                open={true}
                nome=""
                nomeUsuario=""
                dataNascimento=""
                onClose={onClose}
                onSalvar={onSalvar}
                onNomeChange={onNomeChange}
                onNomeUsuarioChange={onNomeUsuarioChange}
                onDataNascimentoChange={onDataNascimentoChange}
            />,
        );

        const textboxes = screen.getAllByRole("textbox");
        await user.type(textboxes[0], "Maria");
        await user.type(textboxes[1], "maria");
        await user.click(screen.getByRole("button", { name: /Salvar Alterações/i }));
        await user.click(screen.getByRole("button", { name: /Cancelar/i }));

        expect(onNomeChange).toHaveBeenCalled();
        expect(onNomeUsuarioChange).toHaveBeenCalled();
        expect(onSalvar).toHaveBeenCalledTimes(1);
        expect(onClose).toHaveBeenCalled();

        const dateInput = screen.getByLabelText("Data de nascimento");
        await user.type(dateInput, "2026-05-13");
        expect(onDataNascimentoChange).toHaveBeenCalled();
    });
});