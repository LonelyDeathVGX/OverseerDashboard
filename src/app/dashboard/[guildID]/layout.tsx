import type { APIGuild } from "discord-api-types/v10";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { UseMediaQueryComponent } from "#components/UseMediaQuery";
import { NavbarComponent } from "#components/navbar/Navbar";
import { SidebarComponent } from "#components/sidebar/Sidebar";
import { fetchClientGuild } from "#lib/Requests";

export function generateMetadata(): Metadata {
  return {
    robots: {
      index: false,
    },
  };
}

export default async ({
  children,
  params,
}: {
  children: ReactNode;
  params: {
    guildID: string;
  };
}) => {
  const { guild } = await fetchClientGuild(params.guildID);

  return (
    <div>
      <NavbarComponent isDashboard={true} guild={guild as APIGuild} />
      <>
        <UseMediaQueryComponent mediaQuery="(min-width: 768px)">
          <SidebarComponent guild={guild as APIGuild} />
        </UseMediaQueryComponent>
        <main className="p-8 md:ml-80">{children}</main>
      </>
    </div>
  );
};
