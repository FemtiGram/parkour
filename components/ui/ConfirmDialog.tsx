"use client";

import { useEffect, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
};

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-6">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 animate-fade-in"
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-[320px] rounded-2xl bg-[var(--color-surface)] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.25)] animate-fade-up"
      >
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
            {description}
          </p>
        )}
        <div className="mt-5 flex flex-col gap-2">
          <Button
            full
            onClick={onConfirm}
            className={
              destructive
                ? "bg-[var(--color-error)] hover:bg-[var(--color-error)]/90 active:bg-[var(--color-error)]/80"
                : undefined
            }
          >
            {confirmLabel}
          </Button>
          <Button full variant="ghost" onClick={onClose}>
            {cancelLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
