"use server";

import type { Nullish } from "@sapphire/utilities";
import type { JWTPayload } from "jose";
import { cookies } from "next/headers";
import { decryptJWT } from "./Util";

export const fetchSession = async (): Promise<Session | null> => {
  const authorization = cookies().get("authorization")?.value ?? "";
  const payload = await decryptJWT(authorization);

  return typeof payload === "object" ? (payload as Session) : null;
};

// biome-ignore lint/suspicious/useAwait:
export const deleteSession = async (): Promise<void> => {
  cookies().delete("authorization");
};

export type Session = {
  userID: string;
  username: string;
  avatarHash: string | Nullish;
  globalName: string | Nullish;
  name: string;
  email: string;
  accessToken: string;
} & JWTPayload;
