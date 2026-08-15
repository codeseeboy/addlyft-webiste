/**
 * Commercial pricing, as published to customers.
 *
 * Sources, so this can be checked against the record:
 *   - Addlyft Go is ONE all-in-one plan, $99.99/mo billed annually or
 *     $129.99/mo billed monthly. Audio, video and social are deliberately
 *     NOT sold separately — "we don't want single-single subscription".
 *     (meeting L303-311, L369-377)
 *   - Addlyft Reach keeps the five-plan model from the client's own
 *     reference site, which he confirmed is "the right pricing model".
 *     Its Standard tier — $99.99 for 10 video + 1 audio play/day across
 *     5 stores — is exactly the example he gave on the call. (L607-611)
 */

/* ------------------------------------------------------------------ GO */

export const GO_PRICE = {
  annualPerMonth: 99.99,
  monthly: 129.99,
  /** Saving when billed annually, per month. */
  saving: 30,
  trialDays: 7,
  guarantee: 49,
  referralPct: 40,
} as const;

export const GO_INCLUDES: { group: string; items: string[] }[] = [
  {
    group: "All three channels, always included",
    items: [
      "Addlyft Audio — 15-second spots between songs",
      "Addlyft Video — 10-second spots on your store screen",
      "Addlyft Social — auto-posted to Facebook & Instagram",
    ],
  },
  {
    group: "Create it yourself, in minutes",
    items: [
      "Describe the promotion in plain English, AI writes it",
      "90 AI generations a month across all channels",
      "Free template library — use our ready-made promos for nothing",
      "Curated background music, your genre, your mood",
    ],
  },
  {
    group: "Hardware and money",
    items: [
      "Free in-store TV device included",
      "Speaker or tablet for audio included",
      "$49/month guaranteed revenue from Addlyft",
      "Earn 40% referral commission, every month they stay",
    ],
  },
];

export const AI_TOPUPS: { count: number; price: number; each: number; save?: string }[] = [
  { count: 10, price: 9.9, each: 0.99 },
  { count: 25, price: 19.99, each: 0.8, save: "Save 20%" },
  { count: 50, price: 34.99, each: 0.7, save: "Save 30%" },
];

/* --------------------------------------------------------------- REACH */

export type ReachPlan = {
  id: string;
  name: string;
  perStore: number;
  price: number;
  video: number;
  audio: number | null;
  tokens: number | null;
  analytics: string;
  extra?: string;
  featured?: boolean;
};

/** Every plan's headline price covers a base of five stores. */
export const REACH_BASE_STORES = 5;

export const REACH_PLANS: ReachPlan[] = [
  {
    id: "base",
    name: "Base",
    perStore: 5.99,
    price: 29.99,
    video: 5,
    audio: null,
    tokens: null,
    analytics: "Basic analytics",
  },
  {
    id: "standard",
    name: "Standard",
    perStore: 19.99,
    price: 99.99,
    video: 10,
    audio: 1,
    tokens: null,
    analytics: "Advanced analytics",
  },
  {
    id: "plus",
    name: "Plus",
    perStore: 39.99,
    price: 199.99,
    video: 25,
    audio: 3,
    tokens: 1,
    analytics: "Full analytics + reporting",
    featured: true,
  },
  {
    id: "premium",
    name: "Premium",
    perStore: 59.99,
    price: 299.99,
    video: 40,
    audio: 5,
    tokens: 2,
    analytics: "Priority placement",
  },
  {
    id: "executive",
    name: "Executive",
    perStore: 119.99,
    price: 599.99,
    video: 90,
    audio: 12,
    tokens: 4,
    analytics: "Priority placement",
    extra: "Dedicated account manager",
  },
];

/** Applied automatically. No promo code. */
export const VOLUME_TIERS: { stores: number; discount: number }[] = [
  { stores: 5, discount: 0 },
  { stores: 10, discount: 0.05 },
  { stores: 20, discount: 0.1 },
  { stores: 30, discount: 0.15 },
  { stores: 50, discount: 0.2 },
  { stores: 75, discount: 0.35 },
  { stores: 100, discount: 0.5 },
];

export function discountFor(stores: number) {
  let d = 0;
  for (const t of VOLUME_TIERS) if (stores >= t.stores) d = t.discount;
  return d;
}

/**
 * Plan price covers five stores, so the per-store rate is price ÷ 5. Multiply
 * by the store count, then apply the volume discount.
 */
export function estimate(plan: ReachPlan, stores: number) {
  const n = Math.max(REACH_BASE_STORES, Math.round(stores));
  const gross = (plan.price / REACH_BASE_STORES) * n;
  const discount = discountFor(n);
  return { stores: n, gross, discount, total: gross * (1 - discount) };
}

export const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

export const GUARANTEE_NOTE =
  "The $49 monthly guarantee applies to every active Addlyft Go store. Payouts begin after three continuous months on the network and are issued quarterly.";
