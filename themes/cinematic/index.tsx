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

/* Film grain overlay + scanline + light leak — always fixed on top */
function CinematicAmbient() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* Animated film grain */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
        backgroundSize: "180px 180px",
        opacity: 0.04,
        animation: "cine-grain 0.15s steps(1) infinite",
        mixBlendMode: "overlay",
      }} />
      {/* Slow moving scanline */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: "2px",
        background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.04), transparent)",
        animation: "cine-scanline 8s linear infinite",
      }} />
      {/* Gold light leak top-right */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "40vw", height: "40vh",
        background: "radial-gradient(ellipse at 100% 0%, rgba(200,168,120,0.08) 0%, transparent 70%)",
        animation: "cine-light-leak 15s ease-in-out infinite",
      }} />
      {/* Warm light leak bottom-left */}
      <div style={{
        position: "absolute", bottom: 0, left: 0,
        width: "35vw", height: "35vh",
        background: "radial-gradient(ellipse at 0% 100%, rgba(200,168,120,0.06) 0%, transparent 70%)",
        animation: "cine-light-leak 18s ease-in-out 7s infinite",
      }} />
      {/* Vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)",
      }} />
    </div>
  );
}

function InvitationContent({ guestName }: { guestName?: string }) {
  useReveal();

  return (
    <>
      <ParallaxBg />
      <CinematicAmbient />
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Raleway:wght@300;400;500;600&display=swap');
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
          --font-cine-display: "Playfair Display", Georgia, serif;
          --font-cine-body: "Raleway", sans-serif;
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
        @keyframes cine-grain {
          0%, 100% { transform: translate(0, 0); }
          10%  { transform: translate(-1px, 1px); }
          20%  { transform: translate(1px, -1px); }
          30%  { transform: translate(-1px, -1px); }
          40%  { transform: translate(1px, 1px); }
          50%  { transform: translate(0, 1px); }
          60%  { transform: translate(-1px, 0); }
          70%  { transform: translate(1px, 0); }
          80%  { transform: translate(0, -1px); }
          90%  { transform: translate(1px, -1px); }
        }
        @keyframes cine-scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes cine-light-leak {
          0%, 100% { opacity: 0; }
          30%, 70% { opacity: 1; }
        }
        @keyframes cine-flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.85; }
          94% { opacity: 1; }
          95% { opacity: 0.9; }
          96% { opacity: 1; }
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
