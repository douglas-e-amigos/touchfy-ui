"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { musicaService } from "@/src/shared/services/musica.service";
import { musicaKeys } from "@/src/shared/utils/musicaKeys";

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
  const { data: musicas = [] } = useQuery({
    queryKey: musicaKeys.list(),
    queryFn: () => musicaService.buscarTodas(),
  });

  const musicasAleatorias = useMemo(
    () => selecionarAleatorios(musicas, ITEMS_PER_SECTION),
    [musicas],
  );

  return { musicasAleatorias };
}
