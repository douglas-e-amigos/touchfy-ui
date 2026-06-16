import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Sidebar from "./Sidebar";

const routerMock = vi.hoisted(() => ({
  push: vi.fn(),
}));

const sidebarMock = vi.hoisted(() => ({
  useSiderbar: vi.fn(),
  handleSidebarToggle: vi.fn(),
  handleSidebarClose: vi.fn(),
  setIsUserMenuOpen: vi.fn(),
}));

const perfilMock = vi.hoisted(() => ({
  usePerfil: vi.fn(),
  abrirPerfil: vi.fn(),
}));

const logoutMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  useRouter: () => routerMock,
}));

vi.mock("../../hooks/Sidebar/useSidebar", () => ({
  useSiderbar: sidebarMock.useSiderbar,
}));

vi.mock("../../hooks/Perfil/usePerfil", () => ({
  usePerfil: perfilMock.usePerfil,
}));

vi.mock("@/src/features/usuario/services/auth.service", () => ({
  authService: {
    logout: logoutMock,
  },
}));

beforeEach(() => {
  sidebarMock.useSiderbar.mockReturnValue({
    handleSidebarToggle: sidebarMock.handleSidebarToggle,
    handleSidebarClose: sidebarMock.handleSidebarClose,
    setIsUserMenuOpen: sidebarMock.setIsUserMenuOpen,
    isUserMenuOpen: false,
    isSidebarOpen: false,
  });

  perfilMock.usePerfil.mockReturnValue({
    abrirPerfil: perfilMock.abrirPerfil,
    isLoadingUsuario: false,
    usuario: {
      id: "usuario-1",
      nome: "Maria Silva",
      email: "maria@email.com",
    },
  });
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Design-System: Sidebar", () => {
  it("renderiza a marca, navegação, playlists e usuário", () => {
    render(<Sidebar />);

    expect(screen.getByRole("heading", { name: "Melody" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Início/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Buscar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Biblioteca/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Playlists/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Músicas Curtidas/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Workout Vibes/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Chill Nights/i })).toBeInTheDocument();
    expect(screen.getByText("Maria Silva")).toBeInTheDocument();
    expect(screen.getByText("maria@email.com")).toBeInTheDocument();
  });

  it("chama os hooks usados pela Sidebar", () => {
    render(<Sidebar />);

    expect(sidebarMock.useSiderbar).toHaveBeenCalledTimes(1);
    expect(perfilMock.usePerfil).toHaveBeenCalledWith({ router: routerMock });
  });

  it("chama a abertura do menu ao clicar no botão mobile", async () => {
    const user = userEvent.setup();
    render(<Sidebar />);

    await user.click(screen.getAllByRole("button")[0]);

    expect(sidebarMock.handleSidebarToggle).toHaveBeenCalledTimes(1);
  });

  it("fecha o menu ao clicar no overlay", async () => {
    const user = userEvent.setup();
    sidebarMock.useSiderbar.mockReturnValue({
      handleSidebarToggle: sidebarMock.handleSidebarToggle,
      handleSidebarClose: sidebarMock.handleSidebarClose,
      setIsUserMenuOpen: sidebarMock.setIsUserMenuOpen,
      isUserMenuOpen: false,
      isSidebarOpen: true,
    });

    render(<Sidebar />);

    await user.click(screen.getByRole("button", { name: /Fechar menu/i }));

    expect(sidebarMock.handleSidebarClose).toHaveBeenCalledTimes(1);
  });

  it("abre o menu da conta ao clicar no usuário", async () => {
    const user = userEvent.setup();
    render(<Sidebar />);

    await user.click(screen.getByRole("button", { name: /Maria Silva/i }));

    expect(sidebarMock.setIsUserMenuOpen).toHaveBeenCalledWith(true);
  });

  it("renderiza as ações da conta e chama perfil ao clicar em Perfil", async () => {
    const user = userEvent.setup();
    sidebarMock.useSiderbar.mockReturnValue({
      handleSidebarToggle: sidebarMock.handleSidebarToggle,
      handleSidebarClose: sidebarMock.handleSidebarClose,
      setIsUserMenuOpen: sidebarMock.setIsUserMenuOpen,
      isUserMenuOpen: true,
      isSidebarOpen: false,
    });

    render(<Sidebar />);

    expect(screen.getByText("Minha Conta")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Perfil/i }));

    expect(perfilMock.abrirPerfil).toHaveBeenCalledTimes(1);
  });

  it("faz logout e envia o usuário para o login ao clicar em Sair", async () => {
    const user = userEvent.setup();
    sidebarMock.useSiderbar.mockReturnValue({
      handleSidebarToggle: sidebarMock.handleSidebarToggle,
      handleSidebarClose: sidebarMock.handleSidebarClose,
      setIsUserMenuOpen: sidebarMock.setIsUserMenuOpen,
      isUserMenuOpen: true,
      isSidebarOpen: false,
    });

    render(<Sidebar />);

    await user.click(screen.getByRole("button", { name: /Sair/i }));

    expect(logoutMock).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(routerMock.push).toHaveBeenCalledWith("/login");
    });
  });
});
