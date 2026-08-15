import Link from "next/link";

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
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        className="m-a"
        d="M6.2 26.4 16 6.1l9.8 20.3"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="m-bar"
        d="M11.1 19.1h9.8"
        stroke="currentColor"
        strokeWidth="3.3"
        strokeLinecap="round"
      />
    </svg>
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
