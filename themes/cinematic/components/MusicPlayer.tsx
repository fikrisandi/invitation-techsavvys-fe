"use client";

import { useState, useRef, useCallback } from "react";
import { useInvitation } from "../context";

export default function MusicPlayer({ autoPlay = false }: { autoPlay?: boolean }) {
  const { musicUrl } = useInvitation();
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const started = useRef(false);

  const play = useCallback(() => {
    audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      play();
    }
  };

  if (autoPlay && !started.current) {
    started.current = true;
    setTimeout(play, 600);
  }

  if (!musicUrl) return null;

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src={musicUrl} type="audio/mpeg" />
      </audio>
      <button
        onClick={toggle}
        aria-label={playing ? "Pause musik" : "Play musik"}
        style={{
          position: "fixed",
          bottom: "24px",
          left: "24px",
          zIndex: 90,
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          background: "var(--cine-bg-mid)",
          border: "1px solid var(--cine-border)",
          transition: "border-color 0.3s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "var(--cine-gold)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "var(--cine-border)")}
      >
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--cine-gold)">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--cine-gold)">
            <polygon points="7,3 21,12 7,21" />
          </svg>
        )}
        {playing && (
          <div
            style={{
              position: "absolute",
              inset: "-4px",
              border: "1px solid var(--cine-gold)",
              opacity: 0.3,
              animation: "cine-pulse-ring 2s ease-out infinite",
            }}
          />
        )}
      </button>
      <style>{`
        @keyframes cine-pulse-ring {
          0% { opacity: 0.3; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.5); }
        }
      `}</style>
    </>
  );
}
