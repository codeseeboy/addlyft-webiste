"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Arrow } from "./Brand";
import { EASE } from "./Motion";

const INTENTS = [
  { id: "store", label: "I'm a store", note: "Market your own store with Addlyft Go" },
  { id: "advertiser", label: "I'm an advertiser", note: "Book stores near your customers" },
  { id: "partner", label: "Partnership", note: "Networks, groups and multi-site operators" },
  { id: "press", label: "Press", note: "Media enquiries and company information" },
] as const;

type Intent = (typeof INTENTS)[number]["id"];
type State = "idle" | "sending" | "done" | "error";

export default function ContactForm() {
  const params = useSearchParams();
  const [intent, setIntent] = useState<Intent>("store");
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Every CTA on the site arrives here with its intent already chosen, so the
  // first question is answered before the visitor sees the form.
  useEffect(() => {
    const q = params.get("intent");
    if (q && INTENTS.some((i) => i.id === q)) setIntent(q as Intent);
  }, [params]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setErrors({});

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, intent }),
      });
      const json = await res.json();

      if (!res.ok) {
        setErrors(json.errors ?? { form: json.error ?? "Something went wrong." });
        setState("error");
        return;
      }
      setState("done");
    } catch {
      setErrors({ form: "We could not reach the server. Please try again." });
      setState("error");
    }
  }

  const isStore = intent === "store";

  return (
    <div className="cform">
      <AnimatePresence mode="wait">
        {state === "done" ? (
          <motion.div
            key="done"
            className="cform__done"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span className="cform__tick" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="m5 12.5 4.5 4.5L19 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h2 className="t-d3">Thank you — that reached us.</h2>
            <p className="t-lead">
              Someone from the team will reply personally, usually within one business day. If
              it is urgent, say so in a follow-up and we will move it up the list.
            </p>
            <button className="tlink" onClick={() => setState("idle")}>
              Send another message
              <Arrow />
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            className="cform__form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            noValidate
          >
            <fieldset className="cform__intents">
              <legend className="mono cform__legend">What brings you here?</legend>
              <div className="cform__intent-grid">
                {INTENTS.map((i) => (
                  <button
                    type="button"
                    key={i.id}
                    className="cform__intent"
                    data-on={intent === i.id}
                    onClick={() => setIntent(i.id)}
                    aria-pressed={intent === i.id}
                  >
                    <b>{i.label}</b>
                    <span>{i.note}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="cform__grid">
              <label className="field">
                <span>Your name</span>
                <input name="name" type="text" autoComplete="name" required />
                {errors.name && <em>{errors.name}</em>}
              </label>

              <label className="field">
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" required />
                {errors.email && <em>{errors.email}</em>}
              </label>

              <label className="field">
                <span>{isStore ? "Store name" : "Company"}</span>
                <input name="business" type="text" autoComplete="organization" />
              </label>

              <label className="field">
                <span>City &amp; state</span>
                <input name="location" type="text" autoComplete="address-level2" />
              </label>

              <label className="field field--full">
                <span>
                  {isStore
                    ? "Tell us about the store — type of business, roughly how busy a normal day is"
                    : "Who are you trying to reach, and roughly where?"}
                </span>
                <textarea name="message" rows={5} />
              </label>

              {/* Honeypot — hidden from people and from assistive tech, so
                  anything that fills it in is a bot. */}
              <div className="cform__hp" aria-hidden="true">
                <label htmlFor="company_website">Company website</label>
                <input
                  id="company_website"
                  name="company_website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
            </div>

            {errors.form && <p className="cform__err">{errors.form}</p>}

            <div className="cform__submit">
              <button
                className={`btn btn--lg ${isStore ? "btn--teal" : intent === "advertiser" ? "btn--reach" : ""}`}
                type="submit"
                disabled={state === "sending"}
              >
                {state === "sending" ? "Sending…" : "Send message"}
                <Arrow className="btn__ico" />
              </button>
              <p className="t-xs">
                No newsletter, no drip sequence. One person reads this and replies.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
