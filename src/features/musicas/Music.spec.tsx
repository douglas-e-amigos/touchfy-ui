import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import Music from "./Music";
import { musicaService } from "@/src/shared/services/musica.service";

vi.mock("@/src/shared/services/musica.service", () => ({
  musicaService: {
    buscarTags: vi.fn(),
    buscarGenerosMusicais: vi.fn(),
    criarTag: vi.fn(),
    criarGeneroMusical: vi.fn(),
    criar: vi.fn(),
  },
}));

const musicaServiceMock = vi.mocked(musicaService);

const tags = [
  { id: "tag-1", nome: "Rock" },
  { id: "tag-2", nome: "Pop" },
];

const generosMusicais = [
  { id: "genero-1", nome: "MPB" },
  { id: "genero-2", nome: "Jazz" },
];

beforeEach(() => {
  musicaServiceMock.buscarTags.mockResolvedValue(tags);
  musicaServiceMock.buscarGenerosMusicais.mockResolvedValue(generosMusicais);
  musicaServiceMock.criar.mockResolvedValue({
    mensagem: "Música criada",
    criado: true,
    criadoEm: new Date("2026-01-01"),
  });
  musicaServiceMock.criarTag.mockResolvedValue({
    mensagem: "Tag criada",
    criado: true,
    criadoEm: new Date("2026-01-01"),
  });
  musicaServiceMock.criarGeneroMusical.mockResolvedValue({
    mensagem: "Gênero criado",
    criado: true,
    criadoEm: new Date("2026-01-01"),
  });
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Music", () => {
  it("renderiza a base da página de músicas", () => {
    render(<Music />);

    expect(
      screen.getByRole("main", { name: "Página de músicas" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Músicas" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Gerencie suas músicas publicadas na plataforma."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("searchbox", { name: "Buscar música" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Adicionar música" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Lista de músicas" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Nenhuma música cadastrada")).toBeInTheDocument();
  });

  it("abre o modal de cadastro ao clicar em adicionar música", async () => {
    const user = userEvent.setup();

    render(<Music />);

    await user.click(screen.getByRole("button", { name: "Adicionar música" }));

    expect(
      await screen.findByRole("heading", {
        level: 2,
        name: "Adicionar música",
      }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Nome da música")).toBeInTheDocument();
    expect(screen.getByLabelText("Letra")).toBeInTheDocument();
    expect(screen.getByLabelText("Arquivo da música")).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Tags" })).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: "Gêneros musicais" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Rock" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "MPB" })).toBeInTheDocument();
  });

  it("cria tags e gêneros sem sair do modal", async () => {
    const user = userEvent.setup();
    musicaServiceMock.buscarTags
      .mockResolvedValueOnce(tags)
      .mockResolvedValueOnce([...tags, { id: "tag-3", nome: "Indie" }]);
    musicaServiceMock.buscarGenerosMusicais
      .mockResolvedValueOnce(generosMusicais)
      .mockResolvedValueOnce([
        ...generosMusicais,
        { id: "genero-3", nome: "Samba" },
      ]);

    render(<Music />);

    await user.click(screen.getByRole("button", { name: "Adicionar música" }));
    await user.type(await screen.findByLabelText("Nova tag"), "Indie");
    await user.click(screen.getByRole("button", { name: "Criar tag" }));
    await user.type(screen.getByLabelText("Novo gênero musical"), "Samba");
    await user.click(
      screen.getByRole("button", { name: "Criar gênero musical" }),
    );

    expect(musicaServiceMock.criarTag).toHaveBeenCalledWith("Indie");
    expect(musicaServiceMock.criarGeneroMusical).toHaveBeenCalledWith("Samba");
    expect(await screen.findByRole("option", { name: "Indie" })).toBeInTheDocument();
    expect(await screen.findByRole("option", { name: "Samba" })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Tags" })).toHaveValue("tag-3");
    expect(screen.getByRole("combobox", { name: "Gêneros musicais" })).toHaveValue(
      "genero-3",
    );
  });

  it("envia a música com letra opcional", async () => {
    const user = userEvent.setup();
    const arquivo = new File(["audio"], "musica.mp3", { type: "audio/mpeg" });

    render(<Music />);

    await user.click(screen.getByRole("button", { name: "Adicionar música" }));
    await user.type(await screen.findByLabelText("Nome da música"), "Nova faixa");
    await user.selectOptions(screen.getByRole("combobox", { name: "Tags" }), "tag-1");
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Gêneros musicais" }),
      "genero-1",
    );
    await user.upload(screen.getByLabelText("Arquivo da música"), arquivo);
    await user.click(screen.getByRole("button", { name: "Salvar música" }));

    expect(musicaServiceMock.criar).toHaveBeenCalledWith({
      nome: "Nova faixa",
      letra: "",
      tagIds: ["tag-1"],
      generoMusicalIds: ["genero-1"],
      arquivo,
    });
  });

  it("valida nome e arquivo obrigatórios", async () => {
    const user = userEvent.setup();

    render(<Music />);

    await user.click(screen.getByRole("button", { name: "Adicionar música" }));
    await user.click(await screen.findByRole("button", { name: "Salvar música" }));

    expect(screen.getByText("Nome obrigatório")).toBeInTheDocument();
    expect(screen.getByText("Arquivo obrigatório")).toBeInTheDocument();
    expect(musicaServiceMock.criar).not.toHaveBeenCalled();
  });
});
