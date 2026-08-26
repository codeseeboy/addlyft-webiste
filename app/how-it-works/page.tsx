import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import StoreRoom from "@/components/home/StoreRoom";
import Cycle from "@/components/home/Cycle";
import Ecosystem from "@/components/home/Ecosystem";
import Measurement from "@/components/home/Measurement";
import CtaBand from "@/components/site/CtaBand";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Explore how Addlyft connects store owners and local advertisers through in-store TV screens, speaker audio ads, and automated AI marketing.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        kicker="How It Works"
        accent="teal"
        lines={[
          <span key="ln1">Two channels.</span>,
          <span key="ln2">
            One <span key="ln3" className="em">in-store platform.</span>
          </span>,
        ]}
        lede="Addlyft operates two separate in-store channels: silent 10-second video loops on the screen above the counter, and 15-second spoken spots between songs on the speaker. Here is how the room, the schedule, and the technology work together."
        primary={{ href: "/contact", label: "Talk to us" }}
        secondary={{ href: "/pricing", label: "See pricing" }}
        facts={[
          ["Screen", "10-second silent video loops"],
          ["Speaker", "15-second spoken spots between songs"],
          ["Schedule", "Independent channels, continuous play"],
          ["Ecosystem", "Store owners earn · Advertisers reach"],
        ]}
        image="store-counter-tv"
        imageAlt="A convenience store checkout counter with TV displaying promotions"
      />

      {/* 3D Inside the store experience */}
      <StoreRoom />

      {/* Two channels, two clocks diagram */}
      <Cycle />

      {/* The 3-stage ecosystem loop */}
      <Ecosystem />

      {/* Play verification & measurement */}
      <Measurement />

      <CtaBand
        lines={[
          <span key="c1">Ready to see it</span>,
          <span key="c2" className="em">
            in your store?
          </span>,
        ]}
        lede="Whether you are a store owner wanting to market smarter or an advertiser seeking local footfall, start with a quick conversation."
      />
    </>
  );
}
