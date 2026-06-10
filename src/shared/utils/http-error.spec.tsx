import { describe, expect, it } from "vitest";
import { getHttpErrorMessage } from "./http-error";

describe("getHttpErrorMessage", () => {
  it("retorna mensagem de erro enviada pelo backend", () => {
    const error = {
      isAxiosError: true,
      response: {
        data: {
          mensagem: "Erro ao processar a requisição",
        },
      },
    };

    expect(getHttpErrorMessage(error, "Tente novamente")).toBe(
      "Erro ao processar a requisição",
    );
  });
});
