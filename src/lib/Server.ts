"use server";

import { decrypt, decryptJWT } from "@/lib/Util";
import type { Nullish } from "@sapphire/utilities";
import {
  type APIGuild,
  PermissionFlagsBits,
  type RESTAPIPartialCurrentUserGuild,
  type RESTGetAPICurrentUserGuildsResult,
  RESTJSONErrorCodes,
  RouteBases,
  Routes,
} from "discord-api-types/v10";
import type { JWTPayload } from "jose";
import { cookies } from "next/headers";
import { BitField } from "./BitField";

export async function fetchSession(): Promise<Session | Nullish> {
  const authorization = cookies().get("authorization")?.value ?? "";
  const payload = await decryptJWT(authorization);

  return typeof payload === "object" ? <Session>payload : null;
}

// biome-ignore lint/suspicious/useAwait:
export async function deleteSession(): Promise<void> {
  cookies().delete("authorization");
}

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

export type Session = {
  userId: string;
  username: string;
  avatarHash: string | Nullish;
  globalName: string | Nullish;
  name: string;
  email: string;
  accessToken: string;
} & JWTPayload;
