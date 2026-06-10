import { NextRequest, NextResponse } from "next/server";
import { RefreshTokenRequest, TokenResponse } from "@/src/features/usuario/models/dto.model";

const publicOnlyRoutes = ["/login", "/register"];
const API_URL = process.env.BACKEND_API_URL || "http://localhost:8080";

async function refreshAccessToken(request: NextRequest) {
  const refreshToken = request.cookies.get("refresh_token")?.value;

  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch(`${API_URL}usuarios/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken } satisfies RefreshTokenRequest),
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as TokenResponse;

    return data;
  } catch {
    return null;
  }
}

function buildCookieHeader(
  request: NextRequest,
  newAccessToken: string,
  newRefreshToken: string,
) {
  const cookies = request.cookies
    .getAll()
    .filter(
      (cookie) =>
        cookie.name !== "access_token" && cookie.name !== "refresh_token",
    )
    .map((cookie) => `${cookie.name}=${cookie.value}`);

  return [
    ...cookies,
    `access_token=${newAccessToken}`,
    `refresh_token=${newRefreshToken}`,
  ].join("; ");
}

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("access_token");

  const pathname = request.nextUrl.pathname;

  const isPublicOnlyRoute = publicOnlyRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!accessToken && !isPublicOnlyRoute) {
    const tokens = await refreshAccessToken(request);

    if (!tokens?.accessToken || !tokens?.refreshToken) {
      const response = NextResponse.redirect(new URL("/login", request.url));

      response.cookies.delete("access_token");
      response.cookies.delete("refresh_token");

      return response;
    }

    const requestHeaders = new Headers(request.headers);

    requestHeaders.set(
      "cookie",
      buildCookieHeader(request, tokens.accessToken, tokens.refreshToken),
    );

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    response.cookies.set("access_token", tokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 5,
    });

    response.cookies.set("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  }

  if (accessToken && isPublicOnlyRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
