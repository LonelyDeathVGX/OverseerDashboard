import "server-only";

import { NextResponse as ServerNextResponse } from "next/server";

export function NextResponseRedirect({
  init,
  url,
}: {
  init?: ResponseInit;
  url: string;
}) {
  return ServerNextResponse.redirect(url, {
    ...init,
    status: 302,
  });
}

export function NextResponseJSON({
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

export function NextResponseNext({
  init,
}: {
  init?: ResponseInit;
}) {
  return ServerNextResponse.next({
    ...init,
    status: 200,
  });
}
