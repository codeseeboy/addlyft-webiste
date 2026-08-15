import Hero from "@/components/home/Hero";
import Moment from "@/components/home/Moment";
import StoreRoom from "@/components/home/StoreRoom";
import Cycle from "@/components/home/Cycle";
import Products from "@/components/home/Products";
import Venues from "@/components/home/Venues";
import Network from "@/components/home/Network";
import Measurement from "@/components/home/Measurement";
import Trust from "@/components/home/Trust";
import PricePeek from "@/components/home/PricePeek";
import { FaqSection } from "@/components/site/Faq";
import CtaBand from "@/components/site/CtaBand";

const FAQ = [
  {
    q: "What actually plays inside the store?",
    a: "A fifteen-second spoken message between songs, and a ten-second spot on the screen near the counter. Two messages per break, then the music comes back. Nothing follows the shopper home.",
  },
  {
    q: "Does a shopper need an app, a scan or an account?",
    a: "No. There is nothing for the customer to install, open or agree to. The room carries the message, which is exactly why it reaches people that local digital advertising never touches.",
  },
  {
    q: "Will this annoy my customers?",
    a: "The format is capped on purpose: two messages, then music, with a five-second fade so nothing is ever cut off mid-song. Owners choose the genre, the language and the mood, and explicit lyrics stay off unless they turn them on.",
  },
  {
    q: "Can a competitor advertise inside my store?",
    a: "No. Stores are removed automatically from the target list of any advertiser in the same business category. A café will not carry a rival café. It is a rule the network enforces, not a favour you have to ask for.",
  },
  {
    q: "How does a brand know the message really played?",
    a: "Every play is logged as an event by the device that ran it, with the store, the hour and the channel attached. Audience figures start from the store's own daily footfall band rather than a modelled panel.",
  },
  {
    q: "What does it cost to start?",
    a: "Store owners start from $39.99 per month per location with a seven-day free trial, and no card is charged until the trial ends. Brands start at five stores, with pricing driven by store count and play volume.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Moment />
      <StoreRoom />
      <Cycle />
      <Products />
      <Venues />
      <Network />
      <Measurement />
      <Trust />
      <PricePeek />
      <FaqSection
        items={FAQ}
        title={
          <>
            The questions we get <span className="em">on the first call.</span>
          </>
        }
        lede="If yours is not here, ask us directly — a person answers."
      />
      <CtaBand />
    </>
  );
}
