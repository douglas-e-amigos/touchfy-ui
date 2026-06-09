"use client";

enum Variantes {
  CIRCULAR = "rounded-md w-[11rem] h-auto",
  QUADRADO_MD = "rounded-md w-[17rem] h-[23rem]",
  QUADRADO_SM = "rounded-sm w-[11rem] h-auto",
}

interface ImagemCardProps {
  readonly capaURL: string;
  readonly nomeCard: string;
  readonly tituloCard: string;
  readonly descritor: string;
  readonly ano?: string;
  readonly variante: Variantes;
  readonly abrirPlaylist: () => void;
}

export { Variantes };

export default function ImageCard({
  capaURL,
  nomeCard,
  tituloCard,
  descritor,
  ano,
  variante,
  abrirPlaylist,
}: ImagemCardProps) {
  let imagemClasse: string;

  if (variante === Variantes.QUADRADO_MD) {
    imagemClasse = "w-[15rem] rounded-md";
  } else if (variante == Variantes.QUADRADO_SM) {
    imagemClasse = "w-[9rem] rounded-sm";
  } else {
    imagemClasse = "w-[9rem] aspect-square rounded-full object-cover";
  }

  return (
    <button
      onClick={abrirPlaylist}
      aria-label={`Card de grupo de músicas ${nomeCard}`}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          abrirPlaylist();
        }
      }}
      className={`
        ${variante}
        p-4
        bg-transparent
        hover:bg-zinc-700
        cursor-pointer
        transition-colors
        duration-200
        overflow-hidden
      `}
    >
      <img
        className={`${imagemClasse}`}
        src={capaURL}
        alt={`Capa de ${nomeCard}`}
      />

      <div className="mt-5 flex flex-col items-center overflow--hiden ml-1 mr-1">
        <p className="text-white font-bold text-md truncate">{tituloCard}</p>

        <p className="text-zinc-400 text-sm truncate">{descritor}</p>

        {ano ? <p className="text-zinc-500 text-sm truncate">{ano}</p> : null}
      </div>
    </button>
  );
}
