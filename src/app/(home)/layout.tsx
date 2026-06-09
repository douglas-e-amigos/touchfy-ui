"use client";

import PlayFooter from "@/src/shared/components/fy-playfooter/PlayFooter";
import { ReactNode } from "react";
import FySidebar from "@/src/shared/components/fy-sidebar/FySidebar";
import { useMusicaAtualContext } from "@/src/shared/providers/musica-atual";

export default function HomeLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  const { musicaAtual } = useMusicaAtualContext();

  return (
    <div className="h-full w-full bg-black lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
      <div className="lg:h-screen">
        <FySidebar />
      </div>
      {children}
      {musicaAtual ? <PlayFooter musica={musicaAtual} /> : null}
    </div>
  );
}
