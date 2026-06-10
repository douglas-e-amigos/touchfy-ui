"use client";

import { MusicaAtual } from "../../types/MusicaAtual.types";
import FyPlay from "../fy-play/FyPlay";
import styles from "./FyPlaymodal.module.css";

interface FyPlaymodalProps {
  readonly setAltera: () => void;
  readonly musicaAtual: MusicaAtual;
}

export default function FyPlaymodal({
  setAltera,
  musicaAtual,
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

        <div className={styles.progressArea}>
          <div className={styles.progressBar}>
            <span className={styles.progressThumb} />
          </div>

          <div className={styles.timeWrapper}>
            <span>0:00</span>
            <span>5:24</span>
          </div>
        </div>

        <div className={styles.controls}>
          <FyPlay />
        </div>
      </div>
    </dialog>
  );
}
