export const CLIENT_ID = "1228065406196125810";
export const CLIENT_SECRET = process.env.CLIENT_SECRET;

export const ADD_TO_DISCORD_WITH_GUILD_ID_URL = (guildID: string) =>
  `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&permissions=117760&scope=bot&guild_id=${guildID}`;
export const BASE_URL =
  process.env.NODE_ENV === "production" ? "https://overseer-bot.pages.dev" : "http://localhost:3000";
export const CALLBACK_URL = `${BASE_URL}/api/auth/callback`;
export const OAUTH2_URL = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(CALLBACK_URL)}&scope=identify+email+guilds`;

export const ADD_TO_DISCORD_URL = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&permissions=117760&scope=bot`;
export const SUPPORT_SERVER_URL = "https://discord.gg/gud55BjNFC";

export const KEY = new TextEncoder().encode(process.env.KEY);

export const MONGO_DB_API_KEY = process.env.MONGO_DB_API_KEY;
export const MONGO_DB_DATABASE = process.env.MONGO_DB_DATABASE;
export const MONGO_DB_DATA_SOURCE = process.env.MONGO_DB_DATA_SOURCE;
export const MONGO_DB_DATA_URL = process.env.MONGO_DB_DATA_URL;
