import FyButton from "@/src/shared/components/fy-button/FyButton";
import FyInput from "@/src/shared/components/fy-input/FyInput";
import FyModal from "@/src/shared/components/fy-modal/FyModal";
import { CalendarIcon, UserIcon } from "lucide-react";

interface EditProfileModalProps {
    open: boolean;
    nome: string;
    nomeUsuario: string;
    dataNascimento: string;
    nomeError?: string;
    nomeUsuarioError?: string;
    dataNascimentoError?: string;
    onClose: () => void;
    onSalvar: () => void;
    onNomeChange: (value: string) => void;
    onNomeUsuarioChange: (value: string) => void;
    onDataNascimentoChange: (value: string) => void;
}

export default function EditProfileModal({
    open,
    nome,
    nomeUsuario,
    dataNascimento,
    nomeError,
    nomeUsuarioError,
    dataNascimentoError,
    onClose,
    onSalvar,
    onNomeChange,
    onNomeUsuarioChange,
    onDataNascimentoChange,
}: Readonly<EditProfileModalProps>) {
    return (
        <FyModal open={open} onClose={onClose}>
            <div className="flex flex-col gap-y-8">
                <div className="flex flex-col gap-2">
                    <h4 className="text-white text-xl font-bold">Editar Dados do Perfil</h4>
                    <span className="text-gray-400">Atualize suas informações pessoais</span>
                </div>
                <div className="flex flex-col gap-y-2">
                    <FyInput id="nome-id" name="nome" label="Nome Completo"
                        placeholder="Seu nome" icon={<UserIcon />}
                        onChange={onNomeChange}
                        value={nome}
                        error={nomeError}
                    ></FyInput>
                    <FyInput id="nome-usuario-id" name="nome-usuario" label="Nome de usuário"
                        placeholder="Seu nome de usuário" icon={<UserIcon />}
                        onChange={onNomeUsuarioChange}
                        value={nomeUsuario}
                        error={nomeUsuarioError}
                    ></FyInput>
                    <FyInput id="data-nascimento-id" name="data-nascimento" label="Data de nascimento"
                        placeholder="Sua data de nascimento" icon={<CalendarIcon />}
                        onChange={onDataNascimentoChange}
                        value={dataNascimento}
                        error={dataNascimentoError} type="date"
                    ></FyInput>
                </div>
                <div className="flex justify-end gap-x-2">
                    <FyButton type="outline" onClick={onClose}>
                        Cancelar
                    </FyButton>
                    <FyButton onClick={onSalvar}>
                        Salvar Alterações
                    </FyButton>
                </div>
            </div>
        </FyModal>
    );
}
