"use client";

import { useCallback, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usuarioService } from "@/src/features/usuario/services/usuario.service";
import { useMusicaAtualContext } from "@/src/shared/providers/MusicaAtual.Provider";
import {
  DEFAULT_IMAGE,
  extrairArtista,
} from "@/src/shared/design-system/RenderMusica/RenderMusica";
import type { MusicaBackend } from "@/src/shared/types/musica.types";
import { useMusicaSearchContext } from "@/src/shared/contexts/MusicaSearch.context";
import { musicaService } from "@/src/shared/services/musica.service";
import { musicaKeys } from "@/src/shared/utils/musicaKeys";

const EMPTY_MUSICAS: MusicaBackend[] = [];

export interface UseMusicsListReturn {
  musicas: MusicaBackend[];
  musicasFiltradas: MusicaBackend[];
  isLoading: boolean;
  termoBusca: string;
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
  const queryClient = useQueryClient();
  const [musicaParaDeletar, setMusicaParaDeletar] =
    useState<MusicaBackend | null>(null);
  const [musicaParaEditar, setMusicaParaEditar] =
    useState<MusicaBackend | null>(null);
  const { termoBusca } = useMusicaSearchContext();
  const { setMusicaAtual } = useMusicaAtualContext();

  const usuarioLogadoQuery = useQuery({
    queryKey: ["usuario", "me"],
    queryFn: () => usuarioService.buscarUsuarioLogado(),
  });

  const artistaId = usuarioLogadoQuery.data?.id ?? null;

  const musicasQuery = useQuery({
    queryKey: artistaId
      ? musicaKeys.artist(artistaId)
      : [...musicaKeys.lists(), "artist", "pending"],
    queryFn: () => musicaService.buscarPorArtista(artistaId!),
    enabled: Boolean(artistaId),
  });

  const musicas = musicasQuery.data ?? EMPTY_MUSICAS;
  const isLoading =
    usuarioLogadoQuery.isLoading || (Boolean(artistaId) && musicasQuery.isLoading);

  const musicasFiltradas = useMemo(
    () => musicas.filter((m) =>
      m.nome.toLowerCase().includes(termoBusca.toLowerCase()),
    ),
    [musicas, termoBusca],
  );

  const deletarMusicaMutation = useMutation({
    mutationFn: (musicaId: string) => musicaService.deletar(musicaId),
    onMutate: async (musicaId) => {
      if (!artistaId) {
        return null;
      }

      const queryKey = musicaKeys.artist(artistaId);
      await queryClient.cancelQueries({ queryKey });

      const musicasAnteriores =
        queryClient.getQueryData<MusicaBackend[]>(queryKey);

      queryClient.setQueryData<MusicaBackend[]>(queryKey, (musicasAtuais) =>
        musicasAtuais?.filter((musica) => musica.id !== musicaId) ?? [],
      );

      return { queryKey, musicasAnteriores };
    },
    onError: (_error, _musicaId, context) => {
      if (context?.musicasAnteriores) {
        queryClient.setQueryData(context.queryKey, context.musicasAnteriores);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: musicaKeys.lists() });
    },
  });

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
      await deletarMusicaMutation.mutateAsync(musicaParaDeletar.id);
    } catch (error) {
      console.error("Erro ao deletar música:", error);
    } finally {
      setMusicaParaDeletar(null);
    }
  }, [deletarMusicaMutation, musicaParaDeletar]);

  const handleEditarClick = useCallback((musica: MusicaBackend) => {
    setMusicaParaEditar(musica);
  }, []);

  const handleEditarCancelar = useCallback(() => {
    setMusicaParaEditar(null);
  }, []);

  const handleEditarSalvar = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: musicaKeys.lists() });
    setMusicaParaEditar(null);
  }, [queryClient]);

  return {
    musicas,
    musicasFiltradas,
    isLoading,
    termoBusca,
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
