import { cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useUsuarioRoute } from "./useUsuarioRoute";

const navigationMock = vi.hoisted(() => ({
    params: { id: "usuario-1" },
    back: vi.fn(),
    push: vi.fn(),
}));

vi.mock("next/navigation", () => ({
    useParams: () => navigationMock.params,
    useRouter: () => ({
        back: navigationMock.back,
        push: navigationMock.push,
    }),
}));

beforeEach(() => {
    navigationMock.params = { id: "usuario-1" };
    navigationMock.back.mockClear();
    navigationMock.push.mockClear();
});

afterEach(() => {
    cleanup();
});

describe("useUsuarioRoute", () => {
    it("retorna o id da rota quando o parâmetro está correto", () => {
        const { result } = renderHook(() => useUsuarioRoute());

        expect(result.current.id).toBe("usuario-1");
        expect(navigationMock.back).not.toHaveBeenCalled();
    });

    it("redireciona para login ao chamar redirectToLogin", () => {
        const { result } = renderHook(() => useUsuarioRoute());

        result.current.redirectToLogin();

        expect(navigationMock.push).toHaveBeenCalledWith("/login");
    });

    it("volta a navegação quando o id da rota está incorreto", () => {
        navigationMock.params = {id: ""};

        renderHook(() => useUsuarioRoute());

        expect(navigationMock.back).toHaveBeenCalledTimes(1);
    });
});
