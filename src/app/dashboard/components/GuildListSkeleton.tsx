import Image from "next/image";
import { Card, CardContent } from "#ui/Card";

export function GuildListSkeletonComponent() {
  return Array(4)
    .fill(undefined)
    .map((index) => (
      <Card
        key={index}
        style={{
          backgroundImage: `url("/assets/Discord.webp")`,
        }}
        className="relative h-48 w-full select-none overflow-hidden bg-center bg-cover bg-no-repeat"
      >
        <CardContent className="absolute top-0 flex h-full w-full flex-col items-center justify-center gap-4 p-4 backdrop-blur-xl">
          <div className="size-24 rounded-full bg-default-950/50 p-2 backdrop-blur-sm">
            <Image
              width={1024}
              height={1024}
              alt={"Icon"}
              src="/assets/Discord.webp"
              className="size-full rounded-full"
            />
          </div>
          <div className="w-full rounded-lg bg-default-950/50 p-2 text-center font-medium text-xs backdrop-blur-sm">
            Loading...
          </div>
        </CardContent>
      </Card>
    ));
}
