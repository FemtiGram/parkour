# Parkour

A mobile-first prototype for a peer-to-peer parking rental app — Norwegian flavour, BankID / Vipps identity verification, end-to-end onboarding that turns into a live listing.

Built as a take-home / case-study demo on top of **Next.js 16** (App Router) + **Tailwind v4** + **React 19**.

## Demo flow

1. **Splash** (3s logo linger) →
2. **Welcome** — pick "I have a space to rent out" or "I'm looking for parking" (renter side is intentionally a "coming soon" stub) →
3. **Verify your identity** — Vipps or BankID (both are required; no skip) →
4. **Vipps confirm** / **BankID 11-digit input** intermediary screens →
5. **Step 1** — address, photo, space type, access notes →
6. **Step 2** — availability dates, monthly price (with live "Parkour keeps 10% / you receive" calc), bank account, payout cadence →
7. **Step 3** — terms (daily fine, towing, vehicle-size restrictions, free-form notes) →
8. **Step 4 — Review** — full scannable summary with per-section *Edit* links →
9. **Your spot is live** celebration page →
10. **Dashboard** — earnings banner, first inbound rental request, listing card.

At any point in the step flow there's an **X** in the top-right that opens a "Discard this listing?" confirm dialog and bails back to the dashboard.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack dev server) |
| UI | React 19 + Tailwind CSS v4 (`@theme` tokens, no `tailwind.config.js`) |
| Icons | `lucide-react` |
| Dates | `react-day-picker` v10 (custom shadcn-style wrapper) + `date-fns` |
| Fonts | DM Sans (display) + Inter (sans), via `next/font/google` |
| Logos & photos | Static assets in `public/logo/` and `public/parking/` |
| Favicon | Generated dynamically via `app/icon.tsx` (white circle + the mark, served as 256×256 PNG) |

## Project layout

```
app/
  layout.tsx        Root layout (fonts, metadata, viewport)
  page.tsx          Renders <AppShell />
  globals.css       Tailwind v4 @theme tokens + design primitives
  icon.tsx          Dynamic favicon (white circle + parking mark)
components/
  AppShell.tsx      Single-page screen switcher driven by app state
  BottomNav.tsx     My spots / Support / Profile tab bar
  Logo.tsx          next/image wrapper around the brand logo
  screens/          One file per screen (Splash, Role, Auth, Vipps, BankID,
                    RenterComingSoon, Step1-4, Review, Home, …)
  ui/               Building blocks (Button, Input/Field, Sheet,
                    ConfirmDialog, StepHeader, Calendar, DateField, etc.)
lib/
  state.tsx         Single AppProvider context — navigation history,
                    listing draft, toasts. No external state library.
  utils.ts          cn() and formatKr() (nb-NO number formatting normalised
                    to regular NBSP for visible "2 500" spacing)
public/
  logo/             Brand marks (full + simple)
  parking/          Hero/listing photography
```

There is no backend — the whole flow is client-side state. Publishing a listing flips a boolean in `lib/state.tsx` that swaps the empty-home screen for the populated one.

## Running locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm run start
```

> Note: this project uses the new Next.js 16 / Turbopack defaults. See [`AGENTS.md`](./AGENTS.md) before letting an AI assistant touch the code.

## Deploying to Vercel

1. Push this repo to GitHub.
2. On Vercel: **New Project → Import** the repo. Next.js is auto-detected; no `vercel.json` is needed.
3. Hit Deploy.

The dynamic favicon (`app/icon.tsx`) and `next/image` optimisation both work out of the box on Vercel.

## Design choices worth knowing

- **Typography**: 5 sizes (`text-xs`, `text-sm`, `text-base`, `text-xl`, `text-3xl`) and 4 weights, enforced by a sweep that collapsed earlier ad-hoc `text-[Npx]` values.
- **Colour tokens**: defined as CSS custom properties in `globals.css` under `@theme`. Text-tertiary was darkened to `#677788` so it passes WCAG AA (4.5:1) on white.
- **Motion**: respects `prefers-reduced-motion: reduce` — all animations and transitions collapse to ~0ms.
- **Forms**: every `<Field>` wraps its child in a `<label>` for built-in input ↔ label association.
- **Sheet & dialog scrims**: full-screen, with the panel layered on top so its rounded corners visibly merge into the dim instead of leaving a straight seam.
- **Money**: `formatKr` normalises the narrow no-break space that `nb-NO` `Intl.NumberFormat` produces to a regular NBSP — that's why "2 500" reads correctly in browsers.

## Known gaps (intentional for a demo)

- No focus trap or body-scroll lock on `<Sheet>` / `<ConfirmDialog>`.
- No real auth or persistence — refreshing the page resets state.
- Renter side is a "coming soon" screen by design.
- BankID national-ID input doesn't validate the checksum, just digit count.
