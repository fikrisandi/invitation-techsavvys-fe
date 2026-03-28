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
import Gift from "./components/Gift";
import RSVP from "./components/RSVP";
import Wishes from "./components/Wishes";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import ParallaxBg from "./components/ParallaxBg";
import type { InvitationData } from "@/lib/types";

/* Animated nebula orbs + shooting stars layered above StarField */
function GalaxyNebula() {
  const orbs = [
    { top: "10%",  left: "5%",   w: 500, h: 400, color: "rgba(139,92,246,0.22)",  dur: 18, delay: 0 },
    { top: "40%",  right: "0%",  w: 600, h: 500, color: "rgba(232,121,160,0.15)", dur: 24, delay: 6 },
    { top: "70%",  left: "20%",  w: 450, h: 350, color: "rgba(80,40,180,0.18)",   dur: 20, delay: 12 },
    { top: "20%",  right: "15%", w: 350, h: 300, color: "rgba(139,92,246,0.12)",  dur: 28, delay: 4 },
  ];
  const shootingStars = [
    { top: "15%", left: "10%", delay: 5,  dur: 0.8, rot: 20 },
    { top: "35%", left: "60%", delay: 12, dur: 0.6, rot: 30 },
    { top: "8%",  left: "40%", delay: 20, dur: 0.9, rot: 15 },
    { top: "55%", left: "5%",  delay: 28, dur: 0.7, rot: 25 },
  ];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {orbs.map((o, i) => (
        <div key={i} style={{
          position: "absolute",
          top: o.top, left: (o as any).left, right: (o as any).right,
          width: o.w, height: o.h,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${o.color} 0%, transparent 70%)`,
          filter: "blur(40px)",
          animation: `nebula-drift-${i % 2 + 1} ${o.dur}s ease-in-out ${o.delay}s infinite`,
        }} />
      ))}
      {shootingStars.map((s, i) => (
        <div key={i} style={{
          position: "absolute",
          top: s.top, left: s.left,
          height: "1px",
          background: "linear-gradient(to right, rgba(255,255,255,0.9), transparent)",
          transform: `rotate(${s.rot}deg)`,
          animation: `shooting-star ${s.dur}s ease-out ${s.delay}s infinite`,
          opacity: 0,
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
      {/* Star field is fixed, rendered once at the top level */}
      <GalaxyNebula />
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
          --galaxy-bg: rgba(4,4,14,0.85);
          --galaxy-bg-mid: rgba(8,8,24,0.82);
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
        @keyframes nebula-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.25; }
          33%       { transform: translate(40px, -20px) scale(1.1); opacity: 0.35; }
          66%       { transform: translate(-20px, 30px) scale(0.95); opacity: 0.2; }
        }
        @keyframes nebula-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.15; }
          50%       { transform: translate(-50px, 25px) scale(1.15); opacity: 0.28; }
        }
        @keyframes shooting-star {
          0%   { transform: translateX(0) translateY(0); opacity: 1; width: 2px; }
          70%  { opacity: 0.8; width: 120px; }
          100% { transform: translateX(300px) translateY(150px); opacity: 0; width: 2px; }
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
