import { ComponentProps, ElementType } from "react";

interface ButtonBibliotecaProps extends Readonly<ComponentProps<"button">> {
  readonly icon: ElementType;
  readonly legenda: string;
}

export default function ButtonBiblioteca({
  icon: Icon,
  legenda,
}: ButtonBibliotecaProps) {
  return (
    <button className="w-screen h-48 rounded-2xl items-center justify-center-safe flex flex-col bg-zinc-700/50 gap-4 ml-2.5 mr-2.5 p-4 hover:bg-zinc-700/70 cursor-pointer">
      <Icon size={32} color="#ff007f" />
      <p className="text-white text-2xl">{legenda}</p>
    </button>
  );
}
