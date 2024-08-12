import "server-only";
import TTLCache from "@isaacs/ttlcache";

export const createCache = <V>({
  maxItems = 100,
  timeToLive = 5000,
}: {
  maxItems?: number;
  timeToLive?: number;
}) =>
  new TTLCache<string, V>({
    max: maxItems,
    ttl: timeToLive,
  });
