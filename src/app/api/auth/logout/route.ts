import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponseRedirect } from "#lib/Responses";
import { fetchSession } from "#lib/Server";

export async function GET(request: NextRequest) {
  const { origin } = request.nextUrl;
  const session = await fetchSession();

  if (session) {
    cookies().delete("authorization");
  }

  return NextResponseRedirect({
    url: origin,
  });
}
