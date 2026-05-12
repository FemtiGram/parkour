"use client";

import {
  Bell,
  ChevronRight,
  ParkingCircle,
  Plus,
  Sparkles,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/lib/state";
import { formatKr } from "@/lib/utils";

function TopBar({ name }: { name?: string }) {
  return (
    <header className="flex items-center justify-between px-5 pt-4 pb-2">
      <Logo size="sm" />
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Notifications"
          className="w-10 h-10 inline-flex items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-100)]/50 relative"
        >
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--color-error)]" />
        </button>
        <div
          className="w-10 h-10 rounded-full bg-[var(--color-primary-500)] text-white inline-flex items-center justify-center font-semibold text-sm"
          aria-label={name ?? "Profile"}
        >
          {name ? name[0] : "M"}
        </div>
      </div>
    </header>
  );
}

export function EmptyHomeScreen() {
  const { navigate, ownerName, resetListing } = useApp();
  const startOnboarding = () => {
    resetListing();
    navigate("step-1");
  };
  return (
    <div className="flex-1 flex flex-col">
      <TopBar name={ownerName} />

      <div className="px-5 pt-4">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Good morning,
        </p>
        <h1 className="text-3xl font-semibold mt-0.5">{ownerName}</h1>
      </div>

      <div className="flex-1 flex items-center justify-center px-5">
        <div className="w-full rounded-3xl bg-white border border-[var(--color-border)] p-7 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary-100)] inline-flex items-center justify-center text-[var(--color-primary-500)] mb-4">
            <ParkingCircle size={32} strokeWidth={2.2} />
          </div>
          <h2 className="text-xl font-semibold mb-2">No active listings yet</h2>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-5">
            Add your parking space and start earning. It takes less than 5
            minutes.
          </p>
          <Button full onClick={startOnboarding} leftIcon={<Plus size={18} />}>
            Add my first spot
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export function HomeWithListingsScreen() {
  const { listing, navigate, ownerName, resetListing } = useApp();
  const earnings = Math.round(listing.monthlyPrice * 0.9);

  const addAnother = () => {
    resetListing();
    navigate("step-1");
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <TopBar name={ownerName} />

      <div className="flex-1 min-h-0 overflow-y-auto scroll-area">
        <div className="px-5 pt-4">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Good morning,
          </p>
          <h1 className="text-3xl font-semibold mt-0.5">{ownerName}</h1>
        </div>

        {/* Earnings banner */}
        <section className="px-5 mt-5">
          <div className="rounded-2xl bg-[var(--color-primary-900)] text-white p-5 relative overflow-hidden">
            <div
              aria-hidden
              className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[var(--color-primary-500)]/30 blur-2xl"
            />
            <p className="text-xs uppercase tracking-wider font-semibold text-white/50">
              This month
            </p>
            <p className="text-3xl font-semibold mt-1">
              kr {formatKr(earnings)}
            </p>
            <p className="text-xs text-white/60 mt-1">
              Estimated · Pays out on the 1st
            </p>
          </div>
        </section>

        {/* First notification - slides in once you arrive on the dashboard */}
        <section className="px-5 mt-5 animate-fade-up">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)] mb-2">
            New notification
          </p>
          <div className="rounded-2xl bg-[var(--color-primary-100)] border border-[var(--color-primary-400)]/20 p-4 flex items-start gap-3 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[var(--color-primary-500)] inline-flex items-center justify-center text-white flex-shrink-0">
              <Bell size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[var(--color-text-primary)] leading-snug">
                <span className="font-semibold">Erik Larsen</span> has requested
                to rent your spot. Tap to review.
              </p>
              <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                Just now · Parkour
              </p>
            </div>
          </div>
        </section>

        {/* Pending request */}
        <section className="px-5 mt-5">
          <p className="text-xs uppercase tracking-wider font-semibold text-[var(--color-text-tertiary)] mb-2">
            Pending request
          </p>
          <button
            type="button"
            className="w-full text-left rounded-2xl bg-white border border-[var(--color-border)] p-4 flex items-center gap-3 hover:border-[var(--color-primary-400)] active:bg-[var(--color-primary-100)]/30 transition"
          >
            <div className="w-10 h-10 rounded-full bg-[var(--color-primary-500)] text-white inline-flex items-center justify-center font-semibold text-sm">
              EL
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">Erik Larsen</p>
              <p className="text-xs text-[var(--color-text-secondary)] truncate">
                Wants to rent for 3 months · Just now
              </p>
            </div>
            <ChevronRight size={18} className="text-[var(--color-text-tertiary)]" />
          </button>
        </section>

        {/* Listings */}
        <section className="px-5 mt-6 pb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs uppercase tracking-wider font-semibold text-[var(--color-text-tertiary)]">
              My spots (1)
            </p>
            <button
              type="button"
              onClick={addAnother}
              className="text-xs font-semibold text-[var(--color-primary-500)] hover:underline inline-flex items-center gap-1"
            >
              <Plus size={14} /> Add another
            </button>
          </div>

          <div className="rounded-2xl bg-white border border-[var(--color-border)] overflow-hidden">
            <div className="aspect-[16/9] bg-gradient-to-br from-[#3b5b85] via-[#5b7aa8] to-[#1a3a6e] relative">
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur rounded-full px-2.5 py-1 text-xs font-semibold text-[var(--color-success)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
                  Active
                </span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-xs uppercase tracking-wider font-semibold text-[var(--color-text-tertiary)]">
                {listing.spaceType} spot
              </p>
              <p className="font-semibold mt-0.5">
                {listing.address || "Your spot"}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
                  <Sparkles size={14} className="text-[var(--color-primary-400)]" />
                  Listed today
                </span>
                <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                  kr {formatKr(listing.monthlyPrice)}/mo
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
}

export function PlaceholderScreen({ title }: { title: string }) {
  return (
    <div className="flex-1 flex flex-col">
      <TopBar />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 -mt-6">
        <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary-100)] inline-flex items-center justify-center text-[var(--color-primary-500)] mb-4">
          <Sparkles size={28} />
        </div>
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2">
          Coming soon
        </p>
      </div>
      <BottomNav />
    </div>
  );
}
