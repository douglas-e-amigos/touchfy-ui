import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import ProfileSettingsSection from "./ProfileSettingsSection";

afterEach(() => {
    cleanup();
});

describe("ProfileSettingsSection", () => {
    it("renderiza seções de configuração e zona de perigo", () => {
        render(<ProfileSettingsSection onDesativarConta={() => undefined} />);

        expect(screen.getByText("Configurações da Conta")).toBeInTheDocument();
        expect(screen.getByText("Zona de Perigo")).toBeInTheDocument();
        expect(screen.getByRole("switch")).toBeInTheDocument();
    });

    it("dispara callback ao clicar em desativar conta", async () => {
        const onDesativarConta = vi.fn();
        const user = userEvent.setup();

        render(<ProfileSettingsSection onDesativarConta={onDesativarConta} />);

        await user.click(screen.getByRole("button", { name: /Desativar Conta/i }));

        expect(onDesativarConta).toHaveBeenCalledTimes(1);
    });
});