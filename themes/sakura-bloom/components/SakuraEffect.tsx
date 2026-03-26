"use client";

const PETAL_KEYFRAMES = `
@keyframes sakura-fall-a {
  0%   { transform: translateY(-20px) translateX(0px)   rotateX(0deg)   rotateY(0deg)   rotateZ(0deg)   translateZ(0px);   opacity: 0; }
  10%  { opacity: 0.75; }
  30%  { transform: translateY(28vh)  translateX(18px)  rotateX(220deg) rotateY(120deg) rotateZ(30deg)  translateZ(45px); }
  50%  { transform: translateY(50vh)  translateX(-12px) rotateX(360deg) rotateY(180deg) rotateZ(60deg)  translateZ(70px); }
  70%  { transform: translateY(72vh)  translateX(22px)  rotateX(500deg) rotateY(270deg) rotateZ(90deg)  translateZ(40px); }
  90%  { opacity: 0.5; }
  100% { transform: translateY(110vh) translateX(-8px)  rotateX(720deg) rotateY(360deg) rotateZ(120deg) translateZ(0px);  opacity: 0; }
}

@keyframes sakura-fall-b {
  0%   { transform: translateY(-20px) translateX(0px)   rotateX(0deg)   rotateY(0deg)   rotateZ(0deg)   translateZ(0px);   opacity: 0; }
  10%  { opacity: 0.65; }
  30%  { transform: translateY(25vh)  translateX(-20px) rotateX(160deg) rotateY(90deg)  rotateZ(-25deg) translateZ(60px); }
  50%  { transform: translateY(50vh)  translateX(15px)  rotateX(360deg) rotateY(200deg) rotateZ(-50deg) translateZ(80px); }
  70%  { transform: translateY(75vh)  translateX(-25px) rotateX(560deg) rotateY(300deg) rotateZ(-80deg) translateZ(35px); }
  90%  { opacity: 0.45; }
  100% { transform: translateY(110vh) translateX(10px)  rotateX(720deg) rotateY(360deg) rotateZ(-110deg) translateZ(0px); opacity: 0; }
}

@keyframes sakura-fall-c {
  0%   { transform: translateY(-20px) translateX(0px)   rotateX(0deg)   rotateY(0deg)   rotateZ(0deg)   translateZ(0px);   opacity: 0; }
  10%  { opacity: 0.8; }
  25%  { transform: translateY(22vh)  translateX(25px)  rotateX(130deg) rotateY(150deg) rotateZ(45deg)  translateZ(55px); }
  50%  { transform: translateY(50vh)  translateX(-18px) rotateX(360deg) rotateY(260deg) rotateZ(85deg)  translateZ(65px); }
  75%  { transform: translateY(78vh)  translateX(20px)  rotateX(590deg) rotateY(310deg) rotateZ(100deg) translateZ(30px); }
  90%  { opacity: 0.4; }
  100% { transform: translateY(110vh) translateX(-5px)  rotateX(720deg) rotateY(360deg) rotateZ(130deg) translateZ(0px);  opacity: 0; }
}

@keyframes sakura-fall-d {
  0%   { transform: translateY(-20px) translateX(0px)   rotateX(0deg)   rotateY(0deg)   rotateZ(0deg)   translateZ(0px);   opacity: 0; }
  10%  { opacity: 0.7; }
  35%  { transform: translateY(32vh)  translateX(-15px) rotateX(200deg) rotateY(80deg)  rotateZ(-35deg) translateZ(75px); }
  50%  { transform: translateY(50vh)  translateX(20px)  rotateX(360deg) rotateY(160deg) rotateZ(-65deg) translateZ(85px); }
  65%  { transform: translateY(68vh)  translateX(-10px) rotateX(520deg) rotateY(240deg) rotateZ(-90deg) translateZ(50px); }
  90%  { opacity: 0.5; }
  100% { transform: translateY(110vh) translateX(12px)  rotateX(720deg) rotateY(360deg) rotateZ(-120deg) translateZ(0px); opacity: 0; }
}

@keyframes sakura-fall-e {
  0%   { transform: translateY(-20px) translateX(0px)   rotateX(0deg)   rotateY(0deg)   rotateZ(0deg)   translateZ(0px);   opacity: 0; }
  10%  { opacity: 0.72; }
  40%  { transform: translateY(38vh)  translateX(22px)  rotateX(280deg) rotateY(110deg) rotateZ(55deg)  translateZ(50px); }
  50%  { transform: translateY(50vh)  translateX(-14px) rotateX(360deg) rotateY(220deg) rotateZ(70deg)  translateZ(60px); }
  60%  { transform: translateY(62vh)  translateX(18px)  rotateX(440deg) rotateY(280deg) rotateZ(95deg)  translateZ(45px); }
  90%  { opacity: 0.45; }
  100% { transform: translateY(110vh) translateX(-6px)  rotateX(720deg) rotateY(360deg) rotateZ(115deg) translateZ(0px);  opacity: 0; }
}
`;

