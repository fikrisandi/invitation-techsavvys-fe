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
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Great+Vibes&family=Lato:wght@300;400;700&display=swap');

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

  @keyframes jawa-float-up {
    0%   { opacity: 0; transform: translateY(0) rotate(0deg) scale(0.8); }
    15%  { opacity: 0.7; }
    85%  { opacity: 0.5; }
    100% { opacity: 0; transform: translateY(-100vh) rotate(360deg) scale(1.2); }
  }
  @keyframes jawa-glow-pulse {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50%       { opacity: 0.6; transform: scale(1.15); }
  }
`;

/* Floating gold particles & ambient glow */
function JawaAmbient() {
  const particles = [
    { left: "8%",  dur: 18, delay: 0,   size: 4 },
    { left: "18%", dur: 22, delay: 3,   size: 2 },
    { left: "28%", dur: 16, delay: 6,   size: 3 },
    { left: "38%", dur: 24, delay: 1,   size: 2 },
    { left: "48%", dur: 20, delay: 8,   size: 4 },
    { left: "58%", dur: 17, delay: 4,   size: 3 },
    { left: "68%", dur: 23, delay: 2,   size: 2 },
    { left: "78%", dur: 19, delay: 7,   size: 4 },
    { left: "88%", dur: 21, delay: 5,   size: 2 },
    { left: "92%", dur: 25, delay: 9,   size: 3 },
    { left: "13%", dur: 26, delay: 11,  size: 2 },
    { left: "53%", dur: 15, delay: 13,  size: 3 },
  ];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* Warm glow orbs */}
      <div style={{ position: "absolute", top: "20%", left: "15%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,160,32,0.06) 0%, transparent 70%)", animation: "jawa-glow-pulse 8s ease-in-out infinite" }} />
      <div style={{ position: "absolute", top: "60%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,21,21,0.05) 0%, transparent 70%)", animation: "jawa-glow-pulse 11s ease-in-out 3s infinite" }} />
      <div style={{ position: "absolute", bottom: "15%", left: "30%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,160,32,0.04) 0%, transparent 70%)", animation: "jawa-glow-pulse 9s ease-in-out 5s infinite" }} />
      {/* Floating gold particles */}
      {particles.map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          bottom: "-10px",
          left: p.left,
          width: p.size,
          height: p.size,
          borderRadius: "50%",
          background: i % 3 === 0 ? "#D4A020" : i % 3 === 1 ? "#F0C850" : "#8B1515",
          boxShadow: `0 0 ${p.size * 2}px ${i % 3 === 0 ? "#D4A020" : "#F0C850"}`,
          animation: `jawa-float-up ${p.dur}s ease-in-out ${p.delay}s infinite`,
        }} />
      ))}
    </div>
  );
}

function InvitationContent({ guestName }: { guestName?: string }) {
  useReveal();
  return (
    <>
      <JawaAmbient />
      <Cover guestName={guestName} />
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
