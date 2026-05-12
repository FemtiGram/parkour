"use client";

import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

type FieldProps = {
  label?: string;
  hint?: string;
  optional?: boolean;
  children: ReactNode;
};

export function Field({ label, hint, optional, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <div className="text-sm font-medium text-[var(--color-text-primary)] flex items-center justify-between">
          <span>{label}</span>
          {optional && (
            <span className="text-xs text-[var(--color-text-tertiary)] font-normal">
              Optional
            </span>
          )}
        </div>
      )}
      {children}
      {hint && (
        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
          {hint}
        </p>
      )}
    </div>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  leftIcon?: ReactNode;
  suffix?: string;
};

export function Input({ className, leftIcon, suffix, ...rest }: InputProps) {
  if (leftIcon || suffix) {
    return (
      <div
        className={cn(
          "flex items-center input-base px-0 py-0 overflow-hidden focus-within:border-[var(--color-primary-500)] focus-within:shadow-[0_0_0_3px_rgba(30,78,154,0.15)]",
          className,
        )}
      >
        {leftIcon && (
          <div className="pl-4 text-[var(--color-text-tertiary)] flex items-center">
            {leftIcon}
          </div>
        )}
        <input
          {...rest}
          className="flex-1 bg-transparent outline-none px-4 py-3.5 text-base text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] min-w-0"
        />
        {suffix && (
          <div className="pr-4 text-sm font-medium text-[var(--color-text-secondary)] whitespace-nowrap">
            {suffix}
          </div>
        )}
      </div>
    );
  }
  return <input {...rest} className={cn("input-base", className)} />;
}

export function Textarea({
  className,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...rest}
      className={cn("input-base resize-none min-h-24 leading-relaxed", className)}
    />
  );
}
