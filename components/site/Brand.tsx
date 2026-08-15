import Link from "next/link";

/**
 * The mark: three ascending bars — an audio level that is also a growth
 * curve, which is exactly what the company sells. Teal on the tallest bar so
 * the brand colour appears without the mark becoming a colour block.
 */
export function BrandMark({ className = "brand__mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect className="m-a" x="2" y="13" width="4.6" height="8" rx="2.3" fill="currentColor" opacity="0.42" />
      <rect className="m-b" x="9.7" y="8.5" width="4.6" height="12.5" rx="2.3" fill="currentColor" opacity="0.72" />
      <rect className="m-c" x="17.4" y="3" width="4.6" height="18" rx="2.3" fill="#0d9488" />
    </svg>
  );
}

export function BrandLink({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="brand" aria-label="ADD-LYFT home" onClick={onClick}>
      <BrandMark />
      ADD-LYFT
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
