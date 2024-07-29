import { PermissionFlagsBits } from "discord-api-types/v10";
import type { NextRequest } from "next/server";
import { BitField } from "#lib/BitField";
import { ADD_TO_DISCORD_WITH_GUILD_ID_URL, OAUTH2_URL } from "#lib/Constants";
import { fetchClientGuild } from "#lib/Requests";
import { NextResponseNext, NextResponseRedirect } from "#lib/Responses";
import { fetchSession } from "#lib/Server";
import { memberPermissions } from "#lib/Util";

export async function DashboardMiddleware(request: NextRequest) {
  const { origin, pathname } = request.nextUrl;
  const session = await fetchSession();

  if (!session) {
    return NextResponseRedirect({
      url: OAUTH2_URL,
    });
  }

  const id = pathname.split("/")[2];

  if (id) {
    const { found, error, guild } = await fetchClientGuild(id);

    if (error) {
      return NextResponseRedirect({
        url: `${origin}/dashboard`,
      });
    }

    if (!(found && guild)) {
      return NextResponseRedirect({
        url: ADD_TO_DISCORD_WITH_GUILD_ID_URL(id),
      });
    }

    const permissions = await memberPermissions(guild, session.userID);
    const bitField = new BitField(Number.parseInt(permissions.toString()));

    if (!bitField.has(Number.parseInt(PermissionFlagsBits.ManageGuild.toString()))) {
      return NextResponseRedirect({
        url: `${origin}/dashboard`,
      });
    }
  }

  return NextResponseNext({});
}
