"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

/* Warna Adat Jawa Klasik */
const JAWA_COLORS = {
  sogan: "#5D3A1A",      // Coklat sogan khas batik
  emas: "#C8A020",       // Emas/kuning keemasan
  emasTerang: "#D4AF37", // Emas terang
  merahTua: "#8B2323",   // Merah tua/maroon
  hitam: "#1A0F0A",      // Hitam kecoklatan
  krem: "#F5E6D3",       // Krem/gading
  coklat: "#8B6914",     // Coklat medium
};

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

/* Layer 1 - Candi Borobudur & Sawah background */
function CandiBackground() {
  const ref = useScrollParallax(0.03);
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
      {/* Top - Candi Borobudur */}
      <div
        style={{
          position: "absolute",
          top: "-5%",
          left: "0",
          width: "100%",
          height: "45%",
          opacity: 0.3,
        }}
      >
        <Image
          src="/parallax/candi-1.jpg"
          alt="Candi Borobudur"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "sepia(0.5) saturate(1.1) brightness(0.85) hue-rotate(-10deg)",
            maskImage: "linear-gradient(to bottom, black 40%, transparent 95%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 95%)",
          }}
          priority
        />
      </div>

      {/* Bottom - Sawah */}
      <div
        style={{
          position: "absolute",
          bottom: "-5%",
          left: "0",
          width: "100%",
          height: "35%",
          opacity: 0.2,
        }}
      >
        <Image
          src="/parallax/candi-3.jpg"
          alt="Sawah Jawa"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center top",
            filter: "sepia(0.4) saturate(1.2) brightness(0.9)",
            maskImage: "linear-gradient(to top, black 30%, transparent 90%)",
            WebkitMaskImage: "linear-gradient(to top, black 30%, transparent 90%)",
          }}
        />
      </div>
    </div>
  );
}

/* Layer 2 - Janur (Daun Kelapa Muda) Ornaments */
function JanurLayer() {
  const ref = useScrollParallax(0.08);

  /* Janur anyaman - bentuk seperti daun kelapa yang dianyam */
  const JanurSvg = ({ size, rotate = 0 }: { size: number; rotate?: number }) => (
    <svg
      viewBox="0 0 80 120"
      width={size}
      height={size * 1.5}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {/* Batang utama */}
      <path
        d="M40,5 C40,5 40,115 40,115"
        fill="none"
        stroke={JAWA_COLORS.emas}
        strokeWidth="2"
      />
      {/* Daun-daun kelapa kiri */}
      <path d="M40,15 C30,18 15,20 8,25 C15,23 30,22 40,20" fill={JAWA_COLORS.emas} opacity="0.8" />
      <path d="M40,30 C28,34 12,38 5,45 C12,42 28,38 40,35" fill={JAWA_COLORS.emas} opacity="0.8" />
      <path d="M40,50 C26,55 10,60 3,68 C10,64 26,58 40,55" fill={JAWA_COLORS.emas} opacity="0.8" />
      <path d="M40,70 C28,75 14,82 7,90 C14,86 28,78 40,75" fill={JAWA_COLORS.emas} opacity="0.8" />
      {/* Daun-daun kelapa kanan */}
      <path d="M40,15 C50,18 65,20 72,25 C65,23 50,22 40,20" fill={JAWA_COLORS.emas} opacity="0.8" />
      <path d="M40,30 C52,34 68,38 75,45 C68,42 52,38 40,35" fill={JAWA_COLORS.emas} opacity="0.8" />
      <path d="M40,50 C54,55 70,60 77,68 C70,64 54,58 40,55" fill={JAWA_COLORS.emas} opacity="0.8" />
      <path d="M40,70 C52,75 66,82 73,90 C66,86 52,78 40,75" fill={JAWA_COLORS.emas} opacity="0.8" />
      {/* Anyaman di tengah */}
      <path d="M35,25 L45,35 M45,25 L35,35" stroke={JAWA_COLORS.coklat} strokeWidth="1" />
      <path d="M35,45 L45,55 M45,45 L35,55" stroke={JAWA_COLORS.coklat} strokeWidth="1" />
      <path d="M35,65 L45,75 M45,65 L35,75" stroke={JAWA_COLORS.coklat} strokeWidth="1" />
    </svg>
  );

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
      <div style={{ position: "absolute", top: "5%", left: "2%", opacity: 0.2 }}>
        <JanurSvg size={50} rotate={-15} />
      </div>
      <div style={{ position: "absolute", top: "5%", right: "2%", opacity: 0.2 }}>
        <JanurSvg size={50} rotate={15} />
      </div>
      <div style={{ position: "absolute", bottom: "10%", left: "3%", opacity: 0.15 }}>
        <JanurSvg size={45} rotate={-10} />
      </div>
      <div style={{ position: "absolute", bottom: "10%", right: "3%", opacity: 0.15 }}>
        <JanurSvg size={45} rotate={10} />
      </div>
    </div>
  );
}

