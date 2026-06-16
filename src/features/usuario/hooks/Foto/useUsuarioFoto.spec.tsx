import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { arquivoService } from "@/src/shared/services/arquivo.service";
import { useUsuarioFoto } from "./useUsuarioFoto";

vi.mock("@/src/shared/services/arquivo.service", () => ({
    arquivoService: {
        buscar: vi.fn(),
    },
}));

const buscarArquivoMock = vi.mocked(arquivoService.buscar);

afterEach(() => {
    cleanup();
    buscarArquivoMock.mockReset();
    vi.unstubAllGlobals();
});

describe("useUsuarioFoto", () => {
    it("limpa a foto exibida enquanto carrega uma nova foto de perfil", async () => {
        const createObjectURL = vi.fn()
            .mockReturnValueOnce("blob:foto-antiga")
            .mockReturnValueOnce("blob:foto-nova");
        const revokeObjectURL = vi.fn();

        vi.stubGlobal("URL", {
            ...URL,
            createObjectURL,
            revokeObjectURL,
        });

        let resolverNovaFoto: (arquivo: Blob) => void = () => undefined;
        buscarArquivoMock
            .mockResolvedValueOnce(new Blob(["antiga"], { type: "image/png" }))
            .mockReturnValueOnce(
                new Promise((resolve) => {
                    resolverNovaFoto = resolve;
                }),
            );

        const { result, rerender } = renderHook(
            ({ fotoPerfil }) => useUsuarioFoto({ fotoPerfil }),
            { initialProps: { fotoPerfil: "foto-antiga.png" as string | null } },
        );

        await waitFor(() => {
            expect(result.current.fotoPerfilExibida).toBe("blob:foto-antiga");
        });

        rerender({ fotoPerfil: "foto-nova.png" });

        await waitFor(() => {
            expect(result.current.fotoPerfilExibida).toBeNull();
        });

        expect(revokeObjectURL).toHaveBeenCalledWith("blob:foto-antiga");

        await act(async () => {
            resolverNovaFoto(new Blob(["nova"], { type: "image/png" }));
        });

        await waitFor(() => {
            expect(result.current.fotoPerfilExibida).toBe("blob:foto-nova");
        });

        expect(createObjectURL).toHaveBeenCalledTimes(2);
    });
});
