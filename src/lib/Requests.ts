import "server-only";
import {
  type APIGuild,
  type APIGuildMember,
  PermissionFlagsBits,
  type RESTAPIPartialCurrentUserGuild,
  RESTJSONErrorCodes,
  Routes,
} from "discord-api-types/v10";
import { BitField } from "./BitField";
import { createCache } from "./Cache";
import { decrypt, rest, userRest } from "./Util";

const userGuildsCache = createCache<{
  rateLimited: boolean;
  guilds: RESTAPIPartialCurrentUserGuild[];
}>({
  timeToLive: 10000,
});

const internalFetchUserGuilds = async (
  accessToken: string,
): Promise<{
  rateLimited: boolean;
  guilds: RESTAPIPartialCurrentUserGuild[];
}> =>
  await userRest(decrypt(accessToken))
    .get(Routes.userGuilds())
    .then((response) => ({
      rateLimited: false,
      guilds: (response as RESTAPIPartialCurrentUserGuild[]).filter((partialGuild) =>
        new BitField(Number.parseInt(partialGuild.permissions)).has(
          Number.parseInt(PermissionFlagsBits.ManageGuild.toString()),
        ),
      ),
    }))
    .catch((error) => ({
      rateLimited: error.status === 429,
      guilds: [],
    }));

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

export const fetchClientGuild = async (
  guildID: string,
): Promise<{
  found: boolean;
  error: boolean;
  guild?: APIGuild;
}> =>
  await rest
    .get(Routes.guild(guildID))
    .then((response) => ({
      found: true,
      error: false,
      guild: response as APIGuild,
    }))
    .catch((error) => ({
      found: error.status === 404 || error.rawError.code === RESTJSONErrorCodes.UnknownGuild,
      error: error.status === 400 || "_errors" in error.rawError,
    }));

export const fetchGuildMember = async (
  guildID: string,
  memberID: string,
): Promise<{
  found: boolean;
  error: boolean;
  member?: APIGuildMember;
}> =>
  await rest
    .get(Routes.guildMember(guildID, memberID))
    .then((response) => ({
      found: true,
      error: false,
      member: response as APIGuildMember,
    }))
    .catch((error) => ({
      found: error.status === 404 || error.rawError.code === RESTJSONErrorCodes.UnknownMember,
      error: error.status === 400 || "_errors" in error.rawError,
    }));
