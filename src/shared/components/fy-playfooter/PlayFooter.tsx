"use client";

import { ComponentProps, useEffect, useState } from "react";
import FyPlay from "../fy-play/FyPlay";
import FyPlaymodal from "../fy-playmodal/FyPlaymodal";
import styles from "./PlayFooter.module.css";
import FyProgress from "../fy-progress/FyProgress";
import useFyPlay from "../../hooks/FyPlay/useFyPlay";
import useAudio from "../../hooks/Audio/useAudio";
import { useMusicasCurtidasContext } from "../../providers/MusicasCurtidas.Provider";

export interface PlayFooterMusica {
  readonly id: string;
  readonly imagemURL: string;
  readonly nomeMusica: string;
  readonly nomeArtista: string;
  readonly caminhoDoArquivo: string;
}

interface PlayFooterProps extends Readonly<ComponentProps<"footer">> {
  readonly musica: PlayFooterMusica;
  readonly onNext?: () => void;
  readonly onPrevious?: () => void;
}

export default function PlayFooter({
  musica,
  onNext,
  onPrevious,
  className = "",
  ...footerProps
}: PlayFooterProps) {
  const [modalAberto, setModalAberto] = useState(false);
  const { play, setPlay } = useFyPlay();
  const {
    curtirMusica,
    descurtirMusica,
    isMusicaCurtida,
  } = useMusicasCurtidasContext();
  const favorite = isMusicaCurtida(musica.id);

  const src = musica.id
    ? `/api/musicas/stream/${musica.id}`
    : null;

  const onEnded = () => setPlay(false);
  const { currentTime, duration } = useAudio(src, play, onEnded);

  useEffect(() => {
    setPlay(Boolean(musica.id));
  }, [musica.id, setPlay]);

  function abrirModal() {
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  function setFavorite(favorite: boolean) {
    if (favorite) {
      curtirMusica(musica);
      return;
    }

    descurtirMusica(musica.id);
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

        <FyProgress currentTime={currentTime} duration={duration} />

        <FyPlay
          play={play}
          setPlay={setPlay}
          favorite={favorite}
          setFavorite={setFavorite}
          onNext={onNext}
          onPrevious={onPrevious}
        />
      </footer>

      {modalAberto ? (
        <FyPlaymodal
          setAltera={fecharModal}
          musicaAtual={musica}
          play={play}
          setPlay={setPlay}
          favorite={favorite}
          setFavorite={setFavorite}
          onNext={onNext}
          onPrevious={onPrevious}
          currentTime={currentTime}
          duration={duration}
        />
      ) : null}
    </>
  );
}
