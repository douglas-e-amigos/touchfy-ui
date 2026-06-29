"use client";

import FyButton from "@/src/shared/components/fy-button/FyButton";
import FyInput from "@/src/shared/components/fy-input/FyInput";
import FyModal from "@/src/shared/components/fy-modal/FyModal";
import type { MusicaBackend } from "@/src/shared/types/musica.types";
import { FileAudio, Music } from "lucide-react";
import useEditarMusica from "./useEditarMusica";

interface EditarMusicaModalProps {
  open: boolean;
  musica: MusicaBackend;
  onClose: () => void;
  onSalvar: () => void;
}

export default function EditarMusicaModal({
  open,
  musica,
  onClose,
  onSalvar,
}: Readonly<EditarMusicaModalProps>) {
  const {
    nome,
    letra,
    tagIds,
    generoMusicalIds,
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
  } = useEditarMusica(open, musica, onSalvar);

  return (
    <FyModal open={open} onClose={onClose}>
      <form
        className="flex max-h-[85vh] flex-col gap-6 overflow-y-auto"
        onSubmit={(event) => {
          event.preventDefault();
          handleSalvar();
        }}
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-white">Editar música</h2>
          <span className="text-sm text-zinc-400">
            Altere os dados da música conforme necessário.
          </span>
        </div>

        {error && (
          <span className="text-sm italic text-red-500">{error}</span>
        )}

        <div className="flex flex-col gap-4">
          <FyInput
            id="edit-music-name"
            name="edit-music-name"
            label="Nome da música"
            placeholder="Nome da música"
            icon={<Music aria-hidden="true" />}
            value={nome}
            onChange={setNome}
          />

          <div className="flex flex-col gap-1">
            <label
              htmlFor="edit-music-lyrics"
              className="font-semibold text-white"
            >
              Letra
            </label>
            <textarea
              id="edit-music-lyrics"
              name="edit-music-lyrics"
              value={letra ? letra : ""}
              placeholder="Letra da música"
              className="min-h-24 rounded-md border border-gray-600 bg-mauve-900 px-3 py-2 text-white placeholder:text-gray-500"
              onChange={(event) => setLetra(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="edit-music-tags"
              className="font-semibold text-white"
            >
              Tags
            </label>
            <select
              id="edit-music-tags"
              name="edit-music-tags"
              value={tagIds[0] ?? ""}
              className="rounded-md border border-gray-600 bg-mauve-900 px-3 py-2 text-white"
              onChange={(event) =>
                setTagIds(event.target.value ? [event.target.value] : [])
              }
            >
              <option value="">Selecione uma tag</option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <FyInput
              id="edit-new-tag"
              name="edit-new-tag"
              label="Nova tag"
              placeholder="Nova tag"
              value={novaTag}
              onChange={setNovaTag}
            />
            <div className="flex items-end">
              <FyButton type="outline" onClick={handleCriarTag}>
                Criar tag
              </FyButton>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="edit-music-genres"
              className="font-semibold text-white"
            >
              Gêneros musicais
            </label>
            <select
              id="edit-music-genres"
              name="edit-music-genres"
              value={generoMusicalIds[0] ?? ""}
              className="rounded-md border border-gray-600 bg-mauve-900 px-3 py-2 text-white"
              onChange={(event) =>
                setGeneroMusicalIds(
                  event.target.value ? [event.target.value] : [],
                )
              }
            >
              <option value="">Selecione um gênero</option>
              {generosMusicais.map((genero) => (
                <option key={genero.id} value={genero.id}>
                  {genero.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <FyInput
              id="edit-new-genre"
              name="edit-new-genre"
              label="Novo gênero musical"
              placeholder="Novo gênero musical"
              value={novoGeneroMusical}
              onChange={setNovoGeneroMusical}
            />
            <div className="flex items-end">
              <FyButton type="outline" onClick={handleCriarGeneroMusical}>
                Criar gênero musical
              </FyButton>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="edit-music-file"
              className="font-semibold text-white"
            >
              Arquivo da música (opcional)
            </label>
            <div className="relative flex items-center gap-3 rounded-md border border-gray-600 bg-mauve-900 px-3 py-2 text-white">
              <FileAudio aria-hidden="true" className="text-gray-400" />
              <input
                id="edit-music-file"
                name="edit-music-file"
                type="file"
                accept="audio/*"
                className="w-full text-sm"
                onChange={(event) =>
                  setArquivo(event.target.files?.[0] ?? null)
                }
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <FyButton type="outline" onClick={onClose}>
            Cancelar
          </FyButton>
          <FyButton onClick={handleSalvar} disabled={isSubmitting}>
            Salvar alterações
          </FyButton>
        </div>
      </form>
    </FyModal>
  );
}
