"use client";

import { Suspense } from "react";
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
import type { InvitationData } from "@/lib/types";

const cssVars = `
  .theme-jawa-klasik {
    --jawa-bg: #0E0600;
    --jawa-bg-mid: #1A0A00;
    --jawa-bg-card: rgba(255,220,150,0.04);
    --jawa-text: #F0E0C0;
    --jawa-text-soft: #9A7A50;
    --jawa-text-muted: #5A3A20;
    --jawa-gold: #D4A020;
    --jawa-gold-light: #F0C850;
    --jawa-red: #8B1515;
    --jawa-red-light: #B02020;
    --jawa-border: rgba(212,160,32,0.2);
    --font-jawa-display: "Cormorant Garamond", Georgia, serif;
    --font-jawa-script: "Great Vibes", cursive;
    --font-jawa-body: "Lato", sans-serif;

    background: var(--jawa-bg);
    color: var(--jawa-text);
    font-family: var(--font-jawa-body);
  }

  .theme-jawa-klasik .reveal-up,
  .theme-jawa-klasik .reveal-left,
  .theme-jawa-klasik .reveal-right,
  .theme-jawa-klasik .reveal-scale {
    opacity: 0;
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .theme-jawa-klasik .reveal-up    { transform: translateY(24px); }
  .theme-jawa-klasik .reveal-left  { transform: translateX(-24px); }
  .theme-jawa-klasik .reveal-right { transform: translateX(24px); }
  .theme-jawa-klasik .reveal-scale { transform: scale(0.92); }

  .theme-jawa-klasik .reveal-up.visible,
  .theme-jawa-klasik .reveal-left.visible,
  .theme-jawa-klasik .reveal-right.visible,
  .theme-jawa-klasik .reveal-scale.visible {
    opacity: 1;
    transform: none;
  }

  .theme-jawa-klasik .delay-2 { transition-delay: 0.12s; }
  .theme-jawa-klasik .delay-3 { transition-delay: 0.22s; }
  .theme-jawa-klasik .delay-4 { transition-delay: 0.32s; }
  .theme-jawa-klasik .delay-5 { transition-delay: 0.44s; }
  .theme-jawa-klasik .delay-6 { transition-delay: 0.56s; }
  .theme-jawa-klasik .delay-7 { transition-delay: 0.68s; }
  .theme-jawa-klasik .delay-8 { transition-delay: 0.80s; }

  .theme-jawa-klasik .no-scroll { overflow: hidden; }
`;

function InvitationContent({ guestName }: { guestName?: string }) {
  useReveal();
  return (
    <>
      <Cover guestName={guestName} />
      <main>
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

export default function JawaKlasikTheme({ data, guestName }: { data: InvitationData; guestName?: string }) {
  return (
    <InvitationProvider data={data}>
      <style>{cssVars}</style>
      <div className="theme-jawa-klasik">
        <InvitationContent guestName={guestName} />
      </div>
    </InvitationProvider>
  );
}
