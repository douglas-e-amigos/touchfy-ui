import FyDate from "@/src/shared/components/fy-date/FyDate";
import FySaudacao from "@/src/shared/components/fy-saudacao/FySaudacao";
import { getDateFormat, getHour } from "@/src/shared/utils/date";

import styles from "./DashboardHeader.module.css";

export default function DashboardHeader() {
  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <div className={styles.textWrapper}>
          <FyDate data={getDateFormat()} />
          <FySaudacao hora={getHour()} />

          <p className={styles.description}>
            Pronto para ouvir música? Confira o que preparamos para você.
          </p>
        </div>
      </section>
    </header>
  );
}