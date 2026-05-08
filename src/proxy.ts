import { NextRequest, NextResponse } from "next/server";

const publicOnlyRoutes = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("access_token");

  const pathname = request.nextUrl.pathname;

  const isPublicOnlyRoute = publicOnlyRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!accessToken && !isPublicOnlyRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (accessToken && isPublicOnlyRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
