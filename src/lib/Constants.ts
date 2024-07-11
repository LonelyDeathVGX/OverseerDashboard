export const CLIENT_ID = "1228065406196125810";

export const BASE_URL =
  process.env.NODE_ENV === "production" ? "https://overseer-bot.pages.dev" : "http://localhost:3000";

export const ADD_TO_DISCORD_URL = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&permissions=117760&scope=bot`;
export const SUPPORT_SERVER_URL = "https://discord.gg/gud55BjNFC";
export const ADD_TO_DISCORD_WITH_GUILD_ID_URL = (guildID: string) =>
  `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&permissions=117760&scope=bot&guild_id=${guildID}`;
export const CALLBACK_URL = `${BASE_URL}/api/auth/callback`;
export const OAUTH2_URL = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(CALLBACK_URL)}&scope=identify+email+guilds`;
