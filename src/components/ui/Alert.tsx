import { cn } from "@/lib/Util";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const alertVariants = cva("w-full rounded-lg p-4 flex gap-2", {
  variants: {
    variant: {
      danger: "bg-rose-900/50 text-rose-400",
      default: "bg-cyan-900/50 text-cyan-400",
      secondary: "bg-fuchsia-900/50 text-fuchsia-400",
      success: "bg-emerald-900/50 text-emerald-400",
      warning: "bg-amber-900/50 text-amber-400",
    },
  },
  defaultVariants: {
    variant: "default",
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
  ({ className, ...props }, ref) => <div ref={ref} className={cn("text-sm font-medium", className)} {...props} />,
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
