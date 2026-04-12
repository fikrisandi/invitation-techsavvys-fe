"use client";
import Image from "next/image";

/* Static deep space nebula background */
function NebulaBackground() {
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
      {/* Top-right nebula */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-10%",
          width: "65%",
          height: "55%",
        }}
      >
        <Image
          src="/parallax/galaxy-2.jpg"
          alt="Nebula top-right"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "saturate(1.3) brightness(0.6)",
            maskImage: "radial-gradient(ellipse at 100% 0%, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at 100% 0%, black 30%, transparent 75%)",
          }}
          priority
        />
      </div>
      {/* Bottom-left nebula */}
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-10%",
          width: "65%",
          height: "55%",
        }}
      >
        <Image
          src="/parallax/galaxy-3.jpg"
          alt="Nebula bottom-left"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "saturate(1.3) brightness(0.6)",
            maskImage: "radial-gradient(ellipse at 0% 100%, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at 0% 100%, black 30%, transparent 75%)",
          }}
        />
      </div>
    </div>
  );
}

export default function ParallaxBg() {
  return <NebulaBackground />;
}
