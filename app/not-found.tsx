import Link from "next/link";
import { Arrow } from "@/components/site/Brand";

export default function NotFound() {
  return (
    <section className="nf">
      <div className="shell nf__in">
        <span className="mono nf__code">404</span>
        <h1 className="t-d1 nf__title">
          That aisle is <span className="em">empty.</span>
        </h1>
        <p className="t-lead nf__lede">
          The page you were after has moved or never existed. The rest of the network is still
          right here.
        </p>
        <div className="btn-row nf__cta">
          <Link href="/" className="btn btn--lg">
            Back to the homepage
            <Arrow className="btn__ico" />
          </Link>
          <Link href="/contact" className="btn btn--ghost btn--lg">
            Talk to us
          </Link>
        </div>
      </div>
    </section>
  );
}
