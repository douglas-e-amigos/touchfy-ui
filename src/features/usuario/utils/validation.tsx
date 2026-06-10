import {
  PartialUserUpdateForm,
  UploadUserPhotoForm,
} from "@/src/features/usuario/models/form.model";
import { isBlank, isValidDateString } from "@/src/shared/utils/validation";

export const updateUserDependencies: Partial<
  Record<keyof PartialUserUpdateForm, (keyof PartialUserUpdateForm)[]>
> = {};

export const validateUpdate = (
  field: keyof PartialUserUpdateForm,
  values: Readonly<PartialUserUpdateForm>,
): string | null => {
  if (field === "nomeUsuario" && isBlank(values.nomeUsuario)) {
    return "Nome de usuário obrigatório";
  }

  if (field === "nome" && isBlank(values.nome)) {
    return "Nome obrigatório";
  }

  if (field === "dataNascimento" && !isValidDateString(values.dataNascimento)) {
    return "Data de nascimento inválida";
  }

  return null;
};

export const updatePhotoDependencies: Partial<
  Record<keyof UploadUserPhotoForm, (keyof UploadUserPhotoForm)[]>
> = {};

export const validatePhoto = (): string | null => {
  return null;
};
