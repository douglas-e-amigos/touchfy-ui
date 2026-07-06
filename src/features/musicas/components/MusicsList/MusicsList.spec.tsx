import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, renderHook, waitFor } from "@testing-library/react";
import { useMusicaSearchContext } from "@/src/shared/contexts/MusicaSearch.context";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

import MusicsList from "./MusicsList";
import useMusicsList from "./useMusicsList";
import { usuarioService } from "@/src/features/usuario/services/usuario.service";
import { useMusicaAtualContext } from "@/src/shared/providers/MusicaAtual.Provider";
import { musicaService } from "@/src/shared/services/musica.service";
import type { MusicaBackend } from "@/src/shared/types/musica.types";

vi.mock("@/src/features/usuario/services/usuario.service", () => ({
  usuarioService: {
    buscarUsuarioLogado: vi.fn(),
  },
}));

vi.mock("@/src/shared/services/musica.service", () => ({
  musicaService: {
    buscarTags: vi.fn(),
    buscarGenerosMusicais: vi.fn(),
    criarTag: vi.fn(),
    criarGeneroMusical: vi.fn(),
    buscarPorArtista: vi.fn(),
    deletar: vi.fn(),
  },
}));

vi.mock("@/src/shared/providers/MusicaAtual.Provider", () => ({
  useMusicaAtualContext: vi.fn(),
}));

vi.mock("@/src/shared/contexts/MusicaSearch.context", () => ({
  useMusicaSearchContext: vi.fn(),
}));

const usuarioServiceMock = vi.mocked(usuarioService);
const musicaServiceMock = vi.mocked(musicaService);
const useMusicaAtualContextMock = vi.mocked(useMusicaAtualContext);
const setMusicaAtualMock = vi.fn();
const useMusicaSearchContextMock = vi.mocked(useMusicaSearchContext);

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
  musicaServiceMock.buscarPorArtista.mockResolvedValue(mockMusicas);
  musicaServiceMock.deletar.mockResolvedValue({
    mensagem: "Deletado",
    deletado: true,
    deletadoEm: new Date("2026-01-01"),
  });
  useMusicaAtualContextMock.mockReturnValue({
    musicaAtual: null,
    setMusicaAtual: setMusicaAtualMock,
    filaMusicas: [],
    indiceMusicaAtual: -1,
    selecionarMusica: vi.fn(),
    tocarProxima: vi.fn(),
    tocarAnterior: vi.fn(),
  });
  useMusicaSearchContextMock.mockReturnValue({
    termoBusca: "",
    setTermoBusca: vi.fn(),
  });
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

function criarQueryWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
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

function renderUseMusicsList() {
  return renderHook(() => useMusicsList(), {
    wrapper: criarQueryWrapper(),
  });
}

function renderMusicsList() {
  return render(<MusicsList />, {
    wrapper: criarQueryWrapper(),
  });
}

describe("useMusicsList", () => {
  it("inicia com loading true e musicas vazio", () => {
    usuarioServiceMock.buscarUsuarioLogado.mockReturnValue(
      new Promise(() => {}),
    );

    const { result } = renderUseMusicsList();

    expect(result.current.isLoading).toBe(true);
    expect(result.current.musicas).toEqual([]);
  });

  it("carrega musicas do artista logado", async () => {
    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    const { result } = renderUseMusicsList();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(musicaServiceMock.buscarPorArtista).toHaveBeenCalledWith("user-123");
    expect(result.current.musicas).toEqual(mockMusicas);
  });

  it("handlePlay chama setMusicaAtual com dados corretos", async () => {
    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    const { result } = renderUseMusicsList();

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
  });

  it("handleDeletarClick define musicaParaDeletar", async () => {
    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    const { result } = renderUseMusicsList();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    result.current.handleDeletarClick(mockMusicas[0]);

    await waitFor(() => {
      expect(result.current.musicaParaDeletar).toEqual(mockMusicas[0]);
    });
  });

  it("handleDeletarCancelar limpa musicaParaDeletar", async () => {
    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    const { result } = renderUseMusicsList();

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
  });

  it("handleDeletarConfirmar remove musica da lista", async () => {
    musicaServiceMock.buscarPorArtista
      .mockResolvedValueOnce(mockMusicas)
      .mockResolvedValueOnce([mockMusicas[1]]);
    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    const { result } = renderUseMusicsList();

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

    expect(musicaServiceMock.deletar).toHaveBeenCalledWith("musica-1");
  });

  it("handleEditarClick define musicaParaEditar", async () => {
    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    const { result } = renderUseMusicsList();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    result.current.handleEditarClick(mockMusicas[0]);

    await waitFor(() => {
      expect(result.current.musicaParaEditar).toEqual(mockMusicas[0]);
    });
  });

  it("handleEditarCancelar limpa musicaParaEditar", async () => {
    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    const { result } = renderUseMusicsList();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    result.current.handleEditarClick(mockMusicas[0]);

    await waitFor(() => {
      expect(result.current.musicaParaEditar).toEqual(mockMusicas[0]);
    });

    result.current.handleEditarCancelar();

    await waitFor(() => {
      expect(result.current.musicaParaEditar).toBeNull();
    });
  });

  it("handleEditarSalvar limpa musicaParaEditar", async () => {
    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    const { result } = renderUseMusicsList();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    result.current.handleEditarClick(mockMusicas[0]);

    await waitFor(() => {
      expect(result.current.musicaParaEditar).toEqual(mockMusicas[0]);
    });

    result.current.handleEditarSalvar();

    await waitFor(() => {
      expect(result.current.musicaParaEditar).toBeNull();
    });
  });

  it("inicia com termoBusca vazio", () => {
    usuarioServiceMock.buscarUsuarioLogado.mockReturnValue(
      new Promise(() => {}),
    );

    const { result } = renderUseMusicsList();

    expect(result.current.termoBusca).toBe("");
  });

  it("musicasFiltradas retorna todas sem termo de busca", async () => {
    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    const { result } = renderUseMusicsList();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.musicasFiltradas).toEqual(mockMusicas);
  });

  it("musicasFiltradas filtra por substring case-insensitive", async () => {
    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    const { result, rerender } = renderHook(() => useMusicsList(), {
      wrapper: criarQueryWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.musicasFiltradas).toEqual(mockMusicas);
    });

    useMusicaSearchContextMock.mockReturnValue({
      termoBusca: "um",
      setTermoBusca: vi.fn(),
    });

    rerender();

    await waitFor(() => {
      expect(result.current.musicasFiltradas).toHaveLength(1);
      expect(result.current.musicasFiltradas[0].id).toBe("musica-1");
    });

    useMusicaSearchContextMock.mockReturnValue({
      termoBusca: "MUSICA",
      setTermoBusca: vi.fn(),
    });

    rerender();

    await waitFor(() => {
      expect(result.current.musicasFiltradas).toHaveLength(2);
    });

    useMusicaSearchContextMock.mockReturnValue({
      termoBusca: "xyz",
      setTermoBusca: vi.fn(),
    });

    rerender();

    await waitFor(() => {
      expect(result.current.musicasFiltradas).toHaveLength(0);
    });
  });
});

