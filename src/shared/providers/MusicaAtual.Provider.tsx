"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface MusicaAtual {
  id: string;
  imagemURL: string;
  nomeMusica: string;
  nomeArtista: string;
  caminhoDoArquivo: string;
}

interface MusicaAtualContextType {
  musicaAtual: MusicaAtual | null;
  setMusicaAtual: (musica: MusicaAtual | null) => void;
  filaMusicas: MusicaAtual[];
  indiceMusicaAtual: number;
  selecionarMusica: (musica: MusicaAtual, fila?: MusicaAtual[]) => void;
  tocarProxima: () => void;
  tocarAnterior: () => void;
}

const MusicaAtualContext = createContext<MusicaAtualContextType | undefined>(
  undefined
);

export function MusicaAtualProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [musicaAtual, setMusicaAtualState] = useState<MusicaAtual | null>(null);
  const [filaMusicas, setFilaMusicas] = useState<MusicaAtual[]>([]);
  const [indiceMusicaAtual, setIndiceMusicaAtual] = useState(-1);

  const selecionarMusica = useCallback(
    (musica: MusicaAtual, fila: MusicaAtual[] = [musica]) => {
      const proximaFila = fila.length > 0 ? fila : [musica];
      const indice = proximaFila.findIndex((item) => item.id === musica.id);
      const proximoIndice = indice >= 0 ? indice : 0;

      setFilaMusicas(proximaFila);
      setIndiceMusicaAtual(proximoIndice);
      setMusicaAtualState(proximaFila[proximoIndice] ?? musica);
    },
    []
  );

  const setMusicaAtual = useCallback(
    (musica: MusicaAtual | null) => {
      if (!musica) {
        setFilaMusicas([]);
        setIndiceMusicaAtual(-1);
        setMusicaAtualState(null);
        return;
      }

      selecionarMusica(musica, [musica]);
    },
    [selecionarMusica]
  );

  const tocarProxima = useCallback(() => {
    if (filaMusicas.length === 0) return;

    const proximoIndice =
      indiceMusicaAtual < 0
        ? 0
        : (indiceMusicaAtual + 1) % filaMusicas.length;

    setIndiceMusicaAtual(proximoIndice);
    setMusicaAtualState(filaMusicas[proximoIndice]);
  }, [filaMusicas, indiceMusicaAtual]);

  const tocarAnterior = useCallback(() => {
    if (filaMusicas.length === 0) return;

    const proximoIndice =
      indiceMusicaAtual <= 0
        ? filaMusicas.length - 1
        : indiceMusicaAtual - 1;

    setIndiceMusicaAtual(proximoIndice);
    setMusicaAtualState(filaMusicas[proximoIndice]);
  }, [filaMusicas, indiceMusicaAtual]);

  const value = useMemo(
    () => ({
      musicaAtual,
      setMusicaAtual,
      filaMusicas,
      indiceMusicaAtual,
      selecionarMusica,
      tocarProxima,
      tocarAnterior,
    }),
    [
      musicaAtual,
      setMusicaAtual,
      filaMusicas,
      indiceMusicaAtual,
      selecionarMusica,
      tocarProxima,
      tocarAnterior,
    ]
  );

  return (
    <MusicaAtualContext.Provider value={value}>
      {children}
    </MusicaAtualContext.Provider>
  );
}

export function useMusicaAtualContext() {
  const context = useContext(MusicaAtualContext);

  if (!context) {
    throw new Error(
      "useMusicaAtualContext deve ser usado dentro de MusicaAtualProvider"
    );
  }

  return context;
}
