export type SidebarPlaylistMock = {
  name: string;
  href?: string;
};

export const sidebarPlaylistLinks: SidebarPlaylistMock[] = [
  { name: "Músicas Curtidas" },
  { name: "Workout Vibes", href: "/playlists/workout-vibes" },
  { name: "Chill Nights", href: "/playlists/chill-nights" },
];
