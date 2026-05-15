import { describe, expect, it, afterEach } from "vitest";
import { getHour } from "../../utils/date";
import { cleanup, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import FySaudacao, { Periodos } from "./FySaudacao";

afterEach(() => {
    cleanup();
})

describe("FySaudacao", () => {
    it("verificando se está renderizando a saudação", () => {
        const hora = getHour();
        render(<FySaudacao hora={hora} />);
        expect(screen.queryByText(hora));
    });

    it.each([6, 7, 8, 9, 10])
        ("Verificando se renderiza somente 'Bom dia'", (hora) => {
            render(<FySaudacao hora={hora}/>);
            expect(screen.getByText(Periodos.dia)).toBeInTheDocument();

            expect(screen.queryByText(Periodos.madrugada)).not.toBeInTheDocument();
            expect(screen.queryByText(Periodos.noite)).not.toBeInTheDocument();
            expect(screen.queryByText(Periodos.tarde)).not.toBeInTheDocument();

        });
    
    it.each([12, 13, 14, 15, 16, 17])
        ("Verificando se renderiza somente 'Boa tarde'", (hora) => {
            render(<FySaudacao hora={hora}/>);
            expect(screen.getByText(Periodos.tarde)).toBeInTheDocument();

            expect(screen.queryByText(Periodos.madrugada)).not.toBeInTheDocument();
            expect(screen.queryByText(Periodos.noite)).not.toBeInTheDocument();
            expect(screen.queryByText(Periodos.dia)).not.toBeInTheDocument();

        });

    it.each([0, 1, 2, 3, 4, 5])
        ("Verificando se renderiza somente 'Boa madrugada'", (hora) => {
            render(<FySaudacao hora={hora}/>);
            expect(screen.getByText(Periodos.madrugada)).toBeInTheDocument();

            expect(screen.queryByText(Periodos.tarde)).not.toBeInTheDocument();
            expect(screen.queryByText(Periodos.noite)).not.toBeInTheDocument();
            expect(screen.queryByText(Periodos.dia)).not.toBeInTheDocument();

        });

    it.each([18, 19, 20, 21, 22, 23])
        ("Verificando se renderiza somente 'Boa noite'", (hora) => {
            render(<FySaudacao hora={hora}/>);
            expect(screen.getByText(Periodos.noite)).toBeInTheDocument();

            expect(screen.queryByText(Periodos.madrugada)).not.toBeInTheDocument();
            expect(screen.queryByText(Periodos.tarde)).not.toBeInTheDocument();
            expect(screen.queryByText(Periodos.dia)).not.toBeInTheDocument();

        });
})
