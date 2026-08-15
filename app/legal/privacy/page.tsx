import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/site/Brand";
import { Reveal } from "@/components/site/Motion";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How ADD-LYFT handles information for store owners, advertisers and shoppers.",
};

const SECTIONS: [string, string[]][] = [
  [
    "Shoppers are not tracked",
    [
      "ADD-LYFT media plays in a room. There is no app to install, no code to scan, no account to create and no identifier attached to anyone who happens to be standing in a store while a message plays.",
      "We do not collect names, devices, faces or locations from customers of the businesses on our network, and we do not build profiles of them. Audience figures are derived from a store's own reported footfall band, not from individuals.",
    ],
  ],
  [
    "What we hold about store owners",
    [
      "The information needed to run and pay a business account: contact details, the store's address and category, the settings chosen for the room, payout details, and the record of what played and when.",
      "Store performance data is shown to the owner in full. Advertisers see campaign performance for the stores they have booked, never a store's own private business information.",
    ],
  ],
  [
    "What we hold about advertisers",
    [
      "Account and billing details, the creative submitted for review, targeting selections, and the delivery record for each campaign.",
      "Creative is reviewed before it goes live. Rejections are recorded with a reason so the decision can be explained rather than merely applied.",
    ],
  ],
  [
    "Sharing and retention",
    [
      "We do not sell personal information. Data is shared only with the service providers needed to operate the platform — payments, hosting and communications — and only to the extent that they need it.",
      "Records are retained for as long as an account is active and for the period afterwards required for tax, accounting and dispute resolution.",
    ],
  ],
  [
    "Your choices",
    [
      "Account holders can request a copy of their information, ask for corrections, or ask us to close an account and delete what is not legally required to be kept.",
      "Write to hello@addlyft.com and a person will handle it.",
    ],
  ],
];

export default function PrivacyPage() {
  return (
    <>
      <section className="phero phero--tight">
        <div className="shell">
          <Reveal>
            <span className="kicker">Legal</span>
          </Reveal>
          <h1 className="t-d1 phero__title" style={{ maxWidth: "18ch" }}>
            Privacy at ADD-LYFT
          </h1>
          <Reveal delay={0.12}>
            <p className="t-lead legal__lede">
              A plain-language summary of how information is handled across the network. The
              complete policy, including the specific provider list and retention periods, is
              available on request.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="shell bay-sm">
        <div className="legal">
          {SECTIONS.map(([h, paras], i) => (
            <Reveal className="legal__sec" delay={i * 0.05} key={h}>
              <h2 className="t-d3">{h}</h2>
              {paras.map((p) => (
                <p className="t-body" key={p}>
                  {p}
                </p>
              ))}
            </Reveal>
          ))}

          <Reveal className="legal__foot" delay={0.1}>
            <p className="t-sm">
              Questions about any of this, or want the full document?
            </p>
            <Link href="/contact" className="tlink tlink--teal">
              Contact us
              <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
