import { cutText } from "@sapphire/utilities";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "#components/ui/Card";
import type { Member } from "../../page";

export const MemberComponent = ({
  member,
}: {
  member: Member;
}) => {
  return (
    <Link
      aria-label={`${member.name}'s Discord Profile Link`}
      href={`https://discord.com/users/${member.userID}`}
      target="_blank"
    >
      <Card
        className="relative h-52 w-full select-none overflow-hidden bg-center bg-cover bg-no-repeat p-0"
        style={{
          backgroundImage: `url(/assets/team/core/${member.userID}.webp)`,
        }}
      >
        <CardContent className="absolute top-0 flex h-full w-full flex-col items-center justify-center gap-4 p-4 backdrop-blur-xl">
          <div className="size-24 rounded-full bg-default-950/50 p-2 backdrop-blur-sm">
            <Image
              alt={`${member.name}'s Avatar`}
              className="size-full rounded-full"
              height={1024}
              src={`/assets/team/core/${member.userID}.webp`}
              width={1024}
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
};
