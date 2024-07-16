import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../Util";

const alertVariants = cva("flex w-full gap-2 rounded-lg p-4", {
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
});

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => <h5 ref={ref} className={cn("font-bold", className)} {...props} />,
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("text-sm", className)} {...props} />,
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
