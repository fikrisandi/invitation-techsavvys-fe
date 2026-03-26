"use client";
import { useState, useRef, useEffect } from "react";
import { useInvitation } from "../context";

export default function MusicPlayer() {
  const { musicUrl } = useInvitation();
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!musicUrl) return;
    const audio = new Audio(musicUrl);
    audio.loop = true;
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, [musicUrl]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  if (!musicUrl) return null;

  return (
    <div style={{ position: "fixed", bottom: "24px", left: "24px", zIndex: 999 }}>
      <button
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        style={{
          width: "44px", height: "44px", borderRadius: "50%",
          background: "var(--color-yy-forest)",
          border: "1.5px solid rgba(196,151,90,0.3)",
          boxShadow: "0 4px 20px rgba(61,90,69,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", transition: "all 0.3s ease",
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
            border: "1.5px solid var(--color-yy-forest)", opacity: 0.5,
            animation: "pulse-ring 2s ease infinite",
          }} />
        )}
      </button>
    </div>
  );
}
