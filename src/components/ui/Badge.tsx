import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../Util";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-medium text-xs uppercase transition-colors",
  {
    variants: {
      variant: {
        amber: "bg-amber-950 text-amber-400",
        cyan: "bg-cyan-950 text-cyan-400",
        emerald: "bg-emerald-950 text-emerald-400",
        fuchsia: "bg-fuchsia-950 text-fuchsia-400",
        rose: "bg-rose-950 text-rose-400",
        white: "bg-white text-black",
      },
    },
    defaultVariants: {
      variant: "cyan",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };