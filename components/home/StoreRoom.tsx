"use client";

/*
 * ADD-LYFT — "inside the store".
 *
 * The copy shell: the pinned stage, the chapter text, and the scroll reader
 * that decides which shot the camera holds. The WebGL room is a separate
 * module behind next/dynamic.
 *
 * Three rules about when it appears:
 *   1. The photograph is painted immediately, on every device, so this
 *      section is never blank or late — the canvas fades in on top of it once
 *      the renderer has actually produced a frame.
 *   2. The chunk is fetched when the section is still a viewport and a half
 *      away, so by the time it is scrolled to, three.js is already parsed.
 *   3. Phones get the room too, at a lighter tier — the previous build shut
 *      them out entirely and left them looking at a still.
 */

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Img from "@/components/site/Img";
import type { Tier } from "./RoomScene";

const RoomScene = dynamic(() => import("./RoomScene"), { ssr: false });

const CHAPTERS = [
  {
    tag: "The venue",
    h: "A room somebody already runs by hand",
    p: "Every ADD-LYFT placement sits inside a real business — the lights, the music, the counter, the regulars. We do not build the audience. We meet it where it already stands.",
  },
  {
    tag: "The aisle",
    h: "Where the decision actually gets made",
    p: "Four steps from the cooler, basket in hand, mind not yet made up. This is the last stretch of a purchase, and until now it has been the least measurable place a local business could advertise.",
  },
  {
    tag: "The audio",
    h: "Fifteen seconds, between the songs",
    p: "The music plays and fades. Two spoken messages run — fifteen seconds each — and the music comes back. No scrolling past it, no muting it, no ad-block. Just the room, speaking once.",
  },
  {
    tag: "The screen",
    h: "Ten seconds where the queue forms",
    p: "The display by the register carries the same story in picture: a ten-second spot, on the last surface anyone looks at before they pay.",
  },
];

function pickTier(): { tier: Tier; gl: boolean } {
  if (typeof window === "undefined") return { tier: "mid", gl: false };

  let gl = false;
  try {
    const probe = document.createElement("canvas");
    gl = !!(probe.getContext("webgl2") || probe.getContext("webgl"));
  } catch {
    gl = false;
  }
  if (!gl) return { tier: "low", gl: false };

  const cores = navigator.hardwareConcurrency ?? 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const narrow = window.matchMedia("(max-width: 900px)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;

  // Phones and low-core machines still get the room, just a smaller one.
  if (narrow || coarse || cores <= 4 || mem <= 4) return { tier: "low", gl: true };
  if (cores <= 8) return { tier: "mid", gl: true };
  return { tier: "high", gl: true };
}

export default function StoreRoom() {
  const stage = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  const [tier, setTier] = useState<Tier>("mid");
  const [gl, setGl] = useState(false);
  const [armed, setArmed] = useState(false); // chunk may load
  const [ready, setReady] = useState(false); // first frame rendered
  const [visible, setVisible] = useState(false);
  const [still, setStill] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const picked = pickTier();
    setTier(picked.tier);
    setGl(picked.gl);
  }, []);

  /*
   * Arm as soon as the browser is idle after first paint, rather than waiting
   * for the section to come near. Waiting meant the renderer was still warming
   * up as the reader arrived, and they watched the still get replaced — the
   * swap itself was the glitch. Now the room is nearly always ready before it
   * is ever looked at.
   */
  useEffect(() => {
    if (!gl || armed) return;

    type IdleWindow = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    const w = window as IdleWindow;
    const arm = () => setArmed(true);

    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(arm, { timeout: 1800 });
      return () => window.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(arm, 600);
    return () => window.clearTimeout(id);
  }, [gl, armed]);

  /* Scroll reader: chapter-relative progress, plus play/pause for the canvas. */
  useEffect(() => {
    const el = stage.current;
    if (!el) return;

    let frame = 0;
    const read = () => {
      frame = 0;
      const chapters = Array.from(el.querySelectorAll<HTMLElement>(".chapter"));
      const rect = el.getBoundingClientRect();
      const centre = window.innerHeight * 0.5;
      let p = 0;
      let idx = 0;

      /*
       * Progress is measured per chapter rather than as a flat scroll ratio:
       * chapters are deliberately different heights, and a flat ratio would
       * slide the camera off its marks.
       */
      if (chapters.length) {
        const n = chapters.length;
        const first = chapters[0].getBoundingClientRect();
        const last = chapters[n - 1].getBoundingClientRect();

        if (centre <= first.top) p = 0;
        else if (centre >= last.bottom) {
          p = 1;
          idx = n - 1;
        } else {
          for (let i = 0; i < n; i++) {
            const r = chapters[i].getBoundingClientRect();
            if (centre >= r.top && centre < r.bottom) {
              p = (i + (r.height <= 0 ? 0 : (centre - r.top) / r.height)) / n;
              idx = i;
              break;
            }
          }
        }
      }

      progress.current = Math.max(0, Math.min(1, p));
      setActive(idx);
      setVisible(rect.bottom > -100 && rect.top < window.innerHeight + 100);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", read);
    };
  }, []);

  return (
    <section className="room" ref={stage} id="inside">
      <div className="room__stage" aria-hidden="true">
        {/*
         * While WebGL is expected, the ground under the canvas is the room's
         * own near-black, not a photograph. Crossfading a completely different
         * photograph into the 3D scene was the visible "image first, then the
         * room" jump. The photograph is now only what you get when there is no
         * WebGL at all.
         */}
        {gl ? (
          <div className="room__plate" data-hidden={ready} />
        ) : (
          <div className="room__flat">
            <Img name="bodega" alt="" sizes="100vw" />
          </div>
        )}

        {gl && armed && (
          <div className="room__gl" data-ready={ready}>
            <RoomScene
              progress={progress}
              tier={tier}
              still={still}
              visible={visible}
              onReady={() => setReady(true)}
              onLost={() => {
                setReady(false);
                setGl(false);
              }}
            />
          </div>
        )}

        <div className="room__vig" />
      </div>

      <div className="room__scroll">
        <div className="shell room__lede">
          <span className="kicker kicker--night">Inside the store</span>
          <h2 className="t-d1" style={{ marginTop: "1.1rem", maxWidth: "16ch" }}>
            Walk the room the <span className="em">media lives in.</span>
          </h2>
        </div>

        {CHAPTERS.map((c, i) => (
          <article className="chapter" key={c.tag} data-on={active === i}>
            <div className="shell chapter__in">
              <div className="chapter__card">
                <span className="mono chapter__tag">
                  {String(i + 1).padStart(2, "0")} — {c.tag}
                </span>
                <h3 className="t-d3">{c.h}</h3>
                <p className="t-sm">{c.p}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
