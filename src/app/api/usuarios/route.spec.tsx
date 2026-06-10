import { beforeEach, describe, expect, it, vi } from "vitest";
import publicHttpServer from "../../../infrastructure/http/http-server";
import { POST } from "./route";

vi.mock("../../../infrastructure/http/http-server", () => ({
  default: {
    post: vi.fn(),
  },
}));

const postMock = vi.mocked(publicHttpServer.post);

const validBody = {
  nome: "Maria Silva",
  nomeUsuario: "mariasilva",
  email: "maria@example.com",
  senha: "senha123",
  senhaNovamente: "senha123",
  dataNascimento: "2000-01-01",
};

function createRequest(body: unknown): Request {
  return new Request("http://localhost/api/usuarios", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

describe("POST /api/usuarios", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("envia o cadastro para o backend com role padrao de ouvinte", async () => {
    postMock.mockResolvedValueOnce({ data: { id: "usuario-id" } });

    const response = await POST(createRequest(validBody));

    await expect(response.json()).resolves.toEqual({ id: "usuario-id" });
    expect(postMock).toHaveBeenCalledWith("usuarios/auth/register", {
      ...validBody,
      role: "OUVINTE",
    });
  });

  it("retorna os dados e status do erro recebido do backend", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    const errorResponse = { message: "E-mail ja cadastrado" };

    postMock.mockRejectedValueOnce({
      isAxiosError: true,
      response: {
        data: errorResponse,
        status: 409,
      },
    });

    const response = await POST(createRequest(validBody));

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual(errorResponse);

    consoleError.mockRestore();
  });
});
