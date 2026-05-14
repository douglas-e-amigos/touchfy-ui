"use client";

import { useState } from "react";

interface MediaCardProps {
  imagemURL: string;
  rodarMusica: () => void;
  nomeMusica: string;
  nomeArtista: string;
}

export default function MediaCard({
  imagemURL,
  rodarMusica: abrirMusica,
  nomeMusica,
  nomeArtista,
}: MediaCardProps) {
  const [mostrarIcone, setMostrarIcone] = useState(false);

  return (
    <div  
      role="group"
      aria-label={`Card de mídia da música ${nomeMusica}`}
      onMouseEnter={() => setMostrarIcone(true)}
      onMouseLeave={() => setMostrarIcone(false)}
      className="rounded-lg bg-[oklch(37%_0.013_285.805)] cursor-pointer w-[23rem] h-[5rem] grid gap-x-4 p-2 items-center [grid-template-areas:'foto_musica_icone'_'foto_artista_icone'] grid-cols-[auto_1fr_auto]"
    >
      <img 
        className="w-[4rem] h-[4rem] rounded [grid-area:foto]"
        src={imagemURL} 
        alt={`Foto de ${nomeArtista}`} 
      />

      <p className="text-white font-bold [grid-area:musica] self-end">{nomeMusica}</p>
      <p className="text-gray-400 [grid-area:artista] self-start">{nomeArtista}</p>

      <div className="relative [grid-area:icone] w-[2.5rem] h-[2.5rem]">
        <button
          onClick={abrirMusica}
          className={`absolute left-0 top-1/2 -translate-y-1/2 ${mostrarIcone ? "block" : "hidden"}`}
          aria-label="Ícone play música"
        >
          <img src="/icons/play-button.svg" alt="Ícone play música" className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
