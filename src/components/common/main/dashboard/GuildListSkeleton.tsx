import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { Skeleton } from "@nextui-org/skeleton";

export function GuildListSkeletonComponent() {
  return Array(4)
    .fill(undefined)
    .map((index) => (
      <Card key={index} isPressable={true}>
        <CardBody className="p-0 overflow-hidden">
          <Skeleton className="w-full object-cover h-[140px] rounded-b-none" />
        </CardBody>
        <CardFooter>
          <p className="font-medium text-center text-small w-full">Loading...</p>
        </CardFooter>
      </Card>
    ));
}
