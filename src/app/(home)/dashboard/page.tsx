"use client";

import { useCallback, useMemo } from "react";
import { faker } from "@faker-js/faker";


import MediaCard from "../../../shared/components/fy-mediacard/MediaCard";
import ImageCard, {
  Variantes,
} from "../../../shared/components/fy-imagecard/ImageCard";
import SecaoHome from "../../../shared/components/fy-sectionhome/SecaoHome";
import HomeHeader from "@/src/shared/components/fy-sectionhome/HomeHeader";

export default function Dashboard() {
  const rodarMusica = useCallback(() => {}, []);

  const abrirPlaylist = useCallback(() => {}, []);

  const mediaCards = useMemo(() => {
    return Array.from({ length: 6 }, (_, index) => ({
      id: index,
      imagemURL: faker.image.avatar(),
      nomeMusica: faker.music.songName(),
      nomeArtista: faker.music.artist(),
      rodarMusica,
    }));
  }, [rodarMusica]);

  const artistasDestaques = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => ({
      id: index,
      capaURL: faker.image.avatar(),
      nomeCard: faker.music.songName(),
      tituloCard: faker.music.songName(),
      descritor: faker.music.artist(),
      variante: Variantes.CIRCULAR,
      abrirPlaylist,
    }));
  }, [abrirPlaylist]);

  const recomendados = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => ({
      id: index,
      capaURL: faker.image.avatar(),
      nomeCard: faker.music.songName(),
      tituloCard: faker.music.songName(),
      descritor: faker.music.artist(),
      variante: Variantes.QUADRADO_SM,
      abrirPlaylist,
    }));
  }, [abrirPlaylist]);

  const playlistsDestaques = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => ({
      id: index,
      capaURL: faker.image.avatar(),
      nomeCard: faker.music.songName(),
      tituloCard: faker.music.songName(),
      descritor: faker.music.artist(),
      variante: Variantes.QUADRADO_MD,
      abrirPlaylist,
    }));
  }, [abrirPlaylist]);

  const novosLancamentos = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => ({
      id: index,
      capaURL: faker.image.avatar(),
      nomeCard: faker.music.songName(),
      tituloCard: faker.music.songName(),
      descritor: faker.music.artist(),
      ano: faker.date
        .between({ from: "2000-01-01", to: "2025-12-31" })
        .getFullYear()
        .toString(),
      variante: Variantes.QUADRADO_MD,
      abrirPlaylist,
    }));
  }, [abrirPlaylist]);

  return (
    <main className="min-h-screen min-w-0 overflow-hidden bg-[#08070b] text-white">
      <div className="pointer-events-none fixed inset-0" />

      <HomeHeader />

      <section className="grid grid-cols-1 place-items-center gap-4 md:grid-cols-2 xl:grid-cols-3">
        {mediaCards.map((mediaCard) => (
          <MediaCard key={mediaCard.id} {...mediaCard} />
        ))}
      </section>

      <SecaoHome titulo="Artistas em destaque">
        <div className="mx-20 flex justify-between">
          {artistasDestaques.map((artista) => (
            <ImageCard key={artista.id} {...artista} />
          ))}
        </div>
      </SecaoHome>

      <SecaoHome titulo="Recomendados para você">
        <div className="mx-20 flex justify-between">
          {recomendados.map((item) => (
            <ImageCard key={item.id} {...item} />
          ))}
        </div>
      </SecaoHome>

      <SecaoHome titulo="Playlists em destaque">
        <div className="mx-20 flex justify-between">
          {playlistsDestaques.map((playlist) => (
            <ImageCard key={playlist.id} {...playlist} />
          ))}
        </div>
      </SecaoHome>

      <SecaoHome titulo="Novos lançamentos">
        <div className="mx-20 flex justify-between">
          {novosLancamentos.map((lancamento) => (
            <ImageCard key={lancamento.id} {...lancamento} />
          ))}
        </div>
      </SecaoHome>
    </main>
  );
}
