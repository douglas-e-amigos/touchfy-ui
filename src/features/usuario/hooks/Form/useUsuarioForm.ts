"use client";

import { PartialUserUpdateForm } from "@/src/features/usuario/models/form.model";
import {
  updateUserDependencies,
  validateUpdate,
} from "@/src/features/usuario/utils/validation";
import { useForm } from "@/src/shared/hooks/Form/useForm";

const initialPartialUpdateValues: PartialUserUpdateForm = {
  nomeUsuario: "",
  nome: "",
  dataNascimento: "",
};

export function useUsuarioForm() {
  const {
    values: partialUpdateValues,
    errors: partialUpdateErrors,
    handleChange: handlePartialUpdateChange,
    reset: resetPartialUpdate,
    isValid: isPartialUpdateValid,
  } = useForm<PartialUserUpdateForm>(
    initialPartialUpdateValues,
    validateUpdate,
    updateUserDependencies,
  );

  return {
    partialUpdateValues,
    partialUpdateErrors,
    resetPartialUpdate,
    isPartialUpdateValid,
    handleNomeChange: (value: string) =>
      handlePartialUpdateChange("nome", value),
    handleNomeUsuarioChange: (value: string) =>
      handlePartialUpdateChange("nomeUsuario", value),
    handleDataNascimentoChange: (value: string) =>
      handlePartialUpdateChange("dataNascimento", value),
  };
}
