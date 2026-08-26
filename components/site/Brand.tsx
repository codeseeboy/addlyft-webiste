import Link from "next/link";
import Image from "next/image";

/**
 * The Addlyft lockup.
 *
 * Built to the spec given on the call:
 *   - one word, no hyphen anywhere            (meeting L1, L51, L55)
 *   - the logo mark IS the letter A, and the
 *     wordmark carries on from it: [A] ddlyft (meeting L477)
 *   - only the A is capital                   (meeting L453)
 *   - "Add" pale green, "lyft" black          (meeting L437)
 *
 * Because the mark supplies the A, the text node is "ddlyft" — the "dd"
 * stays pale green so the colour break still falls after "Add", and "lyft"
 * is ink. On dark surfaces "lyft" flips to the inverse ink, otherwise it
 * would disappear into the footer.
 */
export function BrandMark({ className = "brand__mark" }: { className?: string }) {
  return (
    <span className={className}>
      {/*
       * The mark never renders past ~26px anywhere on the site (.wm is fixed
       * at 1.22rem, no larger context exists) — a 128px source is generous
       * headroom for retina and a fraction of the 2MB original, which was the
       * literal 1254px export loaded, unresized, on every single page.
       */}
      <Image
        src="/images/brand-mark.png"
        alt="A"
        width={128}
        height={128}
        priority
        style={{
          width: "1.24em",
          height: "1.24em",
          objectFit: "contain",
          display: "block",
          filter: "drop-shadow(0 2px 6px rgba(13,148,136,0.35))",
        }}
      />
    </span>
  );
}

/** The wordmark on its own — mark plus type, colour-split. */
export function Wordmark() {
  return (
    <span className="wm">
      <BrandMark className="wm__mark" />
      <span className="wm__type">
        <span className="wm__pale">dd</span>
        <span className="wm__ink">lyft</span>
      </span>
    </span>
  );
}

export function BrandLink({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="brand" aria-label="Addlyft home" onClick={onClick}>
      <Wordmark />
    </Link>
  );
}

export function Arrow({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg className={className} style={style} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Chevron({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 6.5 8 10.5l4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
