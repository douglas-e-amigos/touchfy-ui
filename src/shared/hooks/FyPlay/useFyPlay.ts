"use client";

import { useState } from "react";

export default function useFyPlay() {
  const [right, setRight] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const [play, setPlay] = useState<boolean>(true);
  const [favorite, setFavorite] = useState<boolean>(true);
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [repeat, setRepeat] = useState<boolean>(false);

  return {
    right,
    setRight,
    left,
    setLeft,
    play,
    setPlay,
    favorite,
    setFavorite,
    shuffle,
    setShuffle,
    repeat,
    setRepeat,
  };
}
