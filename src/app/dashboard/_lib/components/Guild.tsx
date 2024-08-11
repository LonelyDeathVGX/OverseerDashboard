import { cutText } from "@sapphire/utilities";
import { type RESTAPIPartialCurrentUserGuild, RouteBases } from "discord-api-types/v10";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "#ui/Card";

export const GuildComponent = ({
  partialGuild,
}: {
  partialGuild: RESTAPIPartialCurrentUserGuild;
}) => {
  return (
    <Link aria-label={`${partialGuild.name} Dashboard Page`} href={`/dashboard/${partialGuild.id}`}>
      <Card
        className="relative h-48 w-full select-none overflow-hidden bg-center bg-cover bg-no-repeat p-0"
        style={{
          backgroundImage: `url(${partialGuild.icon ? `${RouteBases.cdn}/icons/${partialGuild.id}/${partialGuild.icon}.webp?size=1024` : "/assets/Discord.webp"})`,
        }}
      >
        <CardContent className="absolute top-0 flex h-full w-full flex-col items-center justify-center gap-4 p-4 backdrop-blur-xl">
          <div className="size-24 rounded-full bg-default-950/50 p-2 backdrop-blur-sm">
            <Image
              alt={`${partialGuild.name} Icon`}
              className="size-full rounded-full"
              height={1024}
              src={
                partialGuild.icon
                  ? `${RouteBases.cdn}/icons/${partialGuild.id}/${partialGuild.icon}.webp?size=1024`
                  : "/assets/Discord.webp"
              }
              width={1024}
            />
          </div>
          <div className="w-full rounded-lg bg-default-950/50 p-2 text-center text-xs backdrop-blur-sm">
            {cutText(partialGuild.name, 20)}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
