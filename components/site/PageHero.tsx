import Link from "next/link";
import Img from "./Img";
import { Arrow } from "./Brand";
import { LineReveal, Reveal } from "./Motion";
import type { ImageKey } from "@/lib/images";

export default function PageHero({
  kicker,
  lines,
  lede,
  accent = "teal",
  primary,
  secondary,
  facts,
  image,
  imageAlt,
}: {
  kicker: string;
  lines: React.ReactNode[];
  lede: string;
  accent?: "teal" | "reach" | "plain";
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  facts?: [string, string][];
  image: ImageKey;
  imageAlt: string;
}) {
  return (
    <section className={`phero phero--${accent}`}>
      <div className="shell">
        <div className="phero__grid">
          <div>
            <Reveal>
              <span
                className={`kicker ${
                  accent === "teal" ? "kicker--teal" : accent === "reach" ? "kicker--reach" : ""
                }`}
              >
                {kicker}
              </span>
            </Reveal>
            <h1 className="t-d1 phero__title">
              <LineReveal trigger="mount" delay={0.12} lines={lines} />
            </h1>
          </div>

          <div className="phero__aside">
            <Reveal delay={0.2}>
              <p className="t-lead">{lede}</p>
            </Reveal>
            {(primary || secondary) && (
              <Reveal delay={0.28}>
                <div className="btn-row phero__cta">
                  {primary && (
                    <Link
                      href={primary.href}
                      className={`btn ${accent === "reach" ? "btn--reach" : accent === "plain" ? "" : "btn--teal"}`}
                    >
                      {primary.label}
                      <Arrow className="btn__ico" />
                    </Link>
                  )}
                  {secondary && (
                    <Link href={secondary.href} className="btn btn--ghost">
                      {secondary.label}
                    </Link>
                  )}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>

      <Reveal className="phero__media" y={30} delay={0.15}>
        <div className="phero__frame">
          <Img name={image} alt={imageAlt} sizes="100vw" priority />
        </div>
        {facts && (
          <dl className="phero__facts shell">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="mono">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </Reveal>
    </section>
  );
}
