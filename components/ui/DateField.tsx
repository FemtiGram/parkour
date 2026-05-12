"use client";

import { Calendar as CalendarIcon, X } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/Calendar";
import { Sheet } from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Props = {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  minDate?: Date;
  clearable?: boolean;
  sheetTitle?: string;
};

export function DateField({
  value,
  onChange,
  placeholder = "Select a date",
  minDate,
  clearable = false,
  sheetTitle = "Select date",
}: Props) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Date | undefined>(value ?? undefined);

  const openSheet = () => {
    setDraft(value ?? undefined);
    setOpen(true);
  };

  const confirm = () => {
    onChange(draft ?? null);
    setOpen(false);
  };

  const clear = () => {
    onChange(null);
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={openSheet}
        className={cn(
          "input-base flex items-center gap-3 text-left",
          !value && "text-[var(--color-text-tertiary)]",
        )}
      >
        <CalendarIcon
          size={18}
          className="text-[var(--color-text-tertiary)] flex-shrink-0"
        />
        <span className="flex-1 truncate">
          {value ? format(value, "d MMM yyyy") : placeholder}
        </span>
        {clearable && value && (
          <span
            role="button"
            tabIndex={0}
            aria-label="Clear date"
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                onChange(null);
              }
            }}
            className="w-7 h-7 -mr-1 inline-flex items-center justify-center rounded-full text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg)]"
          >
            <X size={14} />
          </span>
        )}
      </button>

      <Sheet
        open={open}
        onClose={() => setOpen(false)}
        title={sheetTitle}
        footer={
          <div className="flex gap-2">
            {clearable && (
              <Button
                variant="secondary"
                onClick={clear}
                className="min-h-12 px-4 text-sm"
              >
                Clear
              </Button>
            )}
            <Button full onClick={confirm} className="min-h-12">
              Confirm
            </Button>
          </div>
        }
      >
        <div className="flex justify-center pt-1">
          <Calendar
            mode="single"
            selected={draft}
            onSelect={setDraft}
            disabled={minDate ? { before: minDate } : undefined}
            defaultMonth={value ?? minDate ?? undefined}
            weekStartsOn={1}
          />
        </div>
      </Sheet>
    </>
  );
}
