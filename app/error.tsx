"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Arrow } from "@/components/site/Brand";

/**
 * Route-level error boundary. Keeps the header and footer, so a failure looks
 * like a page that went wrong rather than the site falling over.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Replace with the real reporter (Sentry et al) when one is chosen.
    console.error("[route error]", error.digest ?? error.message);
  }, [error]);

  return (
    <section className="nf">
      <div className="shell nf__in">
        <span className="mono nf__code">Something broke</span>
        <h1 className="t-d1 nf__title">
          That did not <span className="em">go to plan.</span>
        </h1>
        <p className="t-lead nf__lede">
          The page hit an error on its way to you. Trying again usually clears it — and if
          it does not, tell us and we will fix it properly.
        </p>
        <div className="btn-row nf__cta">
          <button className="btn btn--lg" onClick={reset}>
            Try again
            <Arrow className="btn__ico" />
          </button>
          <Link href="/" className="btn btn--ghost btn--lg">
            Back to the homepage
          </Link>
        </div>
        {error.digest && (
          <p className="t-xs" style={{ marginTop: "0.5rem" }}>
            Reference: <span className="mono">{error.digest}</span>
          </p>
        )}
      </div>
    </section>
  );
}
