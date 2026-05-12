import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={cn(
        "rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]",
        className,
      )}
    />
  );
}
