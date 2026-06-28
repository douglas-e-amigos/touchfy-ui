import { Search } from "lucide-react";

export default function MusicsSearch() {
  return (
    <section aria-label="Busca de músicas" className="w-full max-w-xl">
      <label htmlFor="musics-search" className="sr-only">
        Buscar música
      </label>

      <div className="relative">
        <Search
          aria-hidden="true"
          className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500"
        />
        <input
          id="musics-search"
          name="musics-search"
          type="search"
          placeholder="Buscar música"
          className="h-11 w-full rounded-md border border-zinc-800 bg-zinc-950 py-2 pl-10 pr-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-primary"
        />
      </div>
    </section>
  );
}
