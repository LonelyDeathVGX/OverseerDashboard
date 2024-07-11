import { NextResponse as ServerNextResponse } from "next/server";

export function NextRedirect({ url, init }: { url: string; init?: ResponseInit }) {
  return ServerNextResponse.redirect(url, {
    ...init,
    status: 302,
  });
}

export function NextResponse({ data, status, init }: { data: unknown; status: number; init?: ResponseInit }) {
  return ServerNextResponse.json(
    {
      data,
      success: status === 200,
    },
    {
      ...init,
      status,
    },
  );
}
