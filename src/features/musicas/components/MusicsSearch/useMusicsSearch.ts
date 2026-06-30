"use client";

import { useMusicaSearchContext } from "@/src/shared/contexts/MusicaSearch.context";

export interface UseMusicsSearchReturn {
  termoBusca: string;
  setTermoBusca: (value: string) => void;
}

export default function useMusicsSearch(): UseMusicsSearchReturn {
  const { termoBusca, setTermoBusca } = useMusicaSearchContext();
  return { termoBusca, setTermoBusca };
}
