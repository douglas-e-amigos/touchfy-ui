export const musicaKeys = {
  all: ["musicas"] as const,
  lists: () => [...musicaKeys.all, "list"] as const,
  list: () => [...musicaKeys.lists(), "all"] as const,
  artist: (artistaId: string) =>
    [...musicaKeys.lists(), "artist", artistaId] as const,
  search: (nome: string) => [...musicaKeys.all, "search", nome] as const,
};
