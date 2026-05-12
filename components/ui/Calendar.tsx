"use client";

import "react-day-picker/style.css";
import { useRef, useEffect, type ComponentProps } from "react";
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
} from "react-day-picker";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type CalendarProps = ComponentProps<typeof DayPicker>;

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  formatters,
  components,
  ...props
}: CalendarProps) {
  const defaults = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      className={cn(
        "group/calendar p-2 [--cell-size:2.5rem] [--cell-radius:0.625rem]",
        className,
      )}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(undefined, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-full", defaults.root),
        months: cn("relative flex flex-col gap-4", defaults.months),
        month: cn("flex w-full flex-col gap-3", defaults.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex items-center justify-between gap-1 z-10",
          defaults.nav,
        ),
        button_previous: cn(
          "size-(--cell-size) inline-flex items-center justify-center rounded-(--cell-radius) text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-100)]/60 active:bg-[var(--color-primary-100)] disabled:opacity-30 disabled:hover:bg-transparent",
          defaults.button_previous,
        ),
        button_next: cn(
          "size-(--cell-size) inline-flex items-center justify-center rounded-(--cell-radius) text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-100)]/60 active:bg-[var(--color-primary-100)] disabled:opacity-30 disabled:hover:bg-transparent",
          defaults.button_next,
        ),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size) font-semibold text-base text-[var(--color-text-primary)]",
          defaults.month_caption,
        ),
        caption_label: cn("select-none", defaults.caption_label),
        month_grid: cn("w-full border-collapse", defaults.month_grid),
        weekdays: cn("flex", defaults.weekdays),
        weekday: cn(
          "flex-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)] py-1.5 select-none",
          defaults.weekday,
        ),
        week: cn("mt-1 flex w-full", defaults.week),
        day: cn(
          "group/day relative flex-1 aspect-square p-0 text-center select-none",
          defaults.day,
        ),
        range_start: cn(
          "rounded-l-(--cell-radius) bg-[var(--color-primary-100)]",
          defaults.range_start,
        ),
        range_middle: cn(
          "rounded-none bg-[var(--color-primary-100)]",
          defaults.range_middle,
        ),
        range_end: cn(
          "rounded-r-(--cell-radius) bg-[var(--color-primary-100)]",
          defaults.range_end,
        ),
        today: cn("font-semibold", defaults.today),
        outside: cn(
          "text-[var(--color-text-tertiary)]/60",
          defaults.outside,
        ),
        disabled: cn("opacity-30", defaults.disabled),
        hidden: cn("invisible", defaults.hidden),
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: chClass }) => {
          const sharedProps = {
            size: 18,
            strokeWidth: 2.2,
            className: cn("flex-shrink-0", chClass),
          };
          if (orientation === "left") return <ChevronLeft {...sharedProps} />;
          if (orientation === "right") return <ChevronRight {...sharedProps} />;
          return <ChevronDown {...sharedProps} />;
        },
        DayButton: CalendarDayButton,
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
  ...rest
}: ComponentProps<typeof DayButton>) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  const isSelectedSingle =
    modifiers.selected &&
    !modifiers.range_start &&
    !modifiers.range_end &&
    !modifiers.range_middle;

  return (
    <button
      ref={ref}
      type="button"
      data-selected-single={isSelectedSingle || undefined}
      data-range-start={modifiers.range_start || undefined}
      data-range-end={modifiers.range_end || undefined}
      data-range-middle={modifiers.range_middle || undefined}
      data-today={modifiers.today || undefined}
      className={cn(
        "relative z-10 w-full h-full inline-flex items-center justify-center rounded-(--cell-radius)",
        "text-sm text-[var(--color-text-primary)] leading-none transition-colors",
        "hover:bg-[var(--color-primary-100)]/70 active:bg-[var(--color-primary-100)]",
        "disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed",
        "data-[today=true]:text-[var(--color-primary-500)] data-[today=true]:font-semibold",
        "data-[selected-single=true]:bg-[var(--color-primary-500)] data-[selected-single=true]:text-white data-[selected-single=true]:hover:bg-[var(--color-primary-600)]",
        "data-[range-start=true]:bg-[var(--color-primary-500)] data-[range-start=true]:text-white",
        "data-[range-end=true]:bg-[var(--color-primary-500)] data-[range-end=true]:text-white",
        "data-[range-middle=true]:bg-transparent data-[range-middle=true]:text-[var(--color-text-primary)]",
        className,
      )}
      {...rest}
    />
  );
}
