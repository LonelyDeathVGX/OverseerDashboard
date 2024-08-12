import type { HTMLAttributes } from "react";
import { cn } from "../Util";

const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("animate-pulse bg-default-700", className)} {...props} />;
};

export { Skeleton };
