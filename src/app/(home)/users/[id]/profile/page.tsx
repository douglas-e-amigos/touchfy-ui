"use client";

import DeactivateAccountModal from "@/src/features/usuario/components/DeactivateAccount/DeactivateAccountModal";
import EditProfileModal from "@/src/features/usuario/components/EditProfile/EditProfileModal";
import ProfileHeaderCard from "@/src/features/usuario/components/ProfileHeaderCard/ProfileHeaderCard";
import ProfileSettingsSection from "@/src/features/usuario/components/ProfileSettings/ProfileSettingsSection";
import UploadPhotoModal from "@/src/features/usuario/components/UploadPhoto/UploadPhotoModal";
import { useUsuario } from "@/src/features/usuario/hooks/useUsuario";

export default function Profile() {
  const {
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
  } = useUsuario();

  return (
    <div className="flex flex-col gap-y-3 mx-auto mt-8">
      <div className="flex flex-col gap-y-2">
        <h2 className="text-3xl text-white font-bold">
          Configurações da Conta
        </h2>
        <span className="text-gray-400">
          Gerencie suas informações pessoais e preferências
        </span>
      </div>
      <ProfileHeaderCard
        fotoPerfilExibida={fotoPerfilExibida}
        usuario={usuario}
        onEditarDados={() => abrirModal("atualizar")}
        onEditarFoto={() => abrirModal("upload")}
      />
      <ProfileSettingsSection
        onDesativarConta={() => abrirModal("desativar")}
      />
      <EditProfileModal
        open={modals.atualizar}
        nome={partialUpdateValues.nome}
        nomeUsuario={partialUpdateValues.nomeUsuario}
        dataNascimento={partialUpdateValues.dataNascimento}
        nomeError={partialUpdateErrors.nome}
        nomeUsuarioError={partialUpdateErrors.nomeUsuario}
        dataNascimentoError={partialUpdateErrors.dataNascimento}
        onClose={fecharModal}
        onSalvar={atualizarUsuarioParcial}
        onNomeChange={handleNomeChange}
        onNomeUsuarioChange={handleNomeUsuarioChange}
        onDataNascimentoChange={handleDataNascimentoChange}
      />
      <UploadPhotoModal
        open={modals.upload}
        fotoPerfilExibida={fotoPerfilExibida}
        nomeUsuario={usuario.nome}
        selectedPhotoFile={selectedPhotoFile}
        fileInputRef={fileInputRef}
        onClose={fecharModal}
        onFileChange={handlePhotoFileChange}
        onSalvarFoto={atualizarFotoDePerfil}
      />
      <DeactivateAccountModal
        open={modals.desativar}
        onClose={fecharModal}
        onConfirmar={desativarConta}
      />
    </div>
  );
}
