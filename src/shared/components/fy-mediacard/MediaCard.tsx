"use client";

interface MediaCardProps {
  readonly imagemURL: string;
  readonly rodarMusica: () => void;
  readonly nomeMusica: string;
  readonly nomeArtista: string;
}

export default function MediaCard({
  imagemURL,
  rodarMusica: abrirMusica,
  nomeMusica,
  nomeArtista,
}: MediaCardProps) {
  return (
    <button
      type="button"
      aria-label={`Tocar música ${nomeMusica} de ${nomeArtista}`}
      onClick={abrirMusica}
      className="
        grid h-20 w-92 items-center gap-x-4 overflow-hidden p-2 text-left
        [grid-template-areas:'foto_musica_icone'_'foto_artista_icone']
        grid-cols-[auto_1fr_auto]
      "
    >
      <img
        className="h-12 w-12 rounded [grid-area:foto]"
        src={imagemURL}
        alt={`Foto de ${nomeArtista}`}
      />

      <p className="self-end truncate font-bold text-white [grid-area:musica]">
        {nomeMusica}
      </p>

      <p className="self-start truncate text-gray-400 [grid-area:artista]">
        {nomeArtista}
      </p>

      <div className="relative h-10 w-10 [grid-area:icone]">
        <img
          src="/icons/play-button.svg"
          alt=""
          aria-hidden="true"
          className=" cursor-pointer
            absolute left-0 top-1/2 h-8 w-8 -translate-y-1/2
            block"
        />
      </div>
    </button>
  );
}
