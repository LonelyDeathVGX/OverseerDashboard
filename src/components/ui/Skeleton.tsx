import { cn } from "@/lib/Util";
import type { HTMLAttributes } from "react";

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse bg-default-800", className)} {...props} />;
}

export { Skeleton };
