import Image from "next/image";
import { Card, CardContent } from "#ui/Card";

export const GuildListSkeletonComponent = () => {
  return Array(4)
    .fill(undefined)
    .map((_, index) => (
      <Card
        className="relative h-48 w-full select-none overflow-hidden bg-center bg-cover bg-no-repeat p-0"
        key={index.toString()}
        style={{
          backgroundImage: `url("/assets/Discord.webp")`,
        }}
      >
        <CardContent className="absolute top-0 flex h-full w-full flex-col items-center justify-center gap-4 p-4 backdrop-blur-xl">
          <div className="size-24 rounded-full bg-default-950/50 p-2 backdrop-blur-sm">
            <Image
              alt={"Icon"}
              className="size-full rounded-full"
              height={1024}
              src="/assets/Discord.webp"
              width={1024}
            />
          </div>
          <div className="w-full rounded-lg bg-default-950/50 p-2 text-center text-xs backdrop-blur-sm">Loading...</div>
        </CardContent>
      </Card>
    ));
};
