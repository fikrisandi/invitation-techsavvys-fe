"use client";
import { BotanicalDivider } from "./BotanicalOrnament";
import { useInvitation } from "../context";
import type { EventItem } from "@/lib/types";

function EventCard({ event, delay }: { event: EventItem; delay: string }) {
  return (
    <div className={`card-yy reveal-up ${delay}`} style={{ padding: "36px 32px", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: "32px", right: "32px", height: "2px", background: "linear-gradient(to right, transparent, var(--color-yy-gold), transparent)", opacity: 0.4 }} />
      <h3 style={{ fontFamily: "var(--font-yy-display)", fontSize: "22px", fontWeight: 500, fontStyle: "italic", marginBottom: "16px", color: "var(--color-yy-text)" }}>{event.title}</h3>
      <p style={{ fontFamily: "var(--font-yy-display)", fontSize: "13px", color: "var(--color-yy-text-soft)", marginBottom: "4px" }}>{event.date}</p>
      <p className="shimmer-forest" style={{ fontFamily: "var(--font-yy-display)", fontSize: "20px", fontWeight: 500, marginBottom: "16px" }}>{event.time}</p>
      <div style={{ width: "40px", height: "1px", background: "var(--color-yy-gold)", opacity: 0.4, marginBottom: "12px" }} />
      <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-yy-text)", fontFamily: "var(--font-yy-body)", marginBottom: "4px" }}>{event.location}</p>
      <p style={{ fontSize: "11px", color: "var(--color-yy-text-soft)", fontFamily: "var(--font-yy-body)" }}>{event.address}</p>
    </div>
  );
}

function groupByDate(events: EventItem[]) {
  const g: Record<string, EventItem[]> = {};
  events.forEach((e) => { if (!g[e.date]) g[e.date] = []; g[e.date].push(e); });
  return g;
}
function getMapGroups(events: EventItem[]) {
  const seen = new Set<string>();
  return events.filter((e) => { const k = `${e.date}-${e.location}`; if (seen.has(k)) return false; seen.add(k); return e.mapsEmbedSrc || e.mapsUrl; });
}

export default function EventDetails() {
  const { events } = useInvitation();
  const grouped = groupByDate(events);
  const mapGroups = getMapGroups(events);
  let di = 1;

  return (
    <section id="event" className="grad-yy-main relative overflow-hidden geo-yy">
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "140px 32px", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase" as const, color: "var(--color-yy-text-soft)", marginBottom: "20px", fontFamily: "var(--font-yy-body)" }}>When &amp; Where</p>
          <h2 style={{ fontFamily: "var(--font-yy-script)", fontSize: "clamp(2.2rem, 7vw, 3rem)", color: "var(--color-yy-forest)", marginBottom: "8px" }}>Jadwal Acara</h2>
          <BotanicalDivider />
        </div>

        {Object.entries(grouped).map(([date, dateEvents], gi) => (
          <div key={date}>
            {gi > 0 && <div style={{ width: "100%", height: "1px", background: "linear-gradient(to right, transparent, var(--color-yy-gold), transparent)", opacity: 0.3, margin: "48px 0" }} />}
            <div className={`reveal-up delay-${Math.min(di++, 8)}`} style={{ textAlign: "center", marginBottom: "32px" }}>
              <p style={{ color: "var(--color-yy-forest)", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase" as const, fontFamily: "var(--font-yy-body)", fontWeight: 700 }}>{date}</p>
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
              <div className="card-yy" style={{ padding: "8px", marginBottom: "16px" }}>
                <iframe src={event.mapsEmbedSrc} width="100%" height="220" style={{ border: 0, borderRadius: "12px" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            )}
            {event.mapsUrl && (
              <div style={{ textAlign: "center" }}>
                <a href={event.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-yy-outline">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {event.location}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
