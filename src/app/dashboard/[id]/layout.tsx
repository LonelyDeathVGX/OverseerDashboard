import { SidebarComponent } from "@/components/common/dashboard/sidebar/Sidebar";
import { NavbarComponent } from "@/components/common/main/navbar/Navbar";
import { ADD_TO_DISCORD_WITH_GUILD_ID_URL } from "@/lib/Constants";
import { fetchClientGuild } from "@/lib/Requests";
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
  const { found, error } = await fetchClientGuild(params.id);

  if (error) {
    return redirect(`/?error=${encodeURIComponent("Unable to obtain the server")}`);
  }

  if (!found) {
    return redirect(ADD_TO_DISCORD_WITH_GUILD_ID_URL(params.id));
  }

  return (
    <div>
      <NavbarComponent isDashboard={true} />
      <div>
        <SidebarComponent />
        <main className="p-8 md:ml-80">{children}</main>
      </div>
    </div>
  );
}
