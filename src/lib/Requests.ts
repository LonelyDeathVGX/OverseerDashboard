import "server-only";
import {
  type APIGuild,
  type APIGuildMember,
  PermissionFlagsBits,
  type RESTAPIPartialCurrentUserGuild,
  type RESTGetAPICurrentUserGuildsResult,
  RESTJSONErrorCodes,
  RouteBases,
  Routes,
} from "discord-api-types/v10";
import { BitField } from "./BitField";
import { createCache } from "./Cache";
import { decrypt } from "./Util";

const userGuildsCache = createCache<FetchUserGuildsResponse>({
  timeToLive: 10000,
});

const internalFetchUserGuilds = async (accessToken: string): Promise<FetchUserGuildsResponse> => {
  const decryptedAccessToken = decrypt(accessToken);
  const guildsRequest = await fetch(`${RouteBases.api}/${Routes.userGuilds()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${decryptedAccessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!guildsRequest.ok) {
    return {
      rateLimited: guildsRequest.status === 429,
      guilds: [],
    };
  }

  const guildsResponse = (await guildsRequest.json()) as RESTGetAPICurrentUserGuildsResult;
  const filteredGuilds = guildsResponse.filter((partialGuild) =>
    new BitField(Number.parseInt(partialGuild.permissions)).has(
      Number.parseInt(PermissionFlagsBits.ManageGuild.toString()),
    ),
  );

  return {
    rateLimited: false,
    guilds: filteredGuilds,
  };
};

export const fetchUserGuilds = async (accessToken: string) => {
  const cachedData = userGuildsCache.get(accessToken);

  if (cachedData) {
    return cachedData;
  }

  const fetchedGuilds = await internalFetchUserGuilds(accessToken);

  if (!fetchedGuilds.rateLimited) {
    userGuildsCache.set(accessToken, fetchedGuilds);
  }

  return fetchedGuilds;
};

export const fetchClientGuild = async (guildID: string): Promise<FetchClientGuildResponse> => {
  const guildRequest = await fetch(`${RouteBases.api}/${Routes.guild(guildID)}`, {
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
};

export const fetchGuildMember = async (guildID: string, memberID: string): Promise<FetchGuildMemberResponse> => {
  const memberRequest = await fetch(`${RouteBases.api}/${Routes.guildMember(guildID, memberID)}`, {
    method: "GET",
    headers: {
      Authorization: `Bot ${process.env.CLIENT_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  const memberResponse = await memberRequest.json();

  if ("errors" in memberResponse) {
    return {
      found: false,
      error: true,
    };
  }

  if (memberRequest.status === 404 || memberResponse.code === RESTJSONErrorCodes.UnknownGuild) {
    return {
      found: false,
      error: false,
    };
  }

  return {
    found: true,
    error: false,
    member: memberResponse,
  };
};

interface FetchUserGuildsResponse {
  rateLimited: boolean;
  guilds?: RESTAPIPartialCurrentUserGuild[];
}

interface FetchClientGuildResponse {
  found: boolean;
  error: boolean;
  guild?: APIGuild;
}

interface FetchGuildMemberResponse {
  found: boolean;
  error: boolean;
  member?: APIGuildMember;
}
