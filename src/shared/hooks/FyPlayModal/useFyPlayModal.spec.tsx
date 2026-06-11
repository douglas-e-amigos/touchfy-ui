import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import useFyPlaymodal from "./useFyPlayModal";
import { act } from "react";

describe("useFyPlayModal", () => {
  it("verificação de mudança de estado", () => {
    const { result } = renderHook(() => useFyPlaymodal());

    expect(result.current.altera).toBe(false);
    act(() => result.current.setAltera(true));
    expect(result.current.altera).toBe(true);
    act(() => result.current.setAltera(false));
    expect(result.current.altera).toBe(false);
  });
});
