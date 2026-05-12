"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "vipps" | "bankid";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-600)] active:bg-[var(--color-primary-700)] disabled:bg-[var(--color-primary-500)]/40 disabled:text-white/80",
  secondary:
    "bg-white text-[var(--color-primary-700)] border border-[var(--color-border)] hover:bg-[var(--color-primary-100)]",
  ghost:
    "bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
  vipps:
    "bg-[var(--color-vipps)] text-white hover:brightness-95 active:brightness-90",
  bankid:
    "bg-[var(--color-bankid)] text-white hover:brightness-110 active:brightness-95",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  full?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export function Button({
  variant = "primary",
  full = false,
  className,
  children,
  leftIcon,
  rightIcon,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-5 font-semibold transition disabled:cursor-not-allowed",
        "min-h-14 text-base",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary-400)]",
        full && "w-full",
        variants[variant],
        className,
      )}
    >
      {leftIcon}
      <span>{children}</span>
      {rightIcon}
    </button>
  );
}
