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
import { SakuraPetals3D } from "./components/SakuraEffect";
import { useReveal } from "./components/useReveal";
import ParallaxBg from "./components/ParallaxBg";

interface Props {
  data: InvitationData;
  guestName?: string;
}

function SakuraBloomContent({ guestName }: { guestName?: string }) {
  useReveal();

  return (
    <div
      className="theme-sakura-bloom"
      style={{
        minHeight: "100vh",
        background: "var(--sakura-bg)",
        color: "var(--sakura-text)",
        fontFamily: "var(--font-sakura-body)",
        position: "relative",
      }}
    >
      {/* Global styles for this theme */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Great+Vibes&family=Lato:wght@300;400;700&display=swap');

        /* ===== SAKURA BLOOM THEME CSS VARIABLES ===== */
        .theme-sakura-bloom {
          --sakura-bg:            #FDF8F9;
          --sakura-bg-alt:        #F8F0F2;
          --sakura-bg-deep:       #F0E4E8;
          --sakura-pink:          #D4708A;
          --sakura-pink-light:    #E890A8;
          --sakura-pink-dark:     #A84868;
          --sakura-rose:          #C05878;
          --sakura-gold:          #C89050;
          --sakura-text:          #2A1020;
          --sakura-text-soft:     #80506A;
          --sakura-text-muted:    #C0A0B0;
          --sakura-border:        rgba(212,112,138,0.2);
          --font-sakura-display:  "Cormorant Garamond", Georgia, serif;
          --font-sakura-script:   "Great Vibes", cursive;
          --font-sakura-body:     "Lato", sans-serif;
        }

        /* ===== REVEAL ANIMATIONS ===== */
        .reveal-up,
        .reveal-left,
        .reveal-right,
        .reveal-scale {
          opacity: 0;
          transition: opacity 0.75s ease, transform 0.75s ease;
        }
        .reveal-up    { transform: translateY(32px); }
        .reveal-left  { transform: translateX(-32px); }
        .reveal-right { transform: translateX(32px); }
        .reveal-scale { transform: scale(0.92); }

        .reveal-up.visible,
        .reveal-left.visible,
        .reveal-right.visible,
        .reveal-scale.visible {
          opacity: 1;
          transform: none;
        }

        /* ===== DELAY UTILITIES ===== */
        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }
        .delay-4 { transition-delay: 0.4s; }
        .delay-5 { transition-delay: 0.5s; }

        /* ===== SCROLLBAR ===== */
        .theme-sakura-bloom ::-webkit-scrollbar { width: 4px; }
        .theme-sakura-bloom ::-webkit-scrollbar-track { background: var(--sakura-bg); }
        .theme-sakura-bloom ::-webkit-scrollbar-thumb { background: var(--sakura-pink); border-radius: 2px; }

        /* ===== SELECTION ===== */
        .theme-sakura-bloom ::selection {
          background: rgba(212, 112, 138, 0.2);
          color: var(--sakura-pink-dark);
        }

        /* ===== SMOOTH SCROLL ===== */
        .theme-sakura-bloom {
          scroll-behavior: smooth;
        }

        /* ===== GLOBAL RESET FOR THEME ===== */
        .theme-sakura-bloom * {
          box-sizing: border-box;
        }

        .theme-sakura-bloom button:focus-visible {
          outline: 2px solid var(--sakura-pink);
          outline-offset: 2px;
        }

        .theme-sakura-bloom a:focus-visible {
          outline: 2px solid var(--sakura-pink);
          outline-offset: 2px;
        }

        /* ===== GALLERY HOVER ===== */
        .theme-sakura-bloom [data-gallery-item]:hover img {
          transform: scale(1.06);
        }
        .theme-sakura-bloom [data-gallery-item]:hover [data-overlay] {
          opacity: 1;
        }
      `}</style>

      {/* Multi-layer parallax background */}
      <ParallaxBg />

      {/* 3D Petal effect - always floating above everything except cover */}
      <SakuraPetals3D />

      {/* Cover - fixed overlay, manages own state */}
      <Cover guestName={guestName} />

      {/* Main content sections */}
      <main style={{ position: "relative", zIndex: 2 }}>
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

      {/* Persistent UI */}
      <MusicPlayer />
    </div>
  );
}

export default function SakuraBloomTheme({ data, guestName }: Props) {
  return (
    <InvitationProvider data={data}>
      <SakuraBloomContent guestName={guestName} />
    </InvitationProvider>
  );
}
