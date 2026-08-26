"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE, Reveal } from "@/components/site/Motion";

type Preset = {
  id: string;
  category: string;
  storeName: string;
  location: string;
  prompt: string;
  videoSrc: string;
  posterSrc: string;
  speakerScript: string;
  screenHeadline: string;
  screenSub: string;
  screenBadge: string;
  socialCaption: string;
  /** Set only where the preview is genuine output from the real pipeline. */
  audioSrc?: string;
  real?: boolean;
  voicePersona: string;
  voiceGender: string;
  musicBed: string;
  priceTag: string;
};

const PRESETS: Preset[] = [
  {
    /*
     * Genuine output from the two R&D pipelines, not a mock: the 15s read is
     * Addlyft-voice/out/millers_weekend.mp3 and the 10s screen file is the
     * addlyft_tvads render. Both are the real lengths — 15.000s and 10.000s,
     * and the video carries no audio track, exactly as the spec says.
     */
    id: "millers",
    category: "Grocery & market",
    storeName: "Miller's Market",
    location: "Oak Street · Counter display",
    prompt:
      "Weekend restock promotion: fresh produce, cold drinks and family essentials at prices that make sense.",
    videoSrc: "/media/tvad-luma.mp4",
    posterSrc: "/media/tvad-luma-poster.jpg",
    speakerScript:
      "Need a weekend restock? That's Miller's Market. Fresh produce, cold drinks, and everything your family needs, at prices that make sense. Miller's on Oak Street. Come through this weekend.",
    audioSrc: "/media/millers-weekend.mp3",
    real: true,
    screenHeadline: "REFRESH NATURALLY",
    screenSub: "Zero sugar · 500ml · Real citrus",
    screenBadge: "IN THE COLD AISLE",
    socialCaption:
      "Weekend restock sorted. Fresh produce, cold drinks and everything the family needs — Miller's on Oak Street. #ShopLocal #WeekendRestock",
    voicePersona: "House voice",
    voiceGender: "Easy read, no acting",
    musicBed: "Weekend acoustic bed (CC-BY)",
    priceTag: "2 FOR $4",
  },
  {
    id: "cstore",
    category: "Convenience & c-store",
    storeName: "Metro Mart & Deli",
    location: "Oakland Ave · Checkout Counter TV",
    prompt: "Weekend energy boost deal: Buy 2 cold energy drinks for $5 and get double reward points all weekend.",
    videoSrc: "/media/store-screen.mp4",
    posterSrc: "/media/store-screen-poster.jpg",
    speakerScript: "Hey shoppers! Grab a quick weekend boost at Metro Mart. Any two cold energy drinks are just five dollars this Saturday and Sunday. Scan your rewards at checkout for double points!",
    screenHeadline: "ENERGY DRINK SPECIAL",
    screenSub: "Any 2 for $5 · Saturday & Sunday",
    screenBadge: "SAVE $2.50",
    socialCaption: "⚡ Weekend Energy Boost! Grab any 2 cold energy drinks for just $5 this Sat & Sun at Metro Mart. Double points for rewards members! 🥤 #WeekendDeals #LocalStore",
    voicePersona: "Alex",
    voiceGender: "Friendly & Upbeat",
    musicBed: "Lo-Fi Retail Beat (-14dB)",
    priceTag: "2 FOR $5",
  },
  {
    id: "cafe",
    category: "Café & bakery",
    storeName: "Artisan Roast Café",
    location: "4th Street Market · Main Register Display",
    prompt: "Morning special: Buy any large cold brew or latte and add a freshly baked butter croissant for only $1.50 before 11 AM.",
    videoSrc: "/media/hero-store.mp4",
    posterSrc: "/media/hero-store-poster.jpg",
    speakerScript: "Good morning! Pair your morning coffee with a fresh warm butter croissant for just one-fifty with any large brew before eleven AM. Baked fresh right here every morning.",
    screenHeadline: "MORNING PAIRING",
    screenSub: "Croissant $1.50 with Large Brew · Before 11 AM",
    screenBadge: "FRESH BAKED",
    socialCaption: "☕ Morning perfection starts here. Add a fresh, buttery croissant to your favorite large brew for only $1.50 before 11 AM! 🥐 #MorningVibes #CoffeeTime",
    voicePersona: "Sarah",
    voiceGender: "Warm & Welcoming",
    musicBed: "Acoustic Morning Breeze (-16dB)",
    priceTag: "$1.50 CROISSANT",
  },
  {
    id: "auto",
    category: "Auto dealership",
    storeName: "Summit Valley Motors",
    location: "Broadcasting in 12 Local Retail Stores",
    prompt: "Spring upgrade sales event: 0% APR financing on all certified pre-owned SUVs plus free 2-year maintenance package.",
    videoSrc: "/media/instore-spot.mp4",
    posterSrc: "/media/instore-spot-poster.jpg",
    speakerScript: "Looking to upgrade your drive? Summit Valley Motors is offering zero percent financing on all certified SUVs this week only, just two minutes down Route 4. Stop by for a test drive today!",
    screenHeadline: "0% APR FINANCING",
    screenSub: "Certified Pre-Owned SUVs · 2 Mins Away on Rt. 4",
    screenBadge: "LIMITED EVENT",
    socialCaption: "🚗 Upgrade your drive with 0% APR financing on all certified pre-owned SUVs at Summit Valley Motors! Free 2-year maintenance included. #AutoDeals",
    voicePersona: "Marcus",
    voiceGender: "Commercial Announcer",
    musicBed: "Dynamic Commercial Groove (-14dB)",
    priceTag: "0% APR EVENT",
  },
  {
    id: "salon",
    category: "Barbershop & salon",
    storeName: "Crown & Blade Barbers",
    location: "Broad Street Arcade · Reception Display",
    prompt: "Midweek refresh: Free hot towel treatment and luxury beard conditioning with every master haircut on Tuesday and Wednesday.",
    videoSrc: "/media/store-footfall.mp4",
    posterSrc: "/media/hero-store-poster.jpg",
    speakerScript: "Treat yourself to a midweek refresh at Crown and Blade. Book any master cut this Tuesday or Wednesday and enjoy a complimentary hot towel treatment. Walk-ins welcome!",
    screenHeadline: "MIDWEEK REFRESH",
    screenSub: "Free Hot Towel & Beard Care with Master Cut",
    screenBadge: "COMPLIMENTARY",
    socialCaption: "💈 Midweek looking sharp! Complimentary hot towel treatment with every haircut this Tue & Wed. Walk-ins welcome or book online. #BarbershopVibes",
    voicePersona: "Elena",
    voiceGender: "Modern Stylist",
    musicBed: "Chill Lounge Rhythm (-15dB)",
    priceTag: "FREE UPGRADE",
  },
];

