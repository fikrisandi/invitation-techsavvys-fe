"use client";
import Image from "next/image";

/* Static background sakura images */
function SakuraBackground() {
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
      {/* Top left sakura branch */}
      <div
        style={{
          position: "absolute",
          top: "-5%",
          left: "-5%",
          width: "55%",
          height: "45%",
          opacity: 0.75,
        }}
      >
        <Image
          src="/parallax/sakura-1.jpg"
          alt="Sakura branch"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "saturate(1.2)",
            maskImage: "radial-gradient(ellipse at 0% 0%, black 20%, transparent 65%)",
            WebkitMaskImage: "radial-gradient(ellipse at 0% 0%, black 20%, transparent 65%)",
          }}
          priority
        />
      </div>

      {/* Bottom right sakura branch */}
      <div
        style={{
          position: "absolute",
          bottom: "-5%",
          right: "-5%",
          width: "55%",
          height: "45%",
          opacity: 0.7,
          transform: "rotate(180deg)",
        }}
      >
        <Image
          src="/parallax/sakura-2.jpg"
          alt="Sakura branch"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "saturate(1.2)",
            maskImage: "radial-gradient(ellipse at 0% 0%, black 20%, transparent 65%)",
            WebkitMaskImage: "radial-gradient(ellipse at 0% 0%, black 20%, transparent 65%)",
          }}
        />
      </div>
    </div>
  );
}

export default function ParallaxBg() {
  return <SakuraBackground />;
}
