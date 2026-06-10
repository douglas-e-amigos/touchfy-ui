import { NextResponse } from "next/server";
import {
  CriarUsuarioComRoleRequest,
  CriarUsuarioRequest,
} from "../../../features/usuario/models/dto.model";
import {
  isBlank,
  isEmail,
  isEqual,
  isPassword,
  isValidDateString,
} from "../../../shared/utils/validation";
import publicHttpServer from "../../../infrastructure/http/http-server";
import { NovoRecursoResponse } from "../../../shared/models/http.model";
import {
  getHttpErrorResponseData,
  getHttpErrorStatus,
} from "../../../shared/utils/http-error";

export async function POST(request: Request): Promise<Response> {
  const body: CriarUsuarioRequest = await request.json();

  if (isBlank(body.nome))
    return NextResponse.json({ error: "Nome inválido!" }, { status: 400 });

  if (isBlank(body.nomeUsuario))
    return NextResponse.json(
      { error: "Nome de usuário inválido!" },
      { status: 400 },
    );

  if (isBlank(body.email) || !isEmail(body.email))
    return NextResponse.json({ error: "E-mail inválido!" }, { status: 400 });

  if (!isPassword(body.senha))
    return NextResponse.json({ error: "Senha inválida!" }, { status: 400 });

  if (!isPassword(body.senhaNovamente))
    return NextResponse.json({ error: "Senha inválida!" }, { status: 400 });

  if (!isEqual(body.senha, body.senhaNovamente))
    return NextResponse.json(
      { error: "As senhas devem ser iguais!" },
      { status: 400 },
    );

  if (!isValidDateString(body.dataNascimento))
    return NextResponse.json(
      { error: "Data de nascimento inválida!" },
      { status: 400 },
    );

  const registerRequest: CriarUsuarioComRoleRequest = {
    ...body,
    role: "OUVINTE",
  };

  try {
    const response = await publicHttpServer.post<NovoRecursoResponse>(
      "usuarios/auth/register",
      registerRequest,
    );

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error("ROUTE ERROR:", getHttpErrorResponseData(error) ?? error);

    return NextResponse.json(
      getHttpErrorResponseData(error) ?? { message: "Erro ao criar usuário" },
      { status: getHttpErrorStatus(error) },
    );
  }
}
