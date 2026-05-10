"use client";

import { useEffect, useState, useCallback, use } from "react";
import { apiAuth } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.techsavvys-official.com";
const INVITATION_URL = process.env.NEXT_PUBLIC_INVITATION_URL || "https://invitation.techsavvys-official.com";

const THEME_LABELS: Record<string, string> = {
  "emerald-gold": "Emerald Gold (Elegan)",
  "midnight-blue": "Midnight Blue (Modern)",
  "ylang-ylang": "Ylang Ylang (Natural)",
  "rose-blush": "Rose Blush (Romantis)",
  "jawa-klasik": "Jawa Klasik (Tradisional)",
  "sunda-klasik": "Sunda Klasik (Tradisional)",
  cinematic: "Cinematic (Modern)",
  galaxy: "Galaxy (Modern)",
  "sakura-bloom": "Sakura Bloom (Romantis)",
};

interface Invitation {
  id: string;
  slug: string;
  theme: string;
  customColors: Record<string, string> | null;
  effects: string[];
  effectConfig: Record<string, Record<string, string>>;
  expiredAt: string;
  openingText: string | null;
  groomNickname: string;
  groomFullName: string;
  groomParents: string;
  groomPhoto: string | null;
  brideNickname: string;
  brideFullName: string;
  brideParents: string;
  bridePhoto: string | null;
  akad: { title?: string; date?: string; time?: string; location?: string; address?: string; mapsUrl?: string } | null;
  receptions: Array<{ code?: string; title?: string; date?: string; time?: string; location?: string; address?: string; mapsUrl?: string }>;
  photos: string[];
  banks: Array<{ bank?: string; number?: string; accountName?: string }>;
  loveStory: Array<{ year?: string; title?: string; description?: string; image?: string }>;
  musicUrl: string | null;
  rsvpEnabled: boolean;
  wishesEnabled: boolean;
  isActive: boolean;
  parallaxTopLeft: string | null;
  parallaxBottomRight: string | null;
  bcastTemplate: string | null;
}

function resolveMediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${API_URL}${path}`;
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div style={{ display: "flex", padding: "8px 0", borderBottom: "1px solid var(--admin-border)", gap: 12 }}>
      <div style={{ flex: "0 0 160px", color: "var(--admin-muted)", fontSize: "0.85rem" }}>{label}</div>
      <div style={{ flex: 1, color: "var(--admin-text)", fontSize: "0.9rem", wordBreak: "break-word" }}>
        {value ?? <span style={{ color: "var(--admin-muted)", fontStyle: "italic" }}>—</span>}
      </div>
    </div>
  );
}

function SectionBlock({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="inv-section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
        <h3 className="inv-section-title" style={{ marginBottom: 0 }}>{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

const WA_EDIT = "https://wa.me/6289937810441?text=" + encodeURIComponent("Halo admin, saya mau edit data undangan saya. Mohon dibantu.");

export default function ClientInvitationInfoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [inv, setInv] = useState<Invitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchInv = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiAuth(`/api/invitations/${id}/detail`);
      setInv(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat undangan");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchInv();
  }, [fetchInv]);

  if (loading) return <div className="admin-loading">Memuat...</div>;
  if (error) return <div className="admin-error">{error}</div>;
  if (!inv) return <div className="admin-error">Undangan tidak ditemukan</div>;

  const fmtDate = (d?: string) => (d ? new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "—");
  const fmtBoolean = (b: boolean) => (b ? "✓ Aktif" : "✗ Nonaktif");
  const link = `${INVITATION_URL}/${inv.theme}/${inv.slug}`;

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>Info Undangan — {inv.groomNickname} & {inv.brideNickname}</h1>
          <p style={{ color: "var(--admin-muted)", fontSize: "0.85rem", marginTop: 4 }}>
            Halaman ini hanya untuk lihat data undangan. Semua perubahan dikelola admin.
          </p>
        </div>
        <a href={WA_EDIT} target="_blank" rel="noopener noreferrer" className="admin-btn-primary" style={{ textDecoration: "none", width: "auto", padding: "10px 18px" }}>
          📱 Minta Edit ke Admin
        </a>
      </div>

      <SectionBlock title="Informasi Dasar">
        <InfoRow label="Slug" value={<code style={{ fontSize: "0.85rem", color: "var(--admin-teal)" }}>{inv.slug}</code>} />
        <InfoRow label="Tema" value={THEME_LABELS[inv.theme] || inv.theme} />
        <InfoRow label="Expired" value={fmtDate(inv.expiredAt)} />
        <InfoRow label="Teks Pembuka" value={inv.openingText} />
        <InfoRow label="Musik Latar" value={
          inv.musicUrl ? (
            <audio controls src={resolveMediaUrl(inv.musicUrl) || ""} style={{ height: 36, maxWidth: "100%" }} />
          ) : null
        } />
      </SectionBlock>

      <SectionBlock title="Mempelai Pria">
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {inv.groomPhoto && (
            <img src={resolveMediaUrl(inv.groomPhoto) || ""} alt={inv.groomNickname} style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 12, border: "1px solid var(--admin-border)" }} />
          )}
          <div style={{ flex: 1, minWidth: 260 }}>
            <InfoRow label="Nickname" value={inv.groomNickname} />
            <InfoRow label="Nama Lengkap" value={inv.groomFullName} />
            <InfoRow label="Orang Tua" value={inv.groomParents} />
          </div>
        </div>
      </SectionBlock>

      <SectionBlock title="Mempelai Wanita">
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {inv.bridePhoto && (
            <img src={resolveMediaUrl(inv.bridePhoto) || ""} alt={inv.brideNickname} style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 12, border: "1px solid var(--admin-border)" }} />
          )}
          <div style={{ flex: 1, minWidth: 260 }}>
            <InfoRow label="Nickname" value={inv.brideNickname} />
            <InfoRow label="Nama Lengkap" value={inv.brideFullName} />
            <InfoRow label="Orang Tua" value={inv.brideParents} />
          </div>
        </div>
      </SectionBlock>

      {inv.akad && (
        <SectionBlock title="Akad">
          <InfoRow label="Judul" value={inv.akad.title} />
          <InfoRow label="Tanggal" value={inv.akad.date} />
          <InfoRow label="Waktu" value={inv.akad.time} />
          <InfoRow label="Tempat" value={inv.akad.location} />
          <InfoRow label="Alamat" value={inv.akad.address} />
          {inv.akad.mapsUrl && (
            <InfoRow
              label="Google Maps"
              value={<a href={inv.akad.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--admin-teal)" }}>Buka peta</a>}
            />
          )}
        </SectionBlock>
      )}

      {inv.receptions && inv.receptions.length > 0 && (
        <SectionBlock title={`Resepsi (${inv.receptions.length})`}>
          {inv.receptions.map((r, i) => (
            <div key={i} className="inv-reception-card" style={{ marginBottom: 10 }}>
              <div style={{ marginBottom: 8 }}>
                <span className="inv-reception-label">{r.title || `Resepsi ${i + 1}`}</span>
                {r.code && <code style={{ marginLeft: 8, fontSize: "0.78rem", color: "var(--admin-teal)" }}>kode: {r.code}</code>}
              </div>
              <InfoRow label="Tanggal" value={r.date} />
              <InfoRow label="Waktu" value={r.time} />
              <InfoRow label="Tempat" value={r.location} />
              <InfoRow label="Alamat" value={r.address} />
              {r.mapsUrl && (
                <InfoRow
                  label="Google Maps"
                  value={<a href={r.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--admin-teal)" }}>Buka peta</a>}
                />
              )}
            </div>
          ))}
        </SectionBlock>
      )}

      {inv.photos && inv.photos.length > 0 && (
        <SectionBlock title={`Foto Gallery (${inv.photos.length})`}>
          <div className="inv-photo-grid">
            {inv.photos.map((url, i) => (
              <div key={i} className="inv-photo-thumb">
                <img src={resolveMediaUrl(url) || ""} alt={`Foto ${i + 1}`} />
              </div>
            ))}
          </div>
        </SectionBlock>
      )}

      {inv.loveStory && inv.loveStory.length > 0 && (
        <SectionBlock title={`Perjalanan Cinta (${inv.loveStory.length})`}>
          {inv.loveStory.map((s, i) => (
            <div key={i} style={{ padding: 14, border: "1px solid var(--admin-border)", borderRadius: 10, marginBottom: 10, background: "var(--admin-card)" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "start", flexWrap: "wrap" }}>
                {s.image && (
                  <img src={resolveMediaUrl(s.image) || ""} alt={s.title} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }} />
                )}
                <div style={{ flex: 1, minWidth: 220 }}>
                  <div style={{ color: "var(--admin-teal)", fontWeight: 700, fontSize: "0.9rem" }}>{s.year}</div>
                  <div style={{ color: "var(--admin-text)", fontWeight: 600, marginTop: 2 }}>{s.title}</div>
                  <p style={{ color: "var(--admin-muted)", fontSize: "0.85rem", marginTop: 6, lineHeight: 1.6 }}>{s.description}</p>
                </div>
              </div>
            </div>
          ))}
        </SectionBlock>
      )}

      {inv.banks && inv.banks.length > 0 && (
        <SectionBlock title={`Rekening Gift (${inv.banks.length})`}>
          {inv.banks.map((b, i) => (
            <div key={i} className="inv-bank-row" style={{ marginBottom: 8 }}>
              <div className="admin-field-row" style={{ flex: 1, gap: 12 }}>
                <div>
                  <div style={{ color: "var(--admin-muted)", fontSize: "0.75rem" }}>Bank</div>
                  <div style={{ fontWeight: 600 }}>{b.bank || "—"}</div>
                </div>
                <div>
                  <div style={{ color: "var(--admin-muted)", fontSize: "0.75rem" }}>Nomor</div>
                  <div style={{ fontFamily: "ui-monospace, Consolas, monospace", fontSize: "0.92rem" }}>{b.number || "—"}</div>
                </div>
                <div>
                  <div style={{ color: "var(--admin-muted)", fontSize: "0.75rem" }}>Atas Nama</div>
                  <div>{b.accountName || "—"}</div>
                </div>
              </div>
            </div>
          ))}
        </SectionBlock>
      )}

      <SectionBlock title="Link Undangan">
        <InfoRow
          label="Link Dasar"
          value={
            <code style={{ fontSize: "0.82rem", color: "var(--admin-teal)", wordBreak: "break-all" }}>{link}</code>
          }
        />
        <InfoRow
          label="Preview Personal"
          value={
            <code style={{ fontSize: "0.82rem", color: "var(--admin-muted)", wordBreak: "break-all" }}>{link}?to=Nama%20Tamu</code>
          }
        />
        <p style={{ fontSize: "0.78rem", color: "var(--admin-muted)", marginTop: 8, fontStyle: "italic" }}>
          Link personal otomatis dibuat saat kamu menambah tamu di menu <strong>Tamu</strong>.
        </p>
      </SectionBlock>

      <SectionBlock title="Pengaturan">
        <InfoRow label="RSVP" value={fmtBoolean(inv.rsvpEnabled)} />
        <InfoRow label="Ucapan / Wishes" value={fmtBoolean(inv.wishesEnabled)} />
        <InfoRow label="Status Undangan" value={fmtBoolean(inv.isActive)} />
        {inv.effects && inv.effects.length > 0 && (
          <InfoRow
            label="Efek Animasi"
            value={
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {inv.effects.map((e) => (
                  <span key={e} className="inv-tag">{e}</span>
                ))}
              </div>
            }
          />
        )}
      </SectionBlock>

      <div style={{ padding: 16, background: "rgba(0, 191, 165, 0.06)", border: "1px solid rgba(0, 191, 165, 0.2)", borderRadius: 10, marginTop: 20, textAlign: "center" }}>
        <p style={{ fontSize: "0.88rem", color: "var(--admin-muted)", marginBottom: 10 }}>
          Butuh ubah data? Admin akan dengan senang hati membantu.
        </p>
        <a href={WA_EDIT} target="_blank" rel="noopener noreferrer" className="admin-btn-primary" style={{ textDecoration: "none", width: "auto", padding: "10px 20px" }}>
          💬 Chat Admin via WhatsApp
        </a>
      </div>
    </div>
  );
}