/**
 * The studio is the one place the product demonstrates itself, so it is laid
 * out the way the real tool would be: what you control on the left, what comes
 * out on the right. Everything that used to sit around it — six cards of
 * benefit copy wrapped around the preview — has gone. A demo that needs to be
 * explained beside itself is not demonstrating anything.
 *
 * The preview is real, not a mockup: the screen spot is an actual video, and
 * the speaker read is spoken aloud by the browser's own speech synthesis.
 * Nothing here pretends to be a media file we do not have.
 */

const CHANNELS = [
  { key: "video", label: "Screen", note: "10s silent loop" },
  { key: "voice", label: "Speaker", note: "15s spoken read" },
  { key: "social", label: "Social", note: "Feed & stories" },
] as const;

type Channel = (typeof CHANNELS)[number]["key"];

export default function AdStudio() {
  const [activePreset, setActivePreset] = useState<Preset>(PRESETS[0]);
  const [activeTab, setActiveTab] = useState<Channel>("video");
  const [promptText, setPromptText] = useState(PRESETS[0].prompt);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [audioSeconds, setAudioSeconds] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isVoicePlaying) {
      timer = setInterval(() => setAudioSeconds((s) => s + 1), 1000);
    } else {
      setAudioSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isVoicePlaying]);

  /* Speech carries on reading if you scroll away mid-sentence, so it is
     cancelled when the section unmounts. */
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stopVoice = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsVoicePlaying(false);
  };

  const generate = () => {
    setIsGenerating(true);
    window.setTimeout(() => {
      setIsGenerating(false);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        void videoRef.current.play().catch(() => {});
      }
    }, 700);
  };

  const selectPreset = (p: Preset) => {
    stopVoice();
    setActivePreset(p);
    setPromptText(p.prompt);
    generate();
  };

  const playVoice = () => {
    /* A real render plays the real file; the illustrative presets fall back to
       the browser's own voice, which is honest but is not the product. */
    if (activePreset.audioSrc) {
      const el = audioRef.current;
      if (!el) return;
      if (isVoicePlaying) {
        el.pause();
        el.currentTime = 0;
        setIsVoicePlaying(false);
        return;
      }
      void el.play().catch(() => {});
      setIsVoicePlaying(true);
      return;
    }

    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setIsVoicePlaying((v) => !v);
      return;
    }
    window.speechSynthesis.cancel();
    if (isVoicePlaying) {
      setIsVoicePlaying(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(activePreset.speakerScript);
    u.rate = 1.05;
    u.pitch = ["Sarah", "Elena"].includes(activePreset.voicePersona) ? 1.15 : 0.95;
    u.onend = () => setIsVoicePlaying(false);
    window.speechSynthesis.speak(u);
    setIsVoicePlaying(true);
  };

  const clock = "0:" + String(Math.min(audioSeconds, 15)).padStart(2, "0") + " / 0:15";

  return (
    <section className="studio bay on-night" id="ad-studio">
      <div className="studio__glow" aria-hidden="true" />

      <div className="shell">
        <div className="studio__head">
          <Reveal>
            <span className="kicker kicker--teal">Try it yourself</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-d1 studio__head-t">
              See what <span className="em">one sentence</span> creates.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="t-lead studio__head-p">
              Pick a business, write the promotion, and see the screen spot, the spoken read and the
              social post that come back. These are worked examples — a real ad renders in a few
              minutes and you get a notification when it is ready.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="studio__grid">
            {/* ------------------------------------------------- controls */}
            <div className="studio__panel studio__form">
              <h3 className="studio__panel-t">Write the promotion</h3>

              <div className="sfield">
                <label className="sfield__label" htmlFor="studio-business">
                  Business
                </label>
                <div className="sfield__select">
                  <select
                    id="studio-business"
                    value={activePreset.id}
                    onChange={(e) => {
                      const p = PRESETS.find((x) => x.id === e.target.value);
                      if (p) selectPreset(p);
                    }}
                  >
                    {PRESETS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.category}
                      </option>
                    ))}
                  </select>
                  <span className="sfield__chev" aria-hidden="true" />
                </div>
                <p className="sfield__hint">
                  {activePreset.storeName} · {activePreset.location}
                </p>
              </div>

              <div className="sfield">
                <label className="sfield__label" htmlFor="studio-prompt">
                  Your promotion, in plain English
                </label>
                <textarea
                  id="studio-prompt"
                  value={promptText}
                  rows={4}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="Describe the deal you want to run this week."
                />
              </div>

              <div className="sfield">
                <span className="sfield__label">What comes back</span>
                <ul className="studio__outputs">
                  {CHANNELS.map((c) => (
                    <li key={c.key}>
                      <b>{c.label}</b>
                      <span>{c.note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sfield">
                <span className="sfield__label">Voice</span>
                <p className="sfield__value">
                  {activePreset.voicePersona} · {activePreset.voiceGender}
                </p>
              </div>

              <button className="btn btn--teal btn--lg studio__go" onClick={generate}>
                {isGenerating ? "Rendering…" : "Show me the ad"}
              </button>
            </div>

            {/* --------------------------------------------------- result */}
            <div className="studio__panel studio__result">
              <div className="studio__result-top">
                <h3 className="studio__panel-t">As it plays in store</h3>
                <span className="studio__live">
                  <i />
                  {activePreset.real ? "Real render" : "Example output"}
                </span>
              </div>

              <div className="studio__tabs" role="tablist" aria-label="Channel">
                {CHANNELS.map((c) => (
                  <button
                    key={c.key}
                    role="tab"
                    id={"ch-" + c.key}
                    aria-selected={activeTab === c.key}
                    aria-controls={"chpanel-" + c.key}
                    tabIndex={activeTab === c.key ? 0 : -1}
                    data-on={activeTab === c.key}
                    onClick={() => {
                      if (c.key !== "voice") stopVoice();
                      setActiveTab(c.key);
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <div
                className="studio__stage"
                role="tabpanel"
                id={"chpanel-" + activeTab}
                aria-labelledby={"ch-" + activeTab}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeTab + activePreset.id}
                    className="studio__stage-in"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isGenerating ? 0.25 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    {activeTab === "video" && (
                      <figure className="screenad">
                        <video
                          ref={videoRef}
                          src={activePreset.videoSrc}
                          poster={activePreset.posterSrc}
                          autoPlay
                          muted
                          loop
                          playsInline
                          aria-label={"The screen spot for " + activePreset.storeName}
                        />
                        <div className="screenad__over">
                          <div className="screenad__top">
                            <span className="screenad__store">{activePreset.storeName}</span>
                            <span className="screenad__price">{activePreset.priceTag}</span>
                          </div>
                          <div className="screenad__card">
                            <span className="mono screenad__badge">{activePreset.screenBadge}</span>
                            <strong>{activePreset.screenHeadline}</strong>
                            <span>{activePreset.screenSub}</span>
                          </div>
                        </div>
                        <figcaption className="mono screenad__len">10s loop · silent</figcaption>
                      </figure>
                    )}

                    {activeTab === "voice" && (
                      <div className="voicead">
                        {activePreset.audioSrc && (
                          <audio
                            ref={audioRef}
                            src={activePreset.audioSrc}
                            preload="none"
                            onEnded={() => setIsVoicePlaying(false)}
                          />
                        )}
                        <div className="voicead__head">
                          <button
                            className="voicead__play"
                            onClick={playVoice}
                            data-on={isVoicePlaying}
                            aria-label={isVoicePlaying ? "Stop the read" : "Play the read"}
                          >
                            <span aria-hidden="true">{isVoicePlaying ? "■" : "▶"}</span>
                          </button>
                          <div className="voicead__who">
                            <b>{activePreset.voicePersona}</b>
                            <span className="mono">{activePreset.voiceGender}</span>
                          </div>
                          <span className="mono voicead__clock">{clock}</span>
                        </div>

                        <blockquote className="voicead__script">
                          {activePreset.speakerScript}
                        </blockquote>

                        <div className="voicead__wave" aria-hidden="true">
                          {Array.from({ length: 44 }).map((_, i) => (
                            <motion.i
                              key={i}
                              animate={{ scaleY: isVoicePlaying ? [0.25, 1, 0.35] : 0.14 }}
                              transition={{
                                duration: 0.7,
                                repeat: isVoicePlaying ? Infinity : 0,
                                delay: i * 0.025,
                                ease: "easeInOut",
                              }}
                            />
                          ))}
                        </div>

                        <p className="mono voicead__bed">Music: {activePreset.musicBed}</p>
                      </div>
                    )}

                    {activeTab === "social" && (
                      <div className="socialad">
                        <div className="socialad__head">
                          <span className="socialad__av" aria-hidden="true" />
                          <div className="socialad__who">
                            <b>@{activePreset.storeName.toLowerCase().replace(/[^a-z]/g, "")}</b>
                            <span>Scheduled to Instagram &amp; Facebook</span>
                          </div>
                        </div>
                        <figure className="socialad__shot">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={activePreset.posterSrc} alt="" />
                          <figcaption>{activePreset.screenHeadline}</figcaption>
                        </figure>
                        <p className="socialad__cap">{activePreset.socialCaption}</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
