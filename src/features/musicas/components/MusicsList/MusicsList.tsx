export default function MusicsList() {
  return (
    <section
      aria-label="Lista de músicas"
      className="rounded-md border border-zinc-800 bg-zinc-950/60"
    >
      <div className="grid grid-cols-1 gap-4 border-b border-zinc-800 px-4 py-3 text-sm font-semibold text-zinc-400 md:grid-cols-[minmax(0,1fr)_10rem_6rem]">
        <span>Título</span>
        <span className="hidden md:block">Status</span>
        <span className="hidden text-right md:block">Duração</span>
      </div>

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
