import { describe, it, afterEach, vi, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePerfil } from "./usePerfil";
import { UsuarioResponse } from "@/src/features/usuario/models/dto.model";
import { usuarioService } from "@/src/features/usuario/services/usuario.service";

const routerMock = {
  push: vi.fn(),
} as unknown as AppRouterInstance;

const usuarioMock: UsuarioResponse = {
  id: "id-1",
  nome: "José",
  nomeUsuario: "jose",
  dataNascimento: "2000-01-01",
  email: "jose@email.com",
  fotoPerfil: null,
};

describe("usePerfil", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it("função de abrir perfil deve funcionar corretamente", async () => {
    vi.spyOn(usuarioService, "buscarUsuarioLogado").mockResolvedValue(
      usuarioMock,
    );

    const { result } = renderHook(() => usePerfil({ router: routerMock }));
    await waitFor(() => expect(result.current.usuario).toEqual(usuarioMock));
    result.current.abrirPerfil();

    expect(routerMock.push).toHaveBeenCalledExactlyOnceWith(
      "/users/id-1/profile",
    );
  });

  it("se usuário não logado, deve ir para o login", async () => {
    const error = new Error("Não autenticado");
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(usuarioService, "buscarUsuarioLogado").mockRejectedValue(error);

    renderHook(() => usePerfil({ router: routerMock }));
    await waitFor(() =>
      expect(routerMock.push).toHaveBeenCalledExactlyOnceWith("/login"),
    );

    expect(console.error).toHaveBeenCalledWith(
      "Erro ao buscar usuário logado:",
      error,
    );
  });

  it("não deve abrir perfil se o usuário não possuir id", async () => {
    const usuarioSemId: UsuarioResponse = {
      ...usuarioMock,
      id: "",
    };

    vi.spyOn(usuarioService, "buscarUsuarioLogado").mockResolvedValue(
      usuarioSemId,
    );

    const { result } = renderHook(() => usePerfil({ router: routerMock }));

    await waitFor(() => {
      expect(result.current.usuario).toEqual(usuarioSemId);
    });

    result.current.abrirPerfil();

    expect(routerMock.push).not.toHaveBeenCalled();
  });

  it("não deve abrir perfil se o usuário ainda não foi carregado", () => {
    vi.spyOn(usuarioService, "buscarUsuarioLogado").mockReturnValue(
      new Promise(() => {}),
    );

    const { result } = renderHook(() => usePerfil({ router: routerMock }));

    result.current.abrirPerfil();

    expect(routerMock.push).not.toHaveBeenCalled();
  });
});