/* Layer 3 - Batik Parang Pattern */
function BatikParangLayer() {
  const ref = useScrollParallax(0.12);

  /* Motif Parang - diagonal S-curves */
  const ParangSvg = ({ size }: { size: number }) => (
    <svg viewBox="0 0 60 80" width={size} height={size * 1.33}>
      {/* Parang diagonal waves */}
      <path
        d="M5,80 C15,70 25,60 20,50 C15,40 25,30 35,20 C45,10 55,0 55,0"
        fill="none"
        stroke={JAWA_COLORS.sogan}
        strokeWidth="3"
      />
      <path
        d="M15,80 C25,70 35,60 30,50 C25,40 35,30 45,20 C55,10 60,5 60,0"
        fill="none"
        stroke={JAWA_COLORS.emas}
        strokeWidth="2"
      />
      {/* Mlinjon (diamond shapes) */}
      <polygon points="20,65 25,60 30,65 25,70" fill={JAWA_COLORS.merahTua} />
      <polygon points="30,45 35,40 40,45 35,50" fill={JAWA_COLORS.merahTua} />
      <polygon points="40,25 45,20 50,25 45,30" fill={JAWA_COLORS.merahTua} />
    </svg>
  );

  const positions = [
    { left: "5%", top: "25%", size: 40, opacity: 0.18 },
    { left: "90%", top: "30%", size: 35, opacity: 0.15 },
    { left: "8%", top: "55%", size: 38, opacity: 0.16 },
    { left: "88%", top: "60%", size: 42, opacity: 0.18 },
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
      {positions.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            opacity: p.opacity,
            transform: i % 2 === 0 ? "none" : "scaleX(-1)",
          }}
        >
          <ParangSvg size={p.size} />
        </div>
      ))}
    </div>
  );
}

