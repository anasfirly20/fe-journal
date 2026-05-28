"use client";

import * as React from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker";

import { cn } from "../lib/cn";
import { Button, buttonVariants } from "./Button";

import { ru } from "react-day-picker/locale";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale = ru,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar rounded-2xl border border-border bg-card p-5 shadow-popover",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),

        months: cn(
          "relative flex flex-col gap-6 md:flex-row md:gap-5",
          defaultClassNames.months,
        ),

        month: cn("flex w-full flex-col gap-5", defaultClassNames.month),

        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between",
          defaultClassNames.nav,
        ),

        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-11 rounded-full border border-border-light bg-card p-0 text-text-primary shadow-card transition-all duration-200 hover:border-border hover:bg-accent hover:text-primary",
          defaultClassNames.button_previous,
        ),

        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-11 rounded-full border border-border-light bg-card p-0 text-text-primary shadow-card transition-all duration-200 hover:border-border hover:bg-accent hover:text-primary",
          defaultClassNames.button_next,
        ),

        month_caption: cn(
          "flex h-11 w-full items-center justify-center px-12",
          defaultClassNames.month_caption,
        ),

        dropdowns: cn(
          "flex h-11 items-center justify-center gap-2 text-sm font-semibold",
          defaultClassNames.dropdowns,
        ),

        dropdown_root: cn(
          "relative rounded-[var(--radius-sm)]",
          defaultClassNames.dropdown_root,
        ),

        dropdown: cn("absolute inset-0 opacity-0", defaultClassNames.dropdown),

        caption_label: cn(
          "text-[32px] font-semibold tracking-[-0.03em] text-text-primary select-none",
          captionLayout === "label"
            ? ""
            : "flex items-center gap-1 rounded-[var(--radius-sm)] px-2 py-1 [&>svg]:size-3.5 [&>svg]:text-text-secondary",
          defaultClassNames.caption_label,
        ),

        weekdays: cn("mb-2 flex", defaultClassNames.weekdays),

        weekday: cn(
          "flex-1 text-center text-[15px] font-medium uppercase tracking-[0.12em] text-text-secondary",
          defaultClassNames.weekday,
        ),

        week: cn("mt-1 flex w-full", defaultClassNames.week),

        week_number_header: cn("w-12", defaultClassNames.week_number_header),

        week_number: cn(
          "text-sm text-text-secondary",
          defaultClassNames.week_number,
        ),

        day: cn(
          "group/day relative h-12 w-12 p-0 text-center",
          props.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-[18px]"
            : "[&:first-child[data-selected=true]_button]:rounded-l-[18px]",
          defaultClassNames.day,
        ),

        range_start: cn(
          "relative bg-accent rounded-l-[20px]",
          defaultClassNames.range_start,
        ),

        range_middle: cn("bg-accent", defaultClassNames.range_middle),

        range_end: cn(
          "relative bg-accent rounded-r-[20px]",
          defaultClassNames.range_end,
        ),

        today: defaultClassNames.today,

        outside: cn("text-text-muted opacity-60", defaultClassNames.outside),

        disabled: cn("text-text-muted opacity-30", defaultClassNames.disabled),

        hidden: cn("invisible", defaultClassNames.hidden),

        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },

        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-5", className)} {...props} />
            );
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-5", className)}
                {...props}
              />
            );
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          );
        },

        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),

        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex h-12 w-12 items-center justify-center">
                {children}
              </div>
            </td>
          );
        },

        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & {
  locale?: Partial<Locale>;
}) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) {
      ref.current?.focus();
    }
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "relative z-10 flex h-12 w-12 items-center justify-center rounded-lg border border-transparent text-[15px] font-medium text-text-primary transition-all duration-200 hover:bg-accent! hover:text-primary! hover:border-primary/10 focus-visible:ring-2 focus-visible:ring-ring",

        "data-[selected-single=true]:border-primary/15 data-[selected-single=true]:bg-accent data-[selected-single=true]:text-primary",

        "data-[range-start=true]:rounded-[20px] data-[range-start=true]:bg-primary/10 data-[range-start=true]:text-primary",

        "data-[range-middle=true]:rounded-none data-[range-middle=true]:hover:bg-accent! data-[range-middle=true]:bg-accent data-[range-middle=true]:text-text-primary",

        "data-[range-end=true]:rounded-[20px] data-[range-end=true]:bg-primary/10 data-[range-end=true]:text-primary",

        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
