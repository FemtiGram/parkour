import { cn } from "@/lib/utils";

type Props = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function Logo({ size = "sm", className }: Props) {
  const sizes = {
    sm: { box: "w-7 h-7", text: "text-base", radius: 6 },
    md: { box: "w-10 h-10", text: "text-3xl", radius: 8 },
    lg: { box: "w-14 h-14", text: "text-3xl", radius: 12 },
  } as const;
  const s = sizes[size];
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <div
        className={cn(
          "inline-flex items-center justify-center bg-[var(--color-primary-500)] text-white font-bold",
          s.box,
        )}
        style={{ borderRadius: s.radius }}
      >
        <span className="font-display">P</span>
      </div>
      <span
        className={cn(
          "font-display font-semibold tracking-tight text-[var(--color-text-primary)]",
          s.text,
        )}
      >
        parkour
      </span>
    </div>
  );
}
