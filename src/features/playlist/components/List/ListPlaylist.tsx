import clsx from "clsx";
import { MusicaType } from "@/src/shared/types/Musica.types";

interface ListPlaylistProps {
  readonly musicas: MusicaType[];
  readonly onClick: (musica: MusicaType) => void;
  readonly musicaAtualId?: number | null;
}

export default function ListPlaylist({
  musicas,
  onClick,
  musicaAtualId = null,
}: ListPlaylistProps) {
  return (
    <ol aria-label="Músicas da playlist" className="flex flex-col gap-1">
      {musicas.map((musica, index) => (
        <li key={musica.id}>
          <button
            type="button"
            aria-current={musicaAtualId === musica.id ? "true" : undefined}
            aria-label={`Tocar ${musica.nomeMusica} de ${musica.nomeArtista}`}
            onClick={() => onClick(musica)}
            className={clsx(
              "grid w-full grid-cols-[2rem_3rem_minmax(0,1fr)_4rem] items-center gap-3 rounded-md px-3 py-2 text-left transition-colors duration-200 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:grid-cols-[2rem_3rem_minmax(0,1fr)_minmax(8rem,14rem)_4rem]",
              musicaAtualId === musica.id && "bg-white/10",
            )}
          >
            <span
              className={clsx(
                "text-center text-sm text-zinc-400",
                musicaAtualId === musica.id && "font-semibold text-primary",
              )}
            >
              {index + 1}
            </span>

            <img
              src={musica.imagemURL}
              alt={`Capa de ${musica.nomeMusica}`}
              className="h-12 w-12 rounded object-cover"
            />

            <span className="min-w-0">
              <span className="block truncate font-semibold text-white">
                {musica.nomeMusica}
              </span>
              <span className="block truncate text-sm text-zinc-400">
                {musica.nomeArtista}
              </span>
            </span>

            <span className="hidden truncate text-sm text-zinc-400 md:block">
              {musica.album}
            </span>

            <span className="justify-self-end text-sm text-zinc-400">
              {musica.duracao}
            </span>
          </button>
        </li>
      ))}
    </ol>
  );
}
