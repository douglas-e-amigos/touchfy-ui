import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, within } from "@testing-library/react";
import { screen } from "@testing-library/dom";

import Dashboard from "./page";

const { buscarUsuarioLogadoMock, fakerQueues, variantesMock } = vi.hoisted(
  () => ({
    buscarUsuarioLogadoMock: vi.fn(),
    fakerQueues: {
      avatars: [] as string[],
      songs: [] as string[],
      artists: [] as string[],
      years: [] as number[],
    },
    variantesMock: {
      CIRCULAR: "circular",
      QUADRADO_SM: "quadrado-sm",
      QUADRADO_MD: "quadrado-md",
    },
  }),
);

const dashboardData = {
  mediaCards: [
    { nomeMusica: "Musica media 1", nomeArtista: "Artista media 1" },
    { nomeMusica: "Musica media 2", nomeArtista: "Artista media 2" },
    { nomeMusica: "Musica media 3", nomeArtista: "Artista media 3" },
    { nomeMusica: "Musica media 4", nomeArtista: "Artista media 4" },
    { nomeMusica: "Musica media 5", nomeArtista: "Artista media 5" },
    { nomeMusica: "Musica media 6", nomeArtista: "Artista media 6" },
  ],
  artistasDestaques: [
    {
      nomeCard: "Artista destaque card 1",
      tituloCard: "Artista destaque titulo 1",
      descritor: "Artista destaque descritor 1",
    },
    {
      nomeCard: "Artista destaque card 2",
      tituloCard: "Artista destaque titulo 2",
      descritor: "Artista destaque descritor 2",
    },
    {
      nomeCard: "Artista destaque card 3",
      tituloCard: "Artista destaque titulo 3",
      descritor: "Artista destaque descritor 3",
    },
    {
      nomeCard: "Artista destaque card 4",
      tituloCard: "Artista destaque titulo 4",
      descritor: "Artista destaque descritor 4",
    },
    {
      nomeCard: "Artista destaque card 5",
      tituloCard: "Artista destaque titulo 5",
      descritor: "Artista destaque descritor 5",
    },
  ],
  recomendados: [
    {
      nomeCard: "Recomendado card 1",
      tituloCard: "Recomendado titulo 1",
      descritor: "Recomendado descritor 1",
    },
    {
      nomeCard: "Recomendado card 2",
      tituloCard: "Recomendado titulo 2",
      descritor: "Recomendado descritor 2",
    },
    {
      nomeCard: "Recomendado card 3",
      tituloCard: "Recomendado titulo 3",
      descritor: "Recomendado descritor 3",
    },
    {
      nomeCard: "Recomendado card 4",
      tituloCard: "Recomendado titulo 4",
      descritor: "Recomendado descritor 4",
    },
    {
      nomeCard: "Recomendado card 5",
      tituloCard: "Recomendado titulo 5",
      descritor: "Recomendado descritor 5",
    },
  ],
  playlistsDestaques: [
    {
      nomeCard: "Playlist destaque card 1",
      tituloCard: "Playlist destaque titulo 1",
      descritor: "Playlist destaque descritor 1",
    },
    {
      nomeCard: "Playlist destaque card 2",
      tituloCard: "Playlist destaque titulo 2",
      descritor: "Playlist destaque descritor 2",
    },
    {
      nomeCard: "Playlist destaque card 3",
      tituloCard: "Playlist destaque titulo 3",
      descritor: "Playlist destaque descritor 3",
    },
    {
      nomeCard: "Playlist destaque card 4",
      tituloCard: "Playlist destaque titulo 4",
      descritor: "Playlist destaque descritor 4",
    },
    {
      nomeCard: "Playlist destaque card 5",
      tituloCard: "Playlist destaque titulo 5",
      descritor: "Playlist destaque descritor 5",
    },
  ],
  novosLancamentos: [
    {
      nomeCard: "Lancamento card 1",
      tituloCard: "Lancamento titulo 1",
      descritor: "Lancamento descritor 1",
      ano: "2020",
    },
    {
      nomeCard: "Lancamento card 2",
      tituloCard: "Lancamento titulo 2",
      descritor: "Lancamento descritor 2",
      ano: "2021",
    },
    {
      nomeCard: "Lancamento card 3",
      tituloCard: "Lancamento titulo 3",
      descritor: "Lancamento descritor 3",
      ano: "2022",
    },
    {
      nomeCard: "Lancamento card 4",
      tituloCard: "Lancamento titulo 4",
      descritor: "Lancamento descritor 4",
      ano: "2023",
    },
    {
      nomeCard: "Lancamento card 5",
      tituloCard: "Lancamento titulo 5",
      descritor: "Lancamento descritor 5",
      ano: "2024",
    },
  ],
};

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={typeof href === "string" ? href : ""} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@faker-js/faker", () => ({
  faker: {
    image: {
      avatar: vi.fn(() => fakerQueues.avatars.shift() ?? "avatar.png"),
    },
    music: {
      songName: vi.fn(() => fakerQueues.songs.shift() ?? "musica"),
      artist: vi.fn(() => fakerQueues.artists.shift() ?? "artista"),
    },
    date: {
      between: vi.fn(() => new Date(fakerQueues.years.shift() ?? 2020, 0, 1)),
    },
  },
}));

