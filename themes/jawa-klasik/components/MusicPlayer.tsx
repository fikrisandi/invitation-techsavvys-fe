"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type { CSSProperties } from "react";
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

  const spinKeyframes = `
    @keyframes jawa-disc-spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes jawa-pulse-ring {
      0%   { transform: scale(1); opacity: 0.6; }
      100% { transform: scale(1.5); opacity: 0; }
    }
  `;

  const btnStyle: CSSProperties = {
    position: "fixed",
    bottom: "20px",
    left: "20px",
    zIndex: 90,
    width: "52px",
    height: "52px",
    borderRadius: "2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    background: "var(--jawa-red)",
    border: "1px solid rgba(212,160,32,0.4)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
  };

  return (
    <>
      <style>{spinKeyframes}</style>
      <audio ref={audioRef} loop preload="auto">
        <source src={musicUrl} type="audio/mpeg" />
      </audio>
      <button
        onClick={toggle}
        aria-label={playing ? "Pause musik" : "Play musik"}
        style={btnStyle}
      >
        {/* Spinning disc indicator */}
        <div style={{
          position: "absolute",
          inset: "3px",
          borderRadius: "2px",
          border: "1px solid rgba(212,160,32,0.3)",
          borderTopColor: "var(--jawa-gold)",
          animation: playing ? "jawa-disc-spin 3s linear infinite" : "none",
        }} />
        {/* Icon */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--jawa-gold-light)">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--jawa-gold-light)">
              <polygon points="7,3 21,12 7,21" />
            </svg>
          )}
        </div>
        {/* Pulse ring when playing */}
        {playing && (
          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: "2px",
            border: "1px solid var(--jawa-gold)",
            animation: "jawa-pulse-ring 2s ease-out infinite",
          }} />
        )}
      </button>
    </>
  );
}
