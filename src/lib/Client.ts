import type { KyRequest, KyResponse, NormalizedOptions } from "ky";

export const afterResponseHook = async (_request: KyRequest, _options: NormalizedOptions, response: KyResponse) => {
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
