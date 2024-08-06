import { PermissionFlagsBits } from "discord-api-types/v10";
import { headers } from "next/headers";
import { RateLimiterMemory, RateLimiterRes } from "rate-limiter-flexible";
import { z } from "zod";
import { BitField } from "#lib/BitField";
import { fetchClientGuild } from "#lib/Requests";
import { fetchSession } from "#lib/Server";
import { memberPermissions } from "#lib/Util";

const GuildIDSchema = z.string({
  invalid_type_error: "The guildID property must be a string",
  required_error: "The guildID property is required",
});
const RateLimiter = new RateLimiterMemory({
  blockDuration: 7,
  duration: 3,
  points: 5,
});

export async function middleware(guildID: unknown) {
  await rateLimit(headers().get("x-forwarded-for") ?? "127.0.0.1");

  const session = await fetchSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const { found, error, guild } = await fetchClientGuild(getGuildID(guildID));

  if (!found || error || !guild) {
    throw new Error("Not Found");
  }

  const permissions = await memberPermissions(guild, session.userID);
  const bitField = new BitField(Number.parseInt(permissions.toString()));

  if (!bitField.has(Number.parseInt(PermissionFlagsBits.ManageGuild.toString()))) {
    throw new Error("Forbidden");
  }
}

export function getGuildID(guildID: unknown) {
  const validatedGuildID = GuildIDSchema.safeParse(guildID);

  if (validatedGuildID.error) {
    throw new Error(validatedGuildID.error.issues[0].message);
  }

  return validatedGuildID.data.trim();
}

async function rateLimit(IP: string) {
  return await RateLimiter.consume(IP).catch((rateLimit) => {
    if (rateLimit instanceof RateLimiterRes) {
      throw new Error(`Too Many Requests. Resets in ${(rateLimit.msBeforeNext / 1000).toFixed()} seconds`);
    }
  });
}
