"use client";

import { MusicaAtual } from "@/src/shared/types/musica.types";
import FyPlay from "../fy-play/FyPlay";
import FyProgress from "../fy-progress/FyProgress";
import styles from "./FyPlaymodal.module.css";

interface FyPlaymodalProps {
  readonly setAltera: () => void;
  readonly musicaAtual: MusicaAtual;
  readonly play?: boolean;
  readonly setPlay?: (play: boolean) => void;
  readonly onNext?: () => void;
  readonly onPrevious?: () => void;
  readonly currentTime?: number;
  readonly duration?: number;
}

export default function FyPlaymodal({
  setAltera,
  musicaAtual,
  play,
  setPlay,
  onNext,
  onPrevious,
  currentTime,
  duration,
}: FyPlaymodalProps) {
  return (
    <dialog
      open
      className={styles.modal}
      aria-label={`Player da música ${musicaAtual.nomeMusica}`}
    >
      <header className={styles.header}>
        <button
          type="button"
          onClick={setAltera}
          className={styles.closeButton}
          aria-label="Fechar modal"
        >
          ×
        </button>
      </header>

      <div className={styles.content}>
        <img
          src={musicaAtual.imagemURL}
          alt={`Capa de ${musicaAtual.nomeMusica}`}
          className={styles.cover}
        />

        <div className={styles.musicInfo}>
          <h1 className={styles.title}>{musicaAtual.nomeMusica}</h1>
          <p className={styles.artist}>{musicaAtual.nomeArtista}</p>
        </div>

        <FyProgress currentTime={currentTime} duration={duration} />

        <div className={styles.controls}>
          <FyPlay
            play={play}
            setPlay={setPlay}
            onNext={onNext}
            onPrevious={onPrevious}
          />
        </div>
      </div>
    </dialog>
  );
}
