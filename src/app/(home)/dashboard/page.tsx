"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { faker } from "@faker-js/faker";

import { authService } from "../../features/usuario/services/auth.service";
import { UsuarioResponse } from "../../features/usuario/models/dto.model";
import { usuarioService } from "../../features/usuario/services/usuario.service";

import MediaCard from "../../shared/components/fy-mediacard/MediaCard";
import ImageCard, {
  Variantes,
} from "../../shared/components/fy-imagecard/ImageCard";
import FyDate from "../../shared/components/fy-date/FyDate";
import FySaudacao from "../../shared/components/fy-saudacao/FySaudacao";
import SecaoHome from "../../shared/components/fy-sectionhome/SecaoHome";

export default function Dashboard() {
  const router = useRouter();

  const [usuario, setUsuario] = useState<UsuarioResponse | null>(null);

  useEffect(() => {
    usuarioService
      .buscarUsuarioLogado()
      .then(setUsuario)
      .catch(console.error);
  }, []);

  const logout = async () => {
    await authService.logout();
    router.push("/login");
  };

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
    <main className="min-h-screen overflow-hidden bg-[#08070b] text-white">
      <div className="pointer-events-none fixed inset-0" />

      <header className="w-screen overflow-hidden bg-gradient-to-b from-[#ec268f]/30 via-[#ec268f]/10 to-transparent p-5 shadow-2xl shadow-black/40 md:p-8">
        <section className="mb-6 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <FyDate />
            <FySaudacao />

            <p className="max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
              Pronto para ouvir música? Confira o que preparamos para você.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {usuario?.id ? (
              <Link
                href={`/users/${usuario.id}/profile`}
                className="rounded-2xl bg-primary px-4 py-2 font-semibold text-white transition hover:opacity-90"
              >
                Ir para meu perfil
              </Link>
            ) : null}

            <button
              className="cursor-pointer rounded-2xl bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
              onClick={logout}
            >
              Sair
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 place-items-center gap-4 md:grid-cols-2 xl:grid-cols-3">
          {mediaCards.map((mediaCard) => (
            <MediaCard key={mediaCard.id} {...mediaCard} />
          ))}
        </section>
      </header>

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