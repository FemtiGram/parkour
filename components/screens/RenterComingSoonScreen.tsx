"use client";

import { ChevronLeft, Car } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/lib/state";

export function RenterComingSoonScreen() {
  const { back } = useApp();
  return (
    <div className="flex-1 flex flex-col px-6 pt-4 pb-8">
      <div className="relative z-10 flex items-center">
        <button
          type="button"
          onClick={back}
          aria-label="Go back"
          className="-ml-2 w-11 h-11 inline-flex items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-100)]/50"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-3xl bg-[var(--color-primary-100)] inline-flex items-center justify-center text-[var(--color-primary-500)] mb-6">
          <Car size={36} strokeWidth={2.2} />
        </div>
        <h1 className="text-3xl font-semibold mb-3">Renter experience coming soon</h1>
        <p className="text-base text-[var(--color-text-secondary)] max-w-[280px] leading-relaxed">
          We&apos;re focused on getting owners onboard first. Renting will open
          to the public once we have spots in your area.
        </p>
      </div>

      <Button full onClick={back}>
        Go back
      </Button>
    </div>
  );
}
