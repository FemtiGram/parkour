"use client";

import { useState } from "react";
import { useApp } from "@/lib/state";

function BankIDMark() {
  return (
    <div className="inline-flex items-center gap-2 text-white">
      <svg width="22" height="14" viewBox="0 0 22 14" aria-hidden>
        <g fill="currentColor">
          <rect x="0" y="2" width="3" height="10" rx="1" />
          <rect x="5" y="2" width="3" height="10" rx="1" />
          <rect x="10" y="2" width="3" height="10" rx="1" />
          <rect x="15" y="2" width="7" height="10" rx="1" opacity="0.4" />
        </g>
      </svg>
      <span
        className="font-display font-bold text-base tracking-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        bank<span>ID</span>
      </span>
    </div>
  );
}

function formatId(value: string): string {
  return value.replace(/\D/g, "").slice(0, 11);
}

export function BankIDScreen() {
  const { back, navigate } = useApp();
  const [id, setId] = useState("");
  const canContinue = id.length === 11;

  return (
    <div className="flex-1 flex flex-col bg-[#2a1745] text-white">
      <div className="flex-1 flex flex-col px-6 pt-10 pb-8">
        <div className="flex justify-center">
          <BankIDMark />
        </div>

        <div className="text-center mt-6">
          <h1 className="text-3xl font-bold leading-tight">
            National ID number
          </h1>
          <p className="mt-2 text-base text-white/60">BankID OIDC Current</p>
        </div>

        <div className="mt-10">
          <label
            htmlFor="bankid-nin"
            className="block text-xl font-semibold mb-3"
          >
            What is your ID number?
          </label>
          <input
            id="bankid-nin"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="11 digits"
            value={id}
            onChange={(e) => setId(formatId(e.target.value))}
            className="w-full min-h-14 rounded-xl bg-transparent border-2 border-[#7eb6ff] text-white text-xl px-4 placeholder:text-white/40 outline-none focus:border-[#a4cdff]"
          />
          <p className="text-sm text-white/50 mt-2">
            Fill in your national ID number (11 digits)
          </p>
        </div>

        <div className="mt-auto pt-10 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={() => navigate("step-1")}
            disabled={!canContinue}
            className="min-w-[150px] min-h-12 px-8 rounded-full bg-white/95 text-[#2a1745] font-semibold text-base disabled:opacity-60 disabled:cursor-not-allowed hover:brightness-95 transition"
          >
            Next
          </button>
          <button
            type="button"
            onClick={back}
            className="text-base text-white underline underline-offset-4 hover:text-white/80"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
