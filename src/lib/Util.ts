import "server-only";

import type { Nullish } from "@sapphire/utilities";
import Crypto from "crypto-js";
import { type APIGuild, type APIRole, PermissionFlagsBits } from "discord-api-types/v10";
import { type JWTPayload, SignJWT, jwtVerify } from "jose";
import { fetchGuildMember } from "./Requests";
import type { Session } from "./Server";

export function encrypt(data: string): string {
  return Crypto.AES.encrypt(data, process.env.ENCRYPT_KEY ?? "").toString();
}

export function decrypt(data: string): string {
  return Crypto.AES.decrypt(data, process.env.ENCRYPT_KEY ?? "").toString(Crypto.enc.Utf8);
}

export async function encryptJWT(payload: JWTPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7 days")
    .sign(new TextEncoder().encode(process.env.JWT_KEY));
}

export async function decryptJWT(token: string): Promise<Session | Nullish> {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_KEY), {
      algorithms: ["HS256"],
    });

    return <Session>payload;
  } catch {
    return null;
  }
}

export async function memberPermissions(guild: APIGuild, memberID: string): Promise<bigint> {
  const ALL_PERMISSIONS = Object.values(PermissionFlagsBits).reduce(
    (previousPermissions, permission) => previousPermissions | permission,
    BigInt(0),
  );

  if (guild.owner_id === memberID) {
    return ALL_PERMISSIONS;
  }

  const rolesMap: Map<string, APIRole> = new Map();

  for (const role of guild.roles) {
    rolesMap.set(role.id, role);
  }

  const { found, error, member } = await fetchGuildMember(guild.id, memberID);

  if (!found || error || !member) {
    return BigInt(0);
  }

  const everyoneRole = rolesMap.get(guild.id) as APIRole;
  let permissions = Number.parseInt(everyoneRole.permissions);

  for (const roleID of member.roles) {
    const role = rolesMap.get(roleID);

    if (role) {
      permissions |= Number.parseInt(role.permissions);
    }
  }

  if (BigInt(permissions) & PermissionFlagsBits.Administrator) {
    return ALL_PERMISSIONS;
  }

  return BigInt(permissions);
}

export async function makeRequest<T>({
  path,
  method,
}: {
  path: string;
  method: MakeRequestMethods;
}): Promise<T> {
  const request = await fetch(path, {
    method,
    credentials: "include",
  });

  return (await request.json()) as T;
}

type MakeRequestMethods = "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";
