"use client";

import { GoldDivider } from "./FloralOrnament";
import Particles from "./Particles";
import { useInvitation } from "../context";
import type { EventItem } from "@/lib/types";

const IconMap: Record<string, React.ReactNode> = {
  akad: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-emerald-deep)" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  reception: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-emerald-deep)" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  "reception-morning": <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-emerald-deep)" strokeWidth="1.5"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>,
  "reception-evening": <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-emerald-deep)" strokeWidth="1.5"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
  home: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-emerald-deep)" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  heart: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-emerald-deep)" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
};

function EventCard({ event, delay }: { event: EventItem; delay: string }) {
  return (
    <div className={`relative glass rounded-3xl p-10 text-center reveal-up ${delay}`}>
      <div className="absolute -top-6 -right-3 w-14 h-14 rounded-full flex items-center justify-center z-10"
        style={{ background: "linear-gradient(135deg, var(--color-gold), var(--color-gold-dark))", boxShadow: "0 4px 16px rgba(212,168,83,0.35)" }}>
        {IconMap[event.icon ?? "reception"] ?? IconMap.reception}
      </div>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 500, marginBottom: "24px", color: "var(--color-cream)" }}>{event.title}</h3>
      <p style={{ fontFamily: "var(--font-display)", fontSize: "13px", marginBottom: "8px", color: "var(--color-text-muted)" }}>{event.date}</p>
      <p style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 500, marginBottom: "24px", color: "var(--color-gold-light)" }}>{event.time}</p>
      <div style={{ width: "48px", height: "1px", background: "var(--color-gold-dark)", margin: "0 auto 24px", opacity: 0.3 }} />
      <p style={{ fontSize: "13px", fontWeight: 500, marginBottom: "4px", color: "var(--color-text-light)" }}>{event.location}</p>
      <p style={{ fontSize: "11px", color: "var(--color-text-dim)" }}>{event.address}</p>
      {event.mapsUrl && (
        <a href={event.mapsUrl} target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "16px", padding: "10px 20px", border: "1px solid rgba(212,168,83,0.3)", borderRadius: "100px", color: "var(--color-gold)", fontSize: "11px", letterSpacing: "0.15em", textDecoration: "none", background: "rgba(212,168,83,0.08)", transition: "background 0.3s" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Buka di Maps
        </a>
      )}
    </div>
  );
}

// Group events by date
function groupByDate(events: EventItem[]) {
  const groups: Record<string, EventItem[]> = {};
  events.forEach((e) => { if (!groups[e.date]) groups[e.date] = []; groups[e.date].push(e); });
  return groups;
}


export default function EventDetails() {
  const { events } = useInvitation();
  const grouped = groupByDate(events);
  let delayIndex = 1;

  return (
    <section id="event" className="grad-event relative overflow-hidden geo-pattern">
      <Particles count={18} />
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "140px 32px", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ letterSpacing: "0.5em", textTransform: "uppercase" as const, fontSize: "9px", fontWeight: 500, marginBottom: "24px", color: "var(--color-gold-dark)" }}>When &amp; Where</p>
          <h2 style={{ fontFamily: "var(--font-script)", fontSize: "clamp(2.2rem, 7vw, 3rem)", marginBottom: "16px", color: "var(--color-gold-light)" }}>Jadwal Acara</h2>
          <GoldDivider />
        </div>

        {Object.entries(grouped).map(([date, dateEvents], gi) => (
          <div key={date}>
            {gi > 0 && <div style={{ width: "100%", height: "1px", background: "linear-gradient(to right, transparent, var(--color-gold-dark), transparent)", opacity: 0.2, margin: "48px 0" }} />}
            <div className={`reveal-up delay-${Math.min(delayIndex++, 8)}`} style={{ textAlign: "center", marginBottom: "40px" }}>
              <p style={{ color: "var(--color-gold)", fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" as const, fontWeight: 500 }}>{date}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "40px", marginBottom: "48px" }}>
              {dateEvents.map((event) => (
                <EventCard key={`${event.title}-${event.time}`} event={event} delay={`delay-${Math.min(delayIndex++, 8)}`} />
              ))}
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
