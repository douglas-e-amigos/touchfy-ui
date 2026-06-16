import type { ElementType } from "react";

interface HeaderPlaylistProp {
  readonly icon: ElementType;
  readonly titulo: string;
  readonly descricao: string;
  readonly autor: string;
  readonly imagemURL: string;
  readonly quantidadeMusicas: number;
}

export default function HeaderPlaylist({
  icon: Icon,
  titulo,
  descricao,
  autor,
  imagemURL,
  quantidadeMusicas,
}: HeaderPlaylistProp) {
  const labelQuantidade =
    quantidadeMusicas === 1
      ? "1 música"
      : `${quantidadeMusicas.toString()} músicas`;

  return (
    <section className="flex flex-col gap-6 px-6 pt-10 pb-8 md:flex-row md:items-end lg:px-12">
      <img
        src={imagemURL}
        alt="Capa da playlist"
        className="h-40 w-40 rounded-md object-cover shadow-[0_24px_50px_-24px_rgba(0,0,0,0.85)] md:h-56 md:w-56"
      />

      <div aria-label="Informações da playlist" className="min-w-0">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
          Playlist{" "}
          <Icon aria-hidden="true" size={16} className="text-zinc-400" />
        </p>
        <h1 className="mb-4 truncate text-5xl font-bold leading-none tracking-normal text-white md:text-7xl">
          {titulo}
        </h1>
        <p className="mb-4 text-base text-zinc-100">{descricao}</p>
        <p className="flex flex-wrap items-center gap-2 text-sm text-zinc-300">
          <span className="font-semibold text-white">{autor}</span>
          <span aria-hidden="true">•</span>
          <span>{labelQuantidade}</span>
        </p>
      </div>
    </section>
  );
}
