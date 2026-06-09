import { ComponentProps } from "react";
import FyPlay from "../fy-play/FyPlay";

export interface PlayFooterMusica {
  readonly imagemURL: string;
  readonly nomeMusica: string;
  readonly nomeArtista: string;
}

interface PlayFooterProps extends Readonly<ComponentProps<"footer">> {
  readonly musica: PlayFooterMusica;
}

export default function PlayFooter({
  musica,
  ...footerProps
}: PlayFooterProps) {
  return (
    <footer
      aria-label="Player da música selecionada"
      className="fixed z-50 lg:left-64 left-0 right-0 flex h-72 w-full items-center justify-between gap-4 border-t border-zinc-800 bg-black px-6 lg:w-auto"
      {...footerProps}
    >
      <article
        className="flex min-w-0 items-center gap-3"
        aria-label={`Música selecionada ${musica.nomeMusica}`}
      >
        <img
          src={musica.imagemURL}
          alt={`Foto de ${musica.nomeArtista}`}
          className="h-12 w-12 rounded object-cover"
        />

        <div className="min-w-0">
          <p className="truncate font-bold text-white">{musica.nomeMusica}</p>
          <p className="truncate text-sm text-gray-400">{musica.nomeArtista}</p>
        </div>
      </article>

      <FyPlay />
    </footer>
  );
}