const ANIM_NAMES = ["sakura-fall-a", "sakura-fall-b", "sakura-fall-c", "sakura-fall-d", "sakura-fall-e"] as const;
const BORDER_RADII = ["60% 0 60% 0", "50% 40% 50% 40%", "55% 10% 55% 10%", "40% 60% 40% 60%", "65% 5% 65% 5%"];

interface PetalConfig {
  left: string;
  width: number;
  height: number;
  borderRadius: string;
  opacity: number;
  duration: number;
  delay: number;
  animation: string;
  translateZBase: number;
}

const PETALS: PetalConfig[] = [
  { left: "5%",   width: 10, height: 14, borderRadius: BORDER_RADII[0], opacity: 0.72, duration: 8,  delay: 0,   animation: ANIM_NAMES[0], translateZBase: 10  },
  { left: "12%",  width: 8,  height: 12, borderRadius: BORDER_RADII[1], opacity: 0.65, duration: 11, delay: 1.5, animation: ANIM_NAMES[1], translateZBase: 30  },
  { left: "20%",  width: 13, height: 16, borderRadius: BORDER_RADII[2], opacity: 0.78, duration: 9,  delay: 3.2, animation: ANIM_NAMES[2], translateZBase: 55  },
  { left: "28%",  width: 9,  height: 13, borderRadius: BORDER_RADII[3], opacity: 0.6,  duration: 13, delay: 0.8, animation: ANIM_NAMES[3], translateZBase: 20  },
  { left: "35%",  width: 11, height: 15, borderRadius: BORDER_RADII[4], opacity: 0.75, duration: 7,  delay: 5,   animation: ANIM_NAMES[4], translateZBase: 70  },
  { left: "43%",  width: 8,  height: 11, borderRadius: BORDER_RADII[0], opacity: 0.68, duration: 10, delay: 2.1, animation: ANIM_NAMES[0], translateZBase: 40  },
  { left: "50%",  width: 14, height: 18, borderRadius: BORDER_RADII[1], opacity: 0.8,  duration: 12, delay: 6.5, animation: ANIM_NAMES[1], translateZBase: 15  },
  { left: "57%",  width: 9,  height: 12, borderRadius: BORDER_RADII[2], opacity: 0.63, duration: 8,  delay: 0.4, animation: ANIM_NAMES[2], translateZBase: 60  },
  { left: "65%",  width: 12, height: 16, borderRadius: BORDER_RADII[3], opacity: 0.71, duration: 14, delay: 3.8, animation: ANIM_NAMES[3], translateZBase: 35  },
  { left: "72%",  width: 10, height: 13, borderRadius: BORDER_RADII[4], opacity: 0.76, duration: 9,  delay: 7.2, animation: ANIM_NAMES[4], translateZBase: 80  },
  { left: "79%",  width: 8,  height: 11, borderRadius: BORDER_RADII[0], opacity: 0.62, duration: 11, delay: 1,   animation: ANIM_NAMES[0], translateZBase: 25  },
  { left: "86%",  width: 13, height: 17, borderRadius: BORDER_RADII[1], opacity: 0.79, duration: 7,  delay: 4.5, animation: ANIM_NAMES[1], translateZBase: 50  },
  { left: "93%",  width: 9,  height: 12, borderRadius: BORDER_RADII[2], opacity: 0.67, duration: 13, delay: 2.7, animation: ANIM_NAMES[2], translateZBase: 65  },
  { left: "8%",   width: 11, height: 15, borderRadius: BORDER_RADII[3], opacity: 0.73, duration: 10, delay: 8,   animation: ANIM_NAMES[3], translateZBase: 45  },
  { left: "17%",  width: 8,  height: 10, borderRadius: BORDER_RADII[4], opacity: 0.61, duration: 12, delay: 5.5, animation: ANIM_NAMES[4], translateZBase: 20  },
  { left: "32%",  width: 14, height: 18, borderRadius: BORDER_RADII[0], opacity: 0.77, duration: 8,  delay: 1.8, animation: ANIM_NAMES[0], translateZBase: 75  },
  { left: "48%",  width: 10, height: 14, borderRadius: BORDER_RADII[1], opacity: 0.69, duration: 11, delay: 6,   animation: ANIM_NAMES[1], translateZBase: 30  },
  { left: "62%",  width: 9,  height: 12, borderRadius: BORDER_RADII[2], opacity: 0.74, duration: 9,  delay: 3,   animation: ANIM_NAMES[2], translateZBase: 55  },
  { left: "75%",  width: 12, height: 16, borderRadius: BORDER_RADII[3], opacity: 0.66, duration: 14, delay: 0.6, animation: ANIM_NAMES[3], translateZBase: 10  },
  { left: "90%",  width: 8,  height: 11, borderRadius: BORDER_RADII[4], opacity: 0.7,  duration: 10, delay: 4,   animation: ANIM_NAMES[4], translateZBase: 60  },
];

