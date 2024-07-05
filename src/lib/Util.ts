import { KEY } from "@/lib/Constants";
import type { Nullish } from "@sapphire/utilities";
import { type ClassValue, clsx } from "clsx";
import Crypto from "crypto-js";
import { type JWTPayload, SignJWT, jwtVerify } from "jose";
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";
import type { Session } from "./Server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encrypt(data: string): string {
  return Crypto.AES.encrypt(data, process.env.KEY ?? "").toString();
}

export function decrypt(data: string): string {
  return Crypto.AES.decrypt(data, process.env.KEY ?? "").toString(Crypto.enc.Utf8);
}

export async function encryptJWT(payload: JWTPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7 days")
    .sign(KEY);
}

export async function decryptJWT(token: string): Promise<Session | Nullish> {
  try {
    const { payload } = await jwtVerify(token, KEY, {
      algorithms: ["HS256"],
    });

    return <Session>payload;
  } catch {
    return null;
  }
}

export function bitFieldValues(bitField: number): number[] {
  const fields = [];

  for (let i = 0; i < Math.log2(bitField) + 1; i++) {
    const power = 2 ** i;
    const result = bitField & power;

    if (result !== 0) {
      fields.push(result);
    }
  }

  return fields;
}

export function nextResponse({ data, status }: { data: unknown; status: number }): NextResponse {
  return NextResponse.json(
    {
      data,
      success: status === 200,
    },
    {
      status,
    },
  );
}

export function nextRedirect(url: string): NextResponse {
  return NextResponse.redirect(url, {
    status: 302,
  });
}
