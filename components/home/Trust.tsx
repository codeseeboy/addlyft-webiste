"use client";

import Img from "@/components/site/Img";
import { LineReveal, Reveal, RevealGroup, RevealItem } from "@/components/site/Motion";
import type { ImageKey } from "@/lib/images";

const FACES: { img: ImageKey; alt: string; role: string; note: string }[] = [
  {
    img: "owner-shop",
    alt: "A shop owner standing behind the counter of her store",
    role: "The owner who opens at six",
    note: "Convenience & c-store",
  },
  {
    img: "face-cafe",
    alt: "A café worker in an apron behind the counter",
    role: "The counter that never stops",
    note: "Café & quick service",
  },
  {
    img: "face-salon",
    alt: "A shopkeeper smiling inside her store",
    role: "The regular who became a friend",
    note: "Independent retail",
  },
  {
    img: "face-butcher",
    alt: "A butcher standing in the doorway of his shop",
    role: "The trade passed down twice",
    note: "Food & speciality",
  },
];

/*
 * Four, not six. Every one of these was a paragraph; the ones that survived are
 * the four an owner actually asks about on the first call, cut to a sentence.
 * The rest are answered in the FAQ below, where someone looking for them looks.
 */
const COMMITMENTS: [string, string][] = [
  [
    "A revenue floor we carry",
    "Every active store is paid $49 a month. If advertiser demand falls short, the difference is ours to absorb.",
  ],
  [
    "No competitor in your aisle",
    "Same-category advertisers are removed from your store automatically. A café never carries a rival café.",
  ],
  [
    "Nothing plays unreviewed",
    "Every message is checked before it goes live in somebody's business, and rejections come with a reason.",
  ],
  [
    "The room stays yours",
    "Genre, language and mood are set per store. Explicit lyrics stay off unless the owner turns them on.",
  ],
];

export default function Trust() {
  return (
    <section className="trust bay" id="trust">
      <div className="shell">
        <div className="sec-head sec-head--split">
          <div>
            <Reveal>
              <span className="kicker">What we commit to</span>
            </Reveal>
            <h2 className="t-d1" style={{ marginTop: "1.25rem" }}>
              <LineReveal
                lines={[
                  <span key="ln1">Built for the people</span>,
                  <span key="ln2">
                    <span key="ln3" className="em">behind the counter.</span>
                  </span>,
                ]}
              />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="t-lead">
              A network like this only works if the store trusts it first. So the rules that
              protect the owner are written into the product rather than into a sales
              conversation.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="trust__faces" stagger={0.09}>
          {FACES.map((f) => (
            <RevealItem className="trust__face" key={f.role} as="figure">
              <div className="shot shot--sq shot--zoom">
                <Img name={f.img} alt={f.alt} sizes="(max-width: 820px) 46vw, 22vw" />
              </div>
              <figcaption>
                <b>{f.role}</b>
                <span className="mono">{f.note}</span>
              </figcaption>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup className="trust__grid" stagger={0.06}>
          {COMMITMENTS.map(([h, p], i) => (
            <RevealItem className="trust__item" key={h}>
              <span className="mono trust__item-n">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="t-d4">{h}</h3>
              <p className="t-sm">{p}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
