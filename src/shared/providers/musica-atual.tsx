"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";

interface MusicaAtual {
  id: number;
  imagemURL: string;
  nomeMusica: string;
  nomeArtista: string;
}

interface MusicaAtualContextType {
  musicaAtual: MusicaAtual | null;
  setMusicaAtual: (musica: MusicaAtual | null) => void;
}

const MusicaAtualContext = createContext<MusicaAtualContextType | undefined>(
  undefined
);

export function MusicaAtualProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [musicaAtual, setMusicaAtual] = useState<MusicaAtual | null>(null);

  const value = useMemo(
    () => ({ musicaAtual, setMusicaAtual }),
    [musicaAtual]
  );

  return (
    <MusicaAtualContext.Provider value={value}>
      {children}
    </MusicaAtualContext.Provider>
  );
}

export function useMusicaAtualContext() {
  const context = useContext(MusicaAtualContext);
  if (context === undefined) {
    throw new Error(
      "useMusicaAtualContext deve ser usado dentro de MusicaAtualProvider"
    );
  }
  return context;
}
