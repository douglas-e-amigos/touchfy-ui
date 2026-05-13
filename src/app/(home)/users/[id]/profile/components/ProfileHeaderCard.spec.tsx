import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import ProfileHeaderCard from "./ProfileHeaderCard";

const usuario = {
    id: "1",
    nome: "Maria",
    nomeUsuario: "maria",
    dataNascimento: "2000-01-01",
    email: "maria@touchfy.com",
    fotoPerfil: null,
};

afterEach(() => {
    cleanup();
});

describe("ProfileHeaderCard", () => {
    it("renderiza as informações do usuário", () => {
        render(
            <ProfileHeaderCard
                fotoPerfilExibida={null}
                usuario={usuario}
                onEditarDados={() => undefined}
                onEditarFoto={() => undefined}
            />,
        );

        expect(screen.getByText("Maria")).toBeInTheDocument();
        expect(screen.getByText("maria")).toBeInTheDocument();
        expect(screen.getByText(/Nascimento: 2000-01-01/i)).toBeInTheDocument();
    });

    it("dispara callbacks de editar dados e foto", async () => {
        const onEditarDados = vi.fn();
        const onEditarFoto = vi.fn();
        const user = userEvent.setup();

        render(
            <ProfileHeaderCard
                fotoPerfilExibida="/foto.png"
                usuario={usuario}
                onEditarDados={onEditarDados}
                onEditarFoto={onEditarFoto}
            />,
        );

        await user.click(screen.getByRole("button", { name: /Foto de perfil de Maria/i }));
        await user.click(screen.getByRole("button", { name: /Editar Dados/i }));

        expect(onEditarFoto).toHaveBeenCalledTimes(1);
        expect(onEditarDados).toHaveBeenCalledTimes(1);
    });
});