import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { UserIcon } from "lucide-react";
import { useState } from "react";
import FyInput from "./FyInput";

afterEach(() => {
    cleanup();
});

describe("FyInput", () => {
    it("renderiza label e erro quando informados", () => {
        render(
            <FyInput
                id="nome"
                name="nome"
                label="Nome"
                placeholder="Seu nome"
                onChange={() => undefined}
                error="Campo obrigatório"
            />,
        );

        expect(screen.getByLabelText("Nome")).toBeInTheDocument();
        expect(screen.getByText("Campo obrigatório")).toBeInTheDocument();
    });

    it("dispara onChange com o valor digitado", async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();

        function ControlledInput() {
            const [value, setValue] = useState("");

            return (
                <FyInput
                    id="nome"
                    name="nome"
                    placeholder="Seu nome"
                    value={value}
                    onChange={(nextValue) => {
                        setValue(nextValue);
                        onChange(nextValue);
                    }}
                />
            );
        }

        render(<ControlledInput />);

        await user.type(screen.getByRole("textbox"), "Touchfy");

        expect(screen.getByDisplayValue("Touchfy")).toBeInTheDocument();
        expect(onChange).toHaveBeenLastCalledWith("Touchfy");
    });

    it("normaliza o valor quando o tipo é date", () => {
        render(
            <FyInput
                id="data"
                name="data"
                placeholder="Data"
                type="date"
                value="13/05/2026"
                onChange={() => undefined}
            />,
        );

        expect(screen.getByDisplayValue("2026-05-13")).toBeInTheDocument();
    });

    it("renderiza o ícone quando informado", () => {
        const { container } = render(
            <FyInput
                id="nome"
                name="nome"
                placeholder="Seu nome"
                onChange={() => undefined}
                icon={<UserIcon data-testid="user-icon" />}
            />,
        );

        expect(screen.getByTestId("user-icon")).toBeInTheDocument();
        expect(container.querySelector("input")).toHaveClass("pl-10");
    });
});