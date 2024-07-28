import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../Util";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        amber: "bg-amber-950 text-amber-400 hover:bg-amber-950/75",
        cyan: "bg-cyan-950 text-cyan-400 hover:bg-cyan-950/75",
        default: "bg-default-900 hover:bg-default-900/75",
        emerald: "bg-emerald-950 text-emerald-400 hover:bg-emerald-950/75",
        fuchsia: "bg-fuchsia-950 text-fuchsia-400 hover:bg-fuchsia-950/75",
        ghost: "hover:bg-default-900/75",
        link: "underline-color decoration-cyan-400 underline-offset-4 hover:underline",
        outline: "border border-default-700 hover:border-transparent hover:bg-default-900/75",
        rose: "bg-rose-950 text-rose-400 hover:bg-rose-950/75",
        white: "bg-white text-black hover:bg-white/75",
      },
      size: {
        default: "h-10 p-3",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "white",
      size: "default",
    },
  },
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
