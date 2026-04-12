"use client";
import { RoseDivider } from "./FloralOrnament";
import { useInvitation } from "../context";
import type { EventItem } from "@/lib/types";

function EventCard({ event }: { event: EventItem }) {
  return (
    <div className="card-rb reveal-up" style={{ padding: "36px 32px", position: "relative", textAlign: "center" }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "60px", height: "2px", background: "linear-gradient(to right, transparent, var(--color-rb-rosegold), transparent)", opacity: 0.6 }} />
      <h3 style={{ fontFamily: "var(--font-rb-display)", fontSize: "20px", fontWeight: 400, fontStyle: "italic", marginBottom: "16px", color: "var(--color-rb-text)" }}>{event.title}</h3>
      <p style={{ fontFamily: "var(--font-rb-body)", fontSize: "12px", color: "var(--color-rb-text-soft)", marginBottom: "4px", letterSpacing: "0.1em" }}>{event.date}</p>
      <p style={{ fontFamily: "var(--font-rb-script)", fontSize: "2.2rem", color: "var(--color-rb-dusty)", marginBottom: "16px" }}>{event.time}</p>
      <div style={{ width: "32px", height: "1px", background: "var(--color-rb-rosegold)", opacity: 0.5, margin: "0 auto 12px" }} />
      <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-rb-text)", fontFamily: "var(--font-rb-body)", marginBottom: "4px" }}>{event.location}</p>
      <p style={{ fontSize: "11px", color: "var(--color-rb-text-soft)", fontFamily: "var(--font-rb-body)", lineHeight: 1.7 }}>{event.address}</p>
      {event.mapsUrl && (
        <a href={event.mapsUrl} target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "16px", padding: "10px 20px", border: "1px solid var(--color-rb-rosegold)", borderRadius: "100px", color: "var(--color-rb-dusty)", fontSize: "11px", letterSpacing: "0.15em", textDecoration: "none", background: "rgba(188,143,143,0.08)", fontFamily: "var(--font-rb-body)", transition: "background 0.3s" }}>
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

function groupByDate(events: EventItem[]) {
  const g: Record<string, EventItem[]> = {};
  events.forEach((e) => { if (!g[e.date]) g[e.date] = []; g[e.date].push(e); });
  return g;
}

export default function EventDetails() {
  const { events } = useInvitation();
  const grouped = groupByDate(events);

  return (
    <section id="event" style={{ background: "var(--color-rb-bg-alt-t)", padding: "120px 32px" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase" as const, color: "var(--color-rb-text-soft)", marginBottom: "20px", fontFamily: "var(--font-rb-body)" }}>When &amp; Where</p>
          <h2 style={{ fontFamily: "var(--font-rb-script)", fontSize: "clamp(2.2rem, 7vw, 3rem)", color: "var(--color-rb-dusty)", marginBottom: "8px" }}>Jadwal Acara</h2>
          <RoseDivider />
        </div>

        {Object.entries(grouped).map(([date, dateEvents], gi) => (
          <div key={date}>
            {gi > 0 && <div style={{ width: "100%", height: "1px", background: "linear-gradient(to right, transparent, var(--color-rb-rosegold), transparent)", opacity: 0.4, margin: "48px 0" }} />}
            <div className="reveal-up" style={{ textAlign: "center", marginBottom: "32px" }}>
              <p style={{ color: "var(--color-rb-dusty)", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase" as const, fontFamily: "var(--font-rb-body)", fontWeight: 700 }}>{date}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "40px" }}>
              {dateEvents.map((event) => (
                <EventCard key={`${event.title}-${event.time}`} event={event} />
              ))}
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
