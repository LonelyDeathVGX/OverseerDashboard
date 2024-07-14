import type { MiddlewareConfig, NextRequest } from "next/server";
import { NextResponseNext } from "#lib/Responses";
import { APIDashboardMiddleware } from "./middlewares/APIDashboard";
import { DashboardMiddleware } from "./middlewares/Dashboard";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/dashboard")) {
    return await APIDashboardMiddleware(request);
  }

  if (pathname.startsWith("/dashboard")) {
    return await DashboardMiddleware(request);
  }

  return NextResponseNext({});
}

export const config: MiddlewareConfig = {
  matcher: ["/dashboard/:path*", "/api/dashboard/:path*"],
};
