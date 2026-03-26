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
import { FloatingPetals } from "./components/BotanicalOrnament";
import { useReveal } from "./components/useReveal";

interface Props { data: InvitationData; guestName?: string; }

function YlangYlangContent({ guestName }: { guestName?: string }) {
  useReveal();
  return (
    <div className="theme-ylang-ylang" style={{ minHeight: "100vh", background: "var(--color-yy-cream)", color: "var(--color-yy-text)" }}>
      <FloatingPetals />
      <Cover guestName={guestName} />
      <Hero />
      <Couple />
      <Countdown />
      <EventDetails />
      <Gallery />
      <Gift />
      <RSVP guestName={guestName} />
      <Wishes />
      <Footer />
      <MusicPlayer />
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
