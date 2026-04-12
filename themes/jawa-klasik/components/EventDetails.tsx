"use client";

import type { CSSProperties } from "react";
import { BatikBorder, GununganDivider } from "./JawaOrnament";
import { useInvitation } from "../context";
import type { EventItem } from "@/lib/types";

function EventCard({ event, delay }: { event: EventItem; delay: string }) {
  const cardStyle: CSSProperties = {
    background: "var(--jawa-bg-card)",
    border: "1px solid var(--jawa-border)",
    borderRadius: "2px",
    overflow: "hidden",
    textAlign: "center",
    position: "relative",
  };

  return (
    <div className={`reveal-up ${delay}`} style={cardStyle}>
      <BatikBorder />
      <div style={{ padding: "40px 32px 48px" }}>
        {/* Event title */}
        <h3 style={{
          fontFamily: "var(--font-jawa-display)",
          fontSize: "20px",
          fontWeight: 500,
          color: "var(--jawa-text)",
          marginBottom: "20px",
          letterSpacing: "0.05em",
        }}>
          {event.title}
        </h3>

        {/* Date */}
        <p style={{
          fontFamily: "var(--font-jawa-body)",
          fontSize: "11px",
          color: "var(--jawa-text-soft)",
          marginBottom: "8px",
          letterSpacing: "0.1em",
        }}>
          {event.date}
        </p>

        {/* Time - gold display */}
        <p style={{
          fontFamily: "var(--font-jawa-display)",
          fontSize: "28px",
          fontWeight: 300,
          color: "var(--jawa-gold-light)",
          marginBottom: "20px",
          letterSpacing: "0.1em",
        }}>
          {event.time}
        </p>

        {/* Divider */}
        <div style={{
          width: "48px",
          height: "1px",
          background: "var(--jawa-gold)",
          margin: "0 auto 20px",
          opacity: 0.3,
        }} />

        {/* Location */}
        <p style={{
          fontFamily: "var(--font-jawa-display)",
          fontSize: "14px",
          fontWeight: 500,
          color: "var(--jawa-text)",
          marginBottom: "6px",
        }}>
          {event.location}
        </p>
        <p style={{
          fontFamily: "var(--font-jawa-body)",
          fontSize: "11px",
          color: "var(--jawa-text-muted)",
          lineHeight: 1.7,
        }}>
          {event.address}
        </p>

        {/* Maps links */}
        {event.mapsUrl && (
          <div style={{ marginTop: "20px" }}>
            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 22px",
                border: "1px solid var(--jawa-border)",
                color: "var(--jawa-gold)",
                fontFamily: "var(--font-jawa-body)",
                fontSize: "9px",
                letterSpacing: "0.3em",
                textTransform: "uppercase" as const,
                textDecoration: "none",
                borderRadius: "2px",
                transition: "all 0.3s ease",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Lihat Peta
            </a>
          </div>
        )}
      </div>
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


export default function EventDetails() {
  const { events } = useInvitation();
  const grouped = groupByDate(events);
  let delayIndex = 1;

  return (
    <section style={{
      background: "var(--jawa-bg-mid-t)",
      position: "relative",
      overflow: "hidden",
    }}>
      <BatikBorder />

      <div style={{
        maxWidth: "640px",
        margin: "0 auto",
        padding: "100px 32px",
        position: "relative",
        zIndex: 2,
      }}>
        {/* Section header */}
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{
            fontFamily: "var(--font-jawa-body)",
            fontSize: "9px",
            letterSpacing: "0.45em",
            textTransform: "uppercase" as const,
            color: "var(--jawa-gold)",
            marginBottom: "20px",
          }}>
            When &amp; Where
          </p>
          <h2 style={{
            fontFamily: "var(--font-jawa-script)",
            fontSize: "clamp(2rem, 7vw, 2.8rem)",
            color: "var(--jawa-gold-light)",
            marginBottom: "20px",
          }}>
            Jadwal Acara
          </h2>
          <GununganDivider />
        </div>

        {Object.entries(grouped).map(([date, dateEvents], gi) => (
          <div key={date}>
            {gi > 0 && (
              <div style={{
                width: "100%",
                height: "1px",
                background: "linear-gradient(to right, transparent, var(--jawa-gold), transparent)",
                opacity: 0.15,
                margin: "48px 0",
              }} />
            )}
            <div className={`reveal-up delay-${Math.min(delayIndex++, 8)}`} style={{ textAlign: "center", marginBottom: "32px" }}>
              <p style={{
                fontFamily: "var(--font-jawa-body)",
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase" as const,
                color: "var(--jawa-gold)",
              }}>
                {date}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "32px", marginBottom: "40px" }}>
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

      </div>

      <BatikBorder />
    </section>
  );
}
