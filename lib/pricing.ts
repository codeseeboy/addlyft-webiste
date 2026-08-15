/**
 * Commercial pricing, as published to customers.
 * One source of truth so the homepage summary and the pricing page can never
 * drift apart.
 */

export type Plan = {
  id: string;
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  channels: string[];
  includes: string[];
  featured?: boolean;
};

export const GO_PLANS: Plan[] = [
  {
    id: "single",
    name: "Single",
    price: "$39.99",
    cadence: "per store / month",
    blurb: "One channel, one store. The simplest way to find out whether the room pays.",
    channels: ["In-store audio"],
    includes: [
      "15-second spoken messages",
      "Ready-made promotion library",
      "One custom promo build per month",
      "Core performance reporting",
      "7-day free trial",
    ],
  },
  {
    id: "dual",
    name: "Dual",
    price: "$79.99",
    cadence: "per store / month",
    blurb: "Audio and screen together, so a shopper hears it and then sees it.",
    channels: ["In-store audio", "In-store screen"],
    includes: [
      "Everything in Single",
      "10-second on-screen spots",
      "Two custom promo builds per month",
      "Full performance breakdown by hour",
      "Priority support",
    ],
    featured: true,
  },
  {
    id: "bundle",
    name: "Full Bundle",
    price: "$99.99",
    cadence: "per store / month",
    blurb: "Every channel, multiple locations, and the guaranteed monthly floor.",
    channels: ["In-store audio", "In-store screen", "Social"],
    includes: [
      "Everything in Dual",
      "Social posts for your own promotions",
      "$49 / month guaranteed revenue per active store",
      "Multiple store locations on one account",
      "Dedicated account support",
    ],
  },
];

export const REACH_FACTS: [string, string][] = [
  ["Minimum campaign", "5 stores"],
  ["Audio message", "15 seconds"],
  ["Screen spot", "10 seconds"],
  ["Billing", "Monthly, cancel between cycles"],
];

export const REACH_POINTS: string[] = [
  "Price is driven by two things only: how many stores you book and how often your message plays. No packaging, no rate card theatre.",
  "Volume pricing improves as store count rises, and the cost per thousand is shown next to every option before you commit.",
  "Founding advertisers on the launch programme receive 50% off their first billing cycle, applied automatically.",
  "Stores in your own category are removed from your target list, so you are never paying to advertise inside a competitor.",
];

export const GUARANTEE_NOTE =
  "The $49 monthly guarantee applies to active stores on the Full Bundle plan. Payouts begin after three continuous months on the network and are issued quarterly.";
