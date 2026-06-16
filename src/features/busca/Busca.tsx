"use client";

import FyInput from "@/src/shared/components/fy-input/FyInput";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Busca() {
  const [busca, setBusca] = useState<string | null>(null);
  const valorBusca = () => {
    if (busca) return busca;
    else return "";
  };
  
  return (
    <section className="w-screen flex flex-col p-4">
      <header className="w-screen flex items-start flex-col gap-8 p-8">
        <h1 className="text-white text-5xl font-bold">Buscar</h1>
        <div className="w-[80%]">
          <FyInput
            placeholder="O que você quer ouvir?"
            name="Buscar"
            id="pag-buscar"
            onChange={(value) => setBusca(value)}
            value={valorBusca()}
          />
        </div>
      </header>
      <div className="flex flex-col items-center justify-center gap-4 w-[80%]">
        <Search size={50} color="gray" />
        <p className="text-zinc-400">
          Busque por músicas, artistas, álbuns ou playlists
        </p>
      </div>
    </section>
  );
}
