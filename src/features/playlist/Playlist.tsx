"use client";

import { Lock } from "lucide-react";

import { useMusicaAtualContext } from "@/src/shared/providers/MusicaAtual.Provider";

import ActionsPlaylist from "./components/Actions/ActionsPlaylist";
import HeaderPlaylist from "./components/Header/HeaderPlaylist";
import ListPlaylist from "./components/List/ListPlaylist";
import { defaultPlaylist } from "./constants/default-playlist";
import { MusicaType } from "@/src/shared/types/Musica.types";

export default function Playlist() {
  const { musicaAtual, setMusicaAtual } = useMusicaAtualContext();

  function selecionarMusica(musica: MusicaType) {
    setMusicaAtual({
      id: musica.id,
      nomeMusica: musica.nomeMusica,
      nomeArtista: musica.nomeArtista,
      imagemURL: musica.imagemURL,
    });
  }

  function tocarPlaylist() {
    const primeiraMusica = defaultPlaylist.musicas[0];

    if (primeiraMusica) {
      selecionarMusica(primeiraMusica);
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#320414_0,#08070b_320px)] pb-32 text-white">
      <HeaderPlaylist
        icon={Lock}
        titulo={defaultPlaylist.titulo}
        descricao={defaultPlaylist.descricao}
        autor={defaultPlaylist.autor}
        imagemURL={defaultPlaylist.imagem}
        quantidadeMusicas={defaultPlaylist.musicas.length}
      />

      <ActionsPlaylist
        onPlay={tocarPlaylist}
        onEdit={() => undefined}
        onDelete={() => undefined}
      />

      <section className="px-3 lg:px-9" aria-label="Faixas da playlist">
        <ListPlaylist
          musicas={defaultPlaylist.musicas}
          onClick={selecionarMusica}
          musicaAtualId={musicaAtual?.id}
        />
      </section>
    </main>
  );
}
