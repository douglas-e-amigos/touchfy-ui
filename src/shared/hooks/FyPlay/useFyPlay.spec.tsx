import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useFyPlay from "./useFyPlay";

describe("useFyPlay", () => {
  it("retorna os estados iniciais do player", () => {
    const { result } = renderHook(() => useFyPlay());

    expect(result.current.right).toBe(0);
    expect(result.current.left).toBe(0);
    expect(result.current.play).toBe(true);
    expect(result.current.favorite).toBe(true);
    expect(result.current.shuffle).toBe(false);
    expect(result.current.repeat).toBe(false);
  });

  it("atualiza os estados do player", () => {
    const { result } = renderHook(() => useFyPlay());

    act(() => result.current.setRight(1));
    expect(result.current.right).toBe(1);

    act(() => result.current.setLeft(1));
    expect(result.current.left).toBe(1);

    act(() => result.current.setPlay(false));
    expect(result.current.play).toBe(false);

    act(() => result.current.setFavorite(false));
    expect(result.current.favorite).toBe(false);

    act(() => result.current.setShuffle(true));
    expect(result.current.shuffle).toBe(true);

    act(() => result.current.setRepeat(true));
    expect(result.current.repeat).toBe(true);
  });
});
