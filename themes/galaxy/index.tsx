"use client";

import { Suspense } from "react";
import { InvitationProvider } from "./context";
import { useReveal } from "./components/useReveal";
import StarField from "./components/StarField";
import Cover from "./components/Cover";
import Hero from "./components/Hero";
import Couple from "./components/Couple";
import Countdown from "./components/Countdown";
import EventDetails from "./components/EventDetails";
import Gallery from "./components/Gallery";
import LoveStory from "./components/LoveStory";
import Gift from "./components/Gift";
import RSVP from "./components/RSVP";
import Wishes from "./components/Wishes";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import ParallaxBg from "./components/ParallaxBg";
import type { InvitationData } from "@/lib/types";

/* Removed GalaxyNebula (spinning orbs) */

function InvitationContent({ guestName }: { guestName?: string }) {
  useReveal();

  return (
    <>
      <ParallaxBg />
      <StarField />
      <Cover />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <Couple />
        <Countdown />
        <Suspense>
          <EventDetails />
        </Suspense>
        <Gallery />
        <LoveStory />
        <Gift />
        <RSVP guestName={guestName} />
        <Wishes />
        <Footer />
      </main>
      <MusicPlayer autoPlay />
    </>
  );
}

export default function GalaxyTheme({
  data,
  guestName,
}: {
  data: InvitationData;
  guestName?: string;
}) {
  return (
    <InvitationProvider data={data}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Great+Vibes&family=Raleway:wght@300;400;500;600&display=swap');
        .theme-galaxy {
          --galaxy-bg: #04040E;
          --galaxy-bg-mid: #080818;
          --galaxy-bg-t: rgba(4,4,14,0.5);
          --galaxy-bg-mid-t: rgba(8,8,24,0.5);
          --galaxy-border: rgba(139,92,246,0.2);
          --galaxy-purple: #8B5CF6;
          --galaxy-pink: #E879A0;
          --galaxy-gold: #F0C060;
          --galaxy-text: #F0E8FF;
          --galaxy-text-soft: #B0A0D0;
          --galaxy-text-muted: #6A5A8A;
          --font-galaxy-display: "Cinzel", serif;
          --font-galaxy-script: "Great Vibes", cursive;
          --font-galaxy-body: "Raleway", sans-serif;
        }
        .theme-galaxy * { box-sizing: border-box; }
        .theme-galaxy ::selection { background: var(--galaxy-purple); color: #fff; }
        .theme-galaxy ::-webkit-scrollbar { width: 3px; }
        .theme-galaxy ::-webkit-scrollbar-track { background: var(--galaxy-bg); }
        .theme-galaxy ::-webkit-scrollbar-thumb { background: var(--galaxy-purple); border-radius: 8px; }
        .theme-galaxy .reveal-up, .theme-galaxy .reveal-left, .theme-galaxy .reveal-right, .theme-galaxy .reveal-scale {
          opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .theme-galaxy .reveal-left { transform: translateX(-32px); }
        .theme-galaxy .reveal-right { transform: translateX(32px); }
        .theme-galaxy .reveal-scale { transform: scale(0.92); }
        .theme-galaxy .reveal-up.visible, .theme-galaxy .reveal-left.visible, .theme-galaxy .reveal-right.visible, .theme-galaxy .reveal-scale.visible {
          opacity: 1; transform: none;
        }
      `}</style>
      <div
        className="theme-galaxy"
        style={{ background: "#04040E", color: "var(--galaxy-text)", minHeight: "100vh" }}
      >
        <InvitationContent guestName={guestName} />
      </div>
    </InvitationProvider>
  );
}
