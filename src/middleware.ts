import { fetchSession } from "@/lib/Server";
import { nextRedirect } from "@/lib/Util";
import { type MiddlewareConfig, type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const session = await fetchSession();

  if (!session) {
    return nextRedirect(url.origin);
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: "/dashboard/:path*",
};
