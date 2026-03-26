"use client";
import { useInvitation } from "../context";
import { SakuraDivider } from "./SakuraEffect";
import type { EventItem } from "@/lib/types";

function EventCard({ event, index }: { event: EventItem; index: number }) {
  return (
    <div
      className="reveal-up"
      style={{
        background: "var(--sakura-bg)",
        border: "1px solid var(--sakura-border)",
        borderRadius: "4px",
        overflow: "hidden",
        position: "relative",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Pink top accent */}
      <div
        style={{
          height: "4px",
          background: `linear-gradient(to right, var(--sakura-pink-dark), var(--sakura-pink-light))`,
        }}
      />

      <div style={{ padding: "36px 32px" }}>
        {/* Event number */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "24px",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "var(--sakura-bg-alt)",
            border: "1px solid var(--sakura-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            color: "var(--sakura-pink)",
            fontFamily: "var(--font-sakura-display)",
            fontWeight: 600,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-sakura-display)",
            fontSize: "clamp(1.3rem, 3.5vw, 1.7rem)",
            color: "var(--sakura-text)",
            fontWeight: 600,
            marginBottom: "6px",
            letterSpacing: "0.02em",
          }}
        >
          {event.title}
        </h3>

        {/* Script subtitle */}
        <p
          style={{
            fontFamily: "var(--font-sakura-script)",
            fontSize: "1.4rem",
            color: "var(--sakura-pink)",
            marginBottom: "24px",
            lineHeight: 1.2,
          }}
        >
          {event.location}
        </p>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "var(--sakura-border)",
            marginBottom: "24px",
          }}
        />

        {/* Info rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Date row */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "var(--sakura-bg-alt)",
                border: "1px solid var(--sakura-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--sakura-pink)" strokeWidth="1.5" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--sakura-text-muted)", fontFamily: "var(--font-sakura-body)", marginBottom: "2px" }}>Tanggal</p>
              <p style={{ fontSize: "13px", color: "var(--sakura-text)", fontFamily: "var(--font-sakura-body)", fontWeight: 500 }}>{event.date}</p>
            </div>
          </div>

          {/* Time row */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "var(--sakura-bg-alt)",
                border: "1px solid var(--sakura-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--sakura-pink)" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--sakura-text-muted)", fontFamily: "var(--font-sakura-body)", marginBottom: "2px" }}>Waktu</p>
              <p style={{ fontSize: "13px", color: "var(--sakura-text)", fontFamily: "var(--font-sakura-body)", fontWeight: 500 }}>{event.time}</p>
            </div>
          </div>

          {/* Address row */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "var(--sakura-bg-alt)",
                border: "1px solid var(--sakura-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--sakura-pink)" strokeWidth="1.5" strokeLinecap="round">
                <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6z" />
                <circle cx="12" cy="8" r="2" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--sakura-text-muted)", fontFamily: "var(--font-sakura-body)", marginBottom: "2px" }}>Alamat</p>
              <p style={{ fontSize: "13px", color: "var(--sakura-text)", fontFamily: "var(--font-sakura-body)", fontWeight: 500, lineHeight: 1.6 }}>{event.address}</p>
            </div>
          </div>
        </div>

        {/* Maps button */}
        {event.mapsUrl && (
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "28px",
              padding: "10px 24px",
              borderRadius: "40px",
              background: "transparent",
              border: "1px solid var(--sakura-pink)",
              color: "var(--sakura-pink)",
              fontFamily: "var(--font-sakura-body)",
              fontSize: "10px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontWeight: 700,
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6z" />
              <circle cx="12" cy="8" r="2" />
            </svg>
            Lihat Peta
          </a>
        )}

        {/* Maps embed */}
        {event.mapsEmbedSrc && (
          <div
            style={{
              marginTop: "28px",
              borderRadius: "4px",
              overflow: "hidden",
              border: "1px solid var(--sakura-border)",
              height: "200px",
            }}
          >
            <iframe
              src={event.mapsEmbedSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function EventDetails() {
  const { events } = useInvitation();
  return (
    <section
      id="events"
      style={{
        background: "var(--sakura-bg-alt)",
        padding: "120px 32px",
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
          <p
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "var(--sakura-text-soft)",
              marginBottom: "20px",
              fontFamily: "var(--font-sakura-body)",
            }}
          >
            Rangkaian Acara
          </p>
          <h2
            style={{
              fontFamily: "var(--font-sakura-script)",
              fontSize: "clamp(2.2rem, 7vw, 3.2rem)",
              color: "var(--sakura-pink)",
              marginBottom: "8px",
            }}
          >
            Detail Acara
          </h2>
          <SakuraDivider />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {events.map((event, i) => (
            <EventCard key={i} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
