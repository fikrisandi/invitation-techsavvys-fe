"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useInvitation } from "../context";
import { musicRef } from "@/lib/musicRef";

export default function MusicPlayer({ autoPlay = false }: { autoPlay?: boolean }) {
  const { musicUrl } = useInvitation();
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const play = useCallback(() => {
    audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { play(); }
  };

  useEffect(() => {
    if (!autoPlay) return;
    musicRef.play = play;
    const handler = () => play();
    window.addEventListener("invitation-opened", handler, { once: true });
    return () => {
      musicRef.play = () => {};
      window.removeEventListener("invitation-opened", handler);
    };
  }, [autoPlay, play]);

  if (!musicUrl) return null;

  return (
    <>
    <audio ref={audioRef} src={musicUrl} loop preload="auto" playsInline />
    <div style={{ position: "fixed", bottom: "24px", left: "24px", zIndex: 999 }}>
      <button
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        style={{
          width: "44px", height: "44px", borderRadius: "50%",
          background: "var(--color-rb-dusty)",
          border: "1.5px solid rgba(193,122,143,0.3)",
          boxShadow: "0 4px 20px rgba(193,122,143,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", transition: "all 0.3s ease", position: "relative",
        }}
      >
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <polygon points="5,3 19,12 5,21"/>
          </svg>
        )}
        {playing && (
          <span style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            border: "1.5px solid var(--color-rb-dusty)", opacity: 0.5,
            animation: "pulse-ring 2s ease infinite",
          }} />
        )}
      </button>
    </div>
    </>
  );
}
