import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/site/ContactForm";
import { Reveal } from "@/components/site/Motion";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Addlyft about listing your store with Go, running a campaign with Reach, partnerships or press.",
};

const ASIDE: [string, string][] = [
  [
    "Store owners",
    "Tell us the type of business and roughly how busy a normal day is. We will come back with what a month on the network would look like for a store like yours.",
  ],
  [
    "Advertisers",
    "Tell us who you are trying to reach and where. We will send back the stores that fit and what a first campaign would cost.",
  ],
  [
    "Everyone else",
    "Partnerships, multi-site groups, press and the occasional good idea — all welcome at the same address.",
  ],
];

export default function ContactPage() {
  return (
    <>
      <section className="phero phero--tight">
        <div className="shell">
          <div className="phero__grid">
            <div>
              <Reveal>
                <span className="kicker">Contact</span>
              </Reveal>
              <h1 className="t-d1 phero__title">
                Start with a <span className="em">conversation.</span>
              </h1>
            </div>
            <div className="phero__aside">
              <Reveal delay={0.15}>
                <p className="t-lead">
                  No signup wall, no demo request form that leads to a sequence of emails. Tell
                  us what you are working with and a person will write back.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="shell bay-sm">
        <div className="contact">
          <Suspense fallback={<div className="cform" />}>
            <ContactForm />
          </Suspense>

          <aside className="contact__aside">
            {ASIDE.map(([h, p], i) => (
              <Reveal className="contact__note" delay={i * 0.07} key={h}>
                <h2 className="t-d4">{h}</h2>
                <p className="t-sm">{p}</p>
              </Reveal>
            ))}

            <Reveal className="contact__note" delay={0.24}>
              <h2 className="t-d4">Prefer email?</h2>
              <p className="t-sm">
                Write to{" "}
                <a className="tlink" href="mailto:hello@addlyft.com">
                  hello@addlyft.com
                </a>{" "}
                and it lands in the same place.
              </p>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
