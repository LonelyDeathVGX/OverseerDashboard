import type { Nullish } from "@sapphire/utilities";

export class DatabaseManager<T, U> {
  collection: Collections;

  constructor(options: DatabaseManagerOptions) {
    this.collection = options.collection;
  }

  private headers(): HeadersInit {
    return {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/ejson",
      "api-key": String(process.env.MONGO_DB_API_KEY),
      Accept: "application/json",
    };
  }

  private body(data: object): BodyInit {
    return JSON.stringify({
      ...data,
      collection: this.collection,
      dataSource: String(process.env.MONGO_DB_DATA_SOURCE),
      database: String(process.env.MONGO_DB_DATABASE),
    });
  }

  private flat(object: AnyObject, parentKey = "", result: AnyObject = {}): AnyObject {
    for (const key in object) {
      // biome-ignore lint/suspicious/noPrototypeBuiltins:
      if (object.hasOwnProperty(key)) {
        const newKey = parentKey ? `${parentKey}.${key}` : key;

        if (typeof object[key] === "object" && object[key] !== null && !Array.isArray(object[key])) {
          this.flat(object[key] as AnyObject, newKey, result);
        } else {
          result[newKey] = object[key];
        }
      }
    }

    return result;
  }

  private async query(action: Actions, data: object): Promise<T | Nullish> {
    const collectionRequest = await fetch(`${String(process.env.MONGO_DB_DATA_URL)}/action/${action}`, {
      method: "POST",
      headers: this.headers(),
      body: this.body(data),
    });
    const { document } = await collectionRequest.json();

    return document;
  }

  async findOne(filter: Partial<T>) {
    return await this.query("findOne", {
      filter,
    });
  }

  async updateOne(filter: Partial<T>, update: Partial<U>) {
    return await this.query("updateOne", {
      filter,
      update: {
        $set: this.flat(update),
      },
    });
  }

  async deleteOne(filter: Partial<T>) {
    return await this.query("deleteOne", {
      filter,
    });
  }

  async insertOne(document: Required<U>) {
    return await this.query("insertOne", {
      document,
    });
  }

  async upsert(filter: Partial<T>, update: Partial<U>, document: Required<U>) {
    const findOne = await this.findOne(filter);

    return findOne ? this.updateOne(filter, update) : this.insertOne(document);
  }
}

interface DatabaseManagerOptions {
  collection: Collections;
}

type Actions = "findOne" | "updateOne" | "deleteOne" | "insertOne";

type Collections = "GuildConfiguration" | "GuildSuggestion" | "UserWarn" | "ClientVoucher" | "UserSuggestion";

type AnyObject = {
  [key: string]: unknown;
};
