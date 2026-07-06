"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "./react-query";
import { ReactNode } from "react";

type ProviderProps = {
  readonly children: ReactNode;
};

export function Provider({ children }: ProviderProps) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
