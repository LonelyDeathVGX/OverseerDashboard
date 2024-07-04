import { NavbarComponent } from "@/components/common/main/navbar/Navbar";
import { ADD_TO_DISCORD_WITH_GUILD_ID } from "@/lib/Constants";
import { fetchClientGuild } from "@/lib/Server";
import { GuildProvider } from "@/lib/contexts/Guild";
import type { APIGuild } from "discord-api-types/v10";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: {
    id: string;
  };
}>) {
  const { found, error, guild } = await fetchClientGuild(params.id);

  if (error) {
    return redirect(`/?error=${encodeURIComponent("Unable to obtain the server")}`);
  }

  if (!found) {
    return redirect(ADD_TO_DISCORD_WITH_GUILD_ID(params.id));
  }

  return (
    <GuildProvider guild={guild as APIGuild}>
      <NavbarComponent isDashboard={true} />
      {children}
    </GuildProvider>
  );
}
