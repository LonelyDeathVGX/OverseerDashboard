import Link from "next/link";
import { Fragment } from "react";
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from "#components/ui/DropdownMenu";
import { Links } from "#lib/constants/Links";

export function NavbarDropdownLinksComponent() {
  return (["useful_links", "about_us"] as const).map((group, index) => (
    <Fragment key={group}>
      {!!index && <DropdownMenuSeparator />}
      <DropdownMenuGroup>
        {Links(true)[group].map((link) => (
          <DropdownMenuItem asChild={true} key={link.name}>
            <Link
              aria-label={`${link.name} ${link.target === "_self" ? "Page" : "Link"}`}
              className="flex items-center gap-2"
              href={link.href}
              target={link.target}
            >
              {link.icon}
              {link.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuGroup>
    </Fragment>
  ));
}
