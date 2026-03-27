"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

function useScrollParallax(speed: number) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      el.style.transform = `translate3d(0, ${window.scrollY * speed}px, 0)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);
  return ref;
}

/* Layer 1 - Cinematic background images (slowest) */
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
          opacity: 0.3,
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
          opacity: 0.25,
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

/* Layer 2 - Film strip decorations */
function FilmStripLayer() {
  const ref = useScrollParallax(0.1);

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
      {/* Left film strip */}
      <svg
        viewBox="0 0 40 200"
        width={30}
        height={150}
        style={{
          position: "absolute",
          top: "15%",
          left: "3%",
          opacity: 0.1,
        }}
      >
        {/* Film strip body */}
        <rect x="5" y="0" width="30" height="200" fill="#C8A878" />
        {/* Sprocket holes */}
        {[10, 30, 50, 70, 90, 110, 130, 150, 170, 190].map((y, i) => (
          <rect key={i} x="8" y={y} width="6" height="8" rx="1" fill="#080808" />
        ))}
        {[10, 30, 50, 70, 90, 110, 130, 150, 170, 190].map((y, i) => (
          <rect key={`r-${i}`} x="26" y={y} width="6" height="8" rx="1" fill="#080808" />
        ))}
        {/* Film frames */}
        {[15, 55, 95, 135, 175].map((y, i) => (
          <rect key={`f-${i}`} x="12" y={y} width="16" height="12" rx="1" fill="#080808" opacity="0.5" />
        ))}
      </svg>

      {/* Right film strip */}
      <svg
        viewBox="0 0 40 200"
        width={30}
        height={150}
        style={{
          position: "absolute",
          top: "45%",
          right: "3%",
          opacity: 0.1,
        }}
      >
        <rect x="5" y="0" width="30" height="200" fill="#C8A878" />
        {[10, 30, 50, 70, 90, 110, 130, 150, 170, 190].map((y, i) => (
          <rect key={i} x="8" y={y} width="6" height="8" rx="1" fill="#080808" />
        ))}
        {[10, 30, 50, 70, 90, 110, 130, 150, 170, 190].map((y, i) => (
          <rect key={`r-${i}`} x="26" y={y} width="6" height="8" rx="1" fill="#080808" />
        ))}
        {[15, 55, 95, 135, 175].map((y, i) => (
          <rect key={`f-${i}`} x="12" y={y} width="16" height="12" rx="1" fill="#080808" opacity="0.5" />
        ))}
      </svg>
    </div>
  );
}

/* Layer 3 - Floating cinematic circles */
function FloatingCircles() {
  const ref = useScrollParallax(0.15);

  const circles = [
    { left: "15%", top: "30%", size: 70, opacity: 0.35 },
    { left: "78%", top: "25%", size: 55, opacity: 0.3 },
    { left: "25%", top: "65%", size: 65, opacity: 0.32 },
    { left: "80%", top: "60%", size: 50, opacity: 0.28 },
    { left: "50%", top: "80%", size: 60, opacity: 0.3 },
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
      {circles.map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: c.left,
            top: c.top,
            width: c.size,
            height: c.size,
            opacity: c.opacity,
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <Image
            src="/parallax/cinematic-1.jpg"
            alt="Cinematic element"
            fill
            style={{
              objectFit: "cover",
              filter: "sepia(0.4) saturate(0.7) brightness(0.9)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* Layer 4 - Gold bokeh lights */
function BokehLights() {
  const ref = useScrollParallax(0.22);

  const lights = [
    { left: "10%", top: "15%", size: 20, opacity: 0.15 },
    { left: "85%", top: "20%", size: 25, opacity: 0.12 },
    { left: "20%", top: "40%", size: 18, opacity: 0.14 },
    { left: "75%", top: "35%", size: 22, opacity: 0.13 },
    { left: "30%", top: "55%", size: 16, opacity: 0.15 },
    { left: "65%", top: "50%", size: 20, opacity: 0.12 },
    { left: "15%", top: "75%", size: 24, opacity: 0.14 },
    { left: "80%", top: "70%", size: 18, opacity: 0.13 },
    { left: "45%", top: "85%", size: 22, opacity: 0.15 },
    { left: "55%", top: "25%", size: 15, opacity: 0.11 },
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
      {lights.map((l, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: l.left,
            top: l.top,
            width: l.size,
            height: l.size,
            borderRadius: "50%",
            background: "radial-gradient(circle at center, rgba(200,168,120,0.8) 0%, rgba(200,168,120,0) 70%)",
            opacity: l.opacity,
            filter: "blur(2px)",
          }}
        />
      ))}
    </div>
  );
}

/* Layer 5 - Film reel decorations */
function FilmReelLayer() {
  const ref = useScrollParallax(0.08);

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
      {/* Film reel left */}
      <svg
        viewBox="0 0 80 80"
        width={60}
        height={60}
        style={{
          position: "absolute",
          top: "5%",
          left: "8%",
          opacity: 0.08,
        }}
      >
        <circle cx="40" cy="40" r="38" fill="none" stroke="#C8A878" strokeWidth="2" />
        <circle cx="40" cy="40" r="30" fill="none" stroke="#C8A878" strokeWidth="1.5" />
        <circle cx="40" cy="40" r="8" fill="#C8A878" />
        {/* Spokes */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 40 + 10 * Math.cos(rad);
          const y1 = 40 + 10 * Math.sin(rad);
          const x2 = 40 + 28 * Math.cos(rad);
          const y2 = 40 + 28 * Math.sin(rad);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C8A878" strokeWidth="2" />
          );
        })}
        {/* Holes */}
        {[30, 90, 150, 210, 270, 330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 40 + 20 * Math.cos(rad);
          const cy = 40 + 20 * Math.sin(rad);
          return <circle key={i} cx={cx} cy={cy} r="4" fill="#080808" />;
        })}
      </svg>

      {/* Film reel right */}
      <svg
        viewBox="0 0 80 80"
        width={50}
        height={50}
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          opacity: 0.08,
        }}
      >
        <circle cx="40" cy="40" r="38" fill="none" stroke="#C8A878" strokeWidth="2" />
        <circle cx="40" cy="40" r="30" fill="none" stroke="#C8A878" strokeWidth="1.5" />
        <circle cx="40" cy="40" r="8" fill="#C8A878" />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 40 + 10 * Math.cos(rad);
          const y1 = 40 + 10 * Math.sin(rad);
          const x2 = 40 + 28 * Math.cos(rad);
          const y2 = 40 + 28 * Math.sin(rad);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C8A878" strokeWidth="2" />
          );
        })}
        {[30, 90, 150, 210, 270, 330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 40 + 20 * Math.cos(rad);
          const cy = 40 + 20 * Math.sin(rad);
          return <circle key={i} cx={cx} cy={cy} r="4" fill="#080808" />;
        })}
      </svg>
    </div>
  );
}

/* Layer 6 - Gold dust particles */
function GoldDust() {
  const ref = useScrollParallax(0.3);

  const particles = [
    { left: "5%", top: "10%", size: 3, opacity: 0.4 },
    { left: "15%", top: "25%", size: 2, opacity: 0.3 },
    { left: "25%", top: "15%", size: 4, opacity: 0.35 },
    { left: "35%", top: "30%", size: 2, opacity: 0.25 },
    { left: "45%", top: "20%", size: 3, opacity: 0.4 },
    { left: "55%", top: "35%", size: 2, opacity: 0.3 },
    { left: "65%", top: "18%", size: 4, opacity: 0.35 },
    { left: "75%", top: "28%", size: 2, opacity: 0.25 },
    { left: "85%", top: "15%", size: 3, opacity: 0.4 },
    { left: "10%", top: "45%", size: 2, opacity: 0.3 },
    { left: "30%", top: "55%", size: 3, opacity: 0.35 },
    { left: "50%", top: "50%", size: 2, opacity: 0.25 },
    { left: "70%", top: "48%", size: 4, opacity: 0.4 },
    { left: "90%", top: "55%", size: 2, opacity: 0.3 },
    { left: "20%", top: "70%", size: 3, opacity: 0.35 },
    { left: "40%", top: "75%", size: 2, opacity: 0.25 },
    { left: "60%", top: "68%", size: 4, opacity: 0.4 },
    { left: "80%", top: "78%", size: 2, opacity: 0.3 },
    { left: "15%", top: "85%", size: 3, opacity: 0.35 },
    { left: "55%", top: "90%", size: 2, opacity: 0.25 },
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
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "#C8A878",
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

export default function ParallaxBg() {
  return (
    <>
      <CinematicBackground />
      <FilmReelLayer />
      <FilmStripLayer />
      <FloatingCircles />
      <BokehLights />
      <GoldDust />
    </>
  );
}