describe("MusicsList", () => {
  it("renderiza loading enquanto carrega", () => {
    usuarioServiceMock.buscarUsuarioLogado.mockReturnValue(
      new Promise(() => {}),
    );

    renderMusicsList();

    expect(screen.getByText("Carregando...")).toBeDefined();
  });

  it("renderiza lista vazia quando sem musicas", async () => {
    musicaServiceMock.buscarPorArtista.mockResolvedValueOnce([]);
    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    renderMusicsList();

    await waitFor(() => {
      expect(screen.getByText("Nenhuma música cadastrada")).toBeDefined();
    });
  });

  it("renderiza lista de musicas", async () => {
    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    renderMusicsList();

    await waitFor(() => {
      expect(screen.getByText("Musica Um")).toBeDefined();
      expect(screen.getByText("Musica Dois")).toBeDefined();
    });
  });

  it("chama handlePlay ao clicar em uma musica", async () => {
    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    renderMusicsList();

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
  });

  it("abre modal de confirmacao ao clicar em deletar", async () => {
    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    renderMusicsList();

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
  });

  it("fecha modal ao clicar em cancelar", async () => {
    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    renderMusicsList();

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
  });

  it("deleta musica ao confirmar", async () => {
    musicaServiceMock.buscarPorArtista
      .mockResolvedValueOnce(mockMusicas)
      .mockResolvedValueOnce([mockMusicas[1]]);
    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    renderMusicsList();

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
    expect(musicaServiceMock.deletar).toHaveBeenCalledWith("musica-1");
  });

  it("abre modal de edicao ao clicar em editar", async () => {
    musicaServiceMock.buscarTags.mockResolvedValue([]);
    musicaServiceMock.buscarGenerosMusicais.mockResolvedValue([]);

    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    renderMusicsList();

    await waitFor(() => {
      expect(screen.getByText("Musica Um")).toBeDefined();
    });

    const editButton = screen.getByRole("button", { name: /editar música Musica Um/i });
    await userEvent.click(editButton);

    await waitFor(() => {
      expect(screen.getByText("Editar música")).toBeDefined();
    });

    expect(screen.getByDisplayValue("Musica Um")).toBeDefined();
  });

  it("fecha modal de edicao ao clicar em cancelar", async () => {
    musicaServiceMock.buscarTags.mockResolvedValue([]);
    musicaServiceMock.buscarGenerosMusicais.mockResolvedValue([]);

    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    renderMusicsList();

    await waitFor(() => {
      expect(screen.getByText("Musica Um")).toBeDefined();
    });

    const editButton = screen.getByRole("button", { name: /editar música Musica Um/i });
    await userEvent.click(editButton);

    await waitFor(() => {
      expect(screen.getByText("Editar música")).toBeDefined();
    });

    await userEvent.click(screen.getByText("Cancelar"));

    await waitFor(() => {
      expect(screen.queryByText("Editar música")).toBeNull();
    });
  });


  it("mostra mensagem quando busca nao encontra resultados", async () => {
    usuarioServiceMock.buscarUsuarioLogado.mockResolvedValue(usuarioLogado);

    useMusicaSearchContextMock.mockReturnValue({
      termoBusca: "xyz",
      setTermoBusca: vi.fn(),
    });

    renderMusicsList();

    await waitFor(() => {
      expect(
        screen.getByText("Nenhuma música encontrada para a busca"),
      ).toBeDefined();
    });

    expect(screen.queryByText("Musica Um")).toBeNull();
    expect(screen.queryByText("Musica Dois")).toBeNull();
  });
});
