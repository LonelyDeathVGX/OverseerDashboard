import { cutText } from "@sapphire/utilities";
import { type APIGuild, RouteBases } from "discord-api-types/v10";
import { ChevronDown, CirclePlus } from "lucide-react";
import Link from "next/link";
import { ADD_TO_DISCORD_URL } from "#lib/Constants";
import { fetchUserGuilds } from "#lib/Requests";
import { type Session, fetchSession } from "#lib/Server";
import { Avatar, AvatarFallback, AvatarImage } from "#ui/Avatar";
import { Button } from "#ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "#ui/DropdownMenu";

export async function SidebarDropdownComponent({ guild }: { guild: APIGuild }) {
  const { accessToken } = (await fetchSession()) as Session;
  const { guilds } = await fetchUserGuilds(accessToken);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={true}>
        <Button variant="default" className="w-full justify-start gap-2 [&[data-state=open]>span>svg]:rotate-180">
          <Avatar className="size-5 rounded-full">
            <AvatarImage
              alt={`${guild.name} Icon`}
              src={
                guild.icon ? `${RouteBases.cdn}/icons/${guild.id}/${guild.icon}.webp?size=1024` : "/assets/Discord.webp"
              }
            />
            <AvatarFallback>{guild.name}</AvatarFallback>
          </Avatar>
          {cutText(guild.name, 25)}
          <span className="flex w-full justify-end">
            <ChevronDown className="size-5 text-default-400 transition-transform duration-200" />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        {guilds?.length && (
          <DropdownMenuGroup className="p-2">
            {guilds
              .filter((data) => data.id !== guild.id)
              .map((data) => (
                <DropdownMenuItem key={data.id} asChild={true}>
                  <Link
                    target="_self"
                    href={`/dashboard/${data.id}`}
                    aria-label={`${data.name} Dashboard Page`}
                    className="flex items-center gap-2"
                  >
                    <Avatar className="size-5 rounded-full">
                      <AvatarImage
                        alt={`${data.name} Icon`}
                        src={
                          data.icon
                            ? `${RouteBases.cdn}/icons/${data.id}/${data.icon}.webp?size=1024`
                            : "/assets/Discord.webp"
                        }
                      />
                      <AvatarFallback>{data.name}</AvatarFallback>
                    </Avatar>
                    {cutText(data.name, 20)}
                  </Link>
                </DropdownMenuItem>
              ))}
          </DropdownMenuGroup>
        )}
        {guilds?.length && <DropdownMenuSeparator />}
        <DropdownMenuGroup className="p-2">
          <DropdownMenuItem asChild={true}>
            <Link
              target="_blank"
              href={ADD_TO_DISCORD_URL}
              aria-label="Add to a Server"
              className="flex items-center gap-2"
            >
              <CirclePlus className="size-5 text-default-400" />
              Add to a Server
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
