"use client";

import ImageCard, {
  Variantes,
} from "@/src/shared/components/fy-imagecard/ImageCard";
// Módulo
import DashboardHeader from "./components/DashboardHeader/DashboardHeader";
import SecaoHome from "./components/DashboardSection/DashboardSection";
import styles from "./Dashboard.module.css";

// Componentes compartilhados
import { MediaCard } from "@/src/shared/components/fy-mediacard/MediaCard";
import { itensMediaCard } from "@/src/shared/mocks/media-card.mock";

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

      <SecaoHome titulo="Artistas em destaque">
        {itensMediaCard.map((item) => (
          <ImageCard
            key={item.id}
            capaURL={item.image}
            tituloCard={item.title}
            nomeCard={item.title}
            descritor={item.createBy}
            variante={Variantes.CIRCULAR}
            abrirPlaylist={() => {}}
          />
        ))}
      </SecaoHome>

      <SecaoHome titulo="Recomendadas para você">
        {itensMediaCard.map((item) => (
          <ImageCard
            key={item.id}
            capaURL={item.image}
            tituloCard={item.title}
            nomeCard={item.title}
            descritor={item.createBy}
            variante={Variantes.QUADRADO_SM}
            abrirPlaylist={() => {}}
          />
        ))}
      </SecaoHome>

      <SecaoHome titulo="Novos lançamentos">
        {itensMediaCard.map((item) => (
          <ImageCard
            key={item.id}
            capaURL={item.image}
            tituloCard={item.title}
            nomeCard={item.title}
            descritor={item.createBy}
            variante={Variantes.QUADRADO_MD}
            abrirPlaylist={() => {}}
          />
        ))}
      </SecaoHome>
    </main>
  );
}
