import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-bitcoin hover:shadow-glow-bitcoin",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-glow-cyber hover:shadow-glow-cyber",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        bitcoin: "bg-gradient-bitcoin text-primary-foreground hover:scale-105 shadow-glow-bitcoin hover:shadow-glow-bitcoin transition-all duration-300",
        cyber: "bg-gradient-cyber text-foreground hover:scale-105 shadow-glow-cyber hover:shadow-glow-cyber transition-all duration-300",
        hunter: "bg-gradient-hunter text-foreground hover:scale-105 shadow-glow-hunter hover:shadow-glow-hunter transition-all duration-300",
        teamMurat: "bg-gradient-bitcoin border-2 border-bitcoin/30 text-primary-foreground hover:scale-105 shadow-glow-bitcoin",
        teamJager: "bg-gradient-hunter border-2 border-hunter/30 text-foreground hover:scale-105 shadow-glow-hunter",
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
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
