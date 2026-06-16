import FyButtonIcon from "@/src/shared/components/fy-iconbutton/FyButtonIcon";
import { Pencil, Play, Trash2 } from "lucide-react";

interface ActionsPlaylistProps {
  readonly onPlay: () => void;
  readonly onEdit?: () => void;
  readonly onDelete?: () => void;
}

export default function ActionsPlaylist({
  onPlay,
  onEdit,
  onDelete,
}: ActionsPlaylistProps) {
  return (
    <div
      aria-label="Ações da playlist"
      className="flex items-center gap-4 px-6 pb-8 lg:px-12"
    >
      <FyButtonIcon
        ariaLabel="Tocar playlist"
        onClick={onPlay}
        icon={<Play aria-hidden="true" size={28} fill="currentColor" />}
        className="h-14 w-14 rounded-full p-0 text-white"
      />

      <FyButtonIcon
        ariaLabel="Editar playlist"
        onClick={onEdit}
        variant="ghost"
        icon={<Pencil aria-hidden="true" size={24} />}
        className="h-11 w-11 rounded-full p-0"
      />

      <FyButtonIcon
        ariaLabel="Excluir playlist"
        onClick={onDelete}
        variant="ghost"
        icon={<Trash2 aria-hidden="true" size={24} />}
        className="h-11 w-11 rounded-full p-0"
      />
    </div>
  );
}
