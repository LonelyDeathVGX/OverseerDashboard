import type { KyRequest, KyResponse, NormalizedOptions } from "ky";
import ky from "ky";

export const makeClientRequest = async (
  url: string,
  {
    json,
    method,
  }: {
    json?: object;
    method: MakeRequestMethods;
  },
) =>
  await ky(url, {
    hooks: {
      afterResponse: [afterResponseHook],
    },
    json,
    method,
    retry: 0,
  });

const afterResponseHook = async (_request: KyRequest, _options: NormalizedOptions, response: KyResponse) => {
  if (!response.ok) {
    throw new Error(
      (
        (await response.json()) as {
          data: string;
        }
      ).data,
    );
  }
};

type MakeRequestMethods = "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";
