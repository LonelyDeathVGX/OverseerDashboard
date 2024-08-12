import "server-only";
import { NextResponse as ServerNextResponse } from "next/server";

export const NextRedirectResponse = (url: string, init?: ResponseInit) =>
  ServerNextResponse.redirect(url, {
    ...init,
    status: 302,
  });

export const NextJSONResponse = ({
  data,
  init,
  status,
}: {
  data: unknown;
  init?: ResponseInit;
  status: number;
}) =>
  ServerNextResponse.json(
    {
      data,
      success: status === 200,
    },
    {
      ...init,
      status,
    },
  );

export const NextMiddlewareResponse = (init?: ResponseInit) =>
  ServerNextResponse.next({
    ...init,
    status: 200,
  });
