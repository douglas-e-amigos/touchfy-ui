import { UsuarioResponse } from "@/src/features/usuario/models/dto.model";
import FyArea from "@/src/shared/components/fy-area/FyArea";
import FyButton from "@/src/shared/components/fy-button/FyButton";
import { AtSign, CalendarIcon, Camera, PencilIcon, UserIcon } from "lucide-react";

interface ProfileHeaderCardProps {
    fotoPerfilExibida: string | null;
    usuario: UsuarioResponse;
    onEditarDados: () => void;
    onEditarFoto: () => void;
}

export default function ProfileHeaderCard({
    fotoPerfilExibida,
    usuario,
    onEditarDados,
    onEditarFoto,
}: ProfileHeaderCardProps) {
    return (
        <FyArea>
            <div className="flex gap-x-4">
                <button
                    type="button"
                    onClick={onEditarFoto}
                    className="group relative h-56 w-56 shrink-0 cursor-pointer"
                >
                    <div className="h-full w-full overflow-hidden rounded-full border border-white/10 bg-[#1d1d22]">
                        {fotoPerfilExibida ? (
                            <img
                                src={fotoPerfilExibida}
                                alt={`Foto de perfil de ${usuario.nome}`}
                                className="h-full w-full object-cover transition duration-200 group-hover:scale-[1.02]"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-fuchsia-500 via-pink-500 to-violet-600">
                                <UserIcon className="text-white" size={92} />
                            </div>
                        )}
                    </div>

                    <span className="absolute bottom-3 right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition duration-200 group-hover:scale-105">
                        <Camera size={22} />
                    </span>
                </button>
                <div className="flex flex-col gap-y-2">
                    <div className="flex flex-col gap-y-1">
                        <h3 className="text-white text-2xl font-bold">{usuario.nome}</h3>
                        <div className="text-gray-400 flex gap-x-1 items-center">
                            <AtSign size={'16px'} />
                            <span>{usuario.nomeUsuario}</span>
                        </div>
                        <div className="text-gray-400 flex gap-x-1 items-center">
                            <CalendarIcon size={'16px'} />
                            <span>Nascimento: {usuario.dataNascimento}</span>
                        </div>
                    </div>
                    <div>
                        <FyButton onClick={onEditarDados}>
                            <span className="flex items-center gap-x-2">
                                <PencilIcon />
                                <span>Editar Dados</span>
                            </span>
                        </FyButton>
                    </div>
                </div>
            </div>
        </FyArea>
    );
}