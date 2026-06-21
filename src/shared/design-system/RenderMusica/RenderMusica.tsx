"use client";

import type { MusicaBackend } from "@/src/shared/types/musica.types";
import useMusicas from "@/src/shared/hooks/Musica/useMusicas";
import { MediaCard } from "@/src/shared/components/fy-mediacard/MediaCard";
import styles from "./RenderMusica.module.css";

const DEFAULT_IMAGE =
  "https://cdn.dribbble.com/userupload/42879218/file/original-01a3e9162fba7773ab2dc7909f1b3b23.png?resize=1024x768&vertical=center";

export function extrairArtista(musica: MusicaBackend): string {
  return musica.tags[0]?.nome || "Artista Desconhecido";
}

export { DEFAULT_IMAGE };

interface RenderMusicaProps {
  readonly aoSelecionarMusica: (musica: MusicaBackend) => void;
}

export default function RenderMusica({
  aoSelecionarMusica,
}: RenderMusicaProps) {
  const { musicasAleatorias } = useMusicas();

  return (
    <section className={styles.section}>
      {musicasAleatorias.map((musica) => (
        <MediaCard
          key={musica.id}
          imagemURL={DEFAULT_IMAGE}
          rodarMusica={() => aoSelecionarMusica(musica)}
          nomeArtista={extrairArtista(musica)}
          nomeMusica={musica.nome}
          className={styles.card}
        />
      ))}
    </section>
  );
}
