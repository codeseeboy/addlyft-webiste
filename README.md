# ADD-LYFT — commercial website

The public marketing site for ADD-LYFT. Next.js 15 (App Router), React 19, TypeScript.

**Grow Local. Reach Further.** — ADD-LYFT is the company; **Go** (store owners) and
**Reach** (brands) are the products.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

**Run one dev server at a time.** Every `next dev` on this folder writes to the same
`.next`, so two or more will overwrite each other's compiled chunks. The failure is
silent and looks like a site bug — most visibly, the 3D room's dynamic chunk never
resolves and the section sits on its photographic fallback forever. A build running
alongside dev fails the same way, part-way through, with
`Cannot find module for page: /_document`.

If things start behaving strangely, this is almost always why:

```bash
# stop every dev server, then
rm -rf .next
npm run dev
```

To build while a dev server is deliberately running, give the build its own directory:

```bash
NEXT_DIST_DIR=.next-verify npm run build
```

## Scope

This is a commercial site only: brand, product, business value, credibility and
conversion. There is no login, signup, dashboard, admin, developer or API surface, and
nothing here describes how the platform is built internally. The material in `docs/` is
reference for writing accurate commercial copy — it is not published.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage — hero, the moment, the 3D room, the cycle, both products, venues, network, measurement, commitments, pricing, FAQ, CTA |
| `/go` | ADD-LYFT Go — store owners |
| `/reach` | ADD-LYFT Reach — brands |
| `/network` | Markets, venue types, how a store joins |
| `/pricing` | Go plans, comparison table, Reach model |
| `/about` | Story, principles, team |
| `/contact` | Intent-aware contact form |
| `/legal/privacy`, `/legal/terms` | Plain-language summaries |
| `/api/contact` | Form endpoint (validates; **delivery not yet wired** — see below) |

## Structure

```
app/                 routes, layout, fonts (self-hosted in app/fonts)
components/site/     header, footer, motion primitives, shared blocks
components/home/     homepage sections
lib/images.ts        photography manifest (paths, sizes, blur placeholders)
lib/usmap.ts         US dot lattice + markets, generated from us-atlas (Albers)
lib/pricing.ts       single source of truth for published prices
styles/              base tokens · shared UI · homepage · inner pages
```

## Design system

Brand colours are fixed and must not be restyled: ADD-LYFT teal `#0d9488` /
`#14b8a6`, Reach purple `#7c3aed`. Neutrals are deliberately warm (ivory paper, warm
ink) rather than blue-grey. Type is Inter Tight for UI, Instrument Serif italic for
editorial emphasis only (`.em`), JetBrains Mono for labels and data. All tokens live in
`styles/base.css`.

## Motion

Lenis drives scrolling and hands position to GSAP ScrollTrigger; Framer Motion handles
reveals and transitions. Everything is gated on `prefers-reduced-motion`.

The 3D store room (`components/home/RoomScene.tsx`) is loaded via `next/dynamic` and its
camera is driven by which chapter of copy is under the reader.

It is built to hold frame rate while the page scrolls:

- Every repeated fixture is **instanced** — about 15 draw calls, down from ~182.
- **Four dynamic lights**, not ten. Lit cost is meshes × lights, so this matters most.
- The reflective floor is a second scene render, so it is top-tier only, at 256px.
- The frameloop stops when the section leaves the viewport.
- Three quality tiers (`high` / `mid` / `low`) picked from cores, memory and viewport.
  Phones get the room too, just a smaller one.

The chunk is fetched when the section is still 1.5 viewports away, and a photograph is
painted underneath from the first frame, so the stage is never blank or late. Visitors
with no WebGL, a lost context, or reduced motion keep the photograph.

## Video

Real footage throughout — no AI-generated clips, no photo slideshows. Sources and licence
in `public/images/CREDITS.md`.

- **`hero-store.mp4`** (1000×800, ~1.2MB) — a shopper choosing fruit, playing in the hero
  frame. Encoded forward-then-reversed so it loops with no visible cut.
- **`instore-spot.mp4`** (640×360, ~190KB) — **sample advertising creative**: two
  ten-second local-business spots back to back, each with a brand line and an offer end
  card. This is what the network actually carries, so it is what the screens show.

The spot plays on the in-store display inside the 3D room as a `VideoTexture`, and in the
Cycle section's screen channel. In the Cycle, the first message plays the first
advertiser and the second message plays the second — the break really does come from two
different businesses. Everything pauses when off screen.

The businesses in the sample creative are invented for demonstration. Swap the file for
real advertiser spots when they exist; no code changes needed.

Two video gotchas worth remembering, both of which looked like site bugs:

- A `<meshBasicMaterial>` whose props merely change does **not** get a new material
  instance, so the video map never binds and the screen stays black. It needs a `key`.
- WebGL enables dithering by default, and Intel drivers draw it as a diagonal crosshatch
  crawling over gradients. `gl.disable(gl.DITHER)` in `onCreated` removes it.

## Photography

Real commercial photography, no AI imagery. Files in `public/images`, credits in
`public/images/CREDITS.md` (Unsplash License, all verified non-watermarked). Every image
goes through `components/site/Img.tsx` so dimensions and blur-up placeholders stay
attached to the asset.

## Before launch

- **Wire `/api/contact` to a real destination** (email, CRM or Slack). It validates and
  returns the right contract; submissions are currently only written to the server log —
  see the marked block in `app/api/contact/route.ts`.
- Confirm `hello@addlyft.com` on `/contact` and in `/legal/privacy`.
- Have counsel review `/legal/privacy` and `/legal/terms`; both are honest summaries
  that point to a full document, not the full document.
- Confirm the founder names on `/about` should be public.
- Replace the illustrative figure in the Measurement section with live network data once
  there is enough of it (it is labelled as illustrative today).
