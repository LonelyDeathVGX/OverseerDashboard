import { PermissionFlagsBits } from "discord-api-types/v10";
import type { NextRequest } from "next/server";
import { BitField } from "#lib/BitField";
import { ADD_TO_DISCORD_WITH_GUILD_ID_URL, OAUTH2_URL } from "#lib/Constants";
import { fetchClientGuild } from "#lib/Requests";
import { NextMiddlewareResponse, NextRedirectResponse } from "#lib/Responses";
import { fetchSession } from "#lib/Server";
import { memberPermissions } from "#lib/Util";

export const DashboardMiddleware = async (request: NextRequest) => {
  const { origin, pathname } = request.nextUrl;
  const session = await fetchSession();

  if (!session) {
    return NextRedirectResponse(OAUTH2_URL);
  }

  const guildID = pathname.split("/")[2];

  if (guildID) {
    const { found, error, guild } = await fetchClientGuild(guildID);

    if (error) {
      return NextRedirectResponse(`${origin}/dashboard`);
    }

    if (!(found && guild)) {
      return NextRedirectResponse(ADD_TO_DISCORD_WITH_GUILD_ID_URL(guildID));
    }

    const permissions = await memberPermissions(guild, session.userID);
    const bitField = new BitField(Number.parseInt(permissions.toString()));

    if (!bitField.has(Number.parseInt(PermissionFlagsBits.ManageGuild.toString()))) {
      return NextRedirectResponse(`${origin}/dashboard`);
    }
  }

  return NextMiddlewareResponse();
};
