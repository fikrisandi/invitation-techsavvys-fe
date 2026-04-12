"use client";
import Image from "next/image";

/* Static Batik Sunda background */
function BatikBackground() {
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
      {/* Top-right image */}
      <div
        style={{
          position: "absolute",
          top: "-5%",
          right: "-5%",
          width: "55%",
          height: "50%",
          opacity: 0.5,
        }}
      >
        <Image
          src="/parallax/candi-3.jpg"
          alt="Traditional pattern"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "sepia(0.4) hue-rotate(10deg) saturate(1.2) brightness(0.5)",
            maskImage: "radial-gradient(ellipse at 100% 0%, black 20%, transparent 65%)",
            WebkitMaskImage: "radial-gradient(ellipse at 100% 0%, black 20%, transparent 65%)",
          }}
          priority
        />
      </div>

      {/* Bottom-left image */}
      <div
        style={{
          position: "absolute",
          bottom: "-5%",
          left: "-5%",
          width: "55%",
          height: "50%",
          opacity: 0.45,
        }}
      >
        <Image
          src="/parallax/candi-1.jpg"
          alt="Traditional pattern"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "sepia(0.4) hue-rotate(10deg) saturate(1.2) brightness(0.5)",
            maskImage: "radial-gradient(ellipse at 0% 100%, black 20%, transparent 65%)",
            WebkitMaskImage: "radial-gradient(ellipse at 0% 100%, black 20%, transparent 65%)",
          }}
        />
      </div>
    </div>
  );
}

export default function ParallaxBg() {
  return <BatikBackground />;
}
