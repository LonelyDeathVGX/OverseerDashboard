import { LogIn } from "lucide-react";
import Link from "next/link";
import type { HTMLAttributeAnchorTarget } from "react";
import { ADD_TO_DISCORD_URL, OAUTH2_URL, SUPPORT_SERVER_URL } from "#lib/Constants";
import { fetchSession } from "#lib/Server";
import { Button } from "#ui/Button";
import { NavbarDropdownComponent } from "./NavbarDropdown";

const Items: {
  name: string;
  href: string;
  target: HTMLAttributeAnchorTarget;
}[] = [
  {
    name: "Invite",
    href: ADD_TO_DISCORD_URL,
    target: "_blank",
  },
  {
    name: "Server",
    href: SUPPORT_SERVER_URL,
    target: "_blank",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    target: "_self",
  },
];

export async function NavbarComponent({ isDashboard }: { isDashboard: boolean }) {
  const session = await fetchSession();

  return (
    <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-center border-default-700 border-b bg-black/50 backdrop-blur-xl">
      <header className="flex w-full max-w-5xl items-center justify-between px-8">
        <Link href="/" aria-label="Overseer Main Page" className="font-bold text-white text-xl">
          Overseer
        </Link>
        {!isDashboard && (
          <ul className="hidden gap-4 md:flex">
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
        {session ? (
          <NavbarDropdownComponent session={session} />
        ) : (
          <Button asChild={true} variant="outline">
            <Link href={OAUTH2_URL} aria-label="Login with Discord" className="flex items-center gap-2">
              <LogIn className="size-5" />
              <span className="xs:block hidden">Login with Discord</span>
            </Link>
          </Button>
        )}
      </header>
    </nav>
  );
}
