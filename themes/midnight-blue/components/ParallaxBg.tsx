"use client";
import Image from "next/image";

/* Static fixed deep space background */
function DeepSpaceBg() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        background: "radial-gradient(ellipse at 30% 20%, rgba(74,158,232,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(74,158,232,0.06) 0%, transparent 50%), var(--color-navy-dark, #0B1221)",
      }}
    >
      {/* Galaxy image as fixed background with blue tint */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.4,
        }}
      >
        <Image
          src="/parallax/galaxy-1.jpg"
          alt="Deep space"
          fill
          style={{
            objectFit: "cover",
            filter: "hue-rotate(20deg) saturate(1.5) brightness(0.6)",
          }}
          priority
        />
      </div>
      {/* Nebula glow top-right */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "60%",
          height: "50%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(74,158,232,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Nebula glow bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-10%",
          width: "50%",
          height: "40%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(100,130,220,0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
    </div>
  );
}

export default function ParallaxBg() {
  return <DeepSpaceBg />;
}
