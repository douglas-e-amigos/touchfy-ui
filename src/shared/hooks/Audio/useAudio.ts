"use client";

import { useEffect, useRef, useState } from "react";

export default function useAudio(
  src: string | null,
  playing: boolean,
  onEnded?: () => void,
) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSrcRef = useRef<string | null>(null);
  const onEndedRef = useRef(onEnded);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    onEndedRef.current = onEnded;
  }, [onEnded]);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const onLoadedMetadata = () => setDuration(audio.duration);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onPause = () => setIsPlaying(false);
    const onEndedHandler = () => {
      setIsPlaying(false);
      onEndedRef.current?.();
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEndedHandler);

    return () => {
      audio.pause();
      audio.src = "";
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEndedHandler);
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (src !== currentSrcRef.current) {
      currentSrcRef.current = src;
      if (src) {
        audio.src = src;
        audio.load();
      } else {
        audio.pause();
        audio.src = "";
      }
    }
  }, [src]);

  const prevPlayingRef = useRef(playing);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !src) return;

    if (playing) {
      if (audio.readyState >= 2) {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        const onCanPlay = () => {
          audio.removeEventListener("canplay", onCanPlay);
          audio.play().then(() => setIsPlaying(true)).catch(() => {});
        };
        audio.addEventListener("canplay", onCanPlay, { once: true });
      }
    } else if (prevPlayingRef.current) {
      audio.pause();
    }
    prevPlayingRef.current = playing;
  }, [src, playing]);

  return { isPlaying, duration, currentTime };
}
