import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { authService } from "@/src/features/usuario/services/auth.service";
import { usuarioService } from "@/src/features/usuario/services/usuario.service";
import { notificationService } from "@/src/shared/services/notification.service";
import { useUsuarioActions } from "./useUsuarioActions";

vi.mock("@/src/features/usuario/services/auth.service", () => ({
  authService: {
    logout: vi.fn(),
  },
}));

vi.mock("@/src/features/usuario/services/usuario.service", () => ({
  usuarioService: {
    atualizarUsuarioParcialmente: vi.fn(),
    buscarUsuario: vi.fn(),
    atualizarFotoPerfil: vi.fn(),
    desativarUsuario: vi.fn(),
  },
}));

vi.mock("@/src/shared/services/notification.service", () => ({
  notificationService: {
    showErrorForSeconds: vi.fn(),
    showSuccessForSeconds: vi.fn(),
    showWarningForSeconds: vi.fn(),
  },
}));

const authServiceMock = vi.mocked(authService);
const usuarioServiceMock = vi.mocked(usuarioService);
const notificationServiceMock = vi.mocked(notificationService);

const usuarioAtualizado = {
  id: "usuario-1",
  nome: "Maria Silva",
  nomeUsuario: "maria",
  dataNascimento: "2000-01-01",
  email: "maria@touchfy.com",
  fotoPerfil: null,
};

type UseUsuarioActionsParams = Parameters<typeof useUsuarioActions>[0];

function renderUseUsuarioActions(overrides: Partial<UseUsuarioActionsParams> = {}) {
  const params: UseUsuarioActionsParams = {
    id: "usuario-1",
    partialUpdateValues: {
      nome: "Maria Silva",
      nomeUsuario: "maria",
      dataNascimento: "2000-01-01",
    },
    selectedPhotoFile: null,
    isPartialUpdateValid: vi.fn(() => true),
    setUsuario: vi.fn(),
    limparUploadDeFoto: vi.fn(),
    fecharModal: vi.fn(),
    redirectToLogin: vi.fn(),
    ...overrides,
  };

  return {
    params,
    ...renderHook(() => useUsuarioActions(params)),
  };
}

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.useRealTimers();
});

describe("useUsuarioActions", () => {
  it("bloqueia atualização parcial quando o formulário está inválido", async () => {
    const { result } = renderUseUsuarioActions({
      isPartialUpdateValid: vi.fn(() => false),
    });

    await act(async () => {
      await result.current.atualizarUsuarioParcial();
    });

    expect(usuarioServiceMock.atualizarUsuarioParcialmente).not.toHaveBeenCalled();
    expect(notificationServiceMock.showErrorForSeconds).toHaveBeenCalledWith(
      {
        title: "Não foi possível salvar as alterações",
        message: "Revise os campos destacados e tente novamente.",
      },
      5,
    );
  });

  it("atualiza o usuário e fecha o modal no sucesso", async () => {
    usuarioServiceMock.atualizarUsuarioParcialmente.mockResolvedValue({
      mensagem: "Usuário atualizado",
      atualizado: true,
      atualizadoEm: new Date("2026-01-01"),
    });
    usuarioServiceMock.buscarUsuario.mockResolvedValue(usuarioAtualizado);

    const { params, result } = renderUseUsuarioActions();

    await act(async () => {
      await result.current.atualizarUsuarioParcial();
    });

    expect(usuarioServiceMock.atualizarUsuarioParcialmente).toHaveBeenCalledWith(
      {
        nome: "Maria Silva",
        nomeUsuario: "maria",
        dataNascimento: "2000-01-01",
      },
      "usuario-1",
    );
    expect(params.setUsuario).toHaveBeenCalledWith(usuarioAtualizado);
    expect(params.fecharModal).toHaveBeenCalledTimes(1);
    expect(notificationServiceMock.showSuccessForSeconds).toHaveBeenCalledWith(
      {
        title: "Perfil atualizado com sucesso",
        message: "Suas informações já foram sincronizadas.",
      },
      4,
    );
  });

  it("avisa quando tenta salvar foto sem arquivo selecionado", async () => {
    const { result } = renderUseUsuarioActions({ selectedPhotoFile: null });

    await act(async () => {
      await result.current.atualizarFotoDePerfil();
    });

    expect(usuarioServiceMock.atualizarFotoPerfil).not.toHaveBeenCalled();
    expect(notificationServiceMock.showWarningForSeconds).toHaveBeenCalledWith(
      {
        title: "Escolha uma imagem",
        message: "Selecione um arquivo antes de salvar a nova foto.",
      },
      5,
    );
  });

  it("faz upload da foto, atualiza usuário e limpa o modal no sucesso", async () => {
    const arquivo = new File(["foto"], "avatar.png", { type: "image/png" });
    usuarioServiceMock.atualizarFotoPerfil.mockResolvedValue({
      mensagem: "Foto atualizada",
      atualizado: true,
      atualizadoEm: new Date("2026-01-01"),
    });
    usuarioServiceMock.buscarUsuario.mockResolvedValue(usuarioAtualizado);

    const { params, result } = renderUseUsuarioActions({ selectedPhotoFile: arquivo });

    await act(async () => {
      await result.current.atualizarFotoDePerfil();
    });

    expect(usuarioServiceMock.atualizarFotoPerfil).toHaveBeenCalledWith("usuario-1", arquivo);
    expect(params.setUsuario).toHaveBeenCalledWith(usuarioAtualizado);
    expect(params.limparUploadDeFoto).toHaveBeenCalledTimes(1);
    expect(params.fecharModal).toHaveBeenCalledTimes(1);
    expect(notificationServiceMock.showSuccessForSeconds).toHaveBeenCalledWith(
      {
        title: "Foto atualizada com sucesso",
        message: "Sua nova foto de perfil já está disponível.",
      },
      4,
    );
  });

  it("desativa a conta, fecha o modal e redireciona após o timeout", async () => {
    vi.useFakeTimers();
    usuarioServiceMock.desativarUsuario.mockResolvedValue({
      mensagem: "Usuário desativado",
      deletado: true,
      deletadoEm: new Date("2026-01-01"),
    });

    const { params, result } = renderUseUsuarioActions();

    await act(async () => {
      await result.current.desativarConta();
    });

    expect(usuarioServiceMock.desativarUsuario).toHaveBeenCalledWith("usuario-1");
    expect(params.fecharModal).toHaveBeenCalledTimes(1);
    expect(notificationServiceMock.showSuccessForSeconds).toHaveBeenCalledWith(
      {
        title: "Conta desativada",
        message: "Sua conta foi desativada. Esperamos te ver novamente em breve!",
      },
      5,
    );

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(authServiceMock.logout).toHaveBeenCalledTimes(1);
    expect(params.redirectToLogin).toHaveBeenCalledTimes(1);
  });
});
