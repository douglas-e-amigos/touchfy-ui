"use client";

import DashboardHeader from "./components/DashboardHeader/DashboardHeader";
import styles from "./Dashboard.module.css";
import RenderMusica, {
  extrairArtista,
  DEFAULT_IMAGE,
} from "@/src/shared/design-system/RenderMusica/RenderMusica";
import {
  useMusicaAtualContext,
  type MusicaAtual,
} from "@/src/shared/providers/MusicaAtual.Provider";
import type { MusicaBackend } from "@/src/shared/types/musica.types";

export default function Dashboard() {
  const { selecionarMusica } = useMusicaAtualContext();

  function handleSelecionarMusica(
    musica: MusicaBackend,
    fila: MusicaBackend[]
  ) {
    selecionarMusica(toMusicaAtual(musica), fila.map(toMusicaAtual));
  }

  return (
    <main className={styles.main}>
      <DashboardHeader />
      <RenderMusica aoSelecionarMusica={handleSelecionarMusica} />
    </main>
  );
}

function toMusicaAtual(musica: MusicaBackend): MusicaAtual {
  return {
    id: musica.id,
    nomeMusica: musica.nome,
    nomeArtista: extrairArtista(musica),
    imagemURL: DEFAULT_IMAGE,
    caminhoDoArquivo: musica.caminhoDoArquivo,
  };
}
