"use client";

import { ArrowUpRight, Check, Download } from "lucide-react";
import { useState } from "react";
import { StepHeader } from "@/components/ui/StepHeader";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Input";
import { PillSelector } from "@/components/ui/PillSelector";
import { Switch } from "@/components/ui/Switch";
import { Sheet } from "@/components/ui/Sheet";
import { useApp, type VehicleSize } from "@/lib/state";

const VEHICLE_SIZES: readonly VehicleSize[] = ["Any", "Up to SUV", "Cars only"];

const SUMMARY_BULLETS = [
  "Renters are verified with BankID before they can book.",
  "Payment is handled automatically - you never chase anyone.",
  "The renter agrees to your spot rules on sign-up.",
  "Parkour mediates any disputes on your behalf.",
];

export function Step3Screen() {
  const { listing, setListing, navigate, showToast } = useApp();
  const [contractOpen, setContractOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <StepHeader step={3} total={4} title="Your terms" />

      <div className="flex-1 min-h-0 overflow-y-auto scroll-area px-5 pt-2 pb-6 flex flex-col gap-6">
        {/* Section A - Plain language summary */}
        <section className="rounded-2xl bg-gradient-to-br from-[var(--color-primary-700)] to-[var(--color-primary-500)] p-5 text-white">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-1">
            Protected by Parkour
          </p>
          <h2 className="text-xl font-semibold mb-4">
            What your renters agree to
          </h2>
          <ul className="space-y-3">
            {SUMMARY_BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-[var(--color-success)] inline-flex items-center justify-center flex-shrink-0">
                  <Check size={13} strokeWidth={3} className="text-white" />
                </span>
                <span className="text-sm leading-snug text-white/95">
                  {b}
                </span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setContractOpen(true)}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-white border-b border-white/30 hover:border-white/60 pb-0.5"
          >
            Read the full legal contract
            <ArrowUpRight size={14} />
          </button>
        </section>

        {/* Section B - Customisation */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
            Add your own rules
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1 mb-4">
            These become part of the contract the renter signs.
          </p>

          <div className="rounded-2xl bg-white border border-[var(--color-border)] divide-y divide-[var(--color-border)]">
            <ToggleRow
              title="Daily fine for unauthorised parking"
              description="Charged if a non-renter uses your spot."
              checked={listing.fineEnabled}
              onChange={(v) => setListing({ fineEnabled: v })}
            >
              <Input
                inputMode="numeric"
                type="number"
                min={0}
                suffix="kr per day"
                value={listing.fineAmount || ""}
                onChange={(e) =>
                  setListing({ fineAmount: Number(e.target.value) || 0 })
                }
              />
            </ToggleRow>

            <ToggleRow
              title="Towing after unpaid rent"
              description="Parkour will arrange the tow on your behalf."
              checked={listing.towingEnabled}
              onChange={(v) => setListing({ towingEnabled: v })}
            >
              <Input
                inputMode="numeric"
                type="number"
                min={1}
                suffix="days of missed payment"
                value={listing.towingDays || ""}
                onChange={(e) =>
                  setListing({ towingDays: Number(e.target.value) || 0 })
                }
              />
            </ToggleRow>

            <ToggleRow
              title="Maximum vehicle size"
              description="Make sure cars actually fit your spot."
              checked={listing.vehicleSizeEnabled}
              onChange={(v) => setListing({ vehicleSizeEnabled: v })}
            >
              <PillSelector
                options={VEHICLE_SIZES}
                value={listing.vehicleSize}
                onChange={(v) => setListing({ vehicleSize: v })}
                size="sm"
              />
            </ToggleRow>
          </div>

          <div className="mt-5">
            <Field label="Anything else?" optional>
              <Textarea
                placeholder="e.g. No overnight parking on Sundays"
                value={listing.extraNotes}
                onChange={(e) => setListing({ extraNotes: e.target.value })}
              />
            </Field>
          </div>
        </section>
      </div>

      <div className="px-5 pb-6 pt-3 border-t border-[var(--color-border)] bg-white">
        <Button full onClick={() => navigate("step-review")}>
          Next - Review
        </Button>
      </div>

      <Sheet
        open={contractOpen}
        onClose={() => setContractOpen(false)}
        title="Rental agreement"
        footer={
          <Button
            full
            variant="secondary"
            leftIcon={<Download size={18} />}
            onClick={() => {
              setContractOpen(false);
              showToast("Contract saved to your files");
            }}
          >
            Download PDF
          </Button>
        }
      >
        <ContractText />
      </Sheet>
    </div>
  );
}

function ToggleRow({
  title,
  description,
  checked,
  onChange,
  children,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="p-4">
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-base font-semibold text-[var(--color-text-primary)] leading-snug">
            {title}
          </p>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1 leading-relaxed">
            {description}
          </p>
        </div>
        <Switch checked={checked} onChange={onChange} label={title} />
      </div>
      {checked && children && (
        <div className="mt-3 animate-fade-in">{children}</div>
      )}
    </div>
  );
}

function ContractText() {
  return (
    <div className="prose-sm py-2 text-[var(--color-text-secondary)]">
      <p className="text-xs uppercase tracking-wider text-[var(--color-text-tertiary)] font-semibold mb-2">
        Parkour Rental Agreement - v3.2
      </p>
      <h3 className="text-base font-semibold text-[var(--color-text-primary)] mt-4 mb-2">
        1. Parties
      </h3>
      <p className="text-sm leading-relaxed">
        This agreement is entered into between the registered owner of the
        parking space (&quot;Owner&quot;) and the verified user who books the
        space through the Parkour platform (&quot;Renter&quot;). Parkour AS
        (org. nr. 932 145 690) acts as a neutral intermediary and is not a
        party to the rental.
      </p>
      <h3 className="text-base font-semibold text-[var(--color-text-primary)] mt-4 mb-2">
        2. Term and termination
      </h3>
      <p className="text-sm leading-relaxed">
        The agreement runs for the period chosen at booking. Either party may
        terminate with 30 days&apos; written notice through the Parkour app.
        Parkour may suspend either party if the platform&apos;s community
        guidelines are breached.
      </p>
      <h3 className="text-base font-semibold text-[var(--color-text-primary)] mt-4 mb-2">
        3. Payment
      </h3>
      <p className="text-sm leading-relaxed">
        Rent is collected automatically on the 1st of each month through the
        Renter&apos;s registered payment method. Funds are settled to the
        Owner&apos;s bank account within five (5) business days. Parkour
        retains a 10% service fee, deducted before payout.
      </p>
      <h3 className="text-base font-semibold text-[var(--color-text-primary)] mt-4 mb-2">
        4. Identity verification
      </h3>
      <p className="text-sm leading-relaxed">
        All Renters are verified through BankID prior to booking. The
        Owner&apos;s identity is confirmed through Vipps or BankID at signup.
      </p>
      <h3 className="text-base font-semibold text-[var(--color-text-primary)] mt-4 mb-2">
        5. Owner&apos;s additional terms
      </h3>
      <p className="text-sm leading-relaxed">
        Any additional rules added by the Owner via the Parkour app
        (unauthorised-parking fines, towing thresholds, vehicle restrictions,
        notes) form a binding part of this agreement and are presented to the
        Renter at the time of booking.
      </p>
      <h3 className="text-base font-semibold text-[var(--color-text-primary)] mt-4 mb-2">
        6. Disputes
      </h3>
      <p className="text-sm leading-relaxed">
        Parkour mediates first-line disputes between the parties. Unresolved
        cases are governed by Norwegian law and the jurisdiction of Oslo
        tingrett.
      </p>
      <h3 className="text-base font-semibold text-[var(--color-text-primary)] mt-4 mb-2">
        7. Liability
      </h3>
      <p className="text-sm leading-relaxed">
        Parkour&apos;s liability is limited to the service fee collected for
        the affected rental period. The Owner remains responsible for ensuring
        the space is safe, accessible, and as described in the listing.
      </p>
      <p className="text-xs text-[var(--color-text-tertiary)] mt-6 italic">
        Sample contract for prototype purposes only. Final terms will be
        provided by Parkour AS at launch.
      </p>
    </div>
  );
}
