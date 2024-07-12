import type { ReactNode } from "react";
import { NavbarComponent } from "#components/navbar/Navbar";
import { SidebarComponent } from "./components/Sidebar";

export default function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: {
    id: string;
  };
}) {
  return (
    <div>
      <NavbarComponent isDashboard={true} />
      <div>
        <SidebarComponent guildID={params.id} />
        <main className="p-8 md:ml-80">{children}</main>
      </div>
    </div>
  );
}
