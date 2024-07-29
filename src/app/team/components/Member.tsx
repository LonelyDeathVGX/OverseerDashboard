import { cutText } from "@sapphire/utilities";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "#components/ui/Card";
import type { Member } from "../page";

export function MemberComponent({
  member,
}: {
  member: Member;
}) {
  return (
    <Link href={`https://discord.com/users/${member.id}`} aria-label={`${member.name} Discord Profile Link`}>
      <Card
        style={{
          backgroundImage: `url(/assets/team/core/${member.id}.webp)`,
        }}
        className="relative h-52 w-full select-none overflow-hidden bg-center bg-cover bg-no-repeat p-0"
      >
        <CardContent className="absolute top-0 flex h-full w-full flex-col items-center justify-center gap-4 p-4 backdrop-blur-xl">
          <div className="size-24 rounded-full bg-default-950/50 p-2 backdrop-blur-sm">
            <Image
              width={1024}
              height={1024}
              alt={`${member.name}'s Avatar`}
              src={`/assets/team/core/${member.id}.webp`}
              className="size-full rounded-full"
            />
          </div>
          <div className="flex w-full flex-col justify-center rounded-lg bg-default-950/50 p-2 text-center text-xs backdrop-blur-sm">
            {cutText(member.name, 20)}
            <span className="text-default-400">{member.roles.join(", ")}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