export function SakuraPetals3D() {
  return (
    <>
      <style>{PETAL_KEYFRAMES}</style>
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          perspective: "1000px",
          perspectiveOrigin: "50% 0%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
          }}
        >
          {PETALS.map((petal, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: "-20px",
                left: petal.left,
                width: `${petal.width}px`,
                height: `${petal.height}px`,
                borderRadius: petal.borderRadius,
                background: `linear-gradient(135deg, var(--sakura-pink) 0%, var(--sakura-pink-light) 100%)`,
                opacity: petal.opacity,
                transformStyle: "preserve-3d",
                animation: `${petal.animation} ${petal.duration}s ease-in-out ${petal.delay}s infinite`,
                willChange: "transform, opacity",
                boxShadow: `0 2px 8px rgba(212,112,138,0.3)`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export function SakuraDivider() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        margin: "20px 0",
      }}
    >
      <div
        style={{
          flex: 1,
          height: "1px",
          background: "linear-gradient(to right, transparent, var(--sakura-pink))",
          opacity: 0.5,
        }}
      />
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 5-petal sakura flower */}
        <g transform="translate(14,14)">
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <ellipse
              key={i}
              cx={0}
              cy={-6}
              rx={3.5}
              ry={5.5}
              fill="var(--sakura-pink)"
              fillOpacity="0.8"
              transform={`rotate(${angle})`}
            />
          ))}
          <circle cx={0} cy={0} r={3} fill="var(--sakura-gold)" fillOpacity="0.9" />
          <circle cx={0} cy={0} r={1.5} fill="#fff" fillOpacity="0.7" />
        </g>
      </svg>
      <div
        style={{
          flex: 1,
          height: "1px",
          background: "linear-gradient(to left, transparent, var(--sakura-pink))",
          opacity: 0.5,
        }}
      />
    </div>
  );
}
