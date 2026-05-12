"use client";

import { Mail, MapPin, Smartphone, User } from "lucide-react";
import { useApp } from "@/lib/state";

const SHARED_INFO = [
  { Icon: User, label: "Name", value: "Emma Josefine Dahl" },
  { Icon: Mail, label: "Email", value: "emmadahl@gmail.com" },
  { Icon: Smartphone, label: "Phone number", value: "+47 12 34 56 78" },
  { Icon: MapPin, label: "Address", value: "Brettesville gate 21, 0482 Oslo" },
];

function VippsLogo() {
  return (
    <div className="w-12 h-12 rounded-xl bg-[var(--color-vipps)] inline-flex items-center justify-center text-white">
      <svg
        viewBox="0 0 24 24"
        width={22}
        height={22}
        fill="currentColor"
        aria-hidden
      >
        <path d="M12 2C7.6 2 4 5.6 4 10c0 5.5 6.8 11 8 11s8-5.5 8-11c0-4.4-3.6-8-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
      </svg>
    </div>
  );
}

export function VippsConfirmScreen() {
  const { back, navigate } = useApp();

  return (
    <div className="flex-1 flex flex-col bg-white relative">
      <div className="flex items-center justify-end px-5 pt-4">
        <button
          type="button"
          onClick={back}
          className="text-base font-medium text-[var(--color-vipps)] hover:underline px-2 py-1"
        >
          Cancel
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto scroll-area px-6 pt-6 pb-6 flex flex-col">
        <div className="flex flex-col items-center text-center mb-5">
          <VippsLogo />
          <p className="text-sm text-[var(--color-text-secondary)] mt-3">
            Merchant
          </p>
          <h1 className="text-3xl font-semibold text-[var(--color-text-primary)] mt-3">
            Information you share
          </h1>
        </div>

        <div className="rounded-2xl bg-[var(--color-bg)] divide-y divide-[var(--color-border)]">
          {SHARED_INFO.map(({ Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3 p-4">
              <Icon
                size={20}
                className="text-[var(--color-text-tertiary)] mt-0.5 flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs text-[var(--color-text-tertiary)]">
                  {label}
                </p>
                <p className="text-base font-semibold text-[var(--color-text-primary)] mt-0.5">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed text-center mt-5 px-2">
          We will share this information with Parkour on your behalf. You can
          change email and addresses in your profile.
        </p>

        <div className="text-center mt-4">
          <button
            type="button"
            className="text-sm text-[var(--color-vipps)] underline underline-offset-4"
          >
            Read our terms
          </button>
        </div>
      </div>

      <div className="px-6 pb-8 pt-3 bg-white">
        <button
          type="button"
          onClick={() => navigate("step-1")}
          className="w-full min-h-14 rounded-full bg-[var(--color-vipps)] text-white font-semibold text-base hover:brightness-95 active:brightness-90 transition"
        >
          Share information
        </button>
      </div>
    </div>
  );
}
