import { NextResponse } from "next/server";
import {
  AutenticarUsuarioRequest,
  TokenResponse,
} from "../../../../features/usuario/models/dto.model";
import { isBlank, isPassword } from "../../../../shared/utils/validation";
import publicHttpServer from "../../../../infrastructure/http/http-server";
import { cookies } from "next/headers";

export async function POST(request: Request): Promise<Response> {
  const body: AutenticarUsuarioRequest = await request.json();
  if (isBlank(body.nomeUsuario))
    return NextResponse.json({ error: "Nome inválido!" }, { status: 400 });

  if (!isPassword(body.senha))
    return NextResponse.json({ error: "Senha inválida!" }, { status: 400 });

  const response = await publicHttpServer.post<TokenResponse>("/usuarios/auth/login", body);

  const cookieStore = await cookies();
  
  const isSecure = process.env.NODE_ENV === "production";

  cookieStore.set("refresh_token", response.data.refreshToken, {
    httpOnly: true,
    secure: isSecure,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 168 // 7 dias
  });

  cookieStore.set("access_token", response.data.accessToken, {
    httpOnly: true,
    secure: isSecure,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 5 // 5 minutos
  });

  return NextResponse.json(response.data);
}
