"use client";

import { useEffect, useMemo, useState } from "react";
import type { MusicaBackend } from "@/src/shared/types/musica.types";
import { musicaService } from "@/src/shared/services/musica.service";

const ITEMS_PER_SECTION = 6;

function selecionarAleatorios<T>(lista: T[], quantidade: number): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia.slice(0, quantidade);
}

export default function useMusicas() {
  const [musicas, setMusicas] = useState<MusicaBackend[]>([]);

  useEffect(() => {
    musicaService.buscarTodas().then(setMusicas);
  }, []);

  const musicasAleatorias = useMemo(
    () => selecionarAleatorios(musicas, ITEMS_PER_SECTION),
    [musicas],
  );

  return { musicasAleatorias };
}
