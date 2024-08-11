import { CircleAlert, CircleX } from "lucide-react";
import type { ReactElement } from "react";
import { fetchUserGuilds } from "#lib/Requests";
import { type Session, fetchSession } from "#lib/Server";
import { Alert, AlertDescription } from "#ui/Alert";
import { GuildComponent } from "./Guild";

export const GuildListComponent = async () => {
  const { accessToken } = (await fetchSession()) as Session;
  const { guilds, rateLimited } = await fetchUserGuilds(accessToken);
  const errorType = rateLimited === true ? "rateLimit" : "empty";
  const errorElements: Record<typeof errorType, ErrorElement> = {
    rateLimit: {
      description: "You have sent too many requests to Discord and have been limited.",
      icon: <CircleX className="size-5" />,
      variant: "rose",
    },
    empty: {
      description: "You do not have servers with the Manage Server permission.",
      icon: <CircleAlert className="size-5" />,
      variant: "amber",
    },
  };

  return guilds?.length ? (
    guilds.map((partialGuild) => <GuildComponent key={partialGuild.id} partialGuild={partialGuild} />)
  ) : (
    <Alert className="col-span-1 xs:col-span-2 sm:col-span-3 md:col-span-4" variant={errorElements[errorType].variant}>
      {errorElements[errorType].icon}
      <AlertDescription>{errorElements[errorType].description}</AlertDescription>
    </Alert>
  );
};

interface ErrorElement {
  description: string;
  icon: ReactElement;
  variant: "amber" | "rose";
}
