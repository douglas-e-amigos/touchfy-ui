import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useUsuarioModals } from "./useUsuarioModals";

describe("useUsuarioModals", () => {
  it("inicia com todos os modais fechados", () => {
    const { result } = renderHook(() => useUsuarioModals());

    expect(result.current.modals).toEqual({
      atualizar: false,
      desativar: false,
      upload: false,
    });
  });

  it("abre apenas o modal informado", () => {
    const { result } = renderHook(() => useUsuarioModals());

    act(() => {
      result.current.abrirModal("desativar");
    });

    expect(result.current.modals).toEqual({
      atualizar: false,
      desativar: true,
      upload: false,
    });
  });

  it("fecha os outros modais ao abrir um novo", () => {
    const { result } = renderHook(() => useUsuarioModals());

    act(() => {
      result.current.abrirModal("desativar");
    });

    act(() => {
      result.current.abrirModal("upload");
    });

    expect(result.current.modals).toEqual({
      atualizar: false,
      desativar: false,
      upload: true,
    });
  });

  it("fecha todos os modais", () => {
    const { result } = renderHook(() => useUsuarioModals());

    act(() => {
      result.current.abrirModal("atualizar");
    });

    act(() => {
      result.current.fecharModais();
    });

    expect(result.current.modals).toEqual({
      atualizar: false,
      desativar: false,
      upload: false,
    });
  });
});
