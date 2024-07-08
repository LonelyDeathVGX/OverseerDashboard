import { DropdownComponent } from "@/components/common/main/navbar/Dropdown";
import { Button } from "@/components/ui/Button";
import { ADD_TO_DISCORD_URL, OAUTH2_URL, SUPPORT_SERVER_URL } from "@/lib/Constants";
import { fetchSession } from "@/lib/Server";
import { LogIn } from "lucide-react";
import Link from "next/link";
import type { HTMLAttributeAnchorTarget } from "react";

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
    <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-center border-default-800 border-b bg-black/50 backdrop-blur-xl">
      <header className="flex w-full max-w-5xl items-center justify-between px-5">
        <Link href="/" className="font-bold text-white text-xl">
          Overseer
        </Link>
        {!isDashboard && (
          <ul className="hidden gap-4 md:flex">
            {Items.map((item) => (
              <li key={item.name} className="font-medium text-sm">
                <Button asChild={true} variant="link">
                  <Link target={item.target} href={item.href}>
                    {item.name}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        )}
        {session ? (
          <DropdownComponent session={session} />
        ) : (
          <Button asChild={true} variant="outline">
            <Link href={OAUTH2_URL} className="flex items-center gap-2">
              <LogIn className="size-5" />
              <span className="xs:block hidden">Login with Discord</span>
            </Link>
          </Button>
        )}
      </header>
    </nav>
  );
}
