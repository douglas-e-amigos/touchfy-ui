"use client";

import { useUsuarioActions } from "@/src/features/usuario/hooks/Actions/useUsuarioActions";
import { useUsuarioDados } from "@/src/features/usuario/hooks/Dados/useUsuarioDados";
import { useUsuarioForm } from "@/src/features/usuario/hooks/Form/useUsuarioForm";
import { useUsuarioFoto } from "@/src/features/usuario/hooks/Foto/useUsuarioFoto";
import { useUsuarioModals } from "@/src/features/usuario/hooks/Modals/useUsuarioModals";
import { useUsuarioRoute } from "@/src/features/usuario/hooks/Route/useUsuarioRoute";

export function useUsuario() {
  const { id, redirectToLogin } = useUsuarioRoute();

  const {
    partialUpdateValues,
    partialUpdateErrors,
    resetPartialUpdate,
    isPartialUpdateValid,
    handleNomeChange,
    handleNomeUsuarioChange,
    handleDataNascimentoChange,
  } = useUsuarioForm();

  const { usuario, setUsuario } = useUsuarioDados({ id, resetPartialUpdate });

  const {
    selectedPhotoFile,
    fotoPerfilExibida,
    fileInputRef,
    limparUploadDeFoto,
    handlePhotoFileChange,
  } = useUsuarioFoto({ fotoPerfil: usuario.fotoPerfil });

  const { modals, abrirModal, fecharModais } = useUsuarioModals();

  const fecharModal = () => {
    fecharModais();
    limparUploadDeFoto();
  };

  const { atualizarUsuarioParcial, atualizarFotoDePerfil, desativarConta } =
    useUsuarioActions({
      id,
      partialUpdateValues,
      selectedPhotoFile,
      isPartialUpdateValid,
      setUsuario,
      limparUploadDeFoto,
      fecharModal,
      redirectToLogin,
    });

  return {
    usuario,
    modals,
    partialUpdateValues,
    partialUpdateErrors,
    selectedPhotoFile,
    fotoPerfilExibida,
    fileInputRef,
    abrirModal,
    fecharModal,
    atualizarUsuarioParcial,
    atualizarFotoDePerfil,
    desativarConta,
    handlePhotoFileChange,
    handleNomeChange,
    handleNomeUsuarioChange,
    handleDataNascimentoChange,
  };
}
