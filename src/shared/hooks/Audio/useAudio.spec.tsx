import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useAudio from "./useAudio";

function criarAudioMock() {
  const listeners = new Map<string, () => void>();
  let src = "";

  return {
    get src() {
      return src;
    },
    set src(val: string) {
      src = val;
    },
    readyState: 4,
    play: vi.fn().mockResolvedValue(undefined),
    pause: vi.fn(),
    load: vi.fn(),
    addEventListener: vi.fn(
      (event: string, handler: () => void) => {
        listeners.set(event, handler);
      },
    ),
    removeEventListener: vi.fn(
      (event: string) => {
        listeners.delete(event);
      },
    ),
    dispatchEvent(event: string) {
      listeners.get(event)?.();
    },
    currentTime: 0,
    duration: 0,
  };
}

let audioMock: ReturnType<typeof criarAudioMock>;

beforeEach(() => {
  audioMock = criarAudioMock();
  vi.stubGlobal("Audio", function() { return audioMock; });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useAudio", () => {
  it("toca quando playing é true e src é definido", () => {
    renderHook(() => useAudio("/audio.mp3", true));

    expect(audioMock.play).toHaveBeenCalled();
  });

  it("pausa quando playing é false", () => {
    const { rerender } = renderHook(
      ({ src, playing }) => useAudio(src, playing),
      { initialProps: { src: "/audio.mp3", playing: true } },
    );

    rerender({ src: "/audio.mp3", playing: false });

    expect(audioMock.pause).toHaveBeenCalled();
  });

  it("atualiza isPlaying quando o áudio termina", () => {
    const onEnded = vi.fn();
    const { result } = renderHook(() =>
      useAudio("/audio.mp3", true, onEnded),
    );

    act(() => {
      audioMock.dispatchEvent("ended");
    });

    expect(result.current.isPlaying).toBe(false);
    expect(onEnded).toHaveBeenCalled();
  });

  it("carrega nova fonte quando src muda", () => {
    const { rerender } = renderHook(
      ({ src, playing }) => useAudio(src, playing),
      { initialProps: { src: "/audio.mp3", playing: false } as { src: string | null; playing: boolean } },
    );

    rerender({ src: "/novo-audio.mp3", playing: false });

    expect(audioMock.load).toHaveBeenCalled();
    expect(audioMock.src).toBe("/novo-audio.mp3");
  });
});
