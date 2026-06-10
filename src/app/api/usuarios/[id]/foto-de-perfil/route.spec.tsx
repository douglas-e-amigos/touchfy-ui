import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NextRequest } from "next/server";
import { serverApiRequest } from "@/src/infrastructure/http/server-http";
import { PATCH } from "./route";

vi.mock("@/src/infrastructure/http/server-http", () => ({
  serverApiRequest: vi.fn(),
}));

const serverApiRequestMock = vi.mocked(serverApiRequest);

function createRequest(formData: FormData): NextRequest {
  return new Request("http://localhost/api/usuarios/usuario-id/foto-de-perfil", {
    method: "PATCH",
    body: formData,
  }) as unknown as NextRequest;
}

function createParams(id = "usuario-id") {
  return {
    params: Promise.resolve({ id }),
  };
}

describe("PATCH /api/usuarios/[id]/foto-de-perfil", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("repassa a foto de perfil para o backend", async () => {
    const formData = new FormData();
    formData.append("foto", "avatar");

    serverApiRequestMock.mockResolvedValueOnce({
      data: { atualizado: true },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as any,
    });

    const response = await PATCH(createRequest(formData), createParams());

    await expect(response.json()).resolves.toEqual({ atualizado: true });
    const requestConfig = serverApiRequestMock.mock.calls[0][0];
    expect(requestConfig.method).toBe("PATCH");
    expect(requestConfig.url).toBe("/usuarios/usuario-id/foto-de-perfil");
    expect((requestConfig.data as FormData).get("foto")).toBe("avatar");
  });

  it("retorna os dados e status do erro recebido do backend", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    const errorResponse = {
      mensagem: "Erro ao processar a requisição: Falha ao enviar o arquivo",
      statusCode: 500,
    };
    const formData = new FormData();
    formData.append("foto", "avatar");

    serverApiRequestMock.mockRejectedValueOnce({
      isAxiosError: true,
      response: {
        data: errorResponse,
        status: 500,
      },
    });

    try {
      const response = await PATCH(createRequest(formData), createParams());

      expect(response.status).toBe(500);
      await expect(response.json()).resolves.toEqual(errorResponse);
    } finally {
      consoleError.mockRestore();
    }
  });

  it("retorna mensagem padrao quando o erro nao possui dados do backend", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    const formData = new FormData();
    formData.append("foto", "avatar");

    serverApiRequestMock.mockRejectedValueOnce(new Error("Falha inesperada"));

    try {
      const response = await PATCH(createRequest(formData), createParams());

      expect(response.status).toBe(500);
      await expect(response.json()).resolves.toEqual({
        message: "Erro ao atualizar foto de perfil",
      });
    } finally {
      consoleError.mockRestore();
    }
  });
});
