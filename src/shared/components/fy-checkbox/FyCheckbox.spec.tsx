import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import FyCheckbox from "./FyCheckbox";

afterEach(() => {
    cleanup();
});

describe("FyCheckbox", () => {
    it("não quebra ao renderizar mesmo sem implementação visual", () => {
        const { container } = render(<FyCheckbox />);

        expect(container).toBeEmptyDOMElement();
    });
});