"use client";

import { ComponentProps, useEffect, useState } from "react";
import FyPlay from "../fy-play/FyPlay";
import FyPlaymodal from "../fy-playmodal/FyPlaymodal";
import styles from "./PlayFooter.module.css";
import FyProgress from "../fy-progress/FyProgress";
import useFyPlay from "../../hooks/FyPlay/useFyPlay";
import useAudio from "../../hooks/Audio/useAudio";

export interface PlayFooterMusica {
  readonly id: string;
  readonly imagemURL: string;
  readonly nomeMusica: string;
  readonly nomeArtista: string;
  readonly caminhoDoArquivo: string;
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
  const { play, setPlay } = useFyPlay();

  const src = musica.id
    ? `/api/musicas/stream/${musica.id}`
    : null;

  const onEnded = () => setPlay(false);
  useAudio(src, play, onEnded);

  useEffect(() => {
    setPlay(Boolean(musica.id));
  }, [musica.id, setPlay]);

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
        <button
          type="button"
          className={styles.musicInfo}
          aria-label={`Abrir player da música ${musica.nomeMusica}`}
          onClick={abrirModal}
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
        </button>

        <FyProgress />

        <FyPlay play={play} setPlay={setPlay} />
      </footer>

      {modalAberto ? (
        <FyPlaymodal
          setAltera={fecharModal}
          musicaAtual={musica}
          play={play}
          setPlay={setPlay}
        />
      ) : null}
    </>
  );
}
