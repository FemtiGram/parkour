"use client";

import { cn } from "@/lib/utils";

type Props<T extends string> = {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  size?: "md" | "sm";
};

export function PillSelector<T extends string>({
  options,
  value,
  onChange,
  size = "md",
}: Props<T>) {
  return (
    <div
      className={cn(
        "inline-flex p-1 rounded-full bg-[var(--color-primary-100)]/60 border border-[var(--color-border)] w-full",
      )}
    >
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "flex-1 rounded-full font-medium transition",
              size === "md" ? "py-2.5 text-sm" : "py-2 text-xs",
              active
                ? "bg-white text-[var(--color-primary-700)] shadow-sm"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
