import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/site/Brand";
import { Reveal } from "@/components/site/Motion";

export const metadata: Metadata = {
  title: "Terms",
  description: "The terms that govern the ADD-LYFT network for store owners and advertisers.",
};

const SECTIONS: [string, string[]][] = [
  [
    "Two kinds of account",
    [
      "Store owners subscribe per location and supply the airtime. Advertisers buy campaigns across stores they select. The obligations differ, and each account is bound only by the terms for its side.",
      "Both sides are billed monthly, and neither is held to a minimum term.",
    ],
  ],
  [
    "Trials and billing",
    [
      "New store accounts include a seven-day free trial. No charge is made during the trial, and the date of the first charge is shown before a plan is confirmed.",
      "Subscriptions renew monthly until cancelled. Cancelling stops the next cycle; the current cycle runs to its end.",
    ],
  ],
  [
    "The revenue guarantee",
    [
      "Stores active on the Full Bundle plan are guaranteed $49 per month per location. The guarantee begins after three continuous months on the network and is paid quarterly.",
      "A store is considered active when its channels are connected and available to serve during its stated opening hours.",
    ],
  ],
  [
    "Content standards",
    [
      "Every message is reviewed before it plays. We decline material that is misleading, unlawful, unsafe, or unsuitable for a public retail space, and we will explain a rejection rather than leave it unexplained.",
      "Advertisers keep ownership of the creative they submit and grant ADD-LYFT the permission needed to play it on the stores booked.",
    ],
  ],
  [
    "Category protection",
    [
      "Stores are automatically excluded from the targeting list of advertisers in the same business category. This protection is applied by the platform and is not subject to being bought out.",
    ],
  ],
  [
    "Service and liability",
    [
      "We work to keep the network available during store opening hours. Where a store's playback is interrupted by a fault on our side, the affected campaign delivery is credited.",
      "Nothing here removes any right you have under applicable United States consumer or commercial law.",
    ],
  ],
];

export default function TermsPage() {
  return (
    <>
      <section className="phero phero--tight">
        <div className="shell">
          <Reveal>
            <span className="kicker">Legal</span>
          </Reveal>
          <h1 className="t-d1 phero__title" style={{ maxWidth: "18ch" }}>
            Terms of service
          </h1>
          <Reveal delay={0.12}>
            <p className="t-lead legal__lede">
              A plain-language summary of the agreement between ADD-LYFT and the businesses on
              the network. The full contract is provided at sign-up and is available on request
              beforehand.
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
            <p className="t-sm">Want the full agreement before you commit to anything?</p>
            <Link href="/contact" className="tlink tlink--teal">
              Ask us for it
              <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
