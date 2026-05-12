"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type Screen =
  | "splash"
  | "role"
  | "auth"
  | "vipps-confirm"
  | "bankid-verify"
  | "renter-coming-soon"
  | "step-1"
  | "step-2"
  | "step-3"
  | "step-review"
  | "step-4"
  | "home-empty"
  | "home-listings"
  | "placeholder-support"
  | "placeholder-profile";

export type SpaceType = "Outdoor" | "Indoor" | "Garage";
export type PayoutFrequency = "Monthly" | "Quarterly";
export type VehicleSize = "Any" | "Up to SUV" | "Cars only";

export type Listing = {
  address: string;
  photoLabel: string | null;
  spaceType: SpaceType;
  accessNotes: string;
  startDate: Date | null;
  endDate: Date | null;
  monthlyPrice: number;
  bankAccount: string;
  payoutFrequency: PayoutFrequency;
  fineEnabled: boolean;
  fineAmount: number;
  towingEnabled: boolean;
  towingDays: number;
  vehicleSizeEnabled: boolean;
  vehicleSize: VehicleSize;
  extraNotes: string;
};

export const defaultListing: Listing = {
  address: "",
  photoLabel: null,
  spaceType: "Outdoor",
  accessNotes: "",
  startDate: null,
  endDate: null,
  monthlyPrice: 2500,
  bankAccount: "",
  payoutFrequency: "Monthly",
  fineEnabled: false,
  fineAmount: 500,
  towingEnabled: false,
  towingDays: 14,
  vehicleSizeEnabled: false,
  vehicleSize: "Any",
  extraNotes: "",
};

type AppState = {
  screen: Screen;
  navigate: (s: Screen) => void;
  replace: (s: Screen) => void;
  back: () => void;
  history: Screen[];
  listing: Listing;
  setListing: (patch: Partial<Listing>) => void;
  resetListing: () => void;
  hasListing: boolean;
  publishListing: () => void;
  toast: string | null;
  showToast: (msg: string) => void;
  ownerName: string;
};

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<Screen[]>(["splash"]);
  const [listing, setListingState] = useState<Listing>(defaultListing);
  const [hasListing, setHasListing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const screen = history[history.length - 1];

  const navigate = useCallback((s: Screen) => {
    setHistory((h) => [...h, s]);
  }, []);

  const replace = useCallback((s: Screen) => {
    setHistory([s]);
  }, []);

  const back = useCallback(() => {
    setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));
  }, []);

  const setListing = useCallback((patch: Partial<Listing>) => {
    setListingState((l) => ({ ...l, ...patch }));
  }, []);

  const resetListing = useCallback(() => {
    setListingState(defaultListing);
  }, []);

  const publishListing = useCallback(() => {
    setHasListing(true);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }, []);

  const value = useMemo<AppState>(
    () => ({
      screen,
      navigate,
      replace,
      back,
      history,
      listing,
      setListing,
      resetListing,
      hasListing,
      publishListing,
      toast,
      showToast,
      ownerName: "Marte",
    }),
    [
      screen,
      navigate,
      replace,
      back,
      history,
      listing,
      setListing,
      resetListing,
      hasListing,
      publishListing,
      toast,
      showToast,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