/* Layer 4 - Gunungan (Tree of Life) */
function GununganLayer() {
  const ref = useScrollParallax(0.1);

  const GununganSvg = ({ size, opacity }: { size: number; opacity: number }) => (
    <svg viewBox="0 0 100 180" width={size} height={size * 1.8} style={{ opacity }}>
      {/* Main body */}
      <path
        d="M50,5 C50,5 15,50 10,90 C5,130 15,155 50,175 C85,155 95,130 90,90 C85,50 50,5 50,5 Z"
        fill={JAWA_COLORS.emas}
        stroke={JAWA_COLORS.sogan}
        strokeWidth="2"
      />
      {/* Inner layers */}
      <path
        d="M50,15 C50,15 25,50 22,85 C19,115 28,138 50,155 C72,138 81,115 78,85 C75,50 50,15 50,15 Z"
        fill="none"
        stroke={JAWA_COLORS.sogan}
        strokeWidth="1.5"
      />
      <path
        d="M50,30 C50,30 35,55 33,80 C31,105 38,120 50,132 C62,120 69,105 67,80 C65,55 50,30 50,30 Z"
        fill="none"
        stroke={JAWA_COLORS.merahTua}
        strokeWidth="1"
      />
      {/* Sun ornament */}
      <circle cx="50" cy="25" r="10" fill={JAWA_COLORS.sogan} />
      <circle cx="50" cy="25" r="6" fill={JAWA_COLORS.emas} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={50 + 12 * Math.cos(rad)}
            y1={25 + 12 * Math.sin(rad)}
            x2={50 + 18 * Math.cos(rad)}
            y2={25 + 18 * Math.sin(rad)}
            stroke={JAWA_COLORS.sogan}
            strokeWidth="2"
          />
        );
      })}
      {/* Tree branches */}
      <path d="M50,40 C38,52 32,65 38,78" fill="none" stroke={JAWA_COLORS.sogan} strokeWidth="1.5" />
      <path d="M50,40 C62,52 68,65 62,78" fill="none" stroke={JAWA_COLORS.sogan} strokeWidth="1.5" />
      {/* Decorative elements */}
      <circle cx="38" cy="95" r="5" fill={JAWA_COLORS.merahTua} />
      <circle cx="62" cy="95" r="5" fill={JAWA_COLORS.merahTua} />
      <circle cx="50" cy="85" r="6" fill={JAWA_COLORS.sogan} />
      <polygon points="50,110 42,130 50,150 58,130" fill={JAWA_COLORS.sogan} />
      <polygon points="50,118 46,130 50,142 54,130" fill={JAWA_COLORS.merahTua} />
      <ellipse cx="50" cy="165" rx="18" ry="6" fill={JAWA_COLORS.sogan} />
    </svg>
  );

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
      <div style={{ position: "absolute", top: "8%", left: "4%" }}>
        <GununganSvg size={65} opacity={0.22} />
      </div>
      <div style={{ position: "absolute", top: "30%", right: "5%", transform: "scaleX(-1)" }}>
        <GununganSvg size={55} opacity={0.18} />
      </div>
      <div style={{ position: "absolute", bottom: "12%", left: "6%" }}>
        <GununganSvg size={50} opacity={0.15} />
      </div>
    </div>
  );
}

/* Layer 5 - Wayang Characters */
function WayangLayer() {
  const ref = useScrollParallax(0.18);

  const WayangSvg = ({ flip = false }: { flip?: boolean }) => (
    <svg
      viewBox="0 0 60 120"
      width={50}
      height={100}
      style={{ transform: flip ? "scaleX(-1)" : "none" }}
    >
      {/* Head with mahkota */}
      <ellipse cx="30" cy="18" rx="12" ry="14" fill={JAWA_COLORS.emas} stroke={JAWA_COLORS.sogan} strokeWidth="1" />
      <path d="M18,12 L30,2 L42,12" fill={JAWA_COLORS.merahTua} stroke={JAWA_COLORS.sogan} strokeWidth="1" />
      <circle cx="30" cy="4" r="4" fill={JAWA_COLORS.emas} />
      {/* Face details */}
      <ellipse cx="25" cy="16" rx="2" ry="1" fill={JAWA_COLORS.sogan} />
      <path d="M28,22 C30,24 32,22 32,22" fill="none" stroke={JAWA_COLORS.sogan} strokeWidth="0.8" />
      {/* Body */}
      <path d="M30,32 C28,45 26,60 28,75 C30,90 30,105 32,115" fill="none" stroke={JAWA_COLORS.emas} strokeWidth="5" />
      {/* Arms */}
      <path d="M28,40 C18,44 8,42 2,48" fill="none" stroke={JAWA_COLORS.emas} strokeWidth="3" />
      <path d="M32,40 C42,36 52,32 58,26" fill="none" stroke={JAWA_COLORS.emas} strokeWidth="3" />
      {/* Hands */}
      <circle cx="2" cy="48" r="3" fill={JAWA_COLORS.emas} />
      <circle cx="58" cy="26" r="3" fill={JAWA_COLORS.emas} />
      {/* Kain/sarong */}
      <path d="M24,75 C20,88 16,100 14,115" fill="none" stroke={JAWA_COLORS.merahTua} strokeWidth="4" />
      <path d="M36,75 C40,88 44,100 46,115" fill="none" stroke={JAWA_COLORS.merahTua} strokeWidth="4" />
      {/* Sabuk */}
      <ellipse cx="30" cy="78" rx="10" ry="4" fill="none" stroke={JAWA_COLORS.sogan} strokeWidth="1.5" />
      {/* Accessories */}
      <circle cx="30" cy="50" r="4" fill={JAWA_COLORS.sogan} />
    </svg>
  );

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
      <div style={{ position: "absolute", top: "18%", left: "8%", opacity: 0.18 }}>
        <WayangSvg />
      </div>
      <div style={{ position: "absolute", top: "22%", right: "10%", opacity: 0.15 }}>
        <WayangSvg flip />
      </div>
      <div style={{ position: "absolute", bottom: "22%", right: "6%", opacity: 0.16 }}>
        <WayangSvg />
      </div>
      <div style={{ position: "absolute", bottom: "28%", left: "12%", opacity: 0.14 }}>
        <WayangSvg flip />
      </div>
    </div>
  );
}

