import styles from "./FyProgress.module.css";

export default function FyProgress() {
  return (
    <div className={styles.progressArea}>
      <div className={styles.progressBar}>
        <span className={styles.progressThumb} />
      </div>

      <div className={styles.timeWrapper}>
        <span>0:00</span>
        <span>5:24</span>
      </div>
    </div>
  );
}
