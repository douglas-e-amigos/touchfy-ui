"use client";

import { Search } from "lucide-react";
import useMusicsSearch from "./useMusicsSearch";

export default function MusicsSearch() {
  const { termoBusca, setTermoBusca } = useMusicsSearch();

  return (
    <div className="relative">
      <Search
        aria-hidden="true"
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
      />
      <input
        id="search-music"
        name="search-music"
        type="search"
        aria-label="Buscar música"
        placeholder="Buscar música"
        value={termoBusca}
        onChange={(e) => setTermoBusca(e.target.value)}
        className="w-full rounded-md border border-zinc-700 bg-zinc-900 py-2 pl-10 pr-3 text-sm text-white placeholder:text-zinc-500 focus:border-zinc-500 focus:outline-none"
      />
    </div>
  );
}
