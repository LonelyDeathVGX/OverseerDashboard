"use client";

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { cutText } from "@sapphire/utilities";
import { type RESTAPIPartialCurrentUserGuild, RouteBases } from "discord-api-types/v10";
import { useRouter } from "next/navigation";

export function GuildComponent({ guild }: { guild: RESTAPIPartialCurrentUserGuild }) {
  const router = useRouter();
  const handleRedirect = () => {
    router.push(`/dashboard/${guild.id}`);
  };

  return (
    <Card isPressable={true} onPress={handleRedirect}>
      <CardBody className="p-0 overflow-hidden">
        <Image
          width="100%"
          alt={guild.name}
          className="w-full object-cover h-[140px] rounded-b-none"
          src={guild.icon ? `${RouteBases.cdn}/icons/${guild.id}/${guild.icon}.png?size=1024` : "/assets/Discord.webp"}
        />
      </CardBody>
      <CardFooter>
        <p className="font-medium text-center text-small w-full">{cutText(guild.name, 25)}</p>
      </CardFooter>
    </Card>
  );
}
