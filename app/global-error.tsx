"use client";

import { useEffect } from "react";

/**
 * Last line of defence: this replaces the root layout, so it cannot rely on
 * the site's fonts, CSS or chrome. Everything it needs is inline.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global error]", error.digest ?? error.message);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#ffffff",
          color: "#12161a",
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "34rem" }}>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#0d9488",
              margin: "0 0 1rem",
            }}
          >
            ADD-LYFT
          </p>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 5vw, 2.75rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              fontWeight: 500,
              margin: "0 0 1rem",
            }}
          >
            The site hit an unexpected error.
          </h1>
          <p style={{ color: "#414a55", lineHeight: 1.6, margin: "0 0 1.75rem" }}>
            This one is on us. Reloading usually fixes it.
          </p>
          <button
            onClick={reset}
            style={{
              border: 0,
              cursor: "pointer",
              background: "#12161a",
              color: "#fff",
              padding: "0.9rem 1.6rem",
              borderRadius: 999,
              fontSize: "0.9rem",
              fontWeight: 500,
            }}
          >
            Reload the page
          </button>
        </div>
      </body>
    </html>
  );
}
