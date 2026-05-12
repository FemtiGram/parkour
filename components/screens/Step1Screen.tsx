"use client";

import { Camera, MapPin } from "lucide-react";
import { useState } from "react";
import { StepHeader } from "@/components/ui/StepHeader";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Input";
import { PillSelector } from "@/components/ui/PillSelector";
import { useApp, type SpaceType } from "@/lib/state";

const SPACE_TYPES: readonly SpaceType[] = ["Outdoor", "Indoor", "Garage"];

export function Step1Screen() {
  const { listing, setListing, navigate } = useApp();
  const [photoChosen, setPhotoChosen] = useState<boolean>(!!listing.photoLabel);

  const choosePhoto = () => {
    setPhotoChosen(true);
    setListing({ photoLabel: "spot-photo.jpg" });
  };

  const canContinue = listing.address.trim().length > 0;

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <StepHeader step={1} total={4} title="Add your spot" />

      <div className="flex-1 min-h-0 overflow-y-auto scroll-area px-5 pt-2 pb-6 flex flex-col gap-5">
        <Field label="Address or location">
          <Input
            leftIcon={<MapPin size={18} />}
            placeholder="e.g. Bygdøy allé 12, Oslo"
            value={listing.address}
            onChange={(e) => setListing({ address: e.target.value })}
          />
        </Field>

        <Field label="Photo of the spot">
          <button
            type="button"
            onClick={choosePhoto}
            className="w-full aspect-[16/10] rounded-2xl border-2 border-dashed border-[var(--color-border)] hover:border-[var(--color-primary-400)] bg-[var(--color-surface)] flex flex-col items-center justify-center gap-2 text-[var(--color-text-secondary)] transition relative overflow-hidden"
          >
            {photoChosen ? (
              <div className="absolute inset-0 bg-gradient-to-br from-[#3b5b85] via-[#5b7aa8] to-[#1a3a6e] flex items-end p-4">
                <div className="bg-white/95 backdrop-blur rounded-lg px-3 py-1.5 text-xs font-medium text-[var(--color-text-primary)] flex items-center gap-2">
                  <Camera size={14} /> {listing.photoLabel}
                </div>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary-100)] inline-flex items-center justify-center text-[var(--color-primary-500)]">
                  <Camera size={22} />
                </div>
                <p className="text-sm font-medium text-[var(--color-text-primary)]">
                  Add a photo
                </p>
                <p className="text-xs text-[var(--color-text-tertiary)]">
                  Tap to take or upload
                </p>
              </>
            )}
          </button>
        </Field>

        <Field label="Space type">
          <PillSelector
            options={SPACE_TYPES}
            value={listing.spaceType}
            onChange={(v) => setListing({ spaceType: v })}
          />
        </Field>

        <Field
          label="Any access instructions?"
          optional
          hint="Helpful for renters — gate codes, where to find the spot, etc."
        >
          <Textarea
            placeholder="e.g. Spot #14 in the basement, gate code 1234"
            value={listing.accessNotes}
            onChange={(e) => setListing({ accessNotes: e.target.value })}
          />
        </Field>
      </div>

      <div className="px-5 pb-6 pt-3 border-t border-[var(--color-border)] bg-white">
        <Button
          full
          onClick={() => navigate("step-2")}
          disabled={!canContinue}
        >
          Next — Availability &amp; price
        </Button>
      </div>
    </div>
  );
}
