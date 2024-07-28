import type { APIGuild } from "discord-api-types/v10";
import { CirclePlus, LayoutDashboard, LifeBuoy } from "lucide-react";
import Link from "next/link";
import type { HTMLAttributeAnchorTarget, ReactElement } from "react";
import { LogoComponent } from "#components/Logo";
import { ADD_TO_DISCORD_URL, SUPPORT_SERVER_URL } from "#lib/Constants";
import { fetchSession } from "#lib/Server";
import { Button } from "#ui/Button";
import { UseMediaQueryComponent } from "../UseMediaQuery";
import { SidebarSheetComponent } from "../sidebar/SidebarSheet";
import { NavbarDropdownComponent } from "./NavbarDropdown";
import { NavbarLoginComponent } from "./NavbarLogin";
import { NavbarSheetComponent } from "./NavbarSheet";

export const Items: (useLongText?: boolean) => Item[] = (useLongText) => [
  {
    name: useLongText ? "Add to Discord" : "Invite",
    href: ADD_TO_DISCORD_URL,
    target: "_blank",
    icon: <CirclePlus className="size-5 text-default-400" />,
  },
  {
    name: useLongText ? "Support Server" : "Discord",
    href: SUPPORT_SERVER_URL,
    target: "_blank",
    icon: <LifeBuoy className="size-5 text-default-400" />,
  },
  {
    name: useLongText ? "Manage Servers" : "Dashboard",
    href: "/dashboard",
    target: "_self",
    icon: <LayoutDashboard className="size-5 text-default-400" />,
  },
];

export async function NavbarComponent({
  isDashboard,
  guild,
}: {
  isDashboard: boolean;
  guild?: APIGuild;
}) {
  const session = await fetchSession();

  return (
    <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-center border-default-700 border-b bg-black/50 backdrop-blur-xl">
      <header className="flex w-full max-w-5xl items-center justify-between px-8">
        <Link href="/" aria-label="Overseer Main Page">
          <LogoComponent shouldHideLogo={true} />
        </Link>
        <UseMediaQueryComponent mediaQuery="(min-width: 768px)">
          {!isDashboard && (
            <ul className="flex gap-4">
              {Items(false).map((item) => (
                <li key={item.name} className="text-sm">
                  <Button asChild={true} variant="ghost">
                    <Link
                      target={item.target}
                      href={item.href}
                      aria-label={`${item.name} ${item.target === "_self" ? "Page" : "Link"}`}
                    >
                      {item.name}
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </UseMediaQueryComponent>
        <div className="flex items-center gap-2">
          <UseMediaQueryComponent mediaQuery="(min-width: 512px)">
            {session ? <NavbarDropdownComponent session={session} /> : <NavbarLoginComponent />}
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
}

interface Item {
  name: string;
  href: string;
  icon: ReactElement;
  target: HTMLAttributeAnchorTarget;
}
