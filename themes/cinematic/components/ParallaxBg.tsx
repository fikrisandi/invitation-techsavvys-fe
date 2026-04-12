"use client";
import Image from "next/image";

/* Static cinematic background images */
function CinematicBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Top cinematic image */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "0",
          width: "100%",
          height: "50%",
          opacity: 0.5,
        }}
      >
        <Image
          src="/parallax/cinematic-1.jpg"
          alt="Cinematic background"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "sepia(0.3) saturate(0.8) brightness(0.8)",
            maskImage: "linear-gradient(to bottom, black 20%, transparent 80%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 20%, transparent 80%)",
          }}
          priority
        />
      </div>

      {/* Bottom cinematic image */}
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "0",
          width: "100%",
          height: "45%",
          opacity: 0.45,
        }}
      >
        <Image
          src="/parallax/cinematic-2.jpg"
          alt="Cinematic background"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "sepia(0.3) saturate(0.8) brightness(0.8)",
            maskImage: "linear-gradient(to top, black 20%, transparent 80%)",
            WebkitMaskImage: "linear-gradient(to top, black 20%, transparent 80%)",
          }}
        />
      </div>
    </div>
  );
}

export default function ParallaxBg() {
  return <CinematicBackground />;
}
