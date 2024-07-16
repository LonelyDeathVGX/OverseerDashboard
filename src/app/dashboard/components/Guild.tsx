import { cutText } from "@sapphire/utilities";
import { type RESTAPIPartialCurrentUserGuild, RouteBases } from "discord-api-types/v10";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "#ui/Card";

export function GuildComponent({ guild }: { guild: RESTAPIPartialCurrentUserGuild }) {
  return (
    <Link href={`/dashboard/${guild.id}`} aria-label={`${guild.name} Dashboard Page`}>
      <Card
        style={{
          backgroundImage: `url(${guild.icon ? `${RouteBases.cdn}/icons/${guild.id}/${guild.icon}.webp?size=1024` : "/assets/Discord.webp"})`,
        }}
        className="relative h-48 w-full select-none overflow-hidden bg-center bg-cover bg-no-repeat"
      >
        <CardContent className="absolute top-0 flex h-full w-full flex-col items-center justify-center gap-4 p-4 backdrop-blur-xl">
          <div className="size-24 rounded-full bg-default-950/50 p-2 backdrop-blur-sm">
            <Image
              width={1024}
              height={1024}
              alt={`${guild.name} Icon`}
              src={
                guild.icon ? `${RouteBases.cdn}/icons/${guild.id}/${guild.icon}.webp?size=1024` : "/assets/Discord.webp"
              }
              className="size-full rounded-full"
            />
          </div>
          <div className="w-full rounded-lg bg-default-950/50 p-2 text-center text-xs backdrop-blur-sm">
            {cutText(guild.name, 20)}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
