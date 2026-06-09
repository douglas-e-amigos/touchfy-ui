"use client";

import { ComponentProps, useState } from "react";
import FyPlay from "../fy-play/FyPlay";
import FyPlaymodal from "../fy-playmodal/FyPlaymodal";
import styles from "./PlayFooter.module.css";

export interface PlayFooterMusica {
  readonly id: number;
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
  const [modalAberto, setModalAberto] = useState(false);

  function abrirModal() {
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  return (
    <>
      <footer
        aria-label="Player da música selecionada"
        className={`${styles.footer} ${className}`}
        {...footerProps}
      >
        <article
          className={styles.musicInfo}
          aria-label={`Abrir player da música ${musica.nomeMusica}`}
          role="button"
          tabIndex={0}
          onClick={abrirModal}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              abrirModal();
            }
          }}
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

      {modalAberto ? (
        <FyPlaymodal setAltera={fecharModal} musicaAtual={musica} />
      ) : null}
    </>
  );
}
