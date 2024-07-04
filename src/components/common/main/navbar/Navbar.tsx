import { ADD_TO_DISCORD_URL, OAUTH2_URL, SUPPORT_SERVER_URL } from "@/lib/Constants";
import { fetchSession } from "@/lib/Server";
import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { DropdownComponent } from "./Dropdown";

const Items: {
  name: string;
  href: string;
  isExternal?: boolean;
}[] = [
  {
    name: "Invite",
    href: ADD_TO_DISCORD_URL,
    isExternal: true,
  },
  {
    name: "Server",
    href: SUPPORT_SERVER_URL,
    isExternal: true,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
];

export async function NavbarComponent({ isDashboard }: { isDashboard: boolean }) {
  const session = await fetchSession();

  return (
    <Navbar isBordered={true} isBlurred={true}>
      <NavbarContent justify="start">
        <NavbarBrand>
          <Link href="/" className="font-bold text-xl text-white">
            Overseer
          </Link>
        </NavbarBrand>
      </NavbarContent>
      {isDashboard ? null : (
        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          {Items.map((item) => (
            <NavbarItem key={item.name}>
              <Link isExternal={item.isExternal} color="foreground" href={item.href} className="font-medium text-sm">
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      )}
      <NavbarContent justify="end">
        {session ? (
          <DropdownComponent session={session} />
        ) : (
          <Button as={Link} href={OAUTH2_URL} className="font-medium">
            Login
          </Button>
        )}
      </NavbarContent>
    </Navbar>
  );
}
