import { RegisterForm } from "../../../features/usuario/models/form.model";

import {
  isBlank,
  isEmail,
  isEqual,
  isPassword,
  isValidDateString,
} from "../../../shared/utils/validation";

export const dependencies: Partial<Record<keyof RegisterForm, (keyof RegisterForm)[]>> = {
  senha: ["senhaNovamente"],
  senhaNovamente: ["senha"],
};

type RegisterValidator = (values: Readonly<RegisterForm>) => string | null;

const registerValidators: Partial<Record<keyof RegisterForm, RegisterValidator>> = {
  nome: (values) => isBlank(values.nome) ? "Nome obrigatório" : null,
  nomeUsuario: (values) =>
    isBlank(values.nomeUsuario) ? "Nome de usuário obrigatório" : null,
  email: (values) => {
    if (isBlank(values.email)) return "E-mail obrigatório";
    return isEmail(values.email) ? null : "E-mail inválido";
  },
  senha: (values) => {
    if (!isPassword(values.senha)) return "Senha inválida";
    return isEqual(values.senha, values.senhaNovamente)
      ? null
      : "As senhas precisam ser iguais";
  },
  senhaNovamente: (values) => {
    if (!isPassword(values.senhaNovamente)) return "Senha inválida";
    return isEqual(values.senha, values.senhaNovamente)
      ? null
      : "As senhas precisam ser iguais";
  },
  dataNascimento: (values) =>
    isValidDateString(values.dataNascimento)
      ? null
      : "Data de nascimento inválida",
};

export const validateRegister = (
  field: keyof RegisterForm,
  values: Readonly<RegisterForm>,
): string | null => {
  return registerValidators[field]?.(values) ?? null;
};
