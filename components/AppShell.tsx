"use client";

import { AppProvider, useApp } from "@/lib/state";
import { SplashScreen } from "@/components/screens/SplashScreen";
import { RoleScreen } from "@/components/screens/RoleScreen";
import { AuthScreen } from "@/components/screens/AuthScreen";
import { VippsConfirmScreen } from "@/components/screens/VippsConfirmScreen";
import { BankIDScreen } from "@/components/screens/BankIDScreen";
import { RenterComingSoonScreen } from "@/components/screens/RenterComingSoonScreen";
import { Step1Screen } from "@/components/screens/Step1Screen";
import { Step2Screen } from "@/components/screens/Step2Screen";
import { Step3Screen } from "@/components/screens/Step3Screen";
import { ReviewScreen } from "@/components/screens/ReviewScreen";
import { Step4Screen } from "@/components/screens/Step4Screen";
import {
  EmptyHomeScreen,
  HomeWithListingsScreen,
  PlaceholderScreen,
} from "@/components/screens/HomeScreen";

function ScreenSwitch() {
  const { screen, toast } = useApp();
  return (
    <>
      <div key={screen} className="flex-1 min-h-0 flex flex-col animate-fade-in">
        {screen === "splash" && <SplashScreen />}
        {screen === "role" && <RoleScreen />}
        {screen === "auth" && <AuthScreen />}
        {screen === "vipps-confirm" && <VippsConfirmScreen />}
        {screen === "bankid-verify" && <BankIDScreen />}
        {screen === "renter-coming-soon" && <RenterComingSoonScreen />}
        {screen === "step-1" && <Step1Screen />}
        {screen === "step-2" && <Step2Screen />}
        {screen === "step-3" && <Step3Screen />}
        {screen === "step-review" && <ReviewScreen />}
        {screen === "step-4" && <Step4Screen />}
        {screen === "home-empty" && <EmptyHomeScreen />}
        {screen === "home-listings" && <HomeWithListingsScreen />}
        {screen === "placeholder-support" && (
          <PlaceholderScreen title="Support" />
        )}
        {screen === "placeholder-profile" && (
          <PlaceholderScreen title="Profile" />
        )}
      </div>
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

export function AppShell() {
  return (
    <AppProvider>
      <div className="device-stage">
        <div className="device-frame">
          <ScreenSwitch />
        </div>
      </div>
    </AppProvider>
  );
}
