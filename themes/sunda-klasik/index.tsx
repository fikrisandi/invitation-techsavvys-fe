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
import ParallaxBg from "./components/ParallaxBg";
import type { InvitationData } from "@/lib/types";

const cssVars = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Great+Vibes&family=Lato:wght@300;400;700&display=swap');

  .theme-sunda-klasik {
    --sunda-bg: #0A0500;
    --sunda-bg-mid: #150A00;
    --sunda-bg-t: rgba(10,5,0,0.5);
    --sunda-bg-mid-t: rgba(21,10,0,0.5);
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

  @keyframes sunda-cloud-drift {
    0%   { transform: translateX(-20px) scaleX(1); opacity: 0.12; }
    50%  { transform: translateX(20px) scaleX(1.04); opacity: 0.22; }
    100% { transform: translateX(-20px) scaleX(1); opacity: 0.12; }
  }
  @keyframes sunda-float-up {
    0%   { opacity: 0; transform: translateY(0) rotate(0deg); }
    10%  { opacity: 0.6; }
    90%  { opacity: 0.4; }
    100% { opacity: 0; transform: translateY(-100vh) rotate(360deg); }
  }
  @keyframes sunda-glow {
    0%, 100% { opacity: 0.2; transform: scale(1); }
    50%       { opacity: 0.4; transform: scale(1.2); }
  }
`;

/* Animated mega mendung clouds + floating particles */
function SundaAmbient() {
  /* Mega mendung SVG cloud path — horizontal arc group */
  const cloudPath = "M0,40 C10,20 20,5 35,10 C40,0 55,0 60,10 C75,5 85,20 90,35 C95,25 108,22 115,32 C120,22 135,18 145,28 C155,15 170,15 178,28 C185,18 200,20 200,40 Z";
  const particles = [
    { left: "5%",  dur: 20, delay: 0,  sz: 4 },
    { left: "20%", dur: 18, delay: 5,  sz: 3 },
    { left: "35%", dur: 23, delay: 2,  sz: 2 },
    { left: "50%", dur: 17, delay: 9,  sz: 4 },
    { left: "65%", dur: 21, delay: 4,  sz: 3 },
    { left: "80%", dur: 25, delay: 7,  sz: 2 },
    { left: "92%", dur: 19, delay: 12, sz: 3 },
  ];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* Animated mega mendung cloud layers */}
      {[
        { top: "8%",  opacity: 0.15, scale: 1.4,  dur: 14, delay: 0 },
        { top: "22%", opacity: 0.10, scale: 1.8,  dur: 18, delay: 3 },
        { top: "45%", opacity: 0.08, scale: 2.2,  dur: 22, delay: 6 },
        { top: "65%", opacity: 0.12, scale: 1.6,  dur: 16, delay: 9 },
        { top: "82%", opacity: 0.09, scale: 2.0,  dur: 20, delay: 12 },
      ].map((c, i) => (
        <svg key={i} viewBox="0 0 200 60" style={{
          position: "absolute", top: c.top, left: 0, width: `${c.scale * 100}%`,
          height: "80px", fill: "#C89020", opacity: c.opacity,
          animation: `sunda-cloud-drift ${c.dur}s ease-in-out ${c.delay}s infinite`,
        }}>
          <path d={cloudPath} />
        </svg>
      ))}
      {/* Warm ambient glow */}
      <div style={{ position: "absolute", top: "15%", left: "10%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,144,32,0.07) 0%, transparent 70%)", animation: "sunda-glow 10s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: "20%", right: "8%",  width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(176,80,32,0.06) 0%, transparent 70%)", animation: "sunda-glow 13s ease-in-out 4s infinite" }} />
      {/* Floating gold particles */}
      {particles.map((p, i) => (
        <div key={i} style={{
          position: "absolute", bottom: "-8px", left: p.left,
          width: p.sz, height: p.sz, borderRadius: "50%",
          background: i % 2 === 0 ? "#C89020" : "#B05020",
          boxShadow: `0 0 ${p.sz * 2}px ${i % 2 === 0 ? "#C89020" : "#B05020"}`,
          animation: `sunda-float-up ${p.dur}s ease-in-out ${p.delay}s infinite`,
        }} />
      ))}
    </div>
  );
}

function InvitationContent({ guestName }: { guestName?: string }) {
  useReveal();
  return (
    <>
      <ParallaxBg />
      <SundaAmbient />
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
