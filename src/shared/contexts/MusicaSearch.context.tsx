"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface MusicaSearchContextType {
  termoBusca: string;
  setTermoBusca: (value: string) => void;
}

const MusicaSearchContext = createContext<MusicaSearchContextType>({
  termoBusca: "",
  setTermoBusca: () => {},
});

export function MusicaSearchProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  const [termoBusca, setTermoBusca] = useState("");

  return (
    <MusicaSearchContext.Provider value={{ termoBusca, setTermoBusca }}>
      {children}
    </MusicaSearchContext.Provider>
  );
}

export function useMusicaSearchContext() {
  return useContext(MusicaSearchContext);
}
