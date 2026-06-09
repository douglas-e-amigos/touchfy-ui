import { ComponentProps } from "react";
import FyPlay from "../fy-play/FyPlay";
import styles from "./PlayFooter.module.css";

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
  className = "",
  ...footerProps
}: PlayFooterProps) {
  return (
    <footer
      aria-label="Player da música selecionada"
      className={`${styles.footer} ${className}`}
      {...footerProps}
    >
      <article
        className={styles.musicInfo}
        aria-label={`Música selecionada ${musica.nomeMusica}`}
      >
        <img
          src={musica.imagemURL}
          alt={`Foto de ${musica.nomeArtista}`}
          className={styles.image}
        />

        <div className={styles.textWrapper}>
          <p className={styles.musicName}>{musica.nomeMusica}</p>
          <p className={styles.artistName}>{musica.nomeArtista}</p>
        </div>
      </article>

      <FyPlay />
    </footer>
  );
}