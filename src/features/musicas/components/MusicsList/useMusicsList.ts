"use client";

import { useCallback, useEffect, useState } from "react";
import { usuarioService } from "@/src/features/usuario/services/usuario.service";
import { useMusicaAtualContext } from "@/src/shared/providers/MusicaAtual.Provider";
import {
  DEFAULT_IMAGE,
  extrairArtista,
} from "@/src/shared/design-system/RenderMusica/RenderMusica";
import type { MusicaBackend } from "@/src/shared/types/musica.types";

export interface UseMusicsListReturn {
  musicas: MusicaBackend[];
  isLoading: boolean;
  handlePlay: (musica: MusicaBackend) => void;
}

export default function useMusicsList(): UseMusicsListReturn {
  const [musicas, setMusicas] = useState<MusicaBackend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [artistaId, setArtistaId] = useState<string | null>(null);
  const { setMusicaAtual } = useMusicaAtualContext();

  useEffect(() => {
    usuarioService
      .buscarUsuarioLogado()
      .then((usuario) => setArtistaId(usuario.id))
      .catch((error) => console.error("Erro ao buscar usuário:", error));
  }, []);

  useEffect(() => {
    if (!artistaId) return;

    fetch(`/api/musicas/artista/${artistaId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao buscar músicas");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setMusicas(data);
      })
      .catch((error) => console.error("Erro ao buscar músicas:", error))
      .finally(() => setIsLoading(false));
  }, [artistaId]);

  const handlePlay = useCallback(
    (musica: MusicaBackend) => {
      setMusicaAtual({
        id: musica.id,
        nomeMusica: musica.nome,
        nomeArtista: extrairArtista(musica),
        imagemURL: DEFAULT_IMAGE,
        caminhoDoArquivo: musica.caminhoDoArquivo,
      });
    },
    [setMusicaAtual],
  );

  return { musicas, isLoading, handlePlay };
}
