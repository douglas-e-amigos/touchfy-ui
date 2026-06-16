"use client";

import { ReactNode } from "react";

import PlayFooter from "@/src/shared/components/fy-playfooter/PlayFooter";
import Sidebar from "@/src/shared/design-system/Sidebar/Sidebar";

import {
  MusicaAtualProvider,
  useMusicaAtualContext,
} from "@/src/shared/providers/MusicaAtual.Provider";

export default function HomeLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  return (
    <MusicaAtualProvider>
      <HomeShell>{children}</HomeShell>
    </MusicaAtualProvider>
  );
}

function HomeShell({ children }: Readonly<{ children: ReactNode }>) {
  const { musicaAtual } = useMusicaAtualContext();

  return (
    <div className="h-full w-full bg-black lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
      <div className="lg:h-screen">
        <Sidebar />
      </div>
      {children}
      {musicaAtual ? <PlayFooter musica={musicaAtual} /> : null}
    </div>
  );
}
