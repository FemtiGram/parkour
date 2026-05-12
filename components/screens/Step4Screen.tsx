"use client";

import { Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/lib/state";
import { formatKr } from "@/lib/utils";

export function Step4Screen() {
  const { listing, navigate, publishListing, showToast } = useApp();
  const earnings = Math.round(listing.monthlyPrice * 0.9);

  const goLive = () => {
    publishListing();
    navigate("home-listings");
  };

  const share = () => showToast("Share link copied");

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-b from-white to-[var(--color-bg)]">
      <div className="flex-1 min-h-0 overflow-y-auto scroll-area px-6 pt-10 pb-6 flex flex-col">
        {/* Success animation */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <span className="absolute inset-0 rounded-full bg-[var(--color-success)] animate-ping-soft" />
            <div className="relative w-20 h-20 rounded-full bg-[var(--color-success)] inline-flex items-center justify-center text-white animate-pop">
              <Check size={40} strokeWidth={3} />
            </div>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl leading-tight font-semibold animate-fade-up delay-1">
            Your spot is live <span aria-hidden>🎉</span>
          </h1>
          <p className="mt-2 text-base text-[var(--color-text-secondary)] animate-fade-up delay-2">
            Renters near you can book it from the moment they open the app.
          </p>
        </div>

        {/* Listing summary card */}
        <div className="rounded-2xl bg-white border border-[var(--color-border)] overflow-hidden animate-fade-up delay-3">
          <div className="aspect-[16/9] bg-gradient-to-br from-[#3b5b85] via-[#5b7aa8] to-[#1a3a6e] relative">
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur rounded-full px-2.5 py-1 text-xs font-semibold text-[var(--color-success)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
                Active — open for bookings
              </span>
            </div>
          </div>
          <div className="p-4">
            <p className="text-xs uppercase tracking-wider font-semibold text-[var(--color-text-tertiary)]">
              {listing.spaceType} spot
            </p>
            <p className="font-semibold text-[var(--color-text-primary)] mt-0.5 leading-tight">
              {listing.address || "Your spot"}
            </p>
          </div>
        </div>

        {/* Earnings card */}
        <div className="rounded-2xl bg-[var(--color-primary-900)] text-white p-5 mt-3 animate-fade-up delay-4">
          <p className="text-xs uppercase tracking-wider font-semibold text-white/50">
            Estimated monthly income
          </p>
          <p className="text-3xl font-semibold mt-1">
            ~ kr {formatKr(earnings)}
          </p>
          <p className="text-xs text-white/60 mt-1">
            After Parkour&apos;s 10% service fee
          </p>
        </div>

      </div>

      <div className="px-5 pb-6 pt-3 bg-white border-t border-[var(--color-border)] flex flex-col gap-2">
        <Button full onClick={goLive}>
          Go to my dashboard
        </Button>
        <Button
          variant="ghost"
          full
          leftIcon={<Share2 size={18} />}
          onClick={share}
          className="min-h-12"
        >
          Share my listing
        </Button>
      </div>
    </div>
  );
}
