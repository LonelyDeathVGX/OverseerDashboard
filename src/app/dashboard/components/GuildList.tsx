import { CircleAlert, CircleX } from "lucide-react";
import { bold } from "#components/Fonts";
import { fetchUserGuilds } from "#lib/Requests";
import { Alert, AlertDescription } from "#ui/Alert";
import { GuildComponent } from "./Guild";

export async function GuildListComponent() {
  const { guilds, rateLimited } = await fetchUserGuilds();

  return guilds?.length ? (
    guilds.map((guild) => <GuildComponent key={guild.id} guild={guild} />)
  ) : rateLimited ? (
    <Alert variant="rose" className="col-span-1 xs:col-span-2 sm:col-span-3 md:col-span-4">
      <CircleX className="size-5" />
      <AlertDescription>You have sent too many requests to Discord and have been limited.</AlertDescription>
    </Alert>
  ) : (
    <Alert variant="amber" className="col-span-1 xs:col-span-2 sm:col-span-3 md:col-span-4">
      <CircleAlert className="size-5" />
      <AlertDescription>
        You do not have servers with the{" "}
        <code className={`${bold.className} rounded-lg bg-amber-900/25 p-1`}>Manage Server</code>
        permission.
      </AlertDescription>
    </Alert>
  );
}
