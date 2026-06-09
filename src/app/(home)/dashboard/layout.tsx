"use client";

import PlayFooter from "@/src/shared/components/fy-playfooter/PlayFooter";
import { ReactNode } from "react";
import FySidebar from "@/src/shared/components/fy-sidebar/FySidebar";
import {
  useMusicaAtualContext,
  MusicaAtualProvider,
} from "@/src/shared/providers/MusicaAtual.Provider";

export default function HomeLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  return (
    <MusicaAtualProvider>
      <DashboardShell>{children}</DashboardShell>
    </MusicaAtualProvider>
  );
}

function DashboardShell({ children }: Readonly<{ children: ReactNode }>) {
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
