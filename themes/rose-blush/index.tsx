"use client";
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
import { useReveal } from "./components/useReveal";
import ParallaxBg from "./components/ParallaxBg";

interface Props { data: InvitationData; guestName?: string; }

function RoseBlushContent({ guestName }: { guestName?: string }) {
  useReveal();
  return (
    <div className="theme-rose-blush" style={{ minHeight: "100vh", background: "var(--color-rb-bg)", color: "var(--color-rb-text)" }}>
      <ParallaxBg />
      <Cover guestName={guestName} />
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
    </div>
  );
}

export default function RoseBlushTheme({ data, guestName }: Props) {
  return (
    <InvitationProvider data={data}>
      <RoseBlushContent guestName={guestName} />
    </InvitationProvider>
  );
}
