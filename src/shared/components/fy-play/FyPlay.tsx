import {
  ArrowLeftToLine,
  ArrowRightToLine,
  Shuffle,
  Play,
  Pause,
  Repeat,
  Heart,
} from "lucide-react";
import useFyPlay from "../../hooks/FyPlay/useFyPlay";

interface FyPlayProps {
  readonly play?: boolean;
  readonly setPlay?: (play: boolean) => void;
}

export default function FyPlay({
  play: externalPlay,
  setPlay: externalSetPlay,
}: FyPlayProps = {}) {
  const {
    right,
    setRight,
    left,
    setLeft,
    play: internalPlay,
    setPlay: internalSetPlay,
    favorite,
    setFavorite,
    shuffle,
    setShuffle,
    repeat,
    setRepeat,
  } = useFyPlay();

  const play = externalPlay ?? internalPlay;
  const setPlay = externalSetPlay ?? internalSetPlay;
  const buttonClassName =
    "grid h-8 w-8 place-items-center rounded-full text-white transition hover:text-pink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400";

  return (
    <section aria-label="Ações da música">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={
            favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
          aria-pressed={favorite}
          className={`${buttonClassName} ${favorite ? "text-pink-400" : ""}`}
          onClick={() => setFavorite(!favorite)}
        >
          <Heart fill={favorite ? "currentColor" : "none"} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label={
            shuffle ? "Desativar modo aleatório" : "Ativar modo aleatório"
          }
          aria-pressed={shuffle}
          className={`${buttonClassName} ${shuffle ? "text-pink-400" : ""}`}
          onClick={() => setShuffle(!shuffle)}
        >
          <Shuffle aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Voltar música"
          className={buttonClassName}
          onClick={() => setLeft(left + 1)}
        >
          <ArrowLeftToLine aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label={play ? "Pausar música" : "Tocar música"}
          aria-pressed={play}
          className={buttonClassName}
          onClick={() => setPlay(!play)}
        >
          {play ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        </button>
        <button
          type="button"
          aria-label="Avançar música"
          className={buttonClassName}
          onClick={() => setRight(right + 1)}
        >
          <ArrowRightToLine aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label={repeat ? "Desativar repetição" : "Ativar repetição"}
          aria-pressed={repeat}
          className={`${buttonClassName} ${repeat ? "text-pink-400" : ""}`}
          onClick={() => setRepeat(!repeat)}
        >
          <Repeat aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
