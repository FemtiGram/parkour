import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  size?: "sm" | "md" | "lg";
  variant?: "full" | "mark";
  className?: string;
};

const HEIGHTS = { sm: 28, md: 40, lg: 56 } as const;

export function Logo({ size = "sm", variant = "full", className }: Props) {
  const h = HEIGHTS[size];
  const isFull = variant === "full";
  const w = isFull ? Math.round((h * 300) / 123) : Math.round((h * 109) / 123);
  const src = isFull
    ? "/logo/parkour_full_logo.png"
    : "/logo/parkour_logo_simple.png";

  return (
    <Image
      src={src}
      width={w}
      height={h}
      alt="Parkour"
      priority
      className={cn("select-none", className)}
      style={{ height: h, width: w }}
    />
  );
}
