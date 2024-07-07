import { cn } from "@/lib/Util";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        danger: "bg-rose-900/50 text-rose-400 hover:bg-rose-900/25",
        default: "bg-white text-black hover:bg-white/75",
        ghost: "text-white hover:bg-default-900/75",
        link: "text-white underline-offset-4 hover:underline",
        outline: "text-white border border-default-800 hover:bg-default-900/75 hover:border-transparent",
        secondary: "bg-default-900 text-white hover:bg-default-900/75",
        success: "bg-emerald-900/50 text-emerald-400 hover:bg-emerald-900/25",
        warning: "bg-amber-900/50 text-amber-400 hover:bg-amber-900/25",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
