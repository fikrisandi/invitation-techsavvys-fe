"use client";

import type { CSSProperties } from "react";
import { MegaMendung, SundaDivider } from "./SundaOrnament";
import { useInvitation } from "../context";
import type { EventItem } from "@/lib/types";

function EventCard({ event, delay }: { event: EventItem; delay: string }) {
  const cardStyle: CSSProperties = {
    background: "rgba(200,144,32,0.04)",
    border: "1px solid var(--sunda-border)",
    borderRadius: "4px",
    overflow: "hidden",
    textAlign: "center",
    position: "relative",
  };

  return (
    <div className={`reveal-up ${delay}`} style={cardStyle}>
      {/* MegaMendung border on top */}
      <div style={{ display: "flex", justifyContent: "center", opacity: 0.5 }}>
        <MegaMendung />
      </div>

      <div style={{ padding: "32px 32px 40px" }}>
        <h3 style={{
          fontFamily: "var(--font-sunda-display)",
          fontSize: "20px",
          fontWeight: 500,
          color: "var(--sunda-text)",
          marginBottom: "16px",
          letterSpacing: "0.04em",
        }}>
          {event.title}
        </h3>

        <p style={{
          fontFamily: "var(--font-sunda-body)",
          fontSize: "11px",
          color: "var(--sunda-text-soft)",
          marginBottom: "8px",
          letterSpacing: "0.1em",
        }}>
          {event.date}
        </p>

        {/* Time with terracotta accent */}
        <div style={{
          display: "inline-block",
          padding: "8px 20px",
          background: "rgba(176,80,32,0.08)",
          border: "1px solid rgba(176,80,32,0.2)",
          borderRadius: "4px",
          marginBottom: "20px",
        }}>
          <p style={{
            fontFamily: "var(--font-sunda-display)",
            fontSize: "24px",
            fontWeight: 300,
            color: "var(--sunda-terra)",
            letterSpacing: "0.1em",
          }}>
            {event.time}
          </p>
        </div>

        {/* Divider */}
        <div style={{
          width: "40px",
          height: "2px",
          background: "linear-gradient(to right, var(--sunda-terra), var(--sunda-gold))",
          margin: "0 auto 20px",
          opacity: 0.4,
        }} />

        <p style={{
          fontFamily: "var(--font-sunda-display)",
          fontSize: "14px",
          fontWeight: 500,
          color: "var(--sunda-text)",
          marginBottom: "6px",
        }}>
          {event.location}
        </p>
        <p style={{
          fontFamily: "var(--font-sunda-body)",
          fontSize: "11px",
          color: "var(--sunda-text-muted)",
          lineHeight: 1.7,
        }}>
          {event.address}
        </p>

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
                border: "1px solid var(--sunda-border)",
                color: "var(--sunda-gold)",
                fontFamily: "var(--font-sunda-body)",
                fontSize: "9px",
                letterSpacing: "0.3em",
                textTransform: "uppercase" as const,
                textDecoration: "none",
                borderRadius: "4px",
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
    <section style={{
      background: "var(--sunda-bg-t)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* MegaMendung at top */}
      <div style={{ display: "flex", justifyContent: "center", opacity: 0.35 }}>
        <MegaMendung />
      </div>

      <div style={{
        maxWidth: "640px",
        margin: "0 auto",
        padding: "80px 32px 100px",
        position: "relative",
        zIndex: 2,
      }}>
        {/* Section header */}
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{
            fontFamily: "var(--font-sunda-body)",
            fontSize: "9px",
            letterSpacing: "0.45em",
            textTransform: "uppercase" as const,
            color: "var(--sunda-gold)",
            marginBottom: "16px",
          }}>
            When &amp; Where
          </p>
          <h2 style={{
            fontFamily: "var(--font-sunda-script)",
            fontSize: "clamp(2rem, 7vw, 2.8rem)",
            color: "var(--sunda-text)",
            marginBottom: "16px",
          }}>
            Jadwal Acara
          </h2>
          <SundaDivider />
        </div>

        {Object.entries(grouped).map(([date, dateEvents], gi) => (
          <div key={date}>
            {gi > 0 && (
              <div style={{
                width: "100%",
                height: "1px",
                background: "linear-gradient(to right, transparent, var(--sunda-gold), transparent)",
                opacity: 0.15,
                margin: "48px 0",
              }} />
            )}
            <div className={`reveal-up delay-${Math.min(delayIndex++, 8)}`} style={{ textAlign: "center", marginBottom: "28px" }}>
              <p style={{
                fontFamily: "var(--font-sunda-body)",
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase" as const,
                color: "var(--sunda-terra)",
              }}>
                {date}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginBottom: "40px" }}>
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

        {/* Map embeds */}
        {mapGroups.map((event, i) => (
          <div key={`map-${i}`} className={`reveal-up delay-${Math.min(i + 3, 8)}`} style={{ marginBottom: "28px" }}>
            {event.mapsEmbedSrc && (
              <div style={{
                border: "1px solid var(--sunda-border)",
                borderRadius: "4px",
                overflow: "hidden",
                marginBottom: "16px",
              }}>
                <div style={{ display: "flex", justifyContent: "center", opacity: 0.3 }}>
                  <MegaMendung />
                </div>
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
          </div>
        ))}
      </div>

      {/* MegaMendung at bottom */}
      <div style={{ display: "flex", justifyContent: "center", opacity: 0.35 }}>
        <MegaMendung flip />
      </div>
    </section>
  );
}
