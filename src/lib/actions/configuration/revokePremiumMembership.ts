"use server";

import { GuildConfigurationManager } from "#database/GuildConfiguration";
import { fetchClientGuild } from "#lib/Requests";
import { fetchSession } from "#lib/Server";
import { getGuildID, middleware } from "../Util";

export async function revokePremiumMembership(formData: FormData) {
  try {
    const guildID = getGuildID(formData.get("guildID"));

    await middleware(guildID);

    const guildConfiguration = await GuildConfigurationManager.findOne({
      guildID,
    });

    if (!guildConfiguration?.premium.enabled) {
      throw new Error("The guild does not have a premium membership");
    }

    const session = await fetchSession();
    const { guild } = await fetchClientGuild(guildID);

    if (session?.userID !== guild?.owner_id) {
      throw new Error("You cannot perform this action");
    }

    await GuildConfigurationManager.updateOne(
      {
        guildID,
      },
      {
        premium: {
          enabled: false,
          expiresAt: 0,
        },
      },
    );

    return {
      message: "The membership has been revoked",
      success: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
        success: false,
      };
    }

    return {
      message: "Internal Server Error",
      success: false,
    };
  }
}
