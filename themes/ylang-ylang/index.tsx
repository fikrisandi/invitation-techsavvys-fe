"use client";
import { useState } from "react";
import { InvitationProvider } from "./context";
import type { InvitationData } from "@/lib/types";
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
import { FloatingPetals } from "./components/BotanicalOrnament";
import { useReveal } from "./components/useReveal";
import ParallaxBg from "./components/ParallaxBg";

interface Props { data: InvitationData; guestName?: string; }

function YlangYlangContent({ guestName }: { guestName?: string }) {
  useReveal();
  const [opened, setOpened] = useState(false);
  return (
    <div className="theme-ylang-ylang" style={{ minHeight: "100vh", background: "var(--color-yy-cream)", color: "var(--color-yy-text)" }}>
      {/* Multi-layer parallax botanical background */}
      <ParallaxBg />
      {!opened && <FloatingPetals />}
      <Cover onOpen={() => setOpened(true)} guestName={guestName} />
      {opened && (
        <>
          <main style={{ position: "relative", zIndex: 1 }}>
            <Hero />
            <Couple />
            <Countdown />
            <EventDetails />
            <Gallery />
            <Gift />
            <RSVP guestName={guestName} />
            <Wishes />
            <Footer />
          </main>
          <MusicPlayer />
        </>
      )}
    </div>
  );
}

export default function YlangYlangTheme({ data, guestName }: Props) {
  return (
    <InvitationProvider data={data}>
      <YlangYlangContent guestName={guestName} />
    </InvitationProvider>
  );
}
