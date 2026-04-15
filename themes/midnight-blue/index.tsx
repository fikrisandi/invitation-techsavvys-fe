"use client";

import { Suspense, useState } from "react";
import { InvitationProvider } from "./context";
import { useReveal } from "./components/useReveal";
import Cover from "./components/Cover";
import Hero from "./components/Hero";
import Couple from "./components/Couple";
import Countdown from "./components/Countdown";
import EventDetails from "./components/EventDetails";
import Gallery from "./components/Gallery";
import Gift from "./components/Gift";
import RSVP from "./components/RSVP";
import Wishes from "./components/Wishes";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import ParallaxBg from "./components/ParallaxBg";
import MidnightAmbient from "./components/MidnightAmbient";
import type { InvitationData } from "@/lib/types";

function InvitationContent({ guestName }: { guestName?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  useReveal();

  return (
    <>
      <ParallaxBg />
      <MidnightAmbient />
      {!isOpen && <Cover onOpen={() => setIsOpen(true)} guestName={guestName} />}
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <Couple guestName={guestName} />
        <Countdown />
        <Suspense>
          <EventDetails />
        </Suspense>
        <Gallery />
        <Gift />
        <RSVP guestName={guestName} />
        <Wishes />
        <Footer />
      </main>
      <MusicPlayer autoPlay />
    </>
  );
}

export default function MidnightBlueTheme({ data, guestName }: { data: InvitationData; guestName?: string }) {
  return (
    <InvitationProvider data={data}>
      <div className="theme-midnight-blue">
        <InvitationContent guestName={guestName} />
      </div>
    </InvitationProvider>
  );
}
