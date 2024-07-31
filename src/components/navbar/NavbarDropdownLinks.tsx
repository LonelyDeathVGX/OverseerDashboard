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
          <DropdownMenuItem key={link.name} asChild={true}>
            <Link
              target={link.target}
              href={link.href}
              aria-label={`${link.name} ${link.target === "_self" ? "Page" : "Link"}`}
              className="flex items-center gap-2"
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