/* Layer 6 - Kawung Batik Pattern */
function KawungLayer() {
  const ref = useScrollParallax(0.22);

  const kawungPositions = [
    { left: "18%", top: "35%", size: 42, opacity: 0.22 },
    { left: "75%", top: "28%", size: 38, opacity: 0.2 },
    { left: "28%", top: "58%", size: 45, opacity: 0.24 },
    { left: "68%", top: "62%", size: 40, opacity: 0.2 },
    { left: "48%", top: "78%", size: 44, opacity: 0.22 },
    { left: "12%", top: "75%", size: 36, opacity: 0.18 },
    { left: "82%", top: "72%", size: 40, opacity: 0.2 },
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
      {kawungPositions.map((k, i) => (
        <svg
          key={i}
          viewBox="0 0 40 40"
          width={k.size}
          height={k.size}
          style={{
            position: "absolute",
            left: k.left,
            top: k.top,
            opacity: k.opacity,
          }}
        >
          <ellipse cx="20" cy="8" rx="5" ry="8" fill="none" stroke={JAWA_COLORS.emas} strokeWidth="1.5" />
          <ellipse cx="20" cy="32" rx="5" ry="8" fill="none" stroke={JAWA_COLORS.emas} strokeWidth="1.5" />
          <ellipse cx="8" cy="20" rx="8" ry="5" fill="none" stroke={JAWA_COLORS.emas} strokeWidth="1.5" />
          <ellipse cx="32" cy="20" rx="8" ry="5" fill="none" stroke={JAWA_COLORS.emas} strokeWidth="1.5" />
          <circle cx="20" cy="20" r="5" fill={JAWA_COLORS.sogan} />
          <circle cx="20" cy="20" r="2.5" fill={JAWA_COLORS.merahTua} />
        </svg>
      ))}
    </div>
  );
}

/* Layer 7 - Floating landscapes */
function FloatingLandscapes() {
  const ref = useScrollParallax(0.15);

  const landscapes = [
    { left: "12%", top: "40%", size: 75, opacity: 0.35 },
    { left: "82%", top: "48%", size: 65, opacity: 0.3 },
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
      {landscapes.map((l, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: l.left,
            top: l.top,
            width: l.size,
            height: l.size,
            opacity: l.opacity,
            borderRadius: "50%",
            overflow: "hidden",
            border: `2px solid ${JAWA_COLORS.emas}`,
            boxShadow: `0 0 15px ${JAWA_COLORS.emas}40`,
          }}
        >
          <Image
            src={i === 0 ? "/parallax/candi-1.jpg" : "/parallax/candi-2.jpg"}
            alt="Java landscape"
            fill
            style={{
              objectFit: "cover",
              filter: "sepia(0.4) saturate(1.2)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* Layer 8 - Gold dust particles */
function GoldDust() {
  const ref = useScrollParallax(0.3);

  const particles = Array.from({ length: 30 }, (_, i) => ({
    left: `${5 + (i * 31) % 90}%`,
    top: `${8 + (i * 37) % 84}%`,
    size: 2 + (i % 3),
    opacity: 0.25 + (i % 4) * 0.1,
  }));

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
            background: JAWA_COLORS.emasTerang,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 2}px ${JAWA_COLORS.emas}`,
          }}
        />
      ))}
    </div>
  );
}

export default function ParallaxBg() {
  return (
    <>
      <CandiBackground />
      <JanurLayer />
      <BatikParangLayer />
      <GununganLayer />
      <WayangLayer />
      <KawungLayer />
      <FloatingLandscapes />
      <GoldDust />
    </>
  );
}
