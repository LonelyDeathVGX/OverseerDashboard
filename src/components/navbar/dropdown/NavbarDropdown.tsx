import { RouteBases } from "discord-api-types/v10";
import type { Session } from "#lib/Server";
import { Avatar, AvatarFallback, AvatarImage } from "#ui/Avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "#ui/DropdownMenu";
import { NavbarDropdownLinksComponent } from "./NavbarDropdownLinks";
import { NavbarDropdownLogoutComponent } from "./NavbarDropdownLogout";
import { NavbarDropdownUserComponent } from "./NavbarDropdownUser";

export const NavbarDropdownComponent = ({
  session,
}: {
  session: Session;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={true}>
        <Avatar className="size-10 cursor-pointer rounded-full">
          <AvatarImage
            alt={`${session.username}'s Avatar`}
            src={`${`${RouteBases.cdn}/avatars/${session.userID}/${session.avatarHash}.webp`}`}
          />
          <AvatarFallback>{session.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <NavbarDropdownUserComponent session={session} />
        <DropdownMenuSeparator />
        <NavbarDropdownLinksComponent />
        <DropdownMenuSeparator />
        <NavbarDropdownLogoutComponent />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
