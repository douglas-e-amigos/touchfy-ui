import { Pencil, Play, Trash2 } from "lucide-react";

interface MediaCardProps {
  readonly imagemURL: string;
  readonly rodarMusica: () => void;
  readonly nomeMusica: string;
  readonly nomeArtista: string;
  readonly className?: string;
  readonly onEditar?: () => void;
  readonly onDeletar?: () => void;
}

export function MediaCard({
  imagemURL,
  rodarMusica: abrirMusica,
  nomeMusica,
  nomeArtista,
  className = "",
  onEditar,
  onDeletar,
}: MediaCardProps) {
  return (
    <div
      className={`
        grid h-20 w-full items-center gap-x-4 overflow-hidden p-2
        [grid-template-areas:'foto_musica_acoes'_'foto_artista_acoes']
        grid-cols-[auto_1fr_auto]
        ${className}
      `}
    >
      <button
        type="button"
        aria-label={`Tocar música ${nomeMusica} de ${nomeArtista}`}
        onClick={abrirMusica}
        className="flex items-center gap-x-4 [grid-area:foto]"
      >
        <img
          className="h-12 w-12 rounded"
          src={imagemURL}
          alt={`Foto de ${nomeArtista}`}
        />

        <div className="flex flex-col">
          <p className="self-end truncate font-bold text-white">
            {nomeMusica}
          </p>
          <p className="self-start truncate text-gray-400">
            {nomeArtista}
          </p>
        </div>
      </button>

      <div className="flex items-center gap-2 [grid-area:acoes]">
        <Play
          onClick={abrirMusica}
          className="h-8 w-8 cursor-pointer text-white hover:text-green-400"
        />

        {onEditar && (
          <Pencil
            onClick={onEditar}
            className="h-5 w-5 cursor-pointer text-zinc-400 hover:text-white"
            role="button"
            aria-label={`Editar música ${nomeMusica}`}
          />
        )}

        {onDeletar && (
          <Trash2
            onClick={onDeletar}
            className="h-5 w-5 cursor-pointer text-zinc-400 hover:text-red-400"
            role="button"
            aria-label={`Deletar música ${nomeMusica}`}
          />
        )}
      </div>
    </div>
  );
}
