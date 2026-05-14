import FyArea from "@/src/shared/components/fy-area/FyArea";
import FyButton from "@/src/shared/components/fy-button/FyButton";
import FySwitch from "@/src/shared/components/fy-switch/FySwitch";
import { TrashIcon } from "lucide-react";

interface ProfileSettingsSectionProps {
    onDesativarConta: () => void;
}

export default function ProfileSettingsSection({
    onDesativarConta,
}: ProfileSettingsSectionProps) {
    return (
        <FyArea>
            <div className="flex flex-col gap-y-8">
                <h3 className="text-2xl text-white">Configurações da Conta</h3>
                <div className="flex flex-col gap-y-6">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className="text-white">Perfil Público</span>
                            <span className="text-gray-400">Permitir que outros usuários vejam seu perfil</span>
                        </div>
                        <div>
                            <FySwitch id="perfil-publico" name="perfilPublico"
                                checked={false} onChange={(checked) => false} />
                        </div>
                    </div>
                    <hr className="bg-[#27272A] border-[#27272A]" />
                </div>
                <div className="flex flex-col gap-y-4">
                    <h3 className="text-2xl text-white">Zona de Perigo</h3>
                    <FyArea color="red">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-white">Desativar Conta</span>
                                <span className="text-gray-400 w-3/4">Sua conta será desativada, mas poderá ser reativada posteriormente</span>
                            </div>
                            <div>
                                <FyButton color="red" onClick={onDesativarConta}>
                                    <span className="flex items-center gap-x-2">
                                        <TrashIcon />
                                        <span>
                                            Desativar Conta
                                        </span>
                                    </span>
                                </FyButton>
                            </div>
                        </div>
                    </FyArea>
                </div>
            </div>
        </FyArea>
    );
}