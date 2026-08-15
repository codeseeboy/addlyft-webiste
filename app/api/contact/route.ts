import { NextResponse } from "next/server";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

/**
 * Contact endpoint.
 *
 * Delivery is configured entirely by environment variables, so this is
 * production-ready without a code change:
 *
 *   CONTACT_WEBHOOK_URL   POST the submission as JSON (Slack, Zapier, a CRM)
 *   RESEND_API_KEY        send via Resend
 *   CONTACT_TO_EMAIL      where Resend delivers (defaults to the public address)
 *   CONTACT_FROM_EMAIL    verified sender for Resend
 *
 * With none of them set — local development — submissions are written to the
 * server log and the request still succeeds. Nothing is silently dropped: if a
 * transport IS configured and fails, the caller gets a 502 so the visitor is
 * told to try again rather than believing a lost message got through.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const INTENTS = ["store", "advertiser", "partner", "press"] as const;
type Intent = (typeof INTENTS)[number];

export type ContactPayload = {
  intent: Intent;
  name: string;
  email: string;
  business?: string;
  location?: string;
  phone?: string;
  message?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* ------------------------------------------------------------ rate limit */
/* Per-instance and in-memory: enough to stop a script hammering the form,
   not a substitute for an edge WAF on a high-traffic domain. */

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

/* -------------------------------------------------------------- delivery */

async function deliver(data: ContactPayload): Promise<{ ok: boolean; sent: boolean }> {
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;

  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: SITE_NAME, receivedAt: new Date().toISOString(), ...data }),
    });
    return { ok: res.ok, sent: true };
  }

  if (resendKey) {
    const to = process.env.CONTACT_TO_EMAIL ?? CONTACT_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL ?? `${SITE_NAME} <onboarding@resend.dev>`;
    const lines = [
      `Intent:   ${data.intent}`,
      `Name:     ${data.name}`,
      `Email:    ${data.email}`,
      data.business ? `Business: ${data.business}` : null,
      data.location ? `Location: ${data.location}` : null,
      data.phone ? `Phone:    ${data.phone}` : null,
      "",
      data.message ?? "(no message)",
    ].filter(Boolean);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `${SITE_NAME} — ${data.intent} enquiry from ${data.name}`,
        text: lines.join("\n"),
      }),
    });
    return { ok: res.ok, sent: true };
  }

  // No transport configured: record it so a launch-day submission is not lost.
  console.info("[contact]", JSON.stringify({ ...data, at: new Date().toISOString() }));
  return { ok: true, sent: false };
}

/* ---------------------------------------------------------------- handler */

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Please wait a minute and try again." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  // Honeypot: a field no human sees, so anything filling it is a bot. Answer
  // 200 so the bot believes it succeeded and does not retry.
  if (str(body.company_website)) {
    return NextResponse.json({ ok: true });
  }

  const data: ContactPayload = {
    intent: (INTENTS as readonly string[]).includes(str(body.intent))
      ? (str(body.intent) as Intent)
      : "store",
    name: str(body.name).slice(0, 120),
    email: str(body.email).slice(0, 200),
    business: str(body.business).slice(0, 160) || undefined,
    location: str(body.location).slice(0, 120) || undefined,
    phone: str(body.phone).slice(0, 40) || undefined,
    message: str(body.message).slice(0, 4000) || undefined,
  };

  const errors: Record<string, string> = {};
  if (data.name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(data.email)) errors.email = "That email address does not look right.";

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  try {
    const { ok } = await deliver(data);
    if (!ok) {
      return NextResponse.json(
        { ok: false, error: "We could not deliver that message. Please try again." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[contact] delivery failed", err);
    return NextResponse.json(
      { ok: false, error: "We could not deliver that message. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
