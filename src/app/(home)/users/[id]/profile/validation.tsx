import { PartialUserUpdateForm, UploadUserPhotoForm } from "@/src/features/usuario/models/form.model";
import { isBlank, isValidDateString } from "@/src/shared/utils/validation";


export const updateUserDependencies: Partial<Record<keyof PartialUserUpdateForm, (keyof PartialUserUpdateForm)[]>> = {};

export const validateUpdate = (
    field: keyof PartialUserUpdateForm,
    values: PartialUserUpdateForm
): string | null => {
    switch (field) {
        case "nomeUsuario":
            if (isBlank(values.nomeUsuario)) return "Nome de usuário obrigatório";
            return null;
        case "nome":
            if (isBlank(values.nome)) return "Nome obrigatório";
            return null;
        case "dataNascimento":
            if (!isValidDateString(values.dataNascimento))
                return "Data de nascimento inválida";
            return null;
        default:
            return null;
    }
};


export const updatePhotoDependencies: Partial<Record<keyof UploadUserPhotoForm, (keyof UploadUserPhotoForm)[]>> = {};

export const validatePhoto = (
    field: keyof UploadUserPhotoForm,
    values: UploadUserPhotoForm
): string | null => {
    switch (field) {
        default:
            return null;
    }
};