import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useUsuarioForm } from "./useUsuarioForm";

afterEach(() => {
    cleanup();
});

describe("useUsuarioForm", () => {
    it("inicia com valores vazios e sem erros", () => {
        const { result } = renderHook(() => useUsuarioForm());

        expect(result.current.partialUpdateValues).toEqual({
            nomeUsuario: "",
            nome: "",
            dataNascimento: "",
        });
        expect(result.current.partialUpdateErrors).toEqual({});
    });

    it("atualiza valores pelos handlers de cada campo", () => {
        const { result } = renderHook(() => useUsuarioForm());

        act(() => {
            result.current.handleNomeChange("Maria Silva");
        });

        act(() => {
            result.current.handleNomeUsuarioChange("maria");
        });

        act(() => {
            result.current.handleDataNascimentoChange("2000-01-01");
        });

        expect(result.current.partialUpdateValues).toEqual({
            nome: "Maria Silva",
            nomeUsuario: "maria",
            dataNascimento: "2000-01-01",
        });
        expect(result.current.partialUpdateErrors).toEqual({});
    });

    it("valida campos obrigatórios e data inválida", () => {
        const { result } = renderHook(() => useUsuarioForm());

        act(() => {
            result.current.handleNomeChange("");
        });

        act(() => {
            result.current.handleNomeUsuarioChange("");
        });

        act(() => {
            result.current.handleDataNascimentoChange("data-invalida");
        });

        expect(result.current.partialUpdateErrors).toEqual({
            nome: "Nome obrigatório",
            nomeUsuario: "Nome de usuário obrigatório",
            dataNascimento: "Data de nascimento inválida",
        });
    });

    it("valida todos os campos ao chamar isPartialUpdateValid", () => {
        const { result } = renderHook(() => useUsuarioForm());
        let isValid = true;

        act(() => {
            isValid = result.current.isPartialUpdateValid();
        });

        expect(isValid).toBe(false);
        expect(result.current.partialUpdateErrors).toEqual({
            nomeUsuario: "Nome de usuário obrigatório",
            nome: "Nome obrigatório",
            dataNascimento: "Data de nascimento inválida",
        });
    });

    it("limpa erros e aplica novos valores ao resetar o formulário", () => {
        const { result } = renderHook(() => useUsuarioForm());

        act(() => {
            result.current.isPartialUpdateValid();
        });

        expect(result.current.partialUpdateErrors).not.toEqual({});

        act(() => {
            result.current.resetPartialUpdate({
                nome: "Maria Silva",
                nomeUsuario: "maria",
                dataNascimento: "2000-01-01",
            });
        });

        expect(result.current.partialUpdateValues).toEqual({
            nome: "Maria Silva",
            nomeUsuario: "maria",
            dataNascimento: "2000-01-01",
        });
        expect(result.current.partialUpdateErrors).toEqual({});
    });
});
