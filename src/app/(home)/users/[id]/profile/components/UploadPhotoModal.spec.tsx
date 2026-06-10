import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import UploadPhotoModal from "./UploadPhotoModal";

afterEach(() => {
    cleanup();
});

describe("UploadPhotoModal", () => {
    it("renderiza fallback quando não há foto", () => {
        const ref = { current: null };

        render(
            <UploadPhotoModal
                open={true}
                fotoPerfilExibida={null}
                nomeUsuario="maria"
                selectedPhotoFile={null}
                fileInputRef={ref}
                onClose={() => undefined}
                onFileChange={() => undefined}
                onSalvarFoto={() => undefined}
            />,
        );

        expect(screen.getByText("Escolher Arquivo")).toBeInTheDocument();
        expect(document.querySelector('input[type="file"]')).toHaveAttribute(
            "accept",
            "image/png,image/jpeg,.png,.jpg,.jpeg",
        );
        expect(screen.getByRole("button", { name: /Salvar Foto/i })).toBeDisabled();
    });

    it("dispara callbacks de fechar, escolher arquivo e salvar", async () => {
        const onClose = vi.fn();
        const onFileChange = vi.fn();
        const onSalvarFoto = vi.fn();
        const user = userEvent.setup();
        const ref = { current: null as HTMLInputElement | null };

        render(
            <UploadPhotoModal
                open={true}
                fotoPerfilExibida="blob:foto"
                nomeUsuario="maria"
                selectedPhotoFile={new File(["foto"], "avatar.png", { type: "image/png" })}
                fileInputRef={ref}
                onClose={onClose}
                onFileChange={onFileChange}
                onSalvarFoto={onSalvarFoto}
            />,
        );

        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        ref.current = fileInput;

        fireEvent.change(fileInput, {
            target: {
                files: [new File(["foto"], "avatar.png", { type: "image/png" })],
            },
        });

        await user.click(screen.getByRole("button", { name: /Salvar Foto/i }));
        await user.click(screen.getByRole("button", { name: /Cancelar/i }));

        expect(onFileChange).toHaveBeenCalled();
        expect(onSalvarFoto).toHaveBeenCalledTimes(1);
        expect(onClose).toHaveBeenCalled();
    });
});
