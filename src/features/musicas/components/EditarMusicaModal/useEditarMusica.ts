"use client";

import { useCallback, useEffect, useState } from "react";
import { musicaService } from "@/src/shared/services/musica.service";
import type {
  GeneroMusical,
  MusicaBackend,
  Tag,
} from "@/src/shared/types/musica.types";

export interface UseEditarMusicaReturn {
  nome: string;
  letra: string;
  tagIds: string[];
  generoMusicalIds: string[];
  arquivo: File | null;
  tags: Tag[];
  generosMusicais: GeneroMusical[];
  novaTag: string;
  novoGeneroMusical: string;
  isSubmitting: boolean;
  error: string | null;
  setNome: (value: string) => void;
  setLetra: (value: string) => void;
  setTagIds: (value: string[]) => void;
  setGeneroMusicalIds: (value: string[]) => void;
  setArquivo: (value: File | null) => void;
  setNovaTag: (value: string) => void;
  setNovoGeneroMusical: (value: string) => void;
  handleSalvar: () => Promise<void>;
  handleCriarTag: () => Promise<void>;
  handleCriarGeneroMusical: () => Promise<void>;
}

export default function useEditarMusica(
  open: boolean,
  musica: MusicaBackend,
  onSalvar: () => void,
): UseEditarMusicaReturn {
  const [nome, setNome] = useState(musica.nome);
  const [letra, setLetra] = useState(musica.letra);
  const [tagIds, setTagIds] = useState<string[]>(
    musica.tags.map((t) => t.id),
  );
  const [generoMusicalIds, setGeneroMusicalIds] = useState<string[]>(
    musica.generosMusicais.map((g) => g.id),
  );
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [generosMusicais, setGenerosMusicais] = useState<GeneroMusical[]>([]);
  const [novaTag, setNovaTag] = useState("");
  const [novoGeneroMusical, setNovoGeneroMusical] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setNome(musica.nome);
    setLetra(musica.letra);
    setTagIds(musica.tags.map((t) => t.id));
    setGeneroMusicalIds(musica.generosMusicais.map((g) => g.id));
    setArquivo(null);
    setError(null);
    musicaService.buscarTags().then(setTags).catch(() => {});
    musicaService.buscarGenerosMusicais().then(setGenerosMusicais).catch(() => {});
  }, [open, musica]);

  const handleSalvar = useCallback(async () => {
    if (!nome.trim()) {
      setError("Nome obrigatório");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("nome", nome.trim());
      formData.append("letra", letra);
      tagIds.forEach((id) => formData.append("tagIds", id));
      generoMusicalIds.forEach((id) => formData.append("generoMusicalIds", id));
      if (arquivo) formData.append("arquivo", arquivo);

      const res = await fetch(`/api/musicas/${musica.id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message ?? "Erro ao atualizar música");
      }

      onSalvar();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao atualizar música");
    } finally {
      setIsSubmitting(false);
    }
  }, [nome, letra, tagIds, generoMusicalIds, arquivo, musica.id, onSalvar]);

  const handleCriarTag = useCallback(async () => {
    const nomeTag = novaTag.trim();
    if (!nomeTag) return;
    try {
      await musicaService.criarTag(nomeTag);
      const tagsAtualizadas = await musicaService.buscarTags();
      setTags(tagsAtualizadas);
      const tag = tagsAtualizadas.find((t) => t.nome === nomeTag);
      if (tag) setTagIds([tag.id]);
      setNovaTag("");
    } catch {
      /* ignore */
    }
  }, [novaTag]);

  const handleCriarGeneroMusical = useCallback(async () => {
    const nomeGenero = novoGeneroMusical.trim();
    if (!nomeGenero) return;
    try {
      await musicaService.criarGeneroMusical(nomeGenero);
      const generosAtualizados = await musicaService.buscarGenerosMusicais();
      setGenerosMusicais(generosAtualizados);
      const genero = generosAtualizados.find((g) => g.nome === nomeGenero);
      if (genero) setGeneroMusicalIds([genero.id]);
      setNovoGeneroMusical("");
    } catch {
      /* ignore */
    }
  }, [novoGeneroMusical]);

  return {
    nome,
    letra,
    tagIds,
    generoMusicalIds,
    arquivo,
    tags,
    generosMusicais,
    novaTag,
    novoGeneroMusical,
    isSubmitting,
    error,
    setNome,
    setLetra,
    setTagIds,
    setGeneroMusicalIds,
    setArquivo,
    setNovaTag,
    setNovoGeneroMusical,
    handleSalvar,
    handleCriarTag,
    handleCriarGeneroMusical,
  };
}
