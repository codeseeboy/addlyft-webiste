import Hero from "@/components/home/Hero";
import Moment from "@/components/home/Moment";
import Products from "@/components/home/Products";
import Trust from "@/components/home/Trust";
import PricePeek from "@/components/home/PricePeek";
import AdStudio from "@/components/home/AdStudio";
import { FaqSection } from "@/components/site/Faq";
import CtaBand from "@/components/site/CtaBand";

const FAQ = [
  {
    category: "Getting started",
    q: "What is the difference between Addlyft Go and Addlyft Reach?",
    a: "Go is for the person who owns the shop: you advertise your own store, inside your own store, on your own screen and speaker. Reach is for a business advertising inside somebody else's store — an auto dealer, a dentist, an estate agent appearing in the convenience store down the road.",
  },
  {
    category: "Getting started",
    q: "What actually plays in the store?",
    a: "Two separate things. A 10-second silent video on the screen above the counter, running continuously through trading hours. And a 15-second spoken message on the speaker, played between songs. They run on different schedules and are never synchronised.",
  },
  {
    category: "Addlyft Go",
    q: "Do I need an agency to make the ads?",
    a: "No — that is the whole point. You describe the promotion in plain English and Addlyft produces the audio, the screen video and a social post. Or you take one from the free template library and pay nothing for it.",
  },
  {
    category: "Addlyft Go",
    q: "How do I earn $49 a month?",
    a: "Every active Addlyft Go store is paid $49 a month by Addlyft, just for being on the network — $588 a year before a single advertiser books your screen. It starts after three continuous months and is paid quarterly.",
  },
  {
    category: "Addlyft Reach",
    q: "How do I choose which stores my ads run in?",
    a: "You browse the network and hand-pick at least five stores. There are no radius restrictions — choose any stores that match the customers you want. Campaigns go live within 48 hours of submission.",
  },
  {
    category: "Addlyft Reach",
    q: "Do I have to make a new ad every day?",
    a: "No. Most advertisers run one ad for the month. A plan with 25 plays a day means the same spot is shown 25 times a day in each store, the way a television ad repeats through an evening. You create one video, and it plays on repeat — it is not 25 different videos.",
  },
  {
    category: "Pricing",
    q: "What does it cost to start?",
    a: "Store owners pay one all-in-one price — $99.99 a month billed annually, or $129.99 monthly — with a 7-day free trial and no card up front. Advertisers start at $29.99 a month across five stores.",
  },
  {
    category: "Pricing",
    q: "What happens if I run out of AI generations?",
    a: "Every Addlyft Go plan includes 90 generations a month. Buy a top-up pack any time — 10 for $9.90, 25 for $19.99, 50 for $34.99 — or use the free template library, which costs no generations at all.",
  },
  {
    category: "Hardware",
    q: "Do I need to buy any equipment?",
    a: "No. The in-store TV display device is free with your plan, and the speaker or tablet for audio is included too. Addlyft Social needs no hardware at all.",
  },
  {
    category: "Getting started",
    q: "Can a competitor advertise inside my store?",
    a: "No. Stores are automatically removed from the target list of any advertiser in the same business category. A café will not carry a rival café — it is a network rule, not a favour you have to ask for.",
  },
];



export default function HomePage() {
  return (
    <>
      <Hero />
      <AdStudio />
      <Products />
      <Moment />
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
