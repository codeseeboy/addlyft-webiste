import Link from "next/link";
import Img from "./Img";
import { Arrow } from "./Brand";
import { LineReveal, Reveal } from "./Motion";

export default function CtaBand({
  lines = [<span key="ln1">Grow local.</span>, <span key="ln2" className="em">Reach further.</span>],
  lede = "Whether you own the room or want to be heard in it, the next step is the same: a short conversation with a person, not a signup wall.",
}: {
  lines?: React.ReactNode[];
  lede?: string;
}) {
  return (
    <section className="cta">
      <div className="cta__bg">
        <Img name="street-evening" alt="" sizes="100vw" />
      </div>
      <span className="cta__veil" />

      <div className="shell cta__in">
        <div>
          <Reveal>
            <span className="kicker kicker--night">Get started</span>
          </Reveal>
          <h2 className="t-d1" style={{ marginTop: "1.35rem", maxWidth: "14ch" }}>
            <LineReveal lines={lines} />
          </h2>
          <Reveal delay={0.1}>
            <p className="t-lead cta__lede">{lede}</p>
          </Reveal>
        </div>

        <Reveal className="cta__doors" delay={0.14}>
          <Link href="/contact?intent=store" className="cta__door cta__door--go">
            <span className="cta__door-badge">Go</span>
            <span>
              <span className="cta__door-t">I&rsquo;m a store</span>
              <br />
              <span className="cta__door-d">Market your own store with Go</span>
            </span>
            <Arrow className="cta__door-arrow" />
          </Link>

          <Link href="/contact?intent=advertiser" className="cta__door cta__door--reach">
            <span className="cta__door-badge">Re</span>
            <span>
              <span className="cta__door-t">I&rsquo;m an advertiser</span>
              <br />
              <span className="cta__door-d">Book stores near your customers</span>
            </span>
            <Arrow className="cta__door-arrow" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
