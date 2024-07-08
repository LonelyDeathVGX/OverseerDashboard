import { LogoutItemComponent } from "@/components/common/main/navbar/LogoutItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { ADD_TO_DISCORD_URL, SUPPORT_SERVER_URL } from "@/lib/Constants";
import type { Session } from "@/lib/Server";
import { RouteBases } from "discord-api-types/v10";
import Link from "next/link";
import type { HTMLAttributeAnchorTarget } from "react";

const Items: {
  name: string;
  href: string;
  target: HTMLAttributeAnchorTarget;
}[] = [
  {
    name: "Add to Discord",
    href: ADD_TO_DISCORD_URL,
    target: "_blank",
  },
  {
    name: "Support Server",
    href: SUPPORT_SERVER_URL,
    target: "_blank",
  },
  {
    name: "Manage Servers",
    href: "/dashboard",
    target: "_self",
  },
];

export function DropdownComponent({ session }: { session: Session }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={true}>
        <Avatar className="size-10 cursor-pointer rounded-full ring ring-default-800">
          <AvatarImage
            alt={`${session.username}'s Avatar`}
            src={`${`${RouteBases.cdn}/avatars/${session.userId}/${session.avatarHash}.png`}`}
          />
          <AvatarFallback>{session.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit shadow-lg">
        <DropdownMenuGroup className="p-2">
          <DropdownMenuLabel className="flex items-center gap-2">
            <Avatar className="size-8 rounded-lg">
              <AvatarImage
                alt={`${session.username}'s Avatar`}
                src={`${`${RouteBases.cdn}/avatars/${session.userId}/${session.avatarHash}.png`}`}
              />
              <AvatarFallback>{session.name}</AvatarFallback>
            </Avatar>
            <span className="flex flex-col">
              <h1 className="font-bold text-sm text-white">@{session.username}</h1>
              <p className="font-medium text-default-400 text-xs">{session.userId}</p>
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="p-2">
          {Items.map((item) => (
            <DropdownMenuItem key={item.name} asChild={true}>
              <Link target={item.target} href={item.href}>
                {item.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="p-2">
          <LogoutItemComponent />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
