import { fetchUserGuilds } from "@/lib/Server";
import { GuildComponent } from "./Guild";

export async function GuildListComponent() {
  const { guilds, rateLimited } = await fetchUserGuilds();

  return guilds?.length ? (
    guilds.map((guild) => <GuildComponent key={guild.id} guild={guild} />)
  ) : (
    <p className="font-medium text-center text-foreground-500 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
      {rateLimited ? "You are being limited from Discord" : "No servers have been found"}
    </p>
  );
}
