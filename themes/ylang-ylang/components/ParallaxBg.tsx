"use client";
import Image from "next/image";
import { useInvitation } from "../context";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

function resolveUrl(url: string) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${API_URL}${url}`;
}

export default function ParallaxBg() {
  const data = useInvitation();
  const topLeft = (data as Record<string, unknown>).parallaxTopLeft as string | undefined;
  const bottomRight = (data as Record<string, unknown>).parallaxBottomRight as string | undefined;

  const srcTopLeft = topLeft ? resolveUrl(topLeft) : "/parallax/ylang-1.jpg";
  const srcBottomRight = bottomRight ? resolveUrl(bottomRight) : "/parallax/ylang-2.jpg";

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
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "50%",
          height: "45%",
          opacity: 0.65,
        }}
      >
        <Image
          src={srcTopLeft}
          alt="Background decoration"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "saturate(1.2) brightness(1.05)",
            maskImage: "radial-gradient(ellipse at 0% 0%, black 30%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at 0% 0%, black 30%, transparent 70%)",
          }}
          priority
          unoptimized={srcTopLeft.startsWith("http")}
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "50%",
          height: "45%",
          opacity: 0.6,
        }}
      >
        <Image
          src={srcBottomRight}
          alt="Background decoration"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "saturate(1.2) brightness(1.05)",
            maskImage: "radial-gradient(ellipse at 100% 100%, black 30%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at 100% 100%, black 30%, transparent 70%)",
          }}
          unoptimized={srcBottomRight.startsWith("http")}
        />
      </div>
    </div>
  );
}
