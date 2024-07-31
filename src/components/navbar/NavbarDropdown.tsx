import { RouteBases } from "discord-api-types/v10";
import type { Session } from "#lib/Server";
import { Avatar, AvatarFallback, AvatarImage } from "#ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "#ui/DropdownMenu";
import { NavbarDropdownLinksComponent } from "./NavbarDropdownLinks";
import { NavbarDropdownLogoutComponent } from "./NavbarDropdownLogout";

export function NavbarDropdownComponent({
  session,
}: {
  session: Session;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={true}>
        <Avatar className="size-10 cursor-pointer rounded-full ring ring-default-700">
          <AvatarImage
            alt={`${session.username}'s Avatar`}
            src={`${`${RouteBases.cdn}/avatars/${session.userID}/${session.avatarHash}.webp`}`}
          />
          <AvatarFallback>{session.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center gap-2">
            <Avatar className="size-8 rounded-lg">
              <AvatarImage
                alt={`${session.username}'s Avatar`}
                src={`${`${RouteBases.cdn}/avatars/${session.userID}/${session.avatarHash}.webp`}`}
              />
              <AvatarFallback>{session.name}</AvatarFallback>
            </Avatar>
            <span className="flex flex-col">
              <h1 className="font-bold text-sm">@{session.username}</h1>
              <p className="text-default-400 text-xs">{session.userID}</p>
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <NavbarDropdownLinksComponent />
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <NavbarDropdownLogoutComponent />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
