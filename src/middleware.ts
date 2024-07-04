import { fetchSession } from "@/lib/Server";
import { nextRedirect } from "@/lib/Util";
import type { MiddlewareConfig, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const session = await fetchSession();

  if (!session) {
    return nextRedirect(url.origin);
  }
}

export const config: MiddlewareConfig = {
  matcher: "/dashboard/:path*",
};
