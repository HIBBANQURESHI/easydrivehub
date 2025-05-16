import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border border-gray-200/30 bg-white/10 shadow-xl",
      "backdrop-blur-lg backdrop-saturate-150 backdrop-filter",
      "transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
      "dark:border-gray-800/40 dark:bg-gray-900/20 dark:shadow-gray-900/30",
      "overflow-hidden group",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-2 p-8 pb-4 border-b border-gray-100/50 dark:border-gray-800/40",
      "bg-gradient-to-r from-gray-50/40 to-white/30 dark:from-gray-900/40 dark:to-gray-800/30",
      "backdrop-blur-sm",
      className
    )}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "font-bold text-2xl tracking-tight bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400",
      "bg-clip-text text-transparent",
      "group-hover:from-primary group-hover:to-primary/80 transition-colors duration-300",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-sm text-gray-500 dark:text-gray-400 font-medium",
      "transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300",
      className
    )}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "p-8 pt-4 space-y-4 text-gray-700 dark:text-gray-300",
      "bg-white/5 dark:bg-gray-900/5 backdrop-blur-sm",
      "transition-colors duration-300 group-hover:text-gray-800 dark:group-hover:text-gray-200",
      className
    )}
    {...props}
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-8 pt-4 border-t border-gray-100/50 dark:border-gray-800/40",
      "bg-gradient-to-b from-gray-50/20 to-white/30 dark:from-gray-800/20 dark:to-gray-900/30",
      "backdrop-blur-sm",
      "justify-end space-x-3",
      className
    )}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }