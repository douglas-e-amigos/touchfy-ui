"use client";

import FyInput from "@/src/shared/components/fy-input/FyInput";
import FyButton from "@/src/shared/components/fy-button/FyButton";
import { MediaCard } from "@/src/shared/components/fy-mediacard/MediaCard";
import {
  DEFAULT_IMAGE,
  extrairArtista,
} from "@/src/shared/design-system/RenderMusica/RenderMusica";
import { useMusicaAtualContext } from "@/src/shared/providers/MusicaAtual.Provider";
import { musicaService } from "@/src/shared/services/musica.service";
import type { MusicaBackend } from "@/src/shared/types/musica.types";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Busca() {
  const { selecionarMusica } = useMusicaAtualContext();
  const [busca, setBusca] = useState("");
  const [musicaEncontrada, setMusicaEncontrada] =
    useState<MusicaBackend | null>(null);
  const [erro, setErro] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const valorBusca = () => {
    if (busca) return busca;
    else return "";
  };

  async function buscarMusica() {
    const nome = busca.trim();

    if (!nome) {
      setMusicaEncontrada(null);
      setErro("Informe o nome da música");
      return;
    }

    setIsLoading(true);
    setErro("");

    try {
      const musica = await musicaService.buscarPorNome(nome);
      if (!musica) {
        setMusicaEncontrada(null);
        setErro("Música não encontrada");
        return;
      }

      setMusicaEncontrada(musica);
    } catch (error) {
      console.error(error);
      setMusicaEncontrada(null);
      setErro("Música não encontrada");
    } finally {
      setIsLoading(false);
    }
  }

  function tocarMusica(musica: MusicaBackend) {
    const musicaAtual = {
      id: musica.id,
      nomeMusica: musica.nome,
      nomeArtista: extrairArtista(musica),
      imagemURL: DEFAULT_IMAGE,
      caminhoDoArquivo: musica.caminhoDoArquivo,
    };

    selecionarMusica(musicaAtual, [musicaAtual]);
  }

  return (
    <section className="w-screen flex flex-col p-4">
      <header className="w-screen flex items-start flex-col gap-8 p-8">
        <h1 className="text-white text-5xl font-bold">Buscar</h1>
        <form
          className="flex w-[80%] flex-col gap-3 md:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            buscarMusica();
          }}
        >
          <FyInput
            placeholder="O que você quer ouvir?"
            name="Buscar"
            id="pag-buscar"
            onChange={(value) => setBusca(value)}
            value={valorBusca()}
          />
          <FyButton
            className="h-10 whitespace-nowrap"
            disabled={isLoading}
            onClick={buscarMusica}
          >
            Buscar música
          </FyButton>
        </form>
      </header>
      {musicaEncontrada ? (
        <section aria-label="Resultado da busca" className="w-[80%] px-8">
          <MediaCard
            imagemURL={DEFAULT_IMAGE}
            rodarMusica={() => tocarMusica(musicaEncontrada)}
            nomeMusica={musicaEncontrada.nome}
            nomeArtista={extrairArtista(musicaEncontrada)}
          />
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 w-[80%]">
          <Search size={50} color="gray" />
          <p className="text-zinc-400">
            {erro || "Busque por músicas, artistas, álbuns ou playlists"}
          </p>
        </div>
      )}
    </section>
  );
}
