import type { APIGuild } from "discord-api-types/v10";
import type { ReactNode } from "react";
import { NavbarComponent } from "#components/navbar/Navbar";
import { fetchClientGuild } from "#lib/Requests";
import { SidebarComponent } from "./components/Sidebar";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: {
    id: string;
  };
}) {
  const { guild } = await fetchClientGuild(params.id);

  return (
    <div>
      <NavbarComponent isDashboard={true} />
      <div>
        <SidebarComponent guild={guild as APIGuild} />
        <main className="p-8 md:ml-80">{children}</main>
      </div>
    </div>
  );
}
