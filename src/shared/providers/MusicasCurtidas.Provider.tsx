"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { MusicaAtual } from "./MusicaAtual.Provider";

export const MUSICAS_CURTIDAS_STORAGE_KEY = "touchfy:musicas-curtidas";

interface MusicasCurtidasContextType {
  musicasCurtidas: MusicaAtual[];
  isMusicaCurtida: (musicaId: string) => boolean;
  curtirMusica: (musica: MusicaAtual) => void;
  descurtirMusica: (musicaId: string) => void;
  alternarCurtida: (musica: MusicaAtual) => void;
}

const MusicasCurtidasContext = createContext<
  MusicasCurtidasContextType | undefined
>(undefined);

export function MusicasCurtidasProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const musicasCurtidas = useSyncExternalStore(
    subscribeToMusicasCurtidas,
    getMusicasCurtidasSnapshot,
    getServerMusicasCurtidasSnapshot,
  );

  const isMusicaCurtida = useCallback(
    (musicaId: string) =>
      musicasCurtidas.some((musica) => musica.id === musicaId),
    [musicasCurtidas],
  );

  const curtirMusica = useCallback((musica: MusicaAtual) => {
    atualizarMusicasCurtidas((musicasAtuais) => {
      if (musicasAtuais.some((item) => item.id === musica.id)) {
        return musicasAtuais;
      }

      return [musica, ...musicasAtuais];
    });
  }, []);

  const descurtirMusica = useCallback((musicaId: string) => {
    atualizarMusicasCurtidas((musicasAtuais) =>
      musicasAtuais.filter((musica) => musica.id !== musicaId),
    );
  }, []);

  const alternarCurtida = useCallback(
    (musica: MusicaAtual) => {
      if (isMusicaCurtida(musica.id)) {
        descurtirMusica(musica.id);
        return;
      }

      curtirMusica(musica);
    },
    [curtirMusica, descurtirMusica, isMusicaCurtida],
  );

  const value = useMemo(
    () => ({
      musicasCurtidas,
      isMusicaCurtida,
      curtirMusica,
      descurtirMusica,
      alternarCurtida,
    }),
    [
      musicasCurtidas,
      isMusicaCurtida,
      curtirMusica,
      descurtirMusica,
      alternarCurtida,
    ],
  );

  return (
    <MusicasCurtidasContext.Provider value={value}>
      {children}
    </MusicasCurtidasContext.Provider>
  );
}

export function useMusicasCurtidasContext() {
  const context = useContext(MusicasCurtidasContext);

  if (!context) {
    throw new Error(
      "useMusicasCurtidasContext deve ser usado dentro de MusicasCurtidasProvider",
    );
  }

  return context;
}

const listeners = new Set<() => void>();
let snapshotRawValue: string | null = null;
let snapshotValue: MusicaAtual[] = [];

function subscribeToMusicasCurtidas(listener: () => void) {
  listeners.add(listener);

  function handleStorage(event: StorageEvent) {
    if (event.key === MUSICAS_CURTIDAS_STORAGE_KEY) {
      snapshotRawValue = null;
      listener();
    }
  }

  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function getMusicasCurtidasSnapshot(): MusicaAtual[] {
  const rawValue = localStorage.getItem(MUSICAS_CURTIDAS_STORAGE_KEY) ?? "[]";

  if (rawValue === snapshotRawValue) {
    return snapshotValue;
  }

  snapshotRawValue = rawValue;
  snapshotValue = parseMusicasCurtidas(rawValue);

  return snapshotValue;
}

function getServerMusicasCurtidasSnapshot(): MusicaAtual[] {
  return [];
}

function atualizarMusicasCurtidas(
  updater: (musicasAtuais: MusicaAtual[]) => MusicaAtual[],
) {
  const musicasAtualizadas = updater(getMusicasCurtidasSnapshot());
  const rawValue = JSON.stringify(musicasAtualizadas);

  snapshotRawValue = rawValue;
  snapshotValue = musicasAtualizadas;
  localStorage.setItem(MUSICAS_CURTIDAS_STORAGE_KEY, rawValue);
  listeners.forEach((listener) => listener());
}

function parseMusicasCurtidas(rawValue: string): MusicaAtual[] {
  try {
    const parsedValue = JSON.parse(rawValue);

    if (Array.isArray(parsedValue)) {
      return parsedValue.filter(isMusicaAtual);
    }
  } catch {
    return [];
  }

  return [];
}

function isMusicaAtual(value: unknown): value is MusicaAtual {
  if (!value || typeof value !== "object") {
    return false;
  }

  const musica = value as Record<string, unknown>;

  return (
    typeof musica.id === "string" &&
    typeof musica.nomeMusica === "string" &&
    typeof musica.nomeArtista === "string" &&
    typeof musica.imagemURL === "string" &&
    typeof musica.caminhoDoArquivo === "string"
  );
}
