import "server-only";

import { NextResponse as ServerNextResponse } from "next/server";

export function NextRedirectResponse(url: string, init?: ResponseInit) {
  return ServerNextResponse.redirect(url, {
    ...init,
    status: 302,
  });
}

export function NextJSONResponse({
  data,
  init,
  status,
}: {
  data: unknown;
  init?: ResponseInit;
  status: number;
}) {
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

export function NextMiddlewareResponse(init?: ResponseInit) {
  return ServerNextResponse.next({
    ...init,
    status: 200,
  });
}
