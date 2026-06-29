"use client";

import { MediaCard } from "@/src/shared/components/fy-mediacard/MediaCard";
import { extrairArtista } from "@/src/shared/design-system/RenderMusica/RenderMusica";
import DeletarMusicaModal from "@/src/features/musicas/components/DeletarMusicaModal/DeletarMusicaModal";
import EditarMusicaModal from "@/src/features/musicas/components/EditarMusicaModal/EditarMusicaModal";
import useMusicsList from "./useMusicsList";

export default function MusicsList() {
  const {
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
  } = useMusicsList();

  if (isLoading) {
    return (
      <section
        aria-label="Lista de músicas"
        className="rounded-md border border-zinc-800 bg-zinc-950/60"
      >
        <div className="flex h-48 items-center justify-center text-zinc-400">
          Carregando...
        </div>
      </section>
    );
  }

  if (musicas.length === 0) {
    return (
      <section
        aria-label="Lista de músicas"
        className="rounded-md border border-zinc-800 bg-zinc-950/60"
      >
        <div className="flex min-h-48 flex-col items-center justify-center gap-2 px-4 py-10 text-center">
          <h2 className="text-lg font-semibold text-white">
            Nenhuma música cadastrada
          </h2>
          <p className="max-w-md text-sm leading-6 text-zinc-400">
            As músicas adicionadas pelo artista serão exibidas nesta lista.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label="Lista de músicas"
      className="rounded-md border border-zinc-800 bg-zinc-950/60"
    >
      <div className="flex flex-col gap-1 p-2">
        {musicas.map((musica) => (
          <MediaCard
            key={musica.id}
            imagemURL={""}
            rodarMusica={() => handlePlay(musica)}
            nomeMusica={musica.nome}
            nomeArtista={extrairArtista(musica)}
            onEditar={() => handleEditarClick(musica)}
            onDeletar={() => handleDeletarClick(musica)}
          />
        ))}
      </div>

      {musicaParaDeletar && (
        <DeletarMusicaModal
          open={!!musicaParaDeletar}
          nomeMusica={musicaParaDeletar.nome}
          onClose={handleDeletarCancelar}
          onConfirmar={handleDeletarConfirmar}
        />
      )}

      {musicaParaEditar && (
        <EditarMusicaModal
          open={!!musicaParaEditar}
          musica={musicaParaEditar}
          onClose={handleEditarCancelar}
          onSalvar={() => {
            handleEditarSalvar();
          }}
        />
      )}
    </section>
  );
}
