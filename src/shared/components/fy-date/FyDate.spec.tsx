import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/dom";
import FyDate from "./FyDate";
import { getDateFormat } from "../../utils/date";

describe("FyDate", () => {
    it("verificando se a data está correta", () => {
        const data = getDateFormat();
        render(<FyDate data={data}/>);
        expect(screen.getByText(data))
    })
})
