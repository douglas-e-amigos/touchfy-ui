import MusicAdd from "./components/MusicAdd/MusicAdd";
import MusicsHeader from "./components/MusicsHeader/MusicsHeader";
import MusicsList from "./components/MusicsList/MusicsList";
import MusicsSearch from "./components/MusicsSearch/MusicsSearch";

export default function Music() {
  return (
    <main
      aria-label="Página de músicas"
      className="min-h-screen overflow-x-hidden bg-[#08070b] px-4 py-8 pb-32 text-white md:px-8"
    >
      <div className="flex max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <MusicsHeader />
          <MusicAdd />
        </div>

        <MusicsSearch />
        <MusicsList />
      </div>
    </main>
  );
}
