"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useInvitation } from "../context";

export default function MusicPlayer({ autoPlay = false }: { autoPlay?: boolean }) {
  const { musicUrl } = useInvitation();
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  useEffect(() => {
    if (!autoPlay) return;
    const handler = () => setTimeout(play, 600);
    window.addEventListener("invitation-opened", handler, { once: true });
    return () => window.removeEventListener("invitation-opened", handler);
  }, [autoPlay, play]);

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
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          background: "linear-gradient(135deg, var(--galaxy-purple), #6D28D9)",
          border: "1px solid rgba(139,92,246,0.4)",
          boxShadow: "0 4px 24px rgba(139,92,246,0.35)",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
      >
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <polygon points="7,3 21,12 7,21" />
          </svg>
        )}
        {playing && (
          <div
            style={{
              position: "absolute",
              inset: "-6px",
              borderRadius: "50%",
              border: "1px solid var(--galaxy-purple)",
              opacity: 0.4,
              animation: "galaxy-player-ring 2s ease-out infinite",
            }}
          />
        )}
      </button>
      <style>{`
        @keyframes galaxy-player-ring {
          0% { opacity: 0.4; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.6); }
        }
      `}</style>
    </>
  );
}
