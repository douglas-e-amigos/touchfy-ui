import { ElementType } from "react";

interface CardBibliotecaProps {
  readonly icon: ElementType;
  readonly quantidade: number;
  readonly legenda: string;
}

export default function CardBiblioteca({
  icon: Icon,
  quantidade,
  legenda,
}: CardBibliotecaProps) {
  return (
    <div className="w-screen h-48 rounded-2xl items-start justify-center-safe flex flex-col bg-zinc-700/50 gap-4 ml-2.5 mr-2.5 p-4">
      <Icon size={32} color="#ff007f" />
      <p className="text-2xl font-bold text-white" >{quantidade}</p>
      <p className="text-1xl font-semibold text-white">{legenda}</p>
    </div>
  );
}
