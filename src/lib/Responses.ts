import { NextResponse as ServerNextResponse } from "next/server";

export function NextResponseRedirect({ url, init }: { url: string; init?: ResponseInit }) {
  return ServerNextResponse.redirect(url, {
    ...init,
    status: 302,
  });
}

export function NextResponseJSON({ data, status, init }: { data: unknown; status: number; init?: ResponseInit }) {
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

export function NextResponseNext({ init }: { init?: ResponseInit }) {
  return ServerNextResponse.next({
    ...init,
    status: 200,
  });
}
