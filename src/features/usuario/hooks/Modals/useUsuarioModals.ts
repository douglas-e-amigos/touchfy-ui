"use client";

import { useState } from "react";

type UsuarioModals = {
  desativar: boolean;
  atualizar: boolean;
  upload: boolean;
};

export type UsuarioModalKey = keyof UsuarioModals;

function createClosedModals(): UsuarioModals {
  return {
    atualizar: false,
    desativar: false,
    upload: false,
  };
}

export function useUsuarioModals() {
  const [modals, setModals] = useState<UsuarioModals>(createClosedModals);

  const abrirModal = (modal: UsuarioModalKey) => {
    setModals({
      ...createClosedModals(),
      [modal]: true,
    });
  };

  const fecharModais = () => {
    setModals(createClosedModals());
  };

  return {
    modals,
    abrirModal,
    fecharModais,
  };
}
