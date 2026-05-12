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
      aria-label={`Card da mídia de ${nomeMusica}`}
      onMouseEnter={() => setMostrarIcone(true)}
      onMouseLeave={() => setMostrarIcone(false)}
    >
      <img src={imagemURL} alt={`Foto de ${nomeArtista}`} />

      <p>{nomeMusica}</p>
      <p>{nomeArtista}</p>

      <img
        src="/icons/play-button.svg"
        alt="Ícone de um play de música"
        aria-label="Ícone play música"
        onClick={abrirMusica}
        className={mostrarIcone ? "block" : "hidden"}
      />
    </div>
  );
}