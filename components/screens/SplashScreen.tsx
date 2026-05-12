"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useApp } from "@/lib/state";

export function SplashScreen() {
  const { replace } = useApp();

  useEffect(() => {
    const t = setTimeout(() => replace("role"), 3000);
    return () => clearTimeout(t);
  }, [replace]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 bg-gradient-to-b from-[var(--color-primary-900)] to-[var(--color-primary-700)] text-white">
      <div className="flex flex-col items-center gap-5 animate-fade-up">
        <Image
          src="/logo/parkour_full_logo.png"
          alt="Parkour"
          width={260}
          height={107}
          priority
          className="select-none"
          style={{
            width: 260,
            height: 107,
            filter: "brightness(0) invert(1)",
          }}
        />
        <p className="text-sm text-white/60 -mt-1">
          Rent out your parking space
        </p>
      </div>
    </div>
  );
}
