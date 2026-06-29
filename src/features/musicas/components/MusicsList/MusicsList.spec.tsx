import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, renderHook, waitFor } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import MusicsList from "./MusicsList";
import useMusicsList from "./useMusicsList";
import { usuarioService } from "@/src/features/usuario/services/usuario.service";
import { useMusicaAtualContext } from "@/src/shared/providers/MusicaAtual.Provider";
import type { MusicaBackend } from "@/src/shared/types/musica.types";

vi.mock("@/src/features/usuario/services/usuario.service", () => ({
  usuarioService: {
    buscarUsuarioLogado: vi.fn(),
  },
}));

vi.mock("@/src/shared/providers/MusicaAtual.Provider", () => ({
  useMusicaAtualContext: vi.fn(),
}));

const usuarioServiceMock = vi.mocked(usuarioService);
const useMusicaAtualContextMock = vi.mocked(useMusicaAtualContext);
const setMusicaAtualMock = vi.fn();

const usuarioLogado = {
  id: "user-123",
  nome: "Artista",
  nomeUsuario: "artista",
  email: "artista@test.com",
  dataNascimento: "2000-01-01",
  fotoPerfil: null,
};

const mockMusicas: MusicaBackend[] = [
  {
    id: "musica-1",
    nome: "Musica Um",
    caminhoDoArquivo: "/path/1",
    letra: "",
    artistaId: "user-123",
    tags: [{ id: "t1", nome: "Artista" }],
    generosMusicais: [],
  },
  {
    id: "musica-2",
    nome: "Musica Dois",
    caminhoDoArquivo: "/path/2",
    letra: "",
    artistaId: "user-123",
    tags: [{ id: "t1", nome: "Artista" }],
    generosMusicais: [],
  },
];

beforeEach(() => {
  useMusicaAtualContextMock.mockReturnValue({
    musicaAtual: null,
    setMusicaAtual: setMusicaAtualMock,
    filaMusicas: [],
    indiceMusicaAtual: -1,
    selecionarMusica: vi.fn(),
    tocarProxima: vi.fn(),
    tocarAnterior: vi.fn(),
  });
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("useMusicsList", () => {
  it("inicia com loading true e musicas vazio", () => {
    usuarioServiceMock.buscarUsuarioLogado.mockReturnValue(
      new Promise(() => {}),
    );

    const { result } = renderHook(() => useMusicsList());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.musicas).toEqual([]);
  });

  it("carrega musicas do artista logado", async () => {
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockMusicas),
      } as Response);

    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    const { result } = renderHook(() => useMusicsList());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(fetchMock).toHaveBeenCalledWith("/api/musicas/artista/user-123");
    expect(result.current.musicas).toEqual(mockMusicas);

    fetchMock.mockRestore();
  });

  it("handlePlay chama setMusicaAtual com dados corretos", async () => {
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockMusicas),
      } as Response);

    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    const { result } = renderHook(() => useMusicsList());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    result.current.handlePlay(mockMusicas[0]);

    expect(setMusicaAtualMock).toHaveBeenCalledWith({
      id: "musica-1",
      nomeMusica: "Musica Um",
      nomeArtista: "Artista",
      imagemURL: expect.any(String),
      caminhoDoArquivo: "/path/1",
    });

    fetchMock.mockRestore();
  });

  it("handleDeletarClick define musicaParaDeletar", async () => {
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockMusicas),
      } as Response);

    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    const { result } = renderHook(() => useMusicsList());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    result.current.handleDeletarClick(mockMusicas[0]);

    await waitFor(() => {
      expect(result.current.musicaParaDeletar).toEqual(mockMusicas[0]);
    });

    fetchMock.mockRestore();
  });

  it("handleDeletarCancelar limpa musicaParaDeletar", async () => {
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockMusicas),
      } as Response);

    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    const { result } = renderHook(() => useMusicsList());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    result.current.handleDeletarClick(mockMusicas[0]);

    await waitFor(() => {
      expect(result.current.musicaParaDeletar).toEqual(mockMusicas[0]);
    });

    result.current.handleDeletarCancelar();

    await waitFor(() => {
      expect(result.current.musicaParaDeletar).toBeNull();
    });

    fetchMock.mockRestore();
  });

  it("handleDeletarConfirmar remove musica da lista", async () => {
    const deleteFetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockMusicas),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ mensagem: "Deletado", deletado: true, deletadoEm: new Date() }),
      } as Response);

    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    const { result } = renderHook(() => useMusicsList());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    result.current.handleDeletarClick(mockMusicas[0]);

    await waitFor(() => {
      expect(result.current.musicaParaDeletar).toEqual(mockMusicas[0]);
    });

    await result.current.handleDeletarConfirmar();

    await waitFor(() => {
      expect(result.current.musicas).toHaveLength(1);
      expect(result.current.musicas[0].id).toBe("musica-2");
      expect(result.current.musicaParaDeletar).toBeNull();
    });

    expect(deleteFetchMock).toHaveBeenCalledWith("/api/musicas/musica-1", {
      method: "DELETE",
    });

    deleteFetchMock.mockRestore();
  });
});

