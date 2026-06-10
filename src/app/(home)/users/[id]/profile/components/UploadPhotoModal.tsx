import FyButton from "@/src/shared/components/fy-button/FyButton";
import FyModal from "@/src/shared/components/fy-modal/FyModal";
import { Upload, UserIcon, X } from "lucide-react";
import { RefObject } from "react";

interface UploadPhotoModalProps {
    open: boolean;
    fotoPerfilExibida: string | null;
    nomeUsuario: string;
    selectedPhotoFile: File | null;
    fileInputRef: RefObject<HTMLInputElement | null>;
    onClose: () => void;
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSalvarFoto: () => void;
}

export default function UploadPhotoModal({
    open,
    fotoPerfilExibida,
    nomeUsuario,
    selectedPhotoFile,
    fileInputRef,
    onClose,
    onFileChange,
    onSalvarFoto,
}: Readonly<UploadPhotoModalProps>) {
    return (
        <FyModal open={open} onClose={onClose}>
            <div className="flex flex-col gap-y-8">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <h4 className="text-white text-xl font-bold">Atualizar Foto de Perfil</h4>
                        <span className="text-gray-400">Escolha uma nova foto para seu perfil</span>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full p-1 text-gray-400 transition hover:bg-white/5 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex flex-col items-center gap-y-8">
                    <div className="flex h-48 w-48 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-fuchsia-500 via-pink-500 to-violet-600 md:h-56 md:w-56">
                        {fotoPerfilExibida ? (
                            <img
                                src={fotoPerfilExibida}
                                alt={`Pré-visualização da foto de perfil de ${nomeUsuario}`}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <UserIcon className="text-white" size={96} />
                        )}
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={onFileChange}
                    />

                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-x-3 rounded-2xl bg-white/8 px-6 py-3 text-lg font-semibold text-white transition hover:bg-white/12"
                    >
                        <Upload size={18} />
                        <span>{selectedPhotoFile ? selectedPhotoFile.name : 'Escolher Arquivo'}</span>
                    </button>
                </div>

                <div className="flex justify-end gap-x-2">
                    <FyButton type="outline" onClick={onClose}>
                        Cancelar
                    </FyButton>
                    <button
                        type="button"
                        onClick={onSalvarFoto}
                        disabled={!selectedPhotoFile}
                        className="rounded-md bg-primary px-4 py-2 font-semibold text-white transition enabled:cursor-pointer enabled:hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Salvar Foto
                    </button>
                </div>
            </div>
        </FyModal>
    );
}
