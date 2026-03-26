"use client";

import { useInvitation } from "../context";
import type { EventItem } from "@/lib/types";

function EventCard({ event, delay }: { event: EventItem; delay: string }) {
  return (
    <div
      className={`reveal-up ${delay}`}
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid var(--galaxy-border)",
        borderTop: "2px solid var(--galaxy-purple)",
        borderRadius: "20px",
        padding: "44px 36px",
        textAlign: "center",
        boxShadow: "0 8px 32px rgba(139,92,246,0.1)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-galaxy-body)",
          fontSize: "8px",
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          color: "var(--galaxy-purple)",
          marginBottom: "16px",
        }}
      >
        {event.title}
      </p>

      <p
        style={{
          fontFamily: "var(--font-galaxy-display)",
          fontStyle: "italic",
          fontSize: "clamp(2rem, 6vw, 3rem)",
          fontWeight: 300,
          color: "var(--galaxy-text)",
          lineHeight: 1.1,
          marginBottom: "8px",
        }}
      >
        {event.time}
      </p>

      <p
        style={{
          fontFamily: "var(--font-galaxy-body)",
          fontSize: "10px",
          color: "var(--galaxy-gold)",
          letterSpacing: "0.2em",
          marginBottom: "28px",
        }}
      >
        {event.date}
      </p>

      <div
        style={{
          width: "40px",
          height: "1px",
          background: "linear-gradient(to right, transparent, var(--galaxy-purple), transparent)",
          margin: "0 auto 28px",
        }}
      />

      <p
        style={{
          fontFamily: "var(--font-galaxy-body)",
          fontSize: "13px",
          fontWeight: 600,
          color: "var(--galaxy-text)",
          marginBottom: "6px",
        }}
      >
        {event.location}
      </p>
      <p
        style={{
          fontFamily: "var(--font-galaxy-body)",
          fontSize: "11px",
          color: "var(--galaxy-text-soft)",
          lineHeight: 1.7,
        }}
      >
        {event.address}
      </p>
    </div>
  );
}

function groupByDate(events: EventItem[]) {
  const groups: Record<string, EventItem[]> = {};
  events.forEach((e) => {
    if (!groups[e.date]) groups[e.date] = [];
    groups[e.date].push(e);
  });
  return groups;
}

function getUniqueMapGroups(events: EventItem[]) {
  const seen = new Set<string>();
  return events.filter((e) => {
    const key = `${e.date}-${e.location}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return e.mapsEmbedSrc || e.mapsUrl;
  });
}

export default function EventDetails() {
  const { events } = useInvitation();
  const grouped = groupByDate(events);
  const mapGroups = getUniqueMapGroups(events);
  let delayIndex = 1;

  return (
    <section
      style={{
        background: "var(--galaxy-bg-mid)",
        padding: "120px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Purple nebula accent */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.08) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "640px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "72px" }}>
          <p
            style={{
              fontFamily: "var(--font-galaxy-body)",
              fontSize: "8px",
              letterSpacing: "0.6em",
              textTransform: "uppercase",
              color: "var(--galaxy-text-soft)",
              marginBottom: "24px",
            }}
          >
            When &amp; Where
          </p>
          <h2
            style={{
              fontFamily: "var(--font-galaxy-script)",
              fontSize: "clamp(2.2rem, 7vw, 3.5rem)",
              fontWeight: 400,
              background: "linear-gradient(135deg, var(--galaxy-purple), var(--galaxy-pink))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "32px",
            }}
          >
            Jadwal Acara
          </h2>
        </div>

        {Object.entries(grouped).map(([date, dateEvents], gi) => (
          <div key={date} style={{ marginBottom: "64px" }}>
            {gi > 0 && (
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  background: "linear-gradient(to right, transparent, var(--galaxy-purple), transparent)",
                  opacity: 0.25,
                  margin: "48px 0",
                }}
              />
            )}
            <div
              className={`reveal-up delay-${Math.min(delayIndex++, 8)}`}
              style={{ textAlign: "center", marginBottom: "40px" }}
            >
              <p
                style={{
                  fontFamily: "var(--font-galaxy-body)",
                  fontSize: "9px",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "var(--galaxy-purple)",
                  fontWeight: 500,
                }}
              >
                {date}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {dateEvents.map((event) => (
                <EventCard
                  key={`${event.title}-${event.time}`}
                  event={event}
                  delay={`delay-${Math.min(delayIndex++, 8)}`}
                />
              ))}
            </div>
          </div>
        ))}

        {mapGroups.map((event, i) => (
          <div
            key={`map-${i}`}
            className={`reveal-up delay-${Math.min(i + 3, 8)}`}
            style={{ marginBottom: "40px" }}
          >
            {event.mapsEmbedSrc && (
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--galaxy-border)",
                  borderRadius: "20px",
                  overflow: "hidden",
                  marginBottom: "20px",
                  padding: "8px",
                }}
              >
                <iframe
                  src={event.mapsEmbedSrc}
                  width="100%"
                  height="220"
                  style={{ border: 0, borderRadius: "14px", display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
            {event.mapsUrl && (
              <div style={{ textAlign: "center" }}>
                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontFamily: "var(--font-galaxy-body)",
                    fontSize: "8px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "var(--galaxy-purple)",
                    border: "1px solid var(--galaxy-border)",
                    padding: "14px 28px",
                    borderRadius: "100px",
                    textDecoration: "none",
                    background: "rgba(139,92,246,0.08)",
                    transition: "background 0.3s",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Buka di Maps — {event.location}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
