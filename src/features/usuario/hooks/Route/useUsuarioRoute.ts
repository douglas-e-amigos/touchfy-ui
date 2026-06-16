"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export function useUsuarioRoute() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    if (!id) {
      router.back();
    }
  }, [id, router]);

  return {
    id,
    redirectToLogin: () => router.push("/login"),
  };
}
