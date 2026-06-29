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
  musicaParaDeletar: MusicaBackend | null;
  handleDeletarClick: (musica: MusicaBackend) => void;
  handleDeletarCancelar: () => void;
  handleDeletarConfirmar: () => Promise<void>;
  musicaParaEditar: MusicaBackend | null;
  handleEditarClick: (musica: MusicaBackend) => void;
  handleEditarCancelar: () => void;
  handleEditarSalvar: () => void;
}

export default function useMusicsList(): UseMusicsListReturn {
  const [musicas, setMusicas] = useState<MusicaBackend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [artistaId, setArtistaId] = useState<string | null>(null);
  const [musicaParaDeletar, setMusicaParaDeletar] =
    useState<MusicaBackend | null>(null);
  const [musicaParaEditar, setMusicaParaEditar] =
    useState<MusicaBackend | null>(null);
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

  const handleDeletarClick = useCallback((musica: MusicaBackend) => {
    setMusicaParaDeletar(musica);
  }, []);

  const handleDeletarCancelar = useCallback(() => {
    setMusicaParaDeletar(null);
  }, []);

  const handleDeletarConfirmar = useCallback(async () => {
    if (!musicaParaDeletar) return;

    try {
      const res = await fetch(`/api/musicas/${musicaParaDeletar.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Falha ao deletar música");

      setMusicas((prev) =>
        prev.filter((m) => m.id !== musicaParaDeletar.id),
      );
    } catch (error) {
      console.error("Erro ao deletar música:", error);
    } finally {
      setMusicaParaDeletar(null);
    }
  }, [musicaParaDeletar]);

  const handleEditarClick = useCallback((musica: MusicaBackend) => {
    setMusicaParaEditar(musica);
  }, []);

  const handleEditarCancelar = useCallback(() => {
    setMusicaParaEditar(null);
  }, []);

  const handleEditarSalvar = useCallback(() => {
    setMusicaParaEditar(null);
  }, []);

  return {
    musicas,
    isLoading,
    handlePlay,
    musicaParaDeletar,
    handleDeletarClick,
    handleDeletarCancelar,
    handleDeletarConfirmar,
    musicaParaEditar,
    handleEditarClick,
    handleEditarCancelar,
    handleEditarSalvar,
  };
}
