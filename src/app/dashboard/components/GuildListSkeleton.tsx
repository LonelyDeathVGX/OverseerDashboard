import { Card, CardContent } from "#ui/Card";
import { Skeleton } from "#ui/Skeleton";

export function GuildListSkeletonComponent() {
  return Array(4)
    .fill(undefined)
    .map((index) => (
      <Card key={index} className="overflow-hidden">
        <CardContent className="relative">
          <Skeleton className="h-48 w-full object-cover" />
          <div className="absolute top-0 flex h-full w-full flex-col items-center justify-center gap-4 p-4">
            <div className="size-24 rounded-full bg-default-900/50 p-2 backdrop-blur-sm">
              <Skeleton className="size-full rounded-full" />
            </div>
            <div className="w-full rounded-lg bg-default-900/50 p-2 text-center font-medium text-xs backdrop-blur-sm">
              Loading...
            </div>
          </div>
        </CardContent>
      </Card>
    ));
}
