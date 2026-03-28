"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

function useScrollParallax(speed: number) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const vh = window.innerHeight;
      const y = (window.scrollY * speed) % vh;
      el.style.transform = `translate3d(0, ${y}px, 0)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);
  return ref;
}

/* Layer 1 - Background sakura image (slowest) */
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

/* Layer 2 - Floating sakura petals (medium speed) */
function FloatingPetals() {
  const ref = useScrollParallax(0.15);

  const petals = [
    { left: "15%", top: "20%", size: 80, rotate: 15, opacity: 0.7 },
    { left: "75%", top: "15%", size: 60, rotate: -20, opacity: 0.6 },
    { left: "25%", top: "50%", size: 70, rotate: 45, opacity: 0.65 },
    { left: "80%", top: "55%", size: 55, rotate: -35, opacity: 0.55 },
    { left: "10%", top: "70%", size: 65, rotate: 30, opacity: 0.6 },
    { left: "60%", top: "75%", size: 75, rotate: -10, opacity: 0.7 },
  ];

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        willChange: "transform",
      }}
    >
      {petals.map((petal, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: petal.left,
            top: petal.top,
            width: petal.size,
            height: petal.size,
            transform: `rotate(${petal.rotate}deg)`,
            opacity: petal.opacity,
          }}
        >
          <Image
            src="/parallax/sakura-3.jpg"
            alt="Sakura petal"
            fill
            style={{
              objectFit: "cover",
              borderRadius: "50%",
              filter: "saturate(1.3) brightness(1.1)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* Layer 3 - Small decorative elements (fastest) */
function SmallElements() {
  const ref = useScrollParallax(0.28);

  const elements = [
    { left: "8%", top: "12%", size: 30, opacity: 0.5 },
    { left: "92%", top: "25%", size: 25, opacity: 0.45 },
    { left: "45%", top: "8%", size: 28, opacity: 0.55 },
    { left: "35%", top: "85%", size: 32, opacity: 0.5 },
    { left: "88%", top: "78%", size: 26, opacity: 0.4 },
    { left: "5%", top: "45%", size: 24, opacity: 0.45 },
  ];

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        willChange: "transform",
      }}
    >
      {elements.map((el, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: el.left,
            top: el.top,
            width: el.size,
            height: el.size,
            opacity: el.opacity,
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <Image
            src="/parallax/sakura-1.jpg"
            alt="Sakura element"
            fill
            style={{
              objectFit: "cover",
              filter: "blur(1px) saturate(1.5)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* SVG Petal decorations for added elegance */
function SvgPetals() {
  const ref = useScrollParallax(0.22);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        willChange: "transform",
      }}
    >
      {/* Falling petal SVGs */}
      {[
        { x: "20%", y: "30%", rot: 25, scale: 1, op: 0.25 },
        { x: "70%", y: "20%", rot: -15, scale: 0.8, op: 0.2 },
        { x: "40%", y: "60%", rot: 45, scale: 1.2, op: 0.28 },
      ].map((p, i) => (
        <svg
          key={i}
          width="40"
          height="40"
          viewBox="0 0 40 40"
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            transform: `rotate(${p.rot}deg) scale(${p.scale})`,
            opacity: p.op,
          }}
        >
          <ellipse cx="20" cy="20" rx="18" ry="10" fill="#FFB7C5" />
          <ellipse cx="20" cy="20" rx="12" ry="6" fill="#FFC0CB" />
        </svg>
      ))}
    </div>
  );
}

export default function ParallaxBg() {
  return (
    <>
      <SakuraBackground />
      <SvgPetals />
    </>
  );
}
