"use client";

import { useInvitation } from "../context";
import type { EventItem } from "@/lib/types";

function EventCard({ event, delay }: { event: EventItem; delay: string }) {
  return (
    <div className={`glass-mb rounded-3xl reveal-up ${delay}`} style={{ padding: "40px 36px", position: "relative", overflow: "hidden" }}>
      {/* Blue glow top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(to right, transparent, var(--color-blue-accent), transparent)", opacity: 0.3 }} />
      <h3 style={{ fontFamily: "var(--font-display-mb)", fontSize: "22px", fontWeight: 500, fontStyle: "italic", marginBottom: "20px", color: "var(--color-white-soft)" }}>{event.title}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <p style={{ fontFamily: "var(--font-display-mb)", fontSize: "13px", color: "var(--color-text-mb-muted)" }}>{event.date}</p>
        <p className="shimmer-blue" style={{ fontFamily: "var(--font-display-mb)", fontSize: "20px", fontWeight: 500 }}>{event.time}</p>
        <div style={{ width: "40px", height: "1px", background: "var(--color-blue-accent)", opacity: 0.3, margin: "8px 0" }} />
        <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--color-text-mb)", fontFamily: "var(--font-body-mb)" }}>{event.location}</p>
        <p style={{ fontSize: "11px", color: "var(--color-text-mb-dim)", fontFamily: "var(--font-body-mb)" }}>{event.address}</p>
      </div>
    </div>
  );
}

function groupByDate(events: EventItem[]) {
  const groups: Record<string, EventItem[]> = {};
  events.forEach((e) => { if (!groups[e.date]) groups[e.date] = []; groups[e.date].push(e); });
  return groups;
}

function getUniqueMapGroups(events: EventItem[]) {
  const seen = new Set<string>();
  return events.filter((e) => { const key = `${e.date}-${e.location}`; if (seen.has(key)) return false; seen.add(key); return e.mapsEmbedSrc || e.mapsUrl; });
}

export default function EventDetails() {
  const { events } = useInvitation();
  const grouped = groupByDate(events);
  const mapGroups = getUniqueMapGroups(events);
  let di = 1;

  return (
    <section id="event" className="grad-mb-main relative overflow-hidden geo-pattern-mb">
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "140px 32px", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ letterSpacing: "0.5em", textTransform: "uppercase" as const, fontSize: "9px", fontWeight: 500, marginBottom: "24px", color: "var(--color-silver-dark)", fontFamily: "var(--font-body-mb)" }}>When &amp; Where</p>
          <h2 className="shimmer-silver" style={{ fontFamily: "var(--font-display-mb)", fontSize: "clamp(2rem, 6vw, 2.8rem)", fontStyle: "italic", marginBottom: "32px" }}>Jadwal Acara</h2>
          <div style={{ width: "60px", height: "1px", background: "linear-gradient(to right, transparent, var(--color-blue-accent), transparent)", margin: "0 auto", opacity: 0.4 }} />
        </div>

        {Object.entries(grouped).map(([date, dateEvents], gi) => (
          <div key={date}>
            {gi > 0 && <div style={{ width: "100%", height: "1px", background: "linear-gradient(to right, transparent, var(--color-blue-accent), transparent)", opacity: 0.15, margin: "48px 0" }} />}
            <div className={`reveal-up delay-${Math.min(di++, 8)}`} style={{ textAlign: "center", marginBottom: "32px" }}>
              <p style={{ color: "var(--color-blue-accent)", fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" as const, fontFamily: "var(--font-body-mb)", opacity: 0.7 }}>{date}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "40px" }}>
              {dateEvents.map((event) => (
                <EventCard key={`${event.title}-${event.time}`} event={event} delay={`delay-${Math.min(di++, 8)}`} />
              ))}
            </div>
          </div>
        ))}

        {mapGroups.map((event, i) => (
          <div key={`map-${i}`} className={`reveal-up delay-${Math.min(i+3,8)}`} style={{ marginBottom: "32px" }}>
            {event.mapsEmbedSrc && (
              <div className="glass-mb rounded-3xl overflow-hidden" style={{ padding: "8px", marginBottom: "16px" }}>
                <iframe src={event.mapsEmbedSrc} width="100%" height="220" style={{ border: 0, borderRadius: "16px", filter: "grayscale(30%) brightness(0.8) hue-rotate(200deg)" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            )}
            {event.mapsUrl && (
              <div style={{ textAlign: "center" }}>
                <a href={event.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-mb-outline">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
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