describe("MusicsList", () => {
  it("renderiza loading enquanto carrega", () => {
    usuarioServiceMock.buscarUsuarioLogado.mockReturnValue(
      new Promise(() => {}),
    );

    render(<MusicsList />);

    expect(screen.getByText("Carregando...")).toBeDefined();
  });

  it("renderiza lista vazia quando sem musicas", async () => {
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValue({
        ok: true,
        json: () => Promise.resolve([]),
      } as Response);

    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    render(<MusicsList />);

    await waitFor(() => {
      expect(screen.getByText("Nenhuma música cadastrada")).toBeDefined();
    });

    fetchMock.mockRestore();
  });

  it("renderiza lista de musicas", async () => {
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockMusicas),
      } as Response);

    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    render(<MusicsList />);

    await waitFor(() => {
      expect(screen.getByText("Musica Um")).toBeDefined();
      expect(screen.getByText("Musica Dois")).toBeDefined();
    });

    fetchMock.mockRestore();
  });

  it("chama handlePlay ao clicar em uma musica", async () => {
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockMusicas),
      } as Response);

    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    render(<MusicsList />);

    await waitFor(() => {
      expect(screen.getByText("Musica Um")).toBeDefined();
    });

    await userEvent.click(screen.getByText("Musica Um"));

    expect(setMusicaAtualMock).toHaveBeenCalledWith({
      id: "musica-1",
      nomeMusica: "Musica Um",
      nomeArtista: "Artista",
      imagemURL: expect.any(String),
      caminhoDoArquivo: "/path/1",
    });

    fetchMock.mockRestore();
  });

  it("abre modal de confirmacao ao clicar em deletar", async () => {
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockMusicas),
      } as Response);

    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    render(<MusicsList />);

    await waitFor(() => {
      expect(screen.getByText("Musica Um")).toBeDefined();
    });

    const deleteButton = screen.getByRole("button", { name: /deletar música Musica Um/i });
    await userEvent.click(deleteButton);

    expect(
      screen.getByText(/Tem certeza de que deseja deletar/),
    ).toBeDefined();
    expect(screen.getByText("Confirmar Deleção")).toBeDefined();
    expect(screen.getByText("Cancelar")).toBeDefined();

    fetchMock.mockRestore();
  });

  it("fecha modal ao clicar em cancelar", async () => {
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockMusicas),
      } as Response);

    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    render(<MusicsList />);

    await waitFor(() => {
      expect(screen.getByText("Musica Um")).toBeDefined();
    });

    const deleteButton = screen.getByRole("button", { name: /deletar música Musica Um/i });
    await userEvent.click(deleteButton);

    expect(
      screen.getByText(/Tem certeza de que deseja deletar/),
    ).toBeDefined();

    await userEvent.click(screen.getByText("Cancelar"));

    await waitFor(() => {
      expect(
        screen.queryByText(/Tem certeza de que deseja deletar/),
      ).toBeNull();
    });

    fetchMock.mockRestore();
  });

  it("deleta musica ao confirmar", async () => {
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockMusicas),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            mensagem: "Deletado",
            deletado: true,
            deletadoEm: new Date(),
          }),
      } as Response);

    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    render(<MusicsList />);

    await waitFor(() => {
      expect(screen.getByText("Musica Um")).toBeDefined();
    });

    const deleteButton = screen.getByRole("button", { name: /deletar música Musica Um/i });
    await userEvent.click(deleteButton);

    await userEvent.click(screen.getByText("Confirmar Deleção"));

    await waitFor(() => {
      expect(screen.queryByText("Musica Um")).toBeNull();
    });

    expect(screen.getByText("Musica Dois")).toBeDefined();

    fetchMock.mockRestore();
  });
});
