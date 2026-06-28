"use client";

import MusicAdd from "./components/MusicAdd/MusicAdd";
import MusicFormModal from "./components/MusicFormModal/MusicFormModal";
import MusicsHeader from "./components/MusicsHeader/MusicsHeader";
import MusicsList from "./components/MusicsList/MusicsList";
import MusicsSearch from "./components/MusicsSearch/MusicsSearch";
import { useMusicForm } from "./hooks/useMusicForm";

export default function Music() {
  const musicForm = useMusicForm();

  return (
    <main
      aria-label="Página de músicas"
      className="min-h-screen overflow-x-hidden bg-[#08070b] px-4 py-8 pb-32 text-white md:px-8"
    >
      <div className="flex max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <MusicsHeader />
          <MusicAdd onClick={musicForm.abrirModal} />
        </div>

        <MusicsSearch />
        <MusicsList />
      </div>

      <MusicFormModal
        open={musicForm.isModalOpen}
        values={musicForm.values}
        errors={musicForm.errors}
        tags={musicForm.tags}
        generosMusicais={musicForm.generosMusicais}
        novaTag={musicForm.novaTag}
        novoGeneroMusical={musicForm.novoGeneroMusical}
        isSubmitting={musicForm.isSubmitting}
        onClose={musicForm.fecharModal}
        onSalvar={musicForm.salvarMusica}
        onNomeChange={musicForm.handleNomeChange}
        onLetraChange={musicForm.handleLetraChange}
        onTagChange={musicForm.handleTagChange}
        onGeneroMusicalChange={musicForm.handleGeneroMusicalChange}
        onArquivoChange={musicForm.handleArquivoChange}
        onNovaTagChange={musicForm.setNovaTag}
        onNovoGeneroMusicalChange={musicForm.setNovoGeneroMusical}
        onCriarTag={musicForm.criarTag}
        onCriarGeneroMusical={musicForm.criarGeneroMusical}
      />
    </main>
  );
}
