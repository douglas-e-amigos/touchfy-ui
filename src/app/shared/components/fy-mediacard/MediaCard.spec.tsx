import { it, vi, expect, describe, afterEach } from "vitest";
import { faker } from "@faker-js/faker";
import { render, cleanup } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from '@testing-library/user-event'
import MediaCard from "./MediaCard";

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
});

const rodarMusica = vi.fn();

const montarComponente = () =>  {
    const props = {
        imagemURL: faker.image.avatar(),
        rodarMusica,
        nomeMusica: faker.music.songName(),
        nomeArtista: faker.music.artist(),
    }
    render(<MediaCard {...props} />)
    return props;
}

describe("MediaCard", () => {

    it("renderiza imagem do artista no card", () => {
        const { nomeArtista } = montarComponente();
        const imagem = screen.queryByRole("img", { name: `Foto de ${nomeArtista}` })
        
        expect(imagem).toBeInTheDocument();
    })

    it("renderiza o nomeArtista e nomeMusica no card", () => {
        const { nomeArtista, nomeMusica } = montarComponente();
        
        expect(screen.getByText(nomeArtista)).toBeInTheDocument();
        expect(screen.getByText(nomeMusica)).toBeInTheDocument();
    })
    
    it("mudança de estilo do ícone", async () => {
        const user = userEvent.setup();

        const { nomeMusica } = montarComponente();

        const card = screen.getByRole("group", {
            name: `Card da mídia de ${nomeMusica}`,
        });

        const icone = screen.getByRole("img", {
            name: "Ícone play música",
        });

        expect(icone).toHaveClass("hidden");

        await user.hover(card);

        expect(icone).toHaveClass("block");

        await user.unhover(card);

        expect(icone).toHaveClass("hidden");
    });
});
