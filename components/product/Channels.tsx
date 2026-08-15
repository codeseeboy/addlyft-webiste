"use client";

import Img from "@/components/site/Img";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Motion";
import type { ImageKey } from "@/lib/images";

/**
 * The three Addlyft Go channels in detail — audio, video, social.
 *
 * Content comes from the client's own reference site, where each channel had
 * its own section and feature list. They alternate side to side so three
 * consecutive blocks do not read as one long column.
 */

type Channel = {
  id: string;
  tag: string;
  badge?: string;
  title: string;
  lede: string;
  points: string[];
  img: ImageKey;
  alt: string;
};

const CHANNELS: Channel[] = [
  {
    id: "audio",
    tag: "Addlyft Audio · 15s",
    title: "Your store has a voice. Make it count.",
    lede: "Curated music streams all day, and your own promotion plays automatically between songs. Your customers hear it; nobody has to do anything.",
    points: [
      "AI-written 15-second audio scripts",
      "Background music streaming — pick your genre",
      "Your ad plays automatically after a song",
      "Set your own frequency, duration and schedule",
      "POS integration for real-time promotions",
      "Offline mode — keeps playing without internet",
      "Speaker or tablet included with the plan",
    ],
    img: "cat-cafe",
    alt: "Customers at the counter of a busy café",
  },
  {
    id: "video",
    tag: "Addlyft Video · 10s",
    badge: "Free TV device",
    title: "Your store TV just got a lot smarter.",
    lede: "Ten-second spots on the screen above your counter — sales, menus, events, anything. And when an advertiser pays to appear on that screen, you earn from it.",
    points: [
      "AI-built 10-second video spots",
      "Digital signage and promotional content",
      "Earn revenue hosting Addlyft Reach ads",
      "Real-time scheduling and content management",
      "Perfect for menus, promos and announcements",
      "Runs continuously through trading hours",
      "Free in-store display device included",
    ],
    img: "store-live-auto",
    alt: "A local car dealership ad on the screen above a shop counter",
  },
  {
    id: "social",
    tag: "Addlyft Social · post",
    title: "Turn any promotion into a post in seconds.",
    lede: "Upload a photo, describe the offer in plain English, and Addlyft writes the post — then publishes it to Facebook and Instagram on your schedule.",
    points: [
      "Upload a photo and describe the promo",
      "AI writes a professional social post",
      "Auto-posts to Facebook and Instagram",
      "Manual or automatic publishing — your choice",
      "Smart alerts when nothing is scheduled",
      "Works for sales, events, new products, anything",
      "Included at no extra cost",
    ],
    img: "owner-shop",
    alt: "A shop owner behind her counter",
  },
];

export default function Channels() {
  return (
    <section className="chan bay-sm" id="channels">
      <div className="shell">
        <div className="sec-head sec-head--split">
          <div>
            <Reveal>
              <span className="kicker kicker--teal">Three channels, one app</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="t-d2" style={{ marginTop: "0.9rem" }}>
                Everything you need. Nothing you don&rsquo;t.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="t-lead">
              Audio, video and social are not three subscriptions. One price covers all of
              them, because a shop running a deal this weekend needs all three saying the same
              thing.
            </p>
          </Reveal>
        </div>

        <div className="chan__list">
          {CHANNELS.map((c, i) => (
            <Reveal className="chan__row" key={c.id} y={22} delay={0.04}>
              <article data-flip={i % 2 === 1} id={c.id}>
                <div className="chan__media">
                  <div className="shot shot--wide shot--zoom">
                    <Img name={c.img} alt={c.alt} sizes="(max-width: 900px) 100vw, 42vw" />
                  </div>
                  {c.badge && <span className="chan__badge">{c.badge}</span>}
                </div>

                <div className="chan__copy">
                  <span className="mono chan__tag">{c.tag}</span>
                  <h3 className="t-d3">{c.title}</h3>
                  <p className="t-sm chan__lede">{c.lede}</p>
                  <ul className="chan__points">
                    {c.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** The free promo library — the client's "we're going to create a library". */
export function TemplateLibrary() {
  return (
    <section className="lib bay-sm on-paper2" id="library">
      <div className="shell">
        <div className="split">
          <div className="split__copy">
            <Reveal>
              <span className="kicker kicker--teal">Free template library</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="t-d2" style={{ marginTop: "0.9rem", marginBottom: "0.9rem" }}>
                You don&rsquo;t have to start from a blank page.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="t-lead" style={{ marginBottom: "1.25rem" }}>
                Addlyft builds and maintains a library of ready-made promotions — seasonal
                offers, everyday deals, new-arrival spots. Take one, put your name on it and
                publish. It costs nothing and it uses none of your AI generations.
              </p>
            </Reveal>
            <RevealGroup className="checks" stagger={0.05}>
              {[
                ["Ready to publish", "Pick a promo, change the wording, send it to your screen or speaker."],
                ["Costs no generations", "Templates are free to use. Your monthly AI allowance stays untouched."],
                ["Built for chains too", "A group with 500 stores can run the same promotion across all of them at once."],
                ["Or make your own", "Want something different from the library? Describe it and Addlyft builds it."],
              ].map(([h, p]) => (
                <RevealItem className="check" key={h} as="div">
                  <svg viewBox="0 0 16 16" aria-hidden="true" className="check__ico">
                    <path
                      d="m3.5 8.5 3 3 6-7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div>
                    <b>{h}</b>
                    <p className="t-sm">{p}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div className="split__media">
            <div className="shot shot--tall shot--zoom">
              <Img
                name="counter-pos"
                alt="A shop owner serving a customer at the counter"
                sizes="(max-width: 900px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
