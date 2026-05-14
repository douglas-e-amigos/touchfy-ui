import FyArea from "@/src/shared/components/fy-area/FyArea";
import FyButton from "@/src/shared/components/fy-button/FyButton";
import FyModal from "@/src/shared/components/fy-modal/FyModal";

interface DeactivateAccountModalProps {
    open: boolean;
    onClose: () => void;
    onConfirmar: () => void;
}

export default function DeactivateAccountModal({
    open,
    onClose,
    onConfirmar,
}: DeactivateAccountModalProps) {
    return (
        <FyModal open={open} onClose={onClose}>
            <div className="flex flex-col gap-y-8">
                <div className="flex flex-col gap-2">
                    <h4 className="text-white text-xl font-bold">Desativar Conta</h4>
                    <span className="text-gray-400">Tem certeza que deseja desativar sua conta? Esta ação pode ser revertida posteriormente.</span>
                </div>
                <FyArea color="red">
                    <div className="flex flex-col gap-y-4">
                        <h5 className="text-white text-lg font-bold">Tem certeza de que deseja desativar sua conta?</h5>
                        <span className="text-gray-400">Ao desativar sua conta:</span>
                        <ul>
                            <li className="text-gray-400">Seu perfil ficará oculto para outros usuários.</li>
                            <li className="text-gray-400">Suas playlists públicas serão removidas.</li>
                            <li className="text-gray-400">Você poderá reativar sua conta a qualquer momento fazendo login novamente.</li>
                        </ul>
                    </div>
                </FyArea>
                <div className="flex justify-end gap-x-2">
                    <FyButton type="outline" onClick={onClose}>
                        Cancelar
                    </FyButton>
                    <FyButton color="red" onClick={onConfirmar}>
                        Confirmar Desativação
                    </FyButton>
                </div>
            </div>
        </FyModal>
    );
}