# Parkour case study — build summary

This file captures *what* shipped and *how* the back-and-forth went, so the case can be discussed without paging through 12 commits.

## Starting point

A bare `create-next-app` scaffold (Next.js 16 / Tailwind v4 / React 19). Single boilerplate commit on `main`. No design system, no routes, no domain code.

## What shipped

End-to-end mobile-first prototype of the parking-host onboarding flow, from cold open to live listing on a dashboard:

- Splash → role pick → identity verification (Vipps + BankID intermediary screens) → 4-step onboarding (spot details / availability & price / terms / review) → "your spot is live" → dashboard with first inbound notification.
- Reusable building blocks: `Button`, `Input/Field`, `Sheet` (bottom sheet), `ConfirmDialog` (centered modal), `StepHeader` (sticky progress + back + X), `Calendar` (shadcn-style on react-day-picker v10), `DateField`, `PillSelector`, `Switch`, `BottomNav`, `Logo`.
- Real branding: project logos in `public/logo/`, parking hero photo in `public/parking/`, dynamic favicon in `app/icon.tsx` (white circle + the mark, generated via `next/og`).

## How we worked

A loose pattern emerged:

1. **You sent a list of intent-level changes** ("the back button doesn't work", "show what Parkour takes", "stack the dates vertically", "the scrim is a straight line"). Each one was *what* you wanted, almost never *how*.
2. **I scoped, sometimes pushed back** on the framing if it was misdiagnosed — e.g. the "Mac crashed from too much memory" was traced to a stale `.next/dev` lock and the build's normal compile under system pressure, not a runaway loop in our code. Or "lucide-react has a 38MB barrel" turned out to be a non-issue because this Next defaults to Turbopack, which handles barrels itself.
3. **I batched the changes** into one pass per turn, updated the in-conversation todo list, ran `tsc --noEmit`, then committed with a focused message. One feature per commit so the history reads as a story.
4. **You course-corrected often** ("we should also remove skip from the Welcome page, since the X covers it", "linger 1-2s longer on splash"). Tight loop, small diffs.

The whole thing is twelve commits on top of `b497c1d Initial commit from Create Next App`.

## Concrete things ironed out along the way

| Theme | Issue | Resolution |
|---|---|---|
| Navigation | Renter "coming soon" back arrow didn't fire | Sibling `flex-1` with negative `-mt-8` was painting over the header — added `relative z-10` to the header, dropped the negative margin |
| Typography | 16 distinct font sizes scattered as `text-[Npx]` | Sed-swept to a 5-size scale (`xs / sm / base / xl / 3xl`) — kept 4 weights |
| Money formatting | `2500` rendered with no separator | `formatKr` uses `nb-NO` `Intl.NumberFormat` but normalises the narrow no-break space to a wider NBSP so "2 500" actually shows the gap |
| Onboarding bailout | No way to cancel mid-flow | Added an X in the top-right of `StepHeader` + reusable `ConfirmDialog`. First version was clipped to the sticky header — fixed by making the dialog a sibling, not a descendant |
| Identity verification | Could be skipped | "Skip for now" removed from the auth screen, and later the "Skip onboarding" link removed from the Welcome screen too |
| Calendar | Default react-day-picker styling didn't match | Ported the SAS project's shadcn-style calendar (cell-size CSS vars, custom `DayButton`, lucide chevrons), adapted from v9 → v10 |
| Date display | "Wed, 13 May 2026" was clipping in two-column layout | Shortened to `d MMM yyyy` and then stacked the two date fields vertically |
| Sheet scrim | Straight seam where the sheet panel met the dim | Scrim is now full-area `absolute inset-0`; panel sits on top so its rounded top-corners visibly notch into the dim |
| Notification preview | Felt off on the "live" celebration page | Moved to the first thing you see on the home dashboard instead |
| Review step | Step 3 jumped straight to "live" | Inserted a real Review step 4/4 with section-by-section *Edit* links |
| Vipps / BankID | Buttons jumped straight to onboarding | Added intermediary "Information you share" (Vipps) and "National ID number" (BankID) screens that match the actual identity flows |
| WCAG | Tertiary text failed AA contrast on white | Darkened `#9baab8` → `#677788` (~4.6:1). Added `prefers-reduced-motion: reduce` block. `Field` wraps children in `<label>` for label-binding. `Button` got a `focus-visible` ring |
| Favicon | Black logo invisible on dark tabs | `app/icon.tsx` generates a 256×256 PNG with a white circle background, the mark base64-encoded in the middle |
| LCP warning | `next/image` complained the logo was the LCP | `Logo` now always passes `priority` (every use is above the fold) |
| Copy | Em-dashes everywhere | Sed-replaced to regular hyphens |

## What's deliberately *not* there

- No backend, no auth, no persistence. Refresh = reset.
- Renter half of the marketplace is a single "coming soon" screen.
- BankID input validates 11 digits but not the checksum.
- `<Sheet>` and `<ConfirmDialog>` don't trap focus or lock body scroll — fine for a demo, not fine for production.

## Quick reference

- One commit per feature, conventional-ish messages — see `git log` for the story.
- `tsc --noEmit` passes on `main`.
- Tailwind tokens live in `app/globals.css` under `@theme`; nothing important is in a `tailwind.config.*` (there isn't one).
- App state is a single `AppProvider` context in `lib/state.tsx`. Navigation is a `history: Screen[]` stack with `navigate` / `replace` / `back`.
