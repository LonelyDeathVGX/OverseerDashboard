import { MONGO_DB_API_KEY, MONGO_DB_DATABASE, MONGO_DB_DATA_SOURCE, MONGO_DB_DATA_URL } from "@/lib/Constants";
import type { GuildConfiguration, Schemas } from "@/typings/Schemas";

const headers: HeadersInit = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/ejson",
  "api-key": String(MONGO_DB_API_KEY),
  Accept: "application/json",
};
const body = (collection: Collections, data: object): string =>
  JSON.stringify({
    ...data,
    collection,
    dataSource: String(MONGO_DB_DATA_SOURCE),
    database: String(MONGO_DB_DATABASE),
  });

async function query<T extends Schemas>(action: Actions, body: string): Promise<Query<T>> {
  const collectionRequest = await fetch(`${String(MONGO_DB_DATA_URL)}/action/${action}`, {
    method: "POST",
    headers,
    body,
    cache: "no-cache",
  });
  const { document } = await collectionRequest.json();

  return {
    status: collectionRequest.status,
    document: document as T,
  };
}

export async function fetchGuildConfiguration(guildID: string) {
  return await query<GuildConfiguration>(
    "findOne",
    body("GuildConfiguration", {
      filter: {
        guild_id: guildID,
      },
    }),
  );
}

interface Query<T> {
  status: number;
  document?: T;
}

type Actions = "findOne" | "find" | "insert" | "update" | "updateOne" | "delete" | "deleteOne";
type Collections = "GuildConfiguration" | "GuildSuggestion" | "UserWarn" | "ClientVoucher" | "UserSuggestion";
