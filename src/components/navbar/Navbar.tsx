import type { APIGuild } from "discord-api-types/v10";
import Link from "next/link";
import { LogoComponent } from "#components/Logo";
import { fetchSession } from "#lib/Server";
import { UseMediaQueryComponent } from "../UseMediaQuery";
import { LoginComponent } from "../buttons/Login";
import { SidebarSheetComponent } from "../sidebar/SidebarSheet";
import { NavbarLinksComponent } from "./NavbarLinks";
import { NavbarDropdownComponent } from "./dropdown/NavbarDropdown";
import { NavbarSheetComponent } from "./sheet/NavbarSheet";

export const NavbarComponent = async ({
  guild,
  isDashboard,
}: {
  guild?: APIGuild;
  isDashboard: boolean;
}) => {
  const session = await fetchSession();

  return (
    <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-center border-default-700 border-b bg-black/50 backdrop-blur-xl">
      <header className="flex w-full max-w-5xl items-center justify-between px-8">
        <Link href="/" aria-label="Overseer Main Page">
          <LogoComponent shouldHideLogo={true} />
        </Link>
        <NavbarLinksComponent isDashboard={isDashboard} />
        <div className="flex items-center gap-2">
          <UseMediaQueryComponent mediaQuery="(min-width: 512px)">
            {session ? <NavbarDropdownComponent session={session} /> : <LoginComponent />}
          </UseMediaQueryComponent>
          <UseMediaQueryComponent mediaQuery="(max-width: 512px)">
            <NavbarSheetComponent session={session} />
          </UseMediaQueryComponent>
          {isDashboard && (
            <UseMediaQueryComponent mediaQuery="(max-width: 768px)">
              <SidebarSheetComponent guild={guild as APIGuild} />
            </UseMediaQueryComponent>
          )}
        </div>
      </header>
    </nav>
  );
};
