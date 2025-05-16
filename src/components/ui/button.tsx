import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#820000] text-white shadow hover:bg-opacity-90 focus-visible:ring-[#820000]",
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:ring-red-600",
        outline:
          "border border-[#820000] bg-transparent text-[#820000] shadow-sm hover:bg-[#fdeecd] hover:text-white hover:border-opacity-90",
        secondary:
          "bg-[#fdeecd] text-[#820000] shadow-sm hover:bg-opacity-80 focus-visible:ring-[#fdeecd]",
        ghost: 
          "text-[#820000] hover:bg-[#fdeecd] hover:text-[#820000] focus-visible:ring-[#fdeecd]",
        link: 
          "text-[#820000] underline-offset-4 hover:underline focus-visible:ring-transparent",
        cream:
          "bg-[#F9F6EE] text-[#820000] shadow-sm hover:bg-opacity-90 hover:text-opacity-90 focus-visible:ring-[#F9F6EE]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-3 py-1.5 text-xs",
        lg: "h-12 rounded-md px-8 py-2.5 text-base",
        xl: "h-14 rounded-lg px-10 py-3 text-lg",
        icon: "h-10 w-10",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
        lg: "rounded-lg",
        none: "rounded-none",
      },
      elevation: {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
      elevation: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, elevation, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, elevation, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }