import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useForm } from "./useForm";

type FormularioTeste = {
  nome: string;
  senha: string;
  confirmarSenha: string;
  aceite: boolean;
};

const valoresIniciais: FormularioTeste = {
  nome: "",
  senha: "123456",
  confirmarSenha: "123456",
  aceite: false,
};

afterEach(() => {
  cleanup();
});

describe("useForm", () => {
  it("inicia com os valores informados e sem erros", () => {
    const { result } = renderHook(() => useForm(valoresIniciais));

    expect(result.current.values).toEqual(valoresIniciais);
    expect(result.current.errors).toEqual({});
  });

  it("atualiza valores e considera válido quando não recebe validador", () => {
    const { result } = renderHook(() => useForm(valoresIniciais));
    let isValid = false;

    act(() => {
      result.current.handleChange("nome", "Maria Silva");
    });

    act(() => {
      isValid = result.current.isValid();
    });

    expect(result.current.values).toEqual({
      ...valoresIniciais,
      nome: "Maria Silva",
    });
    expect(result.current.errors).toEqual({});
    expect(isValid).toBe(true);
  });

  it("valida o campo alterado e remove o erro quando o valor fica válido", () => {
    const { result } = renderHook(() =>
      useForm(valoresIniciais, validarFormulario),
    );

    act(() => {
      result.current.handleChange("nome", "");
    });

    expect(result.current.errors).toEqual({
      nome: "Nome obrigatório",
    });

    act(() => {
      result.current.handleChange("nome", "Maria Silva");
    });

    expect(result.current.values.nome).toBe("Maria Silva");
    expect(result.current.errors).toEqual({});
  });

  it("valida dependências do campo alterado", () => {
    const validar = vi.fn(validarFormulario);
    const { result } = renderHook(() =>
      useForm(valoresIniciais, validar, {
        senha: ["confirmarSenha"],
      }),
    );

    act(() => {
      result.current.handleChange("senha", "654321");
    });

    expect(result.current.values.senha).toBe("654321");
    expect(result.current.errors).toEqual({
      confirmarSenha: "Senhas diferentes",
    });
    expect(validar).toHaveBeenCalledWith(
      "senha",
      expect.objectContaining({ senha: "654321" }),
    );
    expect(validar).toHaveBeenCalledWith(
      "confirmarSenha",
      expect.objectContaining({ senha: "654321" }),
    );
  });

  it("valida todos os campos ao chamar isValid", () => {
    const valoresInvalidos: FormularioTeste = {
      nome: "",
      senha: "",
      confirmarSenha: "123456",
      aceite: false,
    };
    const { result } = renderHook(() =>
      useForm(valoresInvalidos, validarFormulario),
    );
    let isValid = true;

    act(() => {
      isValid = result.current.isValid();
    });

    expect(isValid).toBe(false);
    expect(result.current.errors).toEqual({
      nome: "Nome obrigatório",
      senha: "Senha inválida",
      confirmarSenha: "Senhas diferentes",
      aceite: "Aceite obrigatório",
    });
  });

  it("limpa erros e aplica novos valores ao resetar", () => {
    const valoresInvalidos: FormularioTeste = {
      nome: "",
      senha: "",
      confirmarSenha: "123456",
      aceite: false,
    };
    const novosValores: FormularioTeste = {
      nome: "Maria Silva",
      senha: "123456",
      confirmarSenha: "123456",
      aceite: true,
    };
    const { result } = renderHook(() =>
      useForm(valoresInvalidos, validarFormulario),
    );

    act(() => {
      result.current.isValid();
    });

    expect(result.current.errors).not.toEqual({});

    act(() => {
      result.current.reset(novosValores);
    });

    expect(result.current.values).toEqual(novosValores);
    expect(result.current.errors).toEqual({});
  });
});

function validarFormulario(
  field: keyof FormularioTeste,
  values: Readonly<FormularioTeste>,
) {
  if (field === "nome" && !values.nome.trim()) {
    return "Nome obrigatório";
  }

  if (field === "senha" && values.senha.length < 6) {
    return "Senha inválida";
  }

  if (field === "confirmarSenha" && values.confirmarSenha !== values.senha) {
    return "Senhas diferentes";
  }

  if (field === "aceite" && !values.aceite) {
    return "Aceite obrigatório";
  }

  return null;
}
