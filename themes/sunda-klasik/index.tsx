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
  .theme-sunda-klasik {
    --sunda-bg: #0A0500;
    --sunda-bg-mid: #150A00;
    --sunda-bg-alt: #1E0F00;
    --sunda-text: #F5E8D0;
    --sunda-text-soft: #A08060;
    --sunda-text-muted: #604030;
    --sunda-gold: #C89020;
    --sunda-terra: #B05020;
    --sunda-green: #2A5020;
    --sunda-border: rgba(200,144,32,0.2);
    --font-sunda-display: "Cormorant Garamond", Georgia, serif;
    --font-sunda-script: "Great Vibes", cursive;
    --font-sunda-body: "Lato", sans-serif;

    background: var(--sunda-bg);
    color: var(--sunda-text);
    font-family: var(--font-sunda-body);
  }

  .theme-sunda-klasik .reveal-up,
  .theme-sunda-klasik .reveal-left,
  .theme-sunda-klasik .reveal-right,
  .theme-sunda-klasik .reveal-scale {
    opacity: 0;
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .theme-sunda-klasik .reveal-up    { transform: translateY(24px); }
  .theme-sunda-klasik .reveal-left  { transform: translateX(-24px); }
  .theme-sunda-klasik .reveal-right { transform: translateX(24px); }
  .theme-sunda-klasik .reveal-scale { transform: scale(0.92); }

  .theme-sunda-klasik .reveal-up.visible,
  .theme-sunda-klasik .reveal-left.visible,
  .theme-sunda-klasik .reveal-right.visible,
  .theme-sunda-klasik .reveal-scale.visible {
    opacity: 1;
    transform: none;
  }

  .theme-sunda-klasik .delay-2 { transition-delay: 0.12s; }
  .theme-sunda-klasik .delay-3 { transition-delay: 0.22s; }
  .theme-sunda-klasik .delay-4 { transition-delay: 0.32s; }
  .theme-sunda-klasik .delay-5 { transition-delay: 0.44s; }
  .theme-sunda-klasik .delay-6 { transition-delay: 0.56s; }
  .theme-sunda-klasik .delay-7 { transition-delay: 0.68s; }
  .theme-sunda-klasik .delay-8 { transition-delay: 0.80s; }

  .theme-sunda-klasik .no-scroll { overflow: hidden; }
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

export default function SundaKlasikTheme({ data, guestName }: { data: InvitationData; guestName?: string }) {
  return (
    <InvitationProvider data={data}>
      <style>{cssVars}</style>
      <div className="theme-sunda-klasik">
        <InvitationContent guestName={guestName} />
      </div>
    </InvitationProvider>
  );
}
