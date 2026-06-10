import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { useUsuarioDados } from "./useUsuarioDados";

import { usuarioService } from "@/src/features/usuario/services/usuario.service";
import { formatDateForInput } from "@/src/shared/utils/date";

import type { UsuarioResponse } from "@/src/features/usuario/models/dto.model";

vi.mock("@/src/features/usuario/services/usuario.service", () => ({
  usuarioService: {
    buscarUsuario: vi.fn(),
  },
}));

vi.mock("@/src/shared/utils/date", () => ({
  formatDateForInput: vi.fn(),
}));

const buscarUsuarioMock = vi.mocked(usuarioService.buscarUsuario);
const formatDateForInputMock = vi.mocked(formatDateForInput);

const initialUsuario: UsuarioResponse = {
  id: "",
  nome: "",
  nomeUsuario: "",
  dataNascimento: "",
  email: "",
  fotoPerfil: null,
};

describe("useUsuarioDados", () => {
  beforeEach(() => {
    buscarUsuarioMock.mockReset();
    formatDateForInputMock.mockReset();
  });

  it("deve retornar o usuário inicial quando não houver id", () => {
    const resetPartialUpdate = vi.fn();

    const { result } = renderHook(() =>
      useUsuarioDados({
        id: "",
        resetPartialUpdate,
      }),
    );

    expect(result.current.usuario).toEqual(initialUsuario);
    expect(buscarUsuarioMock).not.toHaveBeenCalled();
    expect(resetPartialUpdate).not.toHaveBeenCalled();
  });

  it("deve buscar o usuário pelo id, atualizar o formulário parcial e atualizar o estado", async () => {
    const usuario: UsuarioResponse = {
      id: "user-1",
      nome: "José Reis",
      nomeUsuario: "jose.reis",
      dataNascimento: "2000-05-20T00:00:00.000Z",
      email: "jose@email.com",
      fotoPerfil: null,
    };

    buscarUsuarioMock.mockResolvedValue(usuario);
    formatDateForInputMock.mockReturnValue("2000-05-20");

    const resetPartialUpdate = vi.fn();

    const { result } = renderHook(() =>
      useUsuarioDados({
        id: "user-1",
        resetPartialUpdate,
      }),
    );

    await waitFor(() => {
      expect(result.current.usuario).toEqual(usuario);
    });

    expect(buscarUsuarioMock).toHaveBeenCalledWith("user-1");

    expect(formatDateForInputMock).toHaveBeenCalledWith(usuario.dataNascimento);

    expect(resetPartialUpdate).toHaveBeenCalledWith({
      nome: "José Reis",
      nomeUsuario: "jose.reis",
      dataNascimento: "2000-05-20",
    });
  });

  it("deve manter o usuário inicial antes da resposta da busca", () => {
    buscarUsuarioMock.mockReturnValue(new Promise(() => {}));

    const resetPartialUpdate = vi.fn();

    const { result } = renderHook(() =>
      useUsuarioDados({
        id: "user-1",
        resetPartialUpdate,
      }),
    );

    expect(result.current.usuario).toEqual(initialUsuario);
    expect(buscarUsuarioMock).toHaveBeenCalledWith("user-1");
    expect(resetPartialUpdate).not.toHaveBeenCalled();
  });

  it("deve chamar console.error quando a busca falhar", async () => {
    const error = new Error("Erro ao buscar usuário");

    buscarUsuarioMock.mockRejectedValue(error);

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const resetPartialUpdate = vi.fn();

    renderHook(() =>
      useUsuarioDados({
        id: "user-1",
        resetPartialUpdate,
      }),
    );

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    });

    expect(resetPartialUpdate).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
