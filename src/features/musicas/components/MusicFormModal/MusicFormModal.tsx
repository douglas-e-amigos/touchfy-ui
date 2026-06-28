import FyButton from "@/src/shared/components/fy-button/FyButton";
import FyInput from "@/src/shared/components/fy-input/FyInput";
import FyModal from "@/src/shared/components/fy-modal/FyModal";
import type {
  GeneroMusical,
  Tag,
} from "@/src/shared/types/musica.types";
import type { MusicFormValues } from "../../hooks/useMusicForm";
import { FileAudio, Music } from "lucide-react";

type MusicFormErrors = Partial<Record<keyof MusicFormValues, string>>;

interface MusicFormModalProps {
  readonly open: boolean;
  readonly values: MusicFormValues;
  readonly errors: MusicFormErrors;
  readonly tags: Tag[];
  readonly generosMusicais: GeneroMusical[];
  readonly novaTag: string;
  readonly novoGeneroMusical: string;
  readonly isSubmitting: boolean;
  readonly onClose: () => void;
  readonly onSalvar: () => void;
  readonly onNomeChange: (value: string) => void;
  readonly onLetraChange: (value: string) => void;
  readonly onTagChange: (value: string) => void;
  readonly onGeneroMusicalChange: (value: string) => void;
  readonly onArquivoChange: (files: FileList | null) => void;
  readonly onNovaTagChange: (value: string) => void;
  readonly onNovoGeneroMusicalChange: (value: string) => void;
  readonly onCriarTag: () => void;
  readonly onCriarGeneroMusical: () => void;
}

export default function MusicFormModal({
  open,
  values,
  errors,
  tags,
  generosMusicais,
  novaTag,
  novoGeneroMusical,
  isSubmitting,
  onClose,
  onSalvar,
  onNomeChange,
  onLetraChange,
  onTagChange,
  onGeneroMusicalChange,
  onArquivoChange,
  onNovaTagChange,
  onNovoGeneroMusicalChange,
  onCriarTag,
  onCriarGeneroMusical,
}: Readonly<MusicFormModalProps>) {
  return (
    <FyModal open={open} onClose={onClose}>
      <form
        className="flex max-h-[85vh] flex-col gap-6 overflow-y-auto"
        onSubmit={(event) => {
          event.preventDefault();
          onSalvar();
        }}
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-white">Adicionar música</h2>
          <span className="text-sm text-zinc-400">
            Informe os dados da música e envie o arquivo de áudio.
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <FyInput
            id="music-name"
            name="music-name"
            label="Nome da música"
            placeholder="Nome da música"
            icon={<Music aria-hidden="true" />}
            value={values.nome}
            error={errors.nome}
            onChange={onNomeChange}
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="music-lyrics" className="font-semibold text-white">
              Letra
            </label>
            <textarea
              id="music-lyrics"
              name="music-lyrics"
              value={values.letra}
              placeholder="Letra da música"
              className="min-h-24 rounded-md border border-gray-600 bg-mauve-900 px-3 py-2 text-white placeholder:text-gray-500"
              onChange={(event) => onLetraChange(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="music-tags" className="font-semibold text-white">
              Tags
            </label>
            <select
              id="music-tags"
              name="music-tags"
              value={values.tagIds[0] ?? ""}
              className="rounded-md border border-gray-600 bg-mauve-900 px-3 py-2 text-white"
              onChange={(event) => onTagChange(event.target.value)}
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
              id="new-tag"
              name="new-tag"
              label="Nova tag"
              placeholder="Nova tag"
              value={novaTag}
              onChange={onNovaTagChange}
            />
            <div className="flex items-end">
              <FyButton type="outline" onClick={onCriarTag}>
                Criar tag
              </FyButton>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="music-genres" className="font-semibold text-white">
              Gêneros musicais
            </label>
            <select
              id="music-genres"
              name="music-genres"
              value={values.generoMusicalIds[0] ?? ""}
              className="rounded-md border border-gray-600 bg-mauve-900 px-3 py-2 text-white"
              onChange={(event) => onGeneroMusicalChange(event.target.value)}
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
              id="new-genre"
              name="new-genre"
              label="Novo gênero musical"
              placeholder="Novo gênero musical"
              value={novoGeneroMusical}
              onChange={onNovoGeneroMusicalChange}
            />
            <div className="flex items-end">
              <FyButton type="outline" onClick={onCriarGeneroMusical}>
                Criar gênero musical
              </FyButton>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="music-file" className="font-semibold text-white">
              Arquivo da música
            </label>
            {errors.arquivo ? (
              <span className="text-sm italic text-red-500">
                {errors.arquivo}
              </span>
            ) : null}
            <div className="relative flex items-center gap-3 rounded-md border border-gray-600 bg-mauve-900 px-3 py-2 text-white">
              <FileAudio aria-hidden="true" className="text-gray-400" />
              <input
                id="music-file"
                name="music-file"
                type="file"
                accept="audio/*"
                className="w-full text-sm"
                onChange={(event) => onArquivoChange(event.target.files)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <FyButton type="outline" onClick={onClose}>
            Cancelar
          </FyButton>
          <FyButton onClick={onSalvar} disabled={isSubmitting}>
            Salvar música
          </FyButton>
        </div>
      </form>
    </FyModal>
  );
}
