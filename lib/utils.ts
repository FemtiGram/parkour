import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NBSP = " ";
const NNBSP = " ";

export function formatKr(value: number): string {
  return new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 })
    .format(value)
    .replaceAll(NNBSP, NBSP);
}
