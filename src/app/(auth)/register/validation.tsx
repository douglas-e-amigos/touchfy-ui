import { RegisterForm } from "../../features/usuario/models/form.model";

import {
  isBlank,
  isEmail,
  isEqual,
  isPassword,
  isValidDateString,
} from "../../shared/utils/validation";

export const dependencies: Partial<Record<keyof RegisterForm, (keyof RegisterForm)[]>> = {
  senha: ["senhaNovamente"],
  senhaNovamente: ["senha"],
};

export const validateRegister = (
  field: keyof RegisterForm,
  values: RegisterForm
): string | null => {
  switch (field) {
    case "nome":
      if (isBlank(values.nome)) return "Nome obrigatório";
      return null;

    case "nomeUsuario":
      if (isBlank(values.nomeUsuario)) return "Nome de usuário obrigatório";
      return null;

    case "email":
      if (isBlank(values.email)) return "E-mail obrigatório";
      if (!isEmail(values.email)) return "E-mail inválido";
      return null;

    case "senha":
      if (!isPassword(values.senha)) return "Senha inválida";
      if (!isEqual(values.senha, values.senhaNovamente))
        return "As senhas precisam ser iguais";
      return null;

    case "senhaNovamente":
      if (!isPassword(values.senhaNovamente)) return "Senha inválida";
      if (!isEqual(values.senha, values.senhaNovamente))
        return "As senhas precisam ser iguais";
      return null;

    case "dataNascimento":
      if (!isValidDateString(values.dataNascimento))
        return "Data de nascimento inválida";
      return null;

    default:
      return null;
  }
};