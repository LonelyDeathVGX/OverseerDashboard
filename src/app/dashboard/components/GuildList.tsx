import { Alert, AlertDescription } from "@/components/ui/Alert";
import { fetchUserGuilds } from "@/lib/Requests";
import { CircleAlert, CircleX } from "lucide-react";
import { GuildComponent } from "./Guild";

export async function GuildListComponent() {
  const { guilds, rateLimited } = await fetchUserGuilds();

  return guilds?.length ? (
    guilds.map((guild) => <GuildComponent key={guild.id} guild={guild} />)
  ) : rateLimited ? (
    <Alert variant="danger" className="col-span-1 xs:col-span-2 sm:col-span-3 md:col-span-4">
      <CircleX className="size-5" />
      <AlertDescription>You have sent too many requests to Discord and have been limited.</AlertDescription>
    </Alert>
  ) : (
    <Alert variant="warning" className="col-span-1 xs:col-span-2 sm:col-span-3 md:col-span-4">
      <CircleAlert className="size-5" />
      <AlertDescription>
        You do not have servers with the <code className="rounded-lg bg-amber-900/25 p-1 font-bold">Manage Server</code>
        permission.
      </AlertDescription>
    </Alert>
  );
}
