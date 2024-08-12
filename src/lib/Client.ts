import ky, { type KyRequest, type KyResponse, type NormalizedOptions } from "ky";

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
    const dataResponse = (await response.json()) as {
      data: unknown;
      success: boolean;
    };

    throw new Error(String(dataResponse.data));
  }
};

type MakeRequestMethods = "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";
