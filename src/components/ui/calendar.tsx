"use client"

import type * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4 bg-white rounded-lg shadow-md", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-5",
        caption: "flex justify-center pt-2 pb-3 relative items-center",
        caption_label: "text-sm font-medium text-[#820000]",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 bg-white p-0 border-[#820000] border-opacity-30 hover:bg-[#fdeecd] hover:border-[#820000] hover:border-opacity-70"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-[#820000] rounded-md w-10 font-medium text-[0.85rem] py-2",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-[#fdeecd] [&:has([aria-selected].day-outside)]:bg-[#fdeecd]/40 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-10 w-10 p-0 font-normal text-[#820000] hover:bg-[#fdeecd]/60 hover:text-[#820000] aria-selected:opacity-100 transition-all duration-200"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-[#820000] text-white hover:bg-[#820000] hover:text-white focus:bg-[#820000] focus:text-white",
        day_today: "bg-[#F9F6EE] text-[#820000] font-medium border border-[#820000] border-opacity-30",
        day_outside:
          "day-outside text-gray-400 aria-selected:bg-[#fdeecd]/30 aria-selected:text-gray-500",
        day_disabled: "text-gray-300 opacity-50 hover:bg-transparent",
        day_range_middle:
          "aria-selected:bg-[#fdeecd] aria-selected:text-[#820000]",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-5 w-5 text-[#820000]", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-5 w-5 text-[#820000]", className)} {...props} />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }