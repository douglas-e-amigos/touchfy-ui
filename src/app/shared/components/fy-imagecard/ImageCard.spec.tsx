import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import ImageCard, { Variantes } from "./ImageCard";

const abrirPlaylist = vi.fn();

const montarComponente = (variante: Variantes = Variantes.CIRCULAR) => {
    const props = {
        capaURL: faker.image.avatar(),
        nomeCard: faker.music.songName(),
        tituloCard: faker.music.songName(),
        descritor: faker.music.artist(),
        ano: faker.date.between({ from: '2000-01-01', to: '2025-12-31' }).getFullYear().toString(),
        variante: variante, //"circular" | "quadrado-sm" | "quadrado-md",
        abrirPlaylist
    }
    render(<ImageCard {...props} />)
    return props;
}

const card = (variante?: Variantes) => {
    const { nomeCard } = montarComponente(variante);
    return screen.getByRole("group", { name: `Card de grupo de músicas ${nomeCard}` });
}

describe("ImageCard", () => {
    it("mudança de formato da imagem no card para circular", () => {
        const card_componente = card(Variantes.CIRCULAR);
        expect(card_componente).toHaveClass(Variantes.CIRCULAR);
    })

    it("mudança de formato da imagem no card para md", () => {
        const card_componente = card(Variantes.QUADRADO_MD);
        expect(card_componente).toHaveClass(Variantes.QUADRADO_MD);
    })

    it("mudança de formato da imagem no card para sm", () => {
        const card_componente = card(Variantes.QUADRADO_SM);
        expect(card_componente).toHaveClass(Variantes.QUADRADO_SM);
    })

    it("verificar se chama a função ao clicar", async () => {
        const user = userEvent.setup();
        const card_componente = card();
        await user.click(card_componente);
        expect(abrirPlaylist).toHaveBeenCalledTimes(1);
    })

    it("verificar renderização do 'ano'", () => {
    const ano = faker.date.between({ from: '2000-01-01', to: '2025-12-31' }).getFullYear().toString();
    const props = {
        capaURL: faker.image.avatar(),
        nomeCard: faker.music.songName(),
        tituloCard: faker.music.songName(),
        descritor: faker.music.artist(),
        ano,
        variante: Variantes.CIRCULAR,
        abrirPlaylist
    }

    const { rerender } = render(<ImageCard {...props} />)
    expect(screen.getByText(ano));

    const { ano: _, ...propsWithoutAno } = props;
    rerender(<ImageCard {...propsWithoutAno} />);
    expect(screen.queryByText(ano)).not.toBeInTheDocument;
    });

})