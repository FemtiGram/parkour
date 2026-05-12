"use client";

import { useEffect } from "react";
import { useApp } from "@/lib/state";

export function SplashScreen() {
  const { replace } = useApp();

  useEffect(() => {
    const t = setTimeout(() => replace("role"), 1600);
    return () => clearTimeout(t);
  }, [replace]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 bg-gradient-to-b from-[var(--color-primary-900)] to-[var(--color-primary-700)] text-white">
      <div className="flex flex-col items-center gap-4 animate-fade-up">
        <div
          className="w-20 h-20 rounded-2xl bg-white inline-flex items-center justify-center text-[var(--color-primary-500)] font-bold text-4xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          P
        </div>
        <span
          className="font-display font-semibold tracking-tight text-3xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          parkour
        </span>
        <p className="text-sm text-white/60 mt-1">
          Rent out your parking space
        </p>
      </div>
    </div>
  );
}
