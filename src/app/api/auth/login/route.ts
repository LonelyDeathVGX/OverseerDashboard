import type { NextRequest } from "next/server";
import { OAUTH2_URL } from "#lib/Constants";
import { NextResponseRedirect } from "#lib/Responses";
import { fetchSession } from "#lib/Server";

export async function GET(request: NextRequest) {
  const { origin } = request.nextUrl;
  const session = await fetchSession();

  if (session) {
    return NextResponseRedirect({
      url: origin,
    });
  }

  return NextResponseRedirect({
    url: OAUTH2_URL,
  });
}
