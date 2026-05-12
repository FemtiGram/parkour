"use client";

import { Building2, Lock } from "lucide-react";
import { StepHeader } from "@/components/ui/StepHeader";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Input";
import { PillSelector } from "@/components/ui/PillSelector";
import { DateField } from "@/components/ui/DateField";
import { useApp, type PayoutFrequency } from "@/lib/state";
import { formatKr } from "@/lib/utils";

const PAYOUT_FREQ: readonly PayoutFrequency[] = ["Monthly", "Quarterly"];

function formatBank(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const a = digits.slice(0, 4);
  const b = digits.slice(4, 6);
  const c = digits.slice(6, 11);
  return [a, b, c].filter(Boolean).join(" ");
}

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function Step2Screen() {
  const { listing, setListing, navigate } = useApp();
  const today = startOfToday();

  const canContinue =
    !!listing.startDate &&
    listing.monthlyPrice > 0 &&
    listing.bankAccount.replace(/\D/g, "").length === 11;

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <StepHeader step={2} total={4} title="Availability & price" />

      <div className="flex-1 min-h-0 overflow-y-auto scroll-area px-5 pt-2 pb-6 flex flex-col gap-5">
        <div className="rounded-2xl bg-white border border-[var(--color-border)] p-4 flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className="text-base font-semibold text-[var(--color-text-primary)] leading-snug">
                Long-term rental
              </p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1 leading-relaxed">
                Monthly bookings only - short-term and hourly rentals are coming
                soon.
              </p>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-[var(--color-success-100)] text-[var(--color-success)]">
              Available now
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <Field label="Available from">
              <DateField
                value={listing.startDate}
                onChange={(d) => {
                  setListing({ startDate: d });
                  if (d && listing.endDate && listing.endDate < d) {
                    setListing({ endDate: null });
                  }
                }}
                minDate={today}
                placeholder="Pick a date"
                sheetTitle="Available from"
              />
            </Field>
            <Field label="Until" optional>
              <DateField
                value={listing.endDate}
                onChange={(d) => setListing({ endDate: d })}
                minDate={listing.startDate ?? today}
                placeholder="Open-ended"
                clearable
                sheetTitle="Available until"
              />
            </Field>
          </div>
        </div>

        <Field label="Monthly price">
          <Input
            inputMode="numeric"
            type="text"
            value={
              listing.monthlyPrice ? formatKr(listing.monthlyPrice) : ""
            }
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "");
              setListing({ monthlyPrice: Number(digits) || 0 });
            }}
            suffix="kr / month"
            placeholder="2 500"
          />
          {listing.monthlyPrice > 0 && (
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mt-0.5">
              Parkour keeps 10% - you receive{" "}
              <span className="font-semibold text-[var(--color-text-primary)]">
                kr {formatKr(Math.round(listing.monthlyPrice * 0.9))}
              </span>{" "}
              / month.
            </p>
          )}
        </Field>

        <Field
          label="Bank account for payouts"
          hint="Payments are sent automatically on the 1st of each month. You may need to declare this as income - check skatteetaten.no."
        >
          <Input
            leftIcon={<Building2 size={18} />}
            inputMode="numeric"
            placeholder="0000 00 00000"
            value={listing.bankAccount}
            onChange={(e) =>
              setListing({ bankAccount: formatBank(e.target.value) })
            }
          />
        </Field>

        <Field label="Payout frequency" optional>
          <PillSelector
            options={PAYOUT_FREQ}
            value={listing.payoutFrequency}
            onChange={(v) => setListing({ payoutFrequency: v })}
          />
        </Field>

        <div className="flex items-start gap-2.5 mt-1 px-1">
          <Lock
            size={14}
            className="text-[var(--color-text-tertiary)] mt-0.5 flex-shrink-0"
          />
          <p className="text-xs text-[var(--color-text-tertiary)] leading-relaxed">
            Your bank details are encrypted and only used for payouts. Renters
            never see this information.
          </p>
        </div>
      </div>

      <div className="px-5 pb-6 pt-3 border-t border-[var(--color-border)] bg-white">
        <Button
          full
          onClick={() => navigate("step-3")}
          disabled={!canContinue}
        >
          Next - Your terms
        </Button>
      </div>
    </div>
  );
}
