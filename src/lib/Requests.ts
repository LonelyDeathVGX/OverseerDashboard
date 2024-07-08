import { BitField } from "@/lib/BitField";
import { fetchSession } from "@/lib/Server";
import { decrypt } from "@/lib/Util";
import {
  type APIGuild,
  PermissionFlagsBits,
  type RESTAPIPartialCurrentUserGuild,
  type RESTGetAPICurrentUserGuildsResult,
  RESTJSONErrorCodes,
  RouteBases,
  Routes,
} from "discord-api-types/v10";

export async function fetchUserGuilds(): Promise<FetchUserGuildsResponse> {
  const session = await fetchSession();

  if (!session) {
    return {
      rateLimited: false,
      guilds: [],
    };
  }

  const decryptedAccessToken = decrypt(session.accessToken);
  const guildsRequest = await fetch(`${RouteBases.api}/${Routes.userGuilds()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${decryptedAccessToken}`,
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 5,
    },
  });

  if (!guildsRequest.ok) {
    return {
      rateLimited: guildsRequest.status === 429,
      guilds: [],
    };
  }

  const guildsResponse = <RESTGetAPICurrentUserGuildsResult>await guildsRequest.json();
  const filteredGuilds = guildsResponse.filter((guild) =>
    new BitField(Number.parseInt(guild.permissions)).has(Number.parseInt(PermissionFlagsBits.ManageGuild.toString())),
  );

  return {
    rateLimited: false,
    guilds: filteredGuilds,
  };
}

export async function fetchClientGuild(guildId: string): Promise<FetchClientGuildResponse> {
  const guildRequest = await fetch(`${RouteBases.api}/${Routes.guild(guildId)}`, {
    method: "GET",
    headers: {
      Authorization: `Bot ${process.env.CLIENT_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  const guildResponse = await guildRequest.json();

  if ("errors" in guildResponse) {
    return {
      found: false,
      error: true,
    };
  }

  if (guildRequest.status === 404 || guildResponse.code === RESTJSONErrorCodes.UnknownGuild) {
    return {
      found: false,
      error: false,
    };
  }

  return {
    found: true,
    error: false,
    guild: guildResponse,
  };
}

interface FetchUserGuildsResponse {
  rateLimited: boolean;
  guilds?: RESTAPIPartialCurrentUserGuild[];
}

interface FetchClientGuildResponse {
  found: boolean;
  error: boolean;
  guild?: APIGuild;
}
