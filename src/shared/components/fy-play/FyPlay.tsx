import {
  ArrowLeftToLine,
  ArrowRightToLine,
  Shuffle,
  Play,
  Repeat,
  Heart,
} from "lucide-react";
import useFyPlay from "../../hooks/FyPlay/useFyPlay";

export default function FyPlay() {
  const {
    right,
    setRight,
    left,
    setLeft,
    play,
    setPlay,
    favorite,
    shuffle,
    repeat,
  } = useFyPlay();

  return (
    <section aria-label="Ações da música">
      <div className="flex gap-5">
        <Heart
          className="mr-2.5"
          color={`${favorite ? "pink" : "transparent"}`}
        />
        <Shuffle color={`${shuffle ? "pink" : "white"}`} />
        <ArrowLeftToLine onClick={() => setLeft(left + 1)} color="white" />
        <Play onClick={() => setPlay(!play)} color="white" />
        <ArrowRightToLine onClick={() => setRight(right + 1)} color="white" />
        <Repeat color={`${repeat ? "pink" : "white"}`} />
      </div>
    </section>
  );
}
