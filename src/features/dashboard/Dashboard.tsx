"use client";

import DashboardHeader from "./components/DashboardHeader/DashboardHeader";
import styles from "./Dashboard.module.css";
import RenderMusica, {
  extrairArtista,
  DEFAULT_IMAGE,
} from "@/src/shared/design-system/RenderMusica/RenderMusica";
import { useMusicaAtualContext } from "@/src/shared/providers/MusicaAtual.Provider";
import type { MusicaBackend } from "@/src/shared/types/musica.types";

export default function Dashboard() {
  const { setMusicaAtual } = useMusicaAtualContext();

  function handleSelecionarMusica(musica: MusicaBackend) {
    setMusicaAtual({
      id: musica.id,
      nomeMusica: musica.nome,
      nomeArtista: extrairArtista(musica),
      imagemURL: DEFAULT_IMAGE,
      caminhoDoArquivo: musica.caminhoDoArquivo,
    });
  }

  return (
    <main className={styles.main}>
      <DashboardHeader />
      <RenderMusica aoSelecionarMusica={handleSelecionarMusica} />
    </main>
  );
}
