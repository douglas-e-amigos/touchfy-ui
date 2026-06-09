"use client";

// Módulo
import DashboardHeader from "./components/DashboardHeader";
import { itensMediaCard } from "./constants/default-card";
import styles from "./Dashboard.module.css";

// Componentes compartilhados
import { MediaCard } from "@/src/shared/components/fy-mediacard/MediaCard";

// Estados
import { useMusicaAtualContext } from "@/src/shared/providers/MusicaAtual.Provider";

export default function Dashboard() {
  const { setMusicaAtual } = useMusicaAtualContext();

  return (
    <main className={styles.main}>
      <DashboardHeader />

      <section className={styles.mediaSection}>
        {itensMediaCard.map((item) => (
          <MediaCard
            key={item.id}
            imagemURL={item.image}
            rodarMusica={() =>
              setMusicaAtual({
                id: item.id,
                nomeMusica: item.title,
                nomeArtista: item.artist,
                imagemURL: item.image,
              })
            }
            nomeArtista={item.artist}
            nomeMusica={item.title}
            className={styles.mediaCard}
          />
        ))}
      </section>

      <footer className={styles.footer}>Footer</footer>
    </main>
  );
}