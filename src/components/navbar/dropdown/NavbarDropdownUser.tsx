import { RouteBases } from "discord-api-types/v10";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "#components/ui/Avatar";
import { DropdownMenuGroup, DropdownMenuItem } from "#components/ui/DropdownMenu";
import type { Session } from "#lib/Server";

export const NavbarDropdownUserComponent = ({
  session,
}: {
  session: Session;
}) => {
  return (
    <DropdownMenuGroup>
      <DropdownMenuItem asChild={true} className="h-auto">
        <Link
          aria-label={`${session.username}'s Discord Profile Link`}
          className="flex items-center gap-2"
          href={`https://discord.com/users/${session.userID}`}
          target="_blank"
        >
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
        </Link>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
};
