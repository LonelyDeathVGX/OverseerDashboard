import TTLCache from "@isaacs/ttlcache";

export const cache = new TTLCache({
  max: 100,
  ttl: 5000,
});
