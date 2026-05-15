import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/dom";
import FyDate from "./FyDate";

describe("FyDate", () => {
    it("verificando se a data está correta correta", () => {
        const date = new Date();
        const dateComplete = date.toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long"
        })
        render(<FyDate />);
        expect(screen.getByText(dateComplete))
    })
})
