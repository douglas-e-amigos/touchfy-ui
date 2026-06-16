"use client";

import { Home, Search, Library, Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import FyButton from "../../components/fy-button/FyButton";
import FyButtonIcon from "../../components/fy-iconbutton/FyButtonIcon";

const navigationLinks = [
  { name: "Início", icon: Home, href: "/dashboard" },
  { name: "Buscar", icon: Search },
  { name: "Biblioteca", icon: Library, href: "/biblioteca" },
];

const playlistLinks = [
  { name: "Músicas Curtidas" },
  { name: "Workout Vibes", href: "/playlists/workout-vibes" },
  { name: "Chill Nights", href: "/playlists/chill-nights" },
];

export function NavLinks() {
  const router = useRouter();
  const pathname = usePathname();

  function navigateTo(href?: string) {
    if (href) {
      router.push(href);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Navegação principal */}
      <div className="flex flex-col gap-2">
        {navigationLinks.map((link) => {
          const Icon = link.icon;

          return (
            <FyButton
              key={link.name}
              type="ghost"
              className={`w-full flex items-center gap-4 justify-start ${
                link.href === pathname ? "text-white" : ""
              }`}
              onClick={() => navigateTo(link.href)}
            >
              <Icon size={22} />
              <span>{link.name}</span>
            </FyButton>
          );
        })}
      </div>

      {/* Seção playlists */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
            Playlists
          </h2>

          <FyButtonIcon variant="ghost" icon={<Plus size={18} />} />
        </div>

        {/* Lista de playlists */}
        <div className="flex flex-col gap-2">
          {playlistLinks.map((playlist) => (
            <FyButton
              key={playlist.name}
              type="ghost"
              className={`w-full flex items-center gap-4 justify-start font-light text-sm ${
                playlist.href === pathname ? "text-white" : ""
              }`}
              onClick={() => navigateTo(playlist.href)}
            >
              {playlist.name}
            </FyButton>
          ))}
        </div>
      </div>
    </div>
  );
}
