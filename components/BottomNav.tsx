"use client";

import { Car, LifeBuoy, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp, type Screen } from "@/lib/state";

const items: Array<{ key: Screen; label: string; Icon: typeof Car }> = [
  { key: "home-empty", label: "My spots", Icon: Car },
  { key: "placeholder-support", label: "Support", Icon: LifeBuoy },
  { key: "placeholder-profile", label: "Profile", Icon: User },
];

export function BottomNav() {
  const { screen, navigate, hasListing } = useApp();
  const homeScreen: Screen = hasListing ? "home-listings" : "home-empty";
  const isHome = screen === "home-empty" || screen === "home-listings";
  return (
    <nav className="border-t border-[var(--color-border)] bg-white/95 backdrop-blur-sm pt-2 pb-3 px-2 flex">
      {items.map(({ key, label, Icon }) => {
        const active =
          (key === "home-empty" && isHome) ||
          (key !== "home-empty" && screen === key);
        const target = key === "home-empty" ? homeScreen : key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => navigate(target)}
            className={cn(
              "flex-1 flex flex-col items-center gap-1 py-1.5 rounded-lg transition-colors",
              active
                ? "text-[var(--color-primary-500)]"
                : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]",
            )}
          >
            <Icon size={22} strokeWidth={active ? 2.5 : 2} />
            <span
              className={cn(
                "text-xs",
                active ? "font-semibold" : "font-medium",
              )}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
