import { Card, CardContent } from "@/components/ui/Card";
import { cutText } from "@sapphire/utilities";
import { type RESTAPIPartialCurrentUserGuild, RouteBases } from "discord-api-types/v10";
import Image from "next/image";
import Link from "next/link";

export function GuildComponent({ guild }: { guild: RESTAPIPartialCurrentUserGuild }) {
  return (
    <Link href={`/dashboard/${guild.id}`}>
      <Card className="overflow-hidden">
        <CardContent className="relative">
          <Image
            width={1024}
            height={1024}
            alt={`${guild.name} Icon`}
            src={
              guild.icon ? `${RouteBases.cdn}/icons/${guild.id}/${guild.icon}.png?size=1024` : "/assets/Discord.webp"
            }
            className="h-48 w-full select-none object-cover blur-xl"
          />
          <div className="absolute top-0 flex h-full w-full flex-col items-center justify-center gap-4 p-4">
            <div className="size-24 rounded-full bg-default-950/50 p-2 backdrop-blur-sm">
              <Image
                width={1024}
                height={1024}
                alt={`${guild.name} Icon`}
                src={
                  guild.icon
                    ? `${RouteBases.cdn}/icons/${guild.id}/${guild.icon}.png?size=1024`
                    : "/assets/Discord.webp"
                }
                className="size-full rounded-full"
              />
            </div>
            <div className="w-full rounded-lg bg-default-950/50 p-2 text-center font-medium text-xs backdrop-blur-sm">
              {cutText(guild.name, 20)}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
