import "server-only";

import TTLCache from "@isaacs/ttlcache";

export const createCache = ({
  timeToLive = 5000,
}: {
  timeToLive: number;
}) =>
  new TTLCache({
    max: 100,
    ttl: timeToLive,
  });
