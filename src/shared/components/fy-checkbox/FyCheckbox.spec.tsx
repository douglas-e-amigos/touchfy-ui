import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import FyCheckbox from "./FyCheckbox";

afterEach(() => {
    cleanup();
});

describe("FyCheckbox", () => {
    it("renderiza um checkbox nativo", () => {
        render(<FyCheckbox aria-label="Aceitar termos" />);

        expect(screen.getByRole("checkbox", { name: "Aceitar termos" })).toBeInTheDocument();
    });
});
