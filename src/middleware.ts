import type { MiddlewareConfig, NextRequest } from "next/server";
import { NextMiddlewareResponse } from "#lib/Responses";
import { APIDashboardMiddleware } from "./middlewares/APIDashboard";
import { DashboardMiddleware } from "./middlewares/Dashboard";

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/dashboard")) {
    return await APIDashboardMiddleware(request);
  }

  if (pathname.startsWith("/dashboard")) {
    return await DashboardMiddleware(request);
  }

  return NextMiddlewareResponse();
};

export const config: MiddlewareConfig = {
  matcher: ["/dashboard/:path*", "/api/dashboard/:path*"],
};
