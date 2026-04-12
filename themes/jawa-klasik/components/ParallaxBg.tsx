"use client";
import Image from "next/image";

/* Static base dark background with candi images */
function BaseBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        background: "#0E0600",
        overflow: "hidden",
      }}
    >
      {/* Top-right candi */}
      <div style={{ position: "absolute", top: "-5%", right: "-5%", width: "55%", height: "50%", opacity: 0.5 }}>
        <Image
          src="/parallax/candi-1.jpg"
          alt="Candi"
          fill
          style={{
            objectFit: "cover",
            filter: "sepia(0.4) saturate(1.2) brightness(0.5)",
            maskImage: "radial-gradient(ellipse at 100% 0%, black 20%, transparent 65%)",
            WebkitMaskImage: "radial-gradient(ellipse at 100% 0%, black 20%, transparent 65%)",
          }}
          priority
        />
      </div>
      {/* Bottom-left candi */}
      <div style={{ position: "absolute", bottom: "-5%", left: "-5%", width: "55%", height: "50%", opacity: 0.45 }}>
        <Image
          src="/parallax/candi-2.jpg"
          alt="Candi"
          fill
          style={{
            objectFit: "cover",
            filter: "sepia(0.4) saturate(1.2) brightness(0.5)",
            maskImage: "radial-gradient(ellipse at 0% 100%, black 20%, transparent 65%)",
            WebkitMaskImage: "radial-gradient(ellipse at 0% 100%, black 20%, transparent 65%)",
          }}
        />
      </div>
    </div>
  );
}

export default function ParallaxBg() {
  return <BaseBackground />;
}
