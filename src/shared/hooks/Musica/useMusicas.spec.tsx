import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import useMusicas from "./useMusicas";
import { musicaService } from "@/src/shared/services/musica.service";
import type { MusicaBackend } from "@/src/shared/types/musica.types";

vi.mock("@/src/shared/services/musica.service", () => ({
  musicaService: {
    buscarTodas: vi.fn(),
  },
}));

const mockMusicas: MusicaBackend[] = [
  {
    id: "1",
    nome: "Musica 1",
    caminhoDoArquivo: "/path/1",
    letra: "",
    artistaId: "00000000-0000-0000-0000-000000000000",
    tags: [{ id: "t1", nome: "Artista 1" }],
    generosMusicais: [],
  },
  {
    id: "2",
    nome: "Musica 2",
    caminhoDoArquivo: "/path/2",
    letra: "",
    artistaId: "00000000-0000-0000-0000-000000000000",
    tags: [],
    generosMusicais: [],
  },
  {
    id: "3",
    nome: "Musica 3",
    caminhoDoArquivo: "/path/3",
    letra: "",
    artistaId: "00000000-0000-0000-0000-000000000000",
    tags: [{ id: "t2", nome: "Artista 2" }],
    generosMusicais: [],
  },
];

function criarQueryWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return function QueryWrapper({ children }: { readonly children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe("useMusicas", () => {
  it("retorna músicas aleatórias após carregar", async () => {
    vi.mocked(musicaService.buscarTodas).mockResolvedValue(mockMusicas);

    const { result } = renderHook(() => useMusicas(), {
      wrapper: criarQueryWrapper(),
    });

    expect(musicaService.buscarTodas).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(result.current.musicasAleatorias).toHaveLength(3);
    });

    for (const musica of result.current.musicasAleatorias) {
      expect(mockMusicas).toContainEqual(musica);
    }
  });
});
