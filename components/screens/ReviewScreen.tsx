"use client";

import { Check, Pencil, ShieldCheck } from "lucide-react";
import { format } from "date-fns";
import { StepHeader } from "@/components/ui/StepHeader";
import { Button } from "@/components/ui/Button";
import { useApp, type Screen } from "@/lib/state";
import { formatKr } from "@/lib/utils";

type Row = { label: string; value: string };

function Section({
  title,
  editTarget,
  rows,
}: {
  title: string;
  editTarget: Screen;
  rows: Row[];
}) {
  const { navigate } = useApp();
  return (
    <section>
      <div className="flex items-center justify-between mb-2 px-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
          {title}
        </p>
        <button
          type="button"
          onClick={() => navigate(editTarget)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-primary-500)] hover:underline"
        >
          <Pencil size={12} />
          Edit
        </button>
      </div>
      <dl className="rounded-2xl bg-white border border-[var(--color-border)] divide-y divide-[var(--color-border)]">
        {rows.map(({ label, value }) => (
          <div
            key={label}
            className="px-4 py-3 flex items-baseline justify-between gap-4"
          >
            <dt className="text-xs text-[var(--color-text-secondary)] flex-shrink-0">
              {label}
            </dt>
            <dd className="text-sm font-medium text-[var(--color-text-primary)] text-right min-w-0 break-words">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function ReviewScreen() {
  const { listing, publishListing, navigate } = useApp();
  const youReceive = Math.round(listing.monthlyPrice * 0.9);

  const publish = () => {
    publishListing();
    navigate("step-4");
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <StepHeader step={4} total={4} title="Review your spot" />

      <div className="flex-1 min-h-0 overflow-y-auto scroll-area px-5 pt-2 pb-6 flex flex-col gap-5">
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed px-1">
          Take a quick look. You can edit any section before publishing.
        </p>

        <Section
          title="Spot details"
          editTarget="step-1"
          rows={[
            {
              label: "Address",
              value: listing.address || "—",
            },
            {
              label: "Space type",
              value: listing.spaceType,
            },
            {
              label: "Photo",
              value: listing.photoLabel ? "Added" : "None",
            },
            {
              label: "Access notes",
              value: listing.accessNotes.trim() || "—",
            },
          ]}
        />

        <Section
          title="Availability & price"
          editTarget="step-2"
          rows={[
            {
              label: "Available from",
              value: listing.startDate
                ? format(listing.startDate, "d MMM yyyy")
                : "—",
            },
            {
              label: "Until",
              value: listing.endDate
                ? format(listing.endDate, "d MMM yyyy")
                : "Open-ended",
            },
            {
              label: "Monthly price",
              value: `kr ${formatKr(listing.monthlyPrice)}`,
            },
            {
              label: "You receive",
              value: `kr ${formatKr(youReceive)} / month`,
            },
            {
              label: "Payouts",
              value: `${listing.payoutFrequency} · ${listing.bankAccount || "—"}`,
            },
          ]}
        />

        <Section
          title="Your terms"
          editTarget="step-3"
          rows={[
            {
              label: "Daily fine",
              value: listing.fineEnabled
                ? `kr ${formatKr(listing.fineAmount)} per day`
                : "Off",
            },
            {
              label: "Towing",
              value: listing.towingEnabled
                ? `After ${listing.towingDays} days of missed payment`
                : "Off",
            },
            {
              label: "Vehicle size",
              value: listing.vehicleSizeEnabled ? listing.vehicleSize : "Any",
            },
            {
              label: "Extra notes",
              value: listing.extraNotes.trim() || "—",
            },
          ]}
        />

        <div className="rounded-2xl bg-[var(--color-primary-100)]/60 border border-[var(--color-primary-400)]/20 p-4 flex items-start gap-3">
          <ShieldCheck
            size={20}
            className="text-[var(--color-primary-500)] mt-0.5 flex-shrink-0"
          />
          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
            Publishing makes your spot visible to verified renters in your area
            right away. You can pause or remove it anytime from your dashboard.
          </p>
        </div>
      </div>

      <div className="px-5 pb-6 pt-3 border-t border-[var(--color-border)] bg-white">
        <Button full onClick={publish} leftIcon={<Check size={18} />}>
          Publish my spot
        </Button>
      </div>
    </div>
  );
}
