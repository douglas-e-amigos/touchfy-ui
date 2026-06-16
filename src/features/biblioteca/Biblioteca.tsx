"use client";

import { Album, Heart, Music, Plus } from "lucide-react";
import CardBiblioteca from "./components/Card/CardBiblioteca";
import ButtonBiblioteca from "./components/Button/ButtonBiblioteca";
import { itensMediaCard } from "../dashboard/constants/default-card";
import ImageCard, {
  Variantes,
} from "@/src/shared/components/fy-imagecard/ImageCard";

export default function Biblioteca({
  usuario,
}: {
  readonly usuario: { nome: string; id: string };
}) {
  const cards = [
    {
      id: 1,
      icon: Heart,
      quantidade: 3,
      legenda: "Músicas curtidas",
    },
    {
      id: 2,
      icon: Music,
      quantidade: 3,
      legenda: "Playlists",
    },
    {
      id: 3,
      icon: Album,
      quantidade: 2,
      legenda: "Álbuns salvos",
    },
  ];

  const addNewPlaylist = () => {
    console.log("Clique do btn em biblioteca");
  };

  return (
    <section
      aria-label={`Biblioteca do usuário ${usuario.nome}`}
      className="flex flex-col"
    >
      <header className="w-screen flex items-start flex-col p-4">
        <h1 className="text-white text-5xl font-bold">Sua biblioteca</h1>
        <p className="text-zinc-400 text-1xl">
          Suas músicas, álbuns e playlists favoritas
        </p>
      </header>
      <section
        aria-label="Informações da biblioteca"
        className="flex gap-1 p-4"
      >
        {cards.map((card) => (
          <CardBiblioteca
            key={card.id}
            icon={card.icon}
            legenda={card.legenda}
            quantidade={card.quantidade}
          />
        ))}
        <ButtonBiblioteca
          icon={Plus}
          legenda="Nova playlist"
          onClick={addNewPlaylist}
        />
      </section>
      <section className="w-screen flex items-start flex-col p-4">
        {/* playlists salvas */}
        <h2 className="text-white text-5xl font-bold">Playlists</h2>
        <section aria-label="Playlists salvas" className="w-5/5 gap-11 flex flex-wrap items-center-safe">
          {itensMediaCard.map((item) => (
            <ImageCard
              key={item.id + 999}
              capaURL={item.image}
              tituloCard={item.title}
              nomeCard={item.title}
              descritor={item.createBy}
              variante={Variantes.QUADRADO_MD}
              abrirPlaylist={() => {}}
            />
          ))}{" "}
        </section>
      </section>
      <section className="w-screen flex items-start flex-col p-4">
        {/* albuns salvos */}
        <h2 className="text-white text-5xl font-bold">Álbuns</h2>
        <section aria-label="Álbuns salvos" className="w-5/5 gap-11 flex flex-wrap items-center-safe">
          {itensMediaCard.map((item) => (
            <ImageCard
              key={item.id + 888}
              capaURL={item.image}
              tituloCard={item.title}
              nomeCard={item.title}
              descritor={item.createBy}
              variante={Variantes.QUADRADO_MD}
              abrirPlaylist={() => {}}
            />
          ))}{" "}
        </section>
      </section>
    </section>
  );
}
