import type { CSSProperties } from "react";
import styles from "./FyProgress.module.css";

interface FyProgressProps {
  readonly currentTime?: number;
  readonly duration?: number;
}

export default function FyProgress({
  currentTime = 0,
  duration = 0,
}: FyProgressProps = {}) {
  const progressPercent = calcularProgresso(currentTime, duration);
  const progressStyle = {
    "--progress": `${progressPercent}%`,
  } as CSSProperties;

  return (
    <div className={styles.progressArea}>
      <div
        aria-label="Progresso da música"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progressPercent}
        className={styles.progressBar}
        role="progressbar"
        style={progressStyle}
      >
        <span className={styles.progressThumb} />
      </div>

      <div className={styles.timeWrapper}>
        <span>{formatarTempo(currentTime)}</span>
        <span>{formatarTempo(duration)}</span>
      </div>
    </div>
  );
}

function calcularProgresso(currentTime: number, duration: number): number {
  if (!Number.isFinite(currentTime) || !Number.isFinite(duration) || duration <= 0) {
    return 0;
  }

  const percent = (currentTime / duration) * 100;
  return Math.min(100, Math.max(0, Math.round(percent)));
}

function formatarTempo(timeInSeconds: number): string {
  if (!Number.isFinite(timeInSeconds) || timeInSeconds <= 0) {
    return "0:00";
  }

  const totalSeconds = Math.floor(timeInSeconds);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
