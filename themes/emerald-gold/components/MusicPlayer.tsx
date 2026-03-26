"use client";

import { useState, useRef, useCallback } from "react";
import { useInvitation } from "../context";

export default function MusicPlayer({ autoPlay = false }: { autoPlay?: boolean }) {
  const { musicUrl } = useInvitation();
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const started = useRef(false);

  const play = useCallback(() => { audioRef.current?.play().then(() => setPlaying(true)).catch(() => {}); }, []);
  const toggle = () => { if (!audioRef.current) return; if (playing) { audioRef.current.pause(); setPlaying(false); } else play(); };
  if (autoPlay && !started.current) { started.current = true; setTimeout(play, 600); }

  if (!musicUrl) return null;

  return (
    <>
      <audio ref={audioRef} loop preload="auto"><source src={musicUrl} type="audio/mpeg" /></audio>
      <button onClick={toggle} aria-label={playing ? "Pause musik" : "Play musik"}
        className="fixed bottom-5 right-5 z-[90] w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
        style={{ background: "linear-gradient(135deg, var(--color-gold), var(--color-gold-dark))", border: "2px solid rgba(255,255,255,0.15)", boxShadow: "0 4px 24px rgba(212,168,83,0.35)" }}>
        <div className={`absolute inset-[2px] rounded-full border border-white/15 ${playing ? "disc-spin" : "disc-paused"}`} style={{ borderTopColor: "rgba(255,255,255,0.5)" }} />
        <div className="relative z-10">
          {playing
            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-emerald-deep)"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
            : <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-emerald-deep)"><polygon points="7,3 21,12 7,21"/></svg>}
        </div>
        {playing && <div className="absolute inset-0 rounded-full border border-[var(--color-gold-light)]" style={{ animation: "pulse-ring 2s ease-out infinite" }} />}
      </button>
    </>
  );
}
