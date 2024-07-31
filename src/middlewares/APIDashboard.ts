import { PermissionFlagsBits } from "discord-api-types/v10";
import type { NextRequest } from "next/server";
import { RateLimiterMemory, RateLimiterRes } from "rate-limiter-flexible";
import { BitField } from "#lib/BitField";
import { fetchClientGuild } from "#lib/Requests";
import { NextResponseJSON, NextResponseNext } from "#lib/Responses";
import { fetchSession } from "#lib/Server";
import { memberPermissions } from "#lib/Util";

const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 3,
  blockDuration: 7,
});

export async function APIDashboardMiddleware(request: NextRequest) {
  try {
    await rateLimiter.consume(request.headers.get("x-forwarded-for") ?? "127.0.0.1");

    const session = await fetchSession();

    if (!session) {
      return NextResponseJSON({
        data: "Unauthorized",
        status: 401,
      });
    }

    const { pathname } = request.nextUrl;
    const id = pathname.split("/")[3];
    const { found, error, guild } = await fetchClientGuild(id);

    if (!found || error || !guild) {
      return NextResponseJSON({
        data: "Not Found",
        status: 404,
      });
    }

    const permissions = await memberPermissions(guild, session.userID);
    const bitField = new BitField(Number.parseInt(permissions.toString()));

    if (!bitField.has(Number.parseInt(PermissionFlagsBits.ManageGuild.toString()))) {
      return NextResponseJSON({
        data: "Forbidden",
        status: 403,
      });
    }

    return NextResponseNext({});
  } catch (rateLimit) {
    if (rateLimit instanceof RateLimiterRes) {
      return NextResponseJSON({
        data: `Too Many Requests. Resets in ${(rateLimit.msBeforeNext / 1000).toFixed()} seconds`,
        status: 429,
      });
    }

    return NextResponseJSON({
      data: "Internal Server Error",
      status: 500,
    });
  }
}
