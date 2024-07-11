import type { GuildConfiguration, Schemas } from "#schemas";

const headers: HeadersInit = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/ejson",
  "api-key": String(process.env.MONGO_DB_API_KEY),
  Accept: "application/json",
};
const body = (collection: Collections, data: object): string =>
  JSON.stringify({
    ...data,
    collection,
    dataSource: String(process.env.MONGO_DB_DATA_SOURCE),
    database: String(process.env.MONGO_DB_DATABASE),
  });

async function query<T extends Schemas>(action: Actions, body: string, tags: string[]): Promise<Query<T>> {
  const collectionRequest = await fetch(`${String(process.env.MONGO_DB_DATA_URL)}/action/${action}`, {
    method: "POST",
    headers,
    body,
    cache: "no-cache",
    next: {
      tags,
    },
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
        guildID,
      },
    }),
    [`${guildID}_GeneralConfiguration`],
  );
}

export async function updateGuildConfiguration(guildID: string, payload: object) {
  return await query<GuildConfiguration>(
    "updateOne",
    body("GuildConfiguration", {
      filter: {
        guildID,
      },
      update: payload,
    }),
    [`${guildID}_GeneralConfiguration`],
  );
}

interface Query<T> {
  status: number;
  document?: T;
}

type Actions = "findOne" | "find" | "insert" | "update" | "updateOne" | "delete" | "deleteOne";
type Collections = "GuildConfiguration" | "GuildSuggestion" | "UserWarn" | "ClientVoucher" | "UserSuggestion";
