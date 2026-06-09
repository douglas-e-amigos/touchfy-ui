import type { ReactNode } from "react";
import styles from "./DashboardSection.module.css";

type SecaoHomeProps = {
  readonly titulo: string;
  readonly children: ReactNode;
};

export default function SecaoHome({ titulo, children }: SecaoHomeProps) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{titulo}</h2>

        <button type="button" className={styles.seeAllButton}>
          Ver tudo
        </button>
      </div>
      <div className={styles.cards}>{children}</div>
    </section>
  );
}
