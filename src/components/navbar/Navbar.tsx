import { CirclePlus, LayoutGrid, LifeBuoy } from "lucide-react";
import Link from "next/link";
import type { HTMLAttributeAnchorTarget, ReactElement } from "react";
import { ADD_TO_DISCORD_URL, SUPPORT_SERVER_URL } from "#lib/Constants";
import { fetchSession } from "#lib/Server";
import { Button } from "#ui/Button";
import { UseMediaQueryComponent } from "../UseMediaQuery";
import { NavbarDropdownComponent } from "./NavbarDropdown";
import { NavbarLoginComponent } from "./NavbarLogin";
import { NavbarLogoComponent } from "./NavbarLogo";
import { NavbarSheetComponent } from "./NavbarSheet";

export const Items: Item[] = [
  {
    name: "Invite",
    href: ADD_TO_DISCORD_URL,
    target: "_blank",
    icon: <CirclePlus className="size-5 text-default-400" />,
  },
  {
    name: "Server",
    href: SUPPORT_SERVER_URL,
    target: "_blank",
    icon: <LifeBuoy className="size-5 text-default-400" />,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    target: "_self",
    icon: <LayoutGrid className="size-5 text-default-400" />,
  },
];

export async function NavbarComponent({
  isDashboard,
}: {
  isDashboard: boolean;
}) {
  const session = await fetchSession();

  return (
    <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-center border-default-700 border-b bg-black/50 backdrop-blur-xl">
      <header className="flex w-full max-w-5xl items-center justify-between px-8">
        <NavbarLogoComponent shouldHideText={true} />
        <UseMediaQueryComponent mediaQuery="(min-width: 768px)">
          {!isDashboard && (
            <ul className="flex gap-4">
              {Items.map((item) => (
                <li key={item.name} className="text-sm">
                  <Button asChild={true} variant="link">
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
        <UseMediaQueryComponent mediaQuery="(min-width: 512px)">
          {session ? <NavbarDropdownComponent session={session} /> : <NavbarLoginComponent />}
        </UseMediaQueryComponent>
        <UseMediaQueryComponent mediaQuery="(max-width: 512px)">
          <NavbarSheetComponent session={session} />
        </UseMediaQueryComponent>
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
