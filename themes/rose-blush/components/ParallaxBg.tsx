"use client";
import Image from "next/image";

/* Static large rose images at corners */
function RoseBackground() {
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
      {/* Top-left rose */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "50%",
          height: "45%",
          opacity: 0.7,
        }}
      >
        <Image
          src="/parallax/rose-1.jpg"
          alt="Rose bouquet"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "saturate(1.2)",
            maskImage: "radial-gradient(ellipse at 0% 0%, black 30%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at 0% 0%, black 30%, transparent 70%)",
          }}
          priority
        />
      </div>

      {/* Bottom-right rose */}
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "50%",
          height: "45%",
          opacity: 0.65,
        }}
      >
        <Image
          src="/parallax/rose-2.jpg"
          alt="Rose bouquet"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "saturate(1.2)",
            maskImage: "radial-gradient(ellipse at 100% 100%, black 30%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at 100% 100%, black 30%, transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}

export default function ParallaxBg() {
  return <RoseBackground />;
}
