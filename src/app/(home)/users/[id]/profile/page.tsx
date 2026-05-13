'use client';

import { PartialUserUpdateForm } from "@/src/app/features/usuario/models/form.model";
import { useForm } from "@/src/app/shared/hooks/use-form";
import { updateUserDependencies, validateUpdate } from "./validation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { authService } from "@/src/app/features/usuario/services/auth.service";
import { usuarioService } from "@/src/app/features/usuario/services/usuario.service";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { AtualizarUsuarioParcialmenteRequest, UsuarioResponse } from "@/src/app/features/usuario/models/dto.model";
import { formatDateForInput } from "@/src/app/shared/utils/date";
import { notificationService } from "@/src/app/shared/services/notification.service";
import { getHttpErrorMessage } from "@/src/app/shared/utils/http-error";
import { arquivoService } from "@/src/app/shared/services/arquivo.service";
import DeactivateAccountModal from "./components/DeactivateAccountModal";
import EditProfileModal from "./components/EditProfileModal";
import ProfileHeaderCard from "./components/ProfileHeaderCard";
import ProfileSettingsSection from "./components/ProfileSettingsSection";
import UploadPhotoModal from "./components/UploadPhotoModal";

export default function Profile() {
    const [usuario, setUsuario] = useState<UsuarioResponse>({
        id: '',
        nome: '',
        nomeUsuario: '',
        dataNascimento: '',
        email: '',
        fotoPerfil: null,
    })
    const [selectedPhotoFile, setSelectedPhotoFile] = useState<File | null>(null);
    const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const params = useParams();
    const id = params.id as string;

    if (!id) {
        router.back();
        return;
    }

    const [modals, setModals] = useState<{
        desativar: boolean;
        atualizar: boolean;
        upload: boolean;
    }>({
        atualizar: false,
        desativar: false,
        upload: false
    });

    type ModalKey = keyof typeof modals;

    const abrirModal = (modal: ModalKey) => {
        setModals({
            atualizar: false,
            desativar: false,
            upload: false,
            [modal]: true,
        });
    }

    const fecharModal = () => {
        setModals({
            atualizar: false,
            desativar: false,
            upload: false,
        });

        limparUploadDeFoto();
    }

    const forms = {
        partialUpdate: useForm<PartialUserUpdateForm>({
            nomeUsuario: '',
            nome: '',
            dataNascimento: '',
        }, validateUpdate, updateUserDependencies),
    }

    const fotoPerfilExibida = photoPreviewUrl || photoUrl;

    const limparUploadDeFoto = () => {
        setSelectedPhotoFile(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    const atualizarUsuarioParcial = async () => {
        if (!forms.partialUpdate.isValid()) {
            notificationService.showErrorForSeconds({
                title: 'Não foi possível salvar as alterações',
                message: 'Revise os campos destacados e tente novamente.',
            }, 5);
            return;
        }

        const request: AtualizarUsuarioParcialmenteRequest = {
            nome: forms.partialUpdate.values.nome,
            nomeUsuario: forms.partialUpdate.values.nomeUsuario,
            dataNascimento: forms.partialUpdate.values.dataNascimento,
        };

        try {
            await usuarioService.atualizarUsuarioParcialmente(request, id);

            notificationService.showSuccessForSeconds({
                title: 'Perfil atualizado com sucesso',
                message: 'Suas informações já foram sincronizadas.',
            }, 4);

            const usuarioAtualizado = await usuarioService.buscarUsuario(id);
            setUsuario(usuarioAtualizado);
            fecharModal();
        } catch (error) {
            console.error(error);
            notificationService.showErrorForSeconds({
                title: 'Erro ao atualizar o perfil',
                message: getHttpErrorMessage(error, 'Tente novamente em instantes.'),
            }, 6);
        }
    }

    const atualizarFotoDePerfil = async () => {
        if (!selectedPhotoFile) {
            notificationService.showWarningForSeconds({
                title: 'Escolha uma imagem',
                message: 'Selecione um arquivo antes de salvar a nova foto.',
            }, 5);
            return;
        }

        try {
            await usuarioService.atualizarFotoPerfil(id, selectedPhotoFile);

            const usuarioAtualizado = await usuarioService.buscarUsuario(id);
            setUsuario(usuarioAtualizado);
            limparUploadDeFoto();
            fecharModal();

            notificationService.showSuccessForSeconds({
                title: 'Foto atualizada com sucesso',
                message: 'Sua nova foto de perfil já está disponível.',
            }, 4);
        } catch (error) {
            console.error(error);
            notificationService.showErrorForSeconds({
                title: 'Erro ao atualizar a foto',
                message: getHttpErrorMessage(error, 'Tente novamente em instantes.'),
            }, 6);
        }
    }

    const desativarConta = async () => {
        try {
            await usuarioService.desativarUsuario(id);
            notificationService.showSuccessForSeconds({
                title: 'Conta desativada',
                message: 'Sua conta foi desativada. Esperamos te ver novamente em breve!',
            }, 5);
            setTimeout(() => {
                authService.logout();
                router.push('/login');
            }, 5000);
        } catch (error) {
            console.error(error);
            notificationService.showErrorForSeconds({
                title: 'Erro ao desativar a conta',
                message: getHttpErrorMessage(error, 'Tente novamente em instantes.'),
            }, 6);
        } finally {
            fecharModal();
        }
    }

    const handlePhotoFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            limparUploadDeFoto();
            return;
        }

        setSelectedPhotoFile(file);
    }

    useEffect(() => {
        usuarioService.buscarUsuario(id)
            .then((usuario) => {
                forms.partialUpdate.handleChange('nome', usuario.nome);
                forms.partialUpdate.handleChange('nomeUsuario', usuario.nomeUsuario);
                forms.partialUpdate.handleChange('dataNascimento', formatDateForInput(usuario.dataNascimento));
                setUsuario(usuario);
            }).catch(console.error);
    }, [])

    useEffect(() => {
        if (!selectedPhotoFile) {
            setPhotoPreviewUrl(null);
            return;
        }

        const nextPreviewUrl = URL.createObjectURL(selectedPhotoFile);
        setPhotoPreviewUrl(nextPreviewUrl);

        return () => {
            URL.revokeObjectURL(nextPreviewUrl);
        };
    }, [selectedPhotoFile])

    useEffect(() => {
        if (!usuario.fotoPerfil) {
            setPhotoUrl(null);
            return;
        }

        let isMounted = true;
        let objectUrl: string | null = null;

        arquivoService.buscar(usuario.fotoPerfil)
            .then((arquivo) => {
                if (!isMounted) {
                    return;
                }

                objectUrl = URL.createObjectURL(arquivo);
                setPhotoUrl(objectUrl);
            })
            .catch((error) => {
                console.error(error);

                if (isMounted) {
                    setPhotoUrl(null);
                }
            });

        return () => {
            isMounted = false;

            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [usuario.fotoPerfil])

    return (
        <div className="flex flex-col gap-y-3 mx-auto mt-8">
            <div className="flex flex-col gap-y-2">
                <h2 className="text-3xl text-white font-bold">Configurações da Conta</h2>
                <span className="text-gray-400">Gerencie suas informações pessoais e preferências</span>
            </div>
            <ProfileHeaderCard
                fotoPerfilExibida={fotoPerfilExibida}
                usuario={usuario}
                onEditarDados={() => abrirModal('atualizar')}
                onEditarFoto={() => abrirModal('upload')}
            />
            <ProfileSettingsSection
                onDesativarConta={() => abrirModal('desativar')}
            />
            <EditProfileModal
                open={modals.atualizar}
                nome={forms.partialUpdate.values.nome}
                nomeUsuario={forms.partialUpdate.values.nomeUsuario}
                dataNascimento={forms.partialUpdate.values.dataNascimento}
                nomeError={forms.partialUpdate.errors.nome}
                nomeUsuarioError={forms.partialUpdate.errors.nomeUsuario}
                dataNascimentoError={forms.partialUpdate.errors.dataNascimento}
                onClose={fecharModal}
                onSalvar={atualizarUsuarioParcial}
                onNomeChange={(value) => forms.partialUpdate.handleChange("nome", value)}
                onNomeUsuarioChange={(value) => forms.partialUpdate.handleChange("nomeUsuario", value)}
                onDataNascimentoChange={(value) => forms.partialUpdate.handleChange("dataNascimento", value)}
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
    )
}