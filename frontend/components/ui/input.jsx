import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex h-10 w-full rounded-md px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-slate-200 bg-white  placeholder:text-slate-500  focus-visible:ring-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
        setting:
          "bg-[#CFE8C6] placeholder:text-slate-400 focus-visible:ring-[#75B066]",
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Input = React.forwardRef(({ className, variant, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(inputVariants({ variant, className }))}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

// const Input = React.forwardRef(({ className, type, ...props }, ref) => {
//   return (
//     (<input
//       type={type}
//       className={cn(
//         "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
//         className
//       )}
//       ref={ref}
//       {...props} />)
//   );
// })
// Input.displayName = "Input"

export { Input, inputVariants }
