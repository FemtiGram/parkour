"use client";

import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function Sheet({ open, onClose, title, children, footer }: Props) {
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
    <div className="absolute inset-0 z-50">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 animate-fade-in"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="absolute inset-x-0 bottom-0 max-h-[85%] flex flex-col bg-[var(--color-surface)] rounded-t-3xl animate-slide-up shadow-[0_-12px_40px_rgba(0,0,0,0.15)]"
      >
        <div className="pt-2 pb-1 flex justify-center">
          <span
            aria-hidden
            className="block w-10 h-1 rounded-full bg-[var(--color-border)]"
          />
        </div>
        <div className="flex items-center justify-between px-5 pt-1 pb-3">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 w-10 h-10 inline-flex items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-100)]/50"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto scroll-area px-5 pb-5">
          {children}
        </div>
        {footer && (
          <div className="px-5 pb-6 pt-3 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
