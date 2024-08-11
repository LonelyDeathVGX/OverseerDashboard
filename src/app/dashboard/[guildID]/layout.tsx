import type { APIGuild } from "discord-api-types/v10";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { UseMediaQueryComponent } from "#components/UseMediaQuery";
import { NavbarComponent } from "#components/navbar/Navbar";
import { SidebarComponent } from "#components/sidebar/Sidebar";
import { fetchClientGuild } from "#lib/Requests";

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
};

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
      <NavbarComponent guild={guild as APIGuild} isDashboard={true} />
      <>
        <UseMediaQueryComponent mediaQuery="(min-width: 768px)">
          <SidebarComponent guild={guild as APIGuild} />
        </UseMediaQueryComponent>
        <main className="p-8 md:ml-80">{children}</main>
      </>
    </div>
  );
};
