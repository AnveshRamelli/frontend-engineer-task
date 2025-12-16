import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/helpers"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-black text-white hover:bg-gray-900 focus:ring-black",
        outline:
          "border border-black text-black hover:bg-black hover:text-white focus:ring-black",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

function Button({ className, variant, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
