import { describe, expect, it } from "vitest";
import { isEmail } from "./validation";

describe("isEmail", () => {
  it("aceita e-mails simples válidos", () => {
    expect(isEmail("user@example.com")).toBe(true);
    expect(isEmail("user.name+tag@example.com.br")).toBe(true);
  });

  it("rejeita e-mails sem a estrutura mínima esperada", () => {
    expect(isEmail("user@example")).toBe(false);
    expect(isEmail("userexample.com")).toBe(false);
    expect(isEmail("@example.com")).toBe(false);
    expect(isEmail("user@@example.com")).toBe(false);
    expect(isEmail("user@example.com ")).toBe(false);
  });

  it("rejeita entradas acima do tamanho máximo de e-mail", () => {
    expect(isEmail(`${"a".repeat(255)}@example.com`)).toBe(false);
  });
});
