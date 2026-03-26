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

function InvitationContent({ guestName }: { guestName?: string }) {
  useReveal();

  return (
    <>
      <Cover />
      <main>
        <Hero />
        <Couple />
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

export default function CinematicTheme({
  data,
  guestName,
}: {
  data: InvitationData;
  guestName?: string;
}) {
  return (
    <InvitationProvider data={data}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap');
        .theme-cinematic {
          --cine-bg: #080808;
          --cine-bg-mid: #111111;
          --cine-border: rgba(240,234,224,0.1);
          --cine-card: rgba(240,234,224,0.04);
          --cine-gold: #C8A878;
          --cine-gold-light: #E0C898;
          --cine-text: #F0EAE0;
          --cine-text-soft: #A09080;
          --cine-text-muted: #605040;
        }
        .theme-cinematic * { box-sizing: border-box; }
        .theme-cinematic ::selection { background: var(--cine-gold); color: #080808; }
        .theme-cinematic ::-webkit-scrollbar { width: 3px; }
        .theme-cinematic ::-webkit-scrollbar-track { background: var(--cine-bg); }
        .theme-cinematic ::-webkit-scrollbar-thumb { background: var(--cine-gold); border-radius: 8px; }
        .theme-cinematic .reveal-up, .theme-cinematic .reveal-left, .theme-cinematic .reveal-right, .theme-cinematic .reveal-scale {
          opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .theme-cinematic .reveal-left { transform: translateX(-32px); }
        .theme-cinematic .reveal-right { transform: translateX(32px); }
        .theme-cinematic .reveal-scale { transform: scale(0.92); }
        .theme-cinematic .reveal-up.visible, .theme-cinematic .reveal-left.visible, .theme-cinematic .reveal-right.visible, .theme-cinematic .reveal-scale.visible {
          opacity: 1; transform: none;
        }
      `}</style>
      <div
        className="theme-cinematic"
        style={{ background: "var(--cine-bg)", color: "var(--cine-text)", minHeight: "100vh" }}
      >
        <InvitationContent guestName={guestName} />
      </div>
    </InvitationProvider>
  );
}
