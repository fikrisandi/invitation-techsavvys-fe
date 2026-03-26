"use client";

import { useInvitation } from "../context";
import { CineRule } from "./CineOrnament";
import type { EventItem } from "@/lib/types";

function EventCard({ event, delay }: { event: EventItem; delay: string }) {
  return (
    <div
      className={`reveal-up ${delay}`}
      style={{
        background: "var(--cine-card)",
        border: "1px solid var(--cine-border)",
        borderTop: "2px solid var(--cine-gold)",
        padding: "48px 40px",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Title */}
      <p
        style={{
          fontFamily: "var(--font-cine-body)",
          fontSize: "8px",
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          color: "var(--cine-text-soft)",
          marginBottom: "20px",
        }}
      >
        {event.title}
      </p>

      {/* Time — very large in display font */}
      <p
        style={{
          fontFamily: "var(--font-cine-display)",
          fontStyle: "italic",
          fontSize: "clamp(2.4rem, 8vw, 4rem)",
          fontWeight: 700,
          color: "var(--cine-text)",
          lineHeight: 1,
          marginBottom: "8px",
          letterSpacing: "-0.01em",
        }}
      >
        {event.time}
      </p>

      <p
        style={{
          fontFamily: "var(--font-cine-body)",
          fontSize: "10px",
          color: "var(--cine-gold)",
          letterSpacing: "0.2em",
          marginBottom: "32px",
        }}
      >
        {event.date}
      </p>

      <div
        style={{
          width: "40px",
          height: "1px",
          background: "var(--cine-gold)",
          opacity: 0.3,
          margin: "0 auto 32px",
        }}
      />

      <p
        style={{
          fontFamily: "var(--font-cine-body)",
          fontSize: "13px",
          fontWeight: 500,
          color: "var(--cine-text)",
          marginBottom: "8px",
          letterSpacing: "0.03em",
        }}
      >
        {event.location}
      </p>
      <p
        style={{
          fontFamily: "var(--font-cine-body)",
          fontSize: "11px",
          color: "var(--cine-text-soft)",
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
        background: "var(--cine-bg)",
        padding: "120px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "72px" }}>
          <p
            style={{
              fontFamily: "var(--font-cine-body)",
              fontSize: "8px",
              letterSpacing: "0.6em",
              textTransform: "uppercase",
              color: "var(--cine-text-soft)",
              marginBottom: "24px",
            }}
          >
            When &amp; Where
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cine-display)",
              fontStyle: "italic",
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              fontWeight: 700,
              color: "var(--cine-text)",
              marginBottom: "32px",
            }}
          >
            Jadwal Acara
          </h2>
          <CineRule />
        </div>

        {Object.entries(grouped).map(([date, dateEvents], gi) => (
          <div key={date} style={{ marginBottom: "64px" }}>
            {gi > 0 && (
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  background: "linear-gradient(to right, transparent, var(--cine-gold), transparent)",
                  opacity: 0.2,
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
                  fontFamily: "var(--font-cine-body)",
                  fontSize: "9px",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "var(--cine-gold)",
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
                  border: "1px solid var(--cine-border)",
                  overflow: "hidden",
                  marginBottom: "20px",
                }}
              >
                <iframe
                  src={event.mapsEmbedSrc}
                  width="100%"
                  height="220"
                  style={{ border: 0, display: "block" }}
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
                    fontFamily: "var(--font-cine-body)",
                    fontSize: "8px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "var(--cine-gold)",
                    border: "1px solid var(--cine-border)",
                    padding: "14px 28px",
                    textDecoration: "none",
                    transition: "border-color 0.3s",
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