vi.mock("../../../features/usuario/services/usuario.service", () => ({
  usuarioService: {
    buscarUsuarioLogado: buscarUsuarioLogadoMock,
  },
}));

vi.mock("../../../shared/components/fy-mediacard/MediaCard", () => ({
  default: ({ nomeMusica, nomeArtista }: any) => (
    <article data-testid="media-card">
      <span>{nomeMusica}</span>
      <span>{nomeArtista}</span>
    </article>
  ),
}));

vi.mock("../../../shared/components/fy-imagecard/ImageCard", () => ({
  Variantes: variantesMock,
  default: ({ nomeCard, tituloCard, descritor, ano }: any) => (
    <article data-testid="image-card">
      <span>{nomeCard}</span>
      <span>{tituloCard}</span>
      <span>{descritor}</span>
      {ano ? <span>{ano}</span> : null}
    </article>
  ),
}));

beforeEach(() => {
  buscarUsuarioLogadoMock.mockResolvedValue({
    id: "user-123",
    nome: "Anderson",
    nomeUsuario: "anderson",
    dataNascimento: "2000-01-01",
    fotoPerfil: null,
    email: "anderson@touchfy.com",
  });

  fakerQueues.avatars = Array.from({ length: 21 }, (_, index) => `avatar-${index + 1}.png`);
  fakerQueues.songs = [
    ...dashboardData.mediaCards.map((item) => item.nomeMusica),
    ...dashboardData.artistasDestaques.flatMap((item) => [
      item.nomeCard,
      item.tituloCard,
    ]),
    ...dashboardData.recomendados.flatMap((item) => [
      item.nomeCard,
      item.tituloCard,
    ]),
    ...dashboardData.playlistsDestaques.flatMap((item) => [
      item.nomeCard,
      item.tituloCard,
    ]),
    ...dashboardData.novosLancamentos.flatMap((item) => [
      item.nomeCard,
      item.tituloCard,
    ]),
  ];
  fakerQueues.artists = [
    ...dashboardData.mediaCards.map((item) => item.nomeArtista),
    ...dashboardData.artistasDestaques.map((item) => item.descritor),
    ...dashboardData.recomendados.map((item) => item.descritor),
    ...dashboardData.playlistsDestaques.map((item) => item.descritor),
    ...dashboardData.novosLancamentos.map((item) => item.descritor),
  ];
  fakerQueues.years = dashboardData.novosLancamentos.map((item) =>
    Number(item.ano),
  );
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

async function renderizarDashboard() {
  render(<Dashboard />);
  await screen.findByRole("link", { name: "Ir para meu perfil" });
}

function obterSecao(titulo: string) {
  const heading = screen.getByRole("heading", { name: titulo });
  const secao = heading.closest("section");

  if (!secao) {
    throw new Error(`Seção "${titulo}" não encontrada.`);
  }

  return secao;
}

function validarImageSection(
  titulo: string,
  items: Array<{
    nomeCard: string;
    tituloCard: string;
    descritor: string;
    ano?: string;
  }>,
) {
  const secao = obterSecao(titulo);
  const cards = within(secao).getAllByTestId("image-card");

  expect(cards).toHaveLength(items.length);

  items.forEach(({ nomeCard, tituloCard, descritor, ano }, index) => {
    const card = within(cards[index]);

    expect(card.getByText(nomeCard)).toBeInTheDocument();
    expect(card.getByText(tituloCard)).toBeInTheDocument();
    expect(card.getByText(descritor)).toBeInTheDocument();

    if (ano) {
      expect(card.getByText(ano)).toBeInTheDocument();
    }
  });
}

describe("Dashboard", () => {
  it("renderiza os dados de mediaCards", async () => {
    await renderizarDashboard();

    const cards = screen.getAllByTestId("media-card");

    expect(cards).toHaveLength(dashboardData.mediaCards.length);

    dashboardData.mediaCards.forEach(({ nomeMusica, nomeArtista }, index) => {
      const card = within(cards[index]);

      expect(card.getByText(nomeMusica)).toBeInTheDocument();
      expect(card.getByText(nomeArtista)).toBeInTheDocument();
    });
  });

  it("renderiza os dados de artistasDestaques", async () => {
    await renderizarDashboard();

    validarImageSection(
      "Artistas em destaque",
      dashboardData.artistasDestaques,
    );
  });

  it("renderiza os dados de recomendados", async () => {
    await renderizarDashboard();

    validarImageSection("Recomendados para você", dashboardData.recomendados);
  });

  it("renderiza os dados de playlistsDestaques", async () => {
    await renderizarDashboard();

    validarImageSection(
      "Playlists em destaque",
      dashboardData.playlistsDestaques,
    );
  });

  it("renderiza os dados de novosLancamentos", async () => {
    await renderizarDashboard();

    validarImageSection("Novos lançamentos", dashboardData.novosLancamentos);
  });
});
