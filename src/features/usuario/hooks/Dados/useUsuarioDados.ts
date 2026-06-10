"use client";

import { UsuarioResponse } from "@/src/features/usuario/models/dto.model";
import { PartialUserUpdateForm } from "@/src/features/usuario/models/form.model";
import { usuarioService } from "@/src/features/usuario/services/usuario.service";
import { formatDateForInput } from "@/src/shared/utils/date";
import { useEffect, useState } from "react";

const initialUsuario: UsuarioResponse = {
  id: "",
  nome: "",
  nomeUsuario: "",
  dataNascimento: "",
  email: "",
  fotoPerfil: null,
};

type UseUsuarioDadosParams = {
  id: string;
  resetPartialUpdate: (values: PartialUserUpdateForm) => void;
};

export function useUsuarioDados({
  id,
  resetPartialUpdate,
}: UseUsuarioDadosParams) {
  const [usuario, setUsuario] = useState<UsuarioResponse>(initialUsuario);

  useEffect(() => {
    if (!id) {
      return;
    }

    usuarioService
      .buscarUsuario(id)
      .then((usuario) => {
        resetPartialUpdate({
          nome: usuario.nome,
          nomeUsuario: usuario.nomeUsuario,
          dataNascimento: formatDateForInput(usuario.dataNascimento),
        });
        setUsuario(usuario);
      })
      .catch(console.error);
  }, [id, resetPartialUpdate]);

  return {
    usuario,
    setUsuario,
  };
}
