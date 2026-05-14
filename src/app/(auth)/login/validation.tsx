import { LoginForm } from "../../../features/usuario/models/form.model";

import { isBlank, isPassword } from "../../../shared/utils/validation";

export const dependencies: Partial<Record<keyof LoginForm, (keyof LoginForm)[]>> = {};

export const validateLogin = (
    field: keyof LoginForm,
    values: LoginForm
): string | null => {
    switch (field) {
        case "nomeUsuario":
            if (isBlank(values.nomeUsuario)) return "Nome de usuário obrigatório";
            return null;
        case "senha":
            if (!isPassword(values.senha)) return "Senha inválida";
            return null;
        default:
            return null;
    }
};