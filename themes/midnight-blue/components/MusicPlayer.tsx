"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useInvitation } from "../context";

export default function MusicPlayer({ autoPlay = false }: { autoPlay?: boolean }) {
  const { musicUrl } = useInvitation();
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const play = useCallback(() => { audioRef.current?.play().then(() => setPlaying(true)).catch(() => {}); }, []);
  const toggle = () => { if (!audioRef.current) return; if (playing) { audioRef.current.pause(); setPlaying(false); } else play(); };

  useEffect(() => {
    if (!autoPlay) return;
    const handler = () => play();
    window.addEventListener("invitation-opened", handler, { once: true });
    return () => window.removeEventListener("invitation-opened", handler);
  }, [autoPlay, play]);

  if (!musicUrl) return null;

  return (
    <>
      <audio ref={audioRef} loop preload="auto"><source src={musicUrl} type="audio/mpeg" /></audio>
      <button onClick={toggle} aria-label={playing ? "Pause musik" : "Play musik"}
        className="fixed bottom-5 right-5 z-[90] w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
        style={{ background: "linear-gradient(135deg, var(--color-blue-accent), #2B7FD4)", border: "2px solid rgba(255,255,255,0.1)", boxShadow: "0 4px 24px rgba(74,158,232,0.3)" }}>
        <div className={`absolute inset-[2px] rounded-full border border-white/10 ${playing ? "disc-spin" : "disc-paused"}`} style={{ borderTopColor: "rgba(255,255,255,0.4)" }} />
        <div className="relative z-10">
          {playing
            ? <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
            : <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><polygon points="7,3 21,12 7,21"/></svg>}
        </div>
        {playing && <div className="absolute inset-0 rounded-full border border-[var(--color-blue-accent)]" style={{ animation: "pulse-blue 2s ease-out infinite" }} />}
      </button>
    </>
  );
}
