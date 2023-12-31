import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-bold whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-gray-1 hover:bg-primary/90 dark:bg-gray-1 dark:text-primary dark:hover:bg-gray-1/90",
        secondary:
          "bg-secondary text-slate-900 hover:bg-secondary/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        white:
          "bg-white text-t-paragraph hover:bg-white/90 dark:bg-t-paragraph dark:text-white dark:hover:bg-t-paragraph/90 shadow-md",
        link: "text-primary underline-offset-4 hover:underline dark:text-t-invert",
        destructive:
          "bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
        outline:
          "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        ghost:
          "text-t-title hover:bg-gray-1 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        transparent: "text-t-title",
        setting:
          "border-2 border-[#75B066] bg-[#75B066] text-gray-1 rounded-full px-6 py-2",
        setting_outline:
          "border-2 border-[#75B066] text-[#75B066] rounded-full px-6 py-2",
      },
      size: {
        default: "rounded-md px-3 py-2 lg:px-5",
        square: "rounded p-2",
        md: "w-full px-6 py-3 rounded-md",
        lg: "rounded-md px-8 py-2",
        full: "rounded-full px-3 py-1 md:px-3 md:py-2",
        none: "p-none",
        icon: "w-10",
      },
      textSize: {
        default: "text-14 md:text-16 lg:text-20",
        sm: "text-16",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      textSize: "default",
    },
  }
);

const Button = React.forwardRef(
  (
    {
      className,
      variant,
      size,
      textSize,
      asChild = false,
      onClick = null,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, textSize, className }))}
        ref={ref}
        onClick={onClick}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
