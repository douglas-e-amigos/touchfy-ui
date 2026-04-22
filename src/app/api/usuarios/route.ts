import { NextResponse } from "next/server";
import { CriarUsuarioRequest } from "../../features/usuario/models/dto.model";
import {
  isBlank,
  isEmail,
  isEqual,
  isPassword,
  isValidDateString,
} from "../../shared/utils/validation";
import httpServer from "../../infrastructure/http/http-server";
import { NovoRecursoResponse } from "../../shared/models/http.model";

export async function POST(request: Request): Promise<Response> {
  const body: CriarUsuarioRequest = await request.json();

  if (isBlank(body.nome))
    return NextResponse.json({ error: "Nome inválido!" }, { status: 400 });

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

  const response = await httpServer.post<NovoRecursoResponse>(
    "/usuarios",
    body,
  );

  return NextResponse.json(response.data);
}
