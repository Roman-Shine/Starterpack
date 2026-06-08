import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PATHS = ["/app/private", "/app/profile"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedPath = PROTECTED_PATHS.some((path) => pathname.startsWith(path));

  if (!isProtectedPath) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("access_token")?.value;
  if (accessToken) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/app/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/app/private/:path*", "/app/profile/:path*"],
};
