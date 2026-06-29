"use client";

import FyArea from "@/src/shared/components/fy-area/FyArea";
import FyButton from "@/src/shared/components/fy-button/FyButton";
import FyModal from "@/src/shared/components/fy-modal/FyModal";

interface DeletarMusicaModalProps {
  open: boolean;
  nomeMusica: string;
  onClose: () => void;
  onConfirmar: () => void;
}

export default function DeletarMusicaModal({
  open,
  nomeMusica,
  onClose,
  onConfirmar,
}: Readonly<DeletarMusicaModalProps>) {
  return (
    <FyModal open={open} onClose={onClose}>
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-2">
          <h4 className="text-xl font-bold text-white">Deletar Música</h4>
          <span className="text-gray-400">
            Tem certeza que deseja deletar esta música? Esta ação não poderá ser
            desfeita.
          </span>
        </div>
        <FyArea color="red">
          <div className="flex flex-col gap-y-4">
            <h5 className="text-lg font-bold text-white">
              Tem certeza de que deseja deletar &ldquo;{nomeMusica}&rdquo;?
            </h5>
            <span className="text-gray-400">Ao deletar a música:</span>
            <ul>
              <li className="text-gray-400">
                O arquivo de áudio será removido permanentemente.
              </li>
              <li className="text-gray-400">
                A música será removida de todas as playlists.
              </li>
            </ul>
          </div>
        </FyArea>
        <div className="flex justify-end gap-x-2">
          <FyButton type="outline" onClick={onClose}>
            Cancelar
          </FyButton>
          <FyButton color="red" onClick={onConfirmar}>
            Confirmar Deleção
          </FyButton>
        </div>
      </div>
    </FyModal>
  );
}
