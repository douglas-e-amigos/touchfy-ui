"use client";

import { useForm } from "@/src/shared/hooks/Form/useForm";
import { musicaService } from "@/src/shared/services/musica.service";
import { notificationService } from "@/src/shared/services/notification.service";
import type {
  GeneroMusical,
  Tag,
} from "@/src/shared/types/musica.types";
import { getHttpErrorMessage } from "@/src/shared/utils/http-error";
import { useState } from "react";

export type MusicFormValues = {
  nome: string;
  letra: string;
  tagIds: string[];
  generoMusicalIds: string[];
  arquivo: File | null;
};

const initialMusicFormValues: MusicFormValues = {
  nome: "",
  letra: "",
  tagIds: [],
  generoMusicalIds: [],
  arquivo: null,
};

export function useMusicForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [generosMusicais, setGenerosMusicais] = useState<GeneroMusical[]>([]);
  const [novaTag, setNovaTag] = useState("");
  const [novoGeneroMusical, setNovoGeneroMusical] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { values, errors, handleChange, reset, isValid } = useForm(
    initialMusicFormValues,
    validarMusica,
  );

  async function carregarOpcoes() {
    const [tagsCarregadas, generosCarregados] = await Promise.all([
      musicaService.buscarTags(),
      musicaService.buscarGenerosMusicais(),
    ]);

    setTags(tagsCarregadas);
    setGenerosMusicais(generosCarregados);
  }

  async function abrirModal() {
    setIsModalOpen(true);
    await carregarOpcoes();
  }

  function fecharModal() {
    setIsModalOpen(false);
    reset();
    setNovaTag("");
    setNovoGeneroMusical("");
  }

  function handleNomeChange(nome: string) {
    handleChange("nome", nome);
  }

  function handleLetraChange(letra: string) {
    handleChange("letra", letra);
  }

  function handleTagChange(tagId: string) {
    handleChange("tagIds", tagId ? [tagId] : []);
  }

  function handleGeneroMusicalChange(generoMusicalId: string) {
    handleChange("generoMusicalIds", generoMusicalId ? [generoMusicalId] : []);
  }

  function handleArquivoChange(fileList: FileList | null) {
    handleChange("arquivo", fileList?.[0] ?? null);
  }

  async function criarTag() {
    const nome = novaTag.trim();

    if (!nome) {
      return;
    }

    await musicaService.criarTag(nome);
    const tagsAtualizadas = await musicaService.buscarTags();
    setTags(tagsAtualizadas);
    setNovaTag("");

    const tagCriada = tagsAtualizadas.find((tag) => tag.nome === nome);
    handleTagChange(tagCriada?.id ?? "");
  }

  async function criarGeneroMusical() {
    const nome = novoGeneroMusical.trim();

    if (!nome) {
      return;
    }

    await musicaService.criarGeneroMusical(nome);
    const generosAtualizados = await musicaService.buscarGenerosMusicais();
    setGenerosMusicais(generosAtualizados);
    setNovoGeneroMusical("");

    const generoCriado = generosAtualizados.find((genero) => genero.nome === nome);
    handleGeneroMusicalChange(generoCriado?.id ?? "");
  }

  async function salvarMusica() {
    if (!isValid() || !values.arquivo) {
      return;
    }

    setIsSubmitting(true);

    try {
      await musicaService.criar({
        nome: values.nome,
        letra: values.letra,
        tagIds: values.tagIds,
        generoMusicalIds: values.generoMusicalIds,
        arquivo: values.arquivo,
      });

      notificationService.showSuccessForSeconds(
        {
          title: "Música criada",
          message: "A música foi cadastrada com sucesso.",
        },
        4,
      );
      fecharModal();
    } catch (error) {
      console.error(error);
      notificationService.showErrorForSeconds(
        {
          title: "Erro ao criar música",
          message: getHttpErrorMessage(error, "Tente novamente em instantes."),
        },
        6,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    isModalOpen,
    tags,
    generosMusicais,
    values,
    errors,
    novaTag,
    novoGeneroMusical,
    isSubmitting,
    abrirModal,
    fecharModal,
    salvarMusica,
    criarTag,
    criarGeneroMusical,
    handleNomeChange,
    handleLetraChange,
    handleTagChange,
    handleGeneroMusicalChange,
    handleArquivoChange,
    setNovaTag,
    setNovoGeneroMusical,
  };
}

function validarMusica(
  field: keyof MusicFormValues,
  values: Readonly<MusicFormValues>,
) {
  if (field === "nome" && !values.nome.trim()) {
    return "Nome obrigatório";
  }

  if (field === "arquivo" && !values.arquivo) {
    return "Arquivo obrigatório";
  }

  return null;
}
