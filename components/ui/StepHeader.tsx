"use client";

import { ChevronLeft, X } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/lib/state";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

type Props = {
  step: number;
  total: number;
  title: string;
};

export function StepHeader({ step, total, title }: Props) {
  const { back, replace, resetListing, hasListing } = useApp();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const discard = () => {
    resetListing();
    setConfirmOpen(false);
    replace(hasListing ? "home-listings" : "home-empty");
  };

  return (
    <header className="px-5 pt-4 pb-3 bg-[var(--color-bg)] sticky top-0 z-10">
      <div className="flex items-center gap-3 mb-3">
        <button
          type="button"
          onClick={back}
          aria-label="Go back"
          className="-ml-2 w-11 h-11 inline-flex items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-100)]/50 active:bg-[var(--color-primary-100)]"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
            Step {step} of {total}
          </p>
          <h1 className="text-base font-semibold text-[var(--color-text-primary)] truncate">
            {title}
          </h1>
        </div>
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          aria-label="Cancel onboarding"
          className="-mr-2 w-11 h-11 inline-flex items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-100)]/50 active:bg-[var(--color-primary-100)]"
        >
          <X size={22} />
        </button>
      </div>
      <div className="flex gap-1.5" aria-hidden>
        {Array.from({ length: total }).map((_, i) => {
          const filled = i < step;
          return (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                filled
                  ? "bg-[var(--color-primary-500)]"
                  : "bg-[var(--color-border)]"
              }`}
            />
          );
        })}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={discard}
        title="Discard this listing?"
        description="Your progress so far won't be saved. You can start over anytime from your dashboard."
        confirmLabel="Discard"
        cancelLabel="Keep editing"
        destructive
      />
    </header>
  );
}
