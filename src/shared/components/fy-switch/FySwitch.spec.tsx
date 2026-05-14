import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import FySwitch from "./FySwitch";

afterEach(() => {
    cleanup();
});

describe("FySwitch", () => {
    it("renderiza com o estado inicial informado", () => {
        render(
            <FySwitch
                id="perfil"
                name="perfil"
                checked={true}
                onChange={() => undefined}
                label="Perfil público"
            />,
        );

        expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
        expect(screen.getByText("Perfil público")).toBeInTheDocument();
    });

    it("dispara onChange com o valor invertido", async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();

        render(
            <FySwitch id="perfil" name="perfil" checked={false} onChange={onChange} />,
        );

        await user.click(screen.getByRole("switch"));

        expect(onChange).toHaveBeenCalledWith(true);
    });

    it("não dispara onChange quando está desabilitado", async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();

        render(
            <FySwitch id="perfil" name="perfil" checked={false} onChange={onChange} disabled={true} />,
        );

        await user.click(screen.getByRole("switch"));

        expect(onChange).not.toHaveBeenCalled();
    });
});