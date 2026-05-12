"use client";

import { Car, ChevronRight, ParkingCircle } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useApp } from "@/lib/state";

export function RoleScreen() {
  const { navigate } = useApp();
  return (
    <div className="flex-1 flex flex-col px-6 pt-8 pb-8">
      <Logo size="sm" />

      <div className="mt-12 mb-8">
        <h1 className="text-3xl leading-tight font-semibold text-[var(--color-text-primary)]">
          Welcome to Parkour
        </h1>
        <p className="mt-2 text-base text-[var(--color-text-secondary)] leading-relaxed">
          The simple way to rent out your parking space.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => navigate("auth")}
          className="group text-left w-full rounded-2xl bg-[var(--color-primary-700)] text-white p-5 flex items-center gap-4 hover:bg-[var(--color-primary-600)] active:bg-[var(--color-primary-800)] transition-colors min-h-20"
        >
          <div className="w-12 h-12 rounded-xl bg-white/10 inline-flex items-center justify-center flex-shrink-0">
            <ParkingCircle size={26} strokeWidth={2.2} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-xl leading-tight">
              I have a space to{" "}
              <span className="whitespace-nowrap">rent out</span>
            </p>
            <p className="text-sm text-white/70 mt-0.5 leading-snug">
              Earn from your unused parking
            </p>
          </div>
          <ChevronRight size={22} className="text-white/70 group-hover:text-white" />
        </button>

        <button
          type="button"
          onClick={() => navigate("renter-coming-soon")}
          className="group text-left w-full rounded-2xl bg-white border border-[var(--color-border)] p-5 flex items-center gap-4 hover:border-[var(--color-primary-400)] active:bg-[var(--color-primary-100)]/40 transition min-h-20"
        >
          <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-100)] inline-flex items-center justify-center flex-shrink-0 text-[var(--color-primary-600)]">
            <Car size={24} strokeWidth={2.2} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-xl leading-tight text-[var(--color-text-primary)]">
              I&apos;m looking for parking
            </p>
            <p className="text-sm text-[var(--color-text-secondary)] mt-0.5 leading-snug">
              Find verified spots near you
            </p>
          </div>
          <ChevronRight size={22} className="text-[var(--color-text-tertiary)]" />
        </button>
      </div>

      <div className="mt-auto pt-8 text-center flex flex-col gap-3">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Already have an account?{" "}
          <button
            type="button"
            className="text-[var(--color-primary-500)] font-semibold hover:underline"
          >
            Sign in
          </button>
        </p>
        <button
          type="button"
          onClick={() => navigate("home-empty")}
          className="text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] underline-offset-4 hover:underline"
        >
          Skip onboarding
        </button>
      </div>
    </div>
  );
}
