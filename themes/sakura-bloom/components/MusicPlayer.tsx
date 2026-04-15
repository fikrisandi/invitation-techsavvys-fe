"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useInvitation } from "../context";
import { musicRef } from "@/lib/musicRef";

export default function MusicPlayer({ autoPlay = false }: { autoPlay?: boolean }) {
  const { musicUrl } = useInvitation();
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!musicUrl) return;
    const audio = new Audio(musicUrl);
    audio.loop = true;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [musicUrl]);

  const play = useCallback(() => {
    audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      play();
    }
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
      <style>{`
        @keyframes sakura-pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @keyframes sakura-note-float {
          0%   { transform: translateY(0px)  scale(1)    rotate(0deg);  opacity: 0.8; }
          50%  { transform: translateY(-8px) scale(1.1)  rotate(5deg);  opacity: 1; }
          100% { transform: translateY(0px)  scale(1)    rotate(0deg);  opacity: 0.8; }
        }
      `}</style>
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          left: "24px",
          zIndex: 999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {/* Floating music note when playing */}
        {playing && (
          <div
            style={{
              fontSize: "14px",
              color: "var(--sakura-pink)",
              animation: "sakura-note-float 2s ease-in-out infinite",
              opacity: 0.8,
            }}
          >
            ♪
          </div>
        )}

        <button
          onClick={toggle}
          aria-label={playing ? "Pause music" : "Play music"}
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--sakura-pink) 0%, var(--sakura-rose) 100%)",
            border: "1.5px solid rgba(253,248,249,0.3)",
            boxShadow: "0 6px 24px rgba(212,112,138,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
            position: "relative",
          }}
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}

          {/* Pulse ring when playing */}
          {playing && (
            <span
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "2px solid var(--sakura-pink-light)",
                animation: "sakura-pulse-ring 1.8s ease-out infinite",
              }}
            />
          )}
        </button>
      </div>
    </>
  );
}
