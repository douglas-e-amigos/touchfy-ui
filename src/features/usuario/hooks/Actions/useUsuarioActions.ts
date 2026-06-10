"use client";

import {
  AtualizarUsuarioParcialmenteRequest,
  UsuarioResponse,
} from "@/src/features/usuario/models/dto.model";
import { PartialUserUpdateForm } from "@/src/features/usuario/models/form.model";
import { authService } from "@/src/features/usuario/services/auth.service";
import { usuarioService } from "@/src/features/usuario/services/usuario.service";
import { notificationService } from "@/src/shared/services/notification.service";
import { getHttpErrorMessage } from "@/src/shared/utils/http-error";

type UseUsuarioActionsParams = {
  id: string;
  partialUpdateValues: PartialUserUpdateForm;
  selectedPhotoFile: File | null;
  isPartialUpdateValid: () => boolean;
  setUsuario: (usuario: UsuarioResponse) => void;
  limparUploadDeFoto: () => void;
  fecharModal: () => void;
  redirectToLogin: () => void;
};

export function useUsuarioActions({
  id,
  partialUpdateValues,
  selectedPhotoFile,
  isPartialUpdateValid,
  setUsuario,
  limparUploadDeFoto,
  fecharModal,
  redirectToLogin,
}: UseUsuarioActionsParams) {
  const atualizarUsuarioParcial = async () => {
    if (!isPartialUpdateValid()) {
      notificationService.showErrorForSeconds(
        {
          title: "Não foi possível salvar as alterações",
          message: "Revise os campos destacados e tente novamente.",
        },
        5,
      );
      return;
    }

    const request: AtualizarUsuarioParcialmenteRequest = {
      nome: partialUpdateValues.nome,
      nomeUsuario: partialUpdateValues.nomeUsuario,
      dataNascimento: partialUpdateValues.dataNascimento,
    };

    try {
      await usuarioService.atualizarUsuarioParcialmente(request, id);

      notificationService.showSuccessForSeconds(
        {
          title: "Perfil atualizado com sucesso",
          message: "Suas informações já foram sincronizadas.",
        },
        4,
      );

      const usuarioAtualizado = await usuarioService.buscarUsuario(id);
      setUsuario(usuarioAtualizado);
      fecharModal();
    } catch (error) {
      console.error(error);
      notificationService.showErrorForSeconds(
        {
          title: "Erro ao atualizar o perfil",
          message: getHttpErrorMessage(error, "Tente novamente em instantes."),
        },
        6,
      );
    }
  };

  const atualizarFotoDePerfil = async () => {
    if (!selectedPhotoFile) {
      notificationService.showWarningForSeconds(
        {
          title: "Escolha uma imagem",
          message: "Selecione um arquivo antes de salvar a nova foto.",
        },
        5,
      );
      return;
    }

    try {
      await usuarioService.atualizarFotoPerfil(id, selectedPhotoFile);

      const usuarioAtualizado = await usuarioService.buscarUsuario(id);
      setUsuario(usuarioAtualizado);
      limparUploadDeFoto();
      fecharModal();

      notificationService.showSuccessForSeconds(
        {
          title: "Foto atualizada com sucesso",
          message: "Sua nova foto de perfil já está disponível.",
        },
        4,
      );
    } catch (error) {
      console.error(error);
      notificationService.showErrorForSeconds(
        {
          title: "Erro ao atualizar a foto",
          message: getHttpErrorMessage(error, "Tente novamente em instantes."),
        },
        6,
      );
    }
  };

  const desativarConta = async () => {
    try {
      await usuarioService.desativarUsuario(id);
      notificationService.showSuccessForSeconds(
        {
          title: "Conta desativada",
          message:
            "Sua conta foi desativada. Esperamos te ver novamente em breve!",
        },
        5,
      );
      setTimeout(() => {
        authService.logout();
        redirectToLogin();
      }, 5000);
    } catch (error) {
      console.error(error);
      notificationService.showErrorForSeconds(
        {
          title: "Erro ao desativar a conta",
          message: getHttpErrorMessage(error, "Tente novamente em instantes."),
        },
        6,
      );
    } finally {
      fecharModal();
    }
  };

  return {
    atualizarUsuarioParcial,
    atualizarFotoDePerfil,
    desativarConta,
  };
}
