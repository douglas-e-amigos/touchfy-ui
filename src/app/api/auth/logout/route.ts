import publicHttpServer from "@/src/infrastructure/http/http-server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(): Promise<Response> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (refreshToken === undefined || refreshToken === null)
    return NextResponse.json(
      { error: "Usuário não está autenticado!" },
      { status: 401 },
    );

  await publicHttpServer.post("/usuarios/auth/logout", { refreshToken });

  cookieStore.delete("refresh_token");
  cookieStore.delete("access_token");

  return NextResponse.json({
    status: true,
    message: "Usuário deslogado com sucesso!",
  });
}
