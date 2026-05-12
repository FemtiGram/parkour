"use client";

import { ChevronLeft, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useApp } from "@/lib/state";

function VippsMark() {
  return (
    <Image
      src="/logo/brand.png"
      alt="Vipps"
      width={64}
      height={18}
      priority
      className="h-[18px] w-auto select-none"
    />
  );
}

function BankIDMark() {
  return (
    <span
      className="inline-flex items-center font-bold text-base tracking-tight"
      style={{ fontFamily: "var(--font-display)" }}
    >
      Bank<span className="text-[#75AAFF]">ID</span>
    </span>
  );
}

export function AuthScreen() {
  const { back, navigate } = useApp();

  return (
    <div className="flex-1 flex flex-col px-6 pt-4 pb-8">
      <div className="flex items-center">
        <button
          type="button"
          onClick={back}
          aria-label="Go back"
          className="-ml-2 w-11 h-11 inline-flex items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-100)]/50"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="mt-6 flex flex-col items-start gap-3">
        <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-100)] inline-flex items-center justify-center text-[var(--color-primary-600)]">
          <ShieldCheck size={28} strokeWidth={2.2} />
        </div>
        <h1 className="text-3xl font-semibold text-[var(--color-text-primary)] leading-tight">
          Verify your identity
        </h1>
        <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
          We use BankID and Vipps to verify who you are - this protects both you
          and the people you rent to.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => navigate("vipps-confirm")}
          className="bg-[var(--color-vipps)] text-white rounded-xl px-5 min-h-14 inline-flex items-center justify-center gap-3 font-semibold text-base hover:brightness-95 active:brightness-90 transition"
        >
          <span>Log in with</span>
          <VippsMark />
        </button>
        <button
          type="button"
          onClick={() => navigate("bankid-verify")}
          className="bg-[var(--color-bankid)] text-white rounded-xl px-5 min-h-14 inline-flex items-center justify-center gap-3 font-semibold text-base hover:brightness-110 active:brightness-95 transition"
        >
          <span>Log in with</span>
          <BankIDMark />
        </button>
      </div>

      <div className="mt-auto">
        <p className="text-xs text-[var(--color-text-tertiary)] text-center leading-relaxed px-2">
          Your identity is never shared with renters without your consent.
        </p>
      </div>
    </div>
  );
}
