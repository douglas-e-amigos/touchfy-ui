"use client";

import { UsuarioResponse } from "@/src/features/usuario/models/dto.model";
import { usuarioService } from "@/src/features/usuario/services/usuario.service";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useEffect, useState } from "react";

const ARTISTA_ROLE = "artista";

export function usePerfil({ router }: { router: AppRouterInstance }) {
  const [usuario, setUsuario] = useState<UsuarioResponse | null>(null);
  const [isLoadingUsuario, setIsLoadingUsuario] = useState(true);

  useEffect(() => {
    let isMounted = true;

    usuarioService
      .buscarUsuarioLogado()
      .then((usuarioLogado) => {
        if (isMounted) {
          setUsuario(aplicarRoleTemporaria(usuarioLogado));
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar usuário logado:", error);

        if (isMounted) {
          router.push("/login");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingUsuario(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [router]);

  const abrirPerfil = () => {
    if (!usuario?.id) return;

    router.push(`/users/${usuario.id}/profile`);
  };

  return { abrirPerfil, isLoadingUsuario, usuario };
}

function aplicarRoleTemporaria(usuario: UsuarioResponse): UsuarioResponse {
  if (usuario.role) {
    return usuario;
  }

  if (usuario.nomeUsuario.toLowerCase() !== ARTISTA_ROLE) {
    return usuario;
  }

  return {
    ...usuario,
    role: ARTISTA_ROLE,
  };
}
