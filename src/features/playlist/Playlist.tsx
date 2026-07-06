"use client";

import { Heart, Lock } from "lucide-react";

import {
  useMusicaAtualContext,
  type MusicaAtual,
} from "@/src/shared/providers/MusicaAtual.Provider";
import { useMusicasCurtidasContext } from "@/src/shared/providers/MusicasCurtidas.Provider";

import ActionsPlaylist from "./components/Actions/ActionsPlaylist";
import HeaderPlaylist from "./components/Header/HeaderPlaylist";
import ListPlaylist from "./components/List/ListPlaylist";
import { defaultPlaylist } from "./constants/default-playlist";
import { MusicaType, PlaylistType } from "@/src/shared/types/musica.types";

interface PlaylistProps {
  readonly slug?: string;
}

export default function Playlist({ slug }: PlaylistProps) {
  const { musicaAtual, selecionarMusica } = useMusicaAtualContext();
  const { musicasCurtidas } = useMusicasCurtidasContext();
  const isFavoritesPlaylist = slug === "favorites";
  const playlist = isFavoritesPlaylist
    ? criarPlaylistCurtidas(musicasCurtidas)
    : defaultPlaylist;

  function selecionarMusicaDaPlaylist(musica: MusicaType) {
    selecionarMusica(
      toMusicaAtual(musica),
      playlist.musicas.map(toMusicaAtual)
    );
  }

  function tocarPlaylist() {
    const primeiraMusica = playlist.musicas[0];

    if (primeiraMusica) {
      selecionarMusicaDaPlaylist(primeiraMusica);
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#320414_0,#08070b_320px)] pb-32 text-white">
      <HeaderPlaylist
        icon={isFavoritesPlaylist ? Heart : Lock}
        titulo={playlist.titulo}
        descricao={playlist.descricao}
        autor={playlist.autor}
        imagemURL={playlist.imagem}
        quantidadeMusicas={playlist.musicas.length}
      />

      <ActionsPlaylist
        onPlay={tocarPlaylist}
        onEdit={() => undefined}
        onDelete={() => undefined}
      />

      <section className="px-3 lg:px-9" aria-label="Faixas da playlist">
        {isFavoritesPlaylist && playlist.musicas.length === 0 ? (
          <div className="rounded-md border border-zinc-800 bg-black/20 px-4 py-12 text-center">
            <h2 className="text-lg font-semibold text-white">
              Nenhuma música curtida ainda
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Use o coração no player para salvar suas faixas favoritas aqui.
            </p>
          </div>
        ) : (
          <ListPlaylist
            musicas={playlist.musicas}
            onClick={selecionarMusicaDaPlaylist}
            musicaAtualId={musicaAtual?.id}
          />
        )}
      </section>
    </main>
  );
}

function toMusicaAtual(musica: MusicaType): MusicaAtual {
  return {
    id: musica.id,
    nomeMusica: musica.nomeMusica,
    nomeArtista: musica.nomeArtista,
    imagemURL: musica.imagemURL,
    caminhoDoArquivo: musica.caminhoDoArquivo,
  };
}

function criarPlaylistCurtidas(musicasCurtidas: MusicaAtual[]): PlaylistType {
  const musicas = musicasCurtidas.map<MusicaType>((musica) => ({
    ...musica,
    album: "Curtidas",
    duracao: "--:--",
  }));

  return {
    titulo: "Músicas curtidas",
    descricao: "Suas faixas favoritas em um só lugar",
    autor: "Você",
    imagem:
      musicas[0]?.imagemURL ??
      "https://cdn.dribbble.com/userupload/42879218/file/original-01a3e9162fba7773ab2dc7909f1b3b23.png?resize=1024x768&vertical=center",
    musicas,
  };
}
