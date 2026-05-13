import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { AuthBanner } from "./AuthBanner";

afterEach(() => {
    cleanup();
});

describe("AuthBanner", () => {
    it("renderiza título e benefícios principais", () => {
        render(<AuthBanner />);

        expect(screen.getByText(/Descubra um/i)).toBeInTheDocument();
        expect(screen.getByText("Acesso ilimitado a milhões de músicas")).toBeInTheDocument();
        expect(screen.getByText("Playlists personalizadas com IA")).toBeInTheDocument();
        expect(screen.getByText("Ouça offline, sem anúncios")).toBeInTheDocument();
    });
});