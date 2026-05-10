"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { apiAuth, getStoredUser } from "@/lib/api";

interface MyInvitation {
  id: string;
  slug: string;
  theme: string;
  expiredAt: string;
  isActive: boolean;
  groomNickname: string;
  brideNickname: string;
  createdAt: string;
  link: string;
  _count: { rsvps: number; guests: number };
}

export default function ClientDashboardPage() {
  const router = useRouter();
  const [invitations, setInvitations] = useState<MyInvitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchInvitations = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiAuth("/api/invitations/mine/list");
      setInvitations(data);
      if (Array.isArray(data) && data.length === 1) {
        router.replace(`/dashboard/tamu/${data[0].id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat undangan");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchInvitations();
  }, [fetchInvitations]);

  if (loading) return <div className="admin-loading">Memuat...</div>;
  if (error) return <div className="admin-error">{error}</div>;

  if (invitations.length === 0) {
    const me = getStoredUser();
    return (
      <div>
        <div className="admin-header">
          <h1>Undangan Anda</h1>
        </div>
        <div className="admin-empty">
          <div style={{ maxWidth: 460, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "1.1rem", marginBottom: 8 }}>Belum Ada Undangan</h2>
            <p style={{ color: "var(--admin-muted)", marginBottom: 18, fontSize: "0.9rem" }}>
              Belum ada undangan yang di-assign ke akun Anda. Silakan hubungi admin.
            </p>
            <div style={{ background: "var(--admin-card)", border: "1px solid var(--admin-border)", borderRadius: 10, padding: 14, textAlign: "left", fontSize: "0.82rem", marginBottom: 18 }}>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Info Akun Anda:</div>
              <div><strong>Nama:</strong> {me?.name}</div>
              <div><strong>Email:</strong> {me?.email}</div>
              <div><strong>User ID:</strong> <code style={{ fontSize: "0.75rem" }}>{me?.id}</code></div>
            </div>
            <a
              href={`https://wa.me/6289937810441?text=${encodeURIComponent(`Halo admin, akun saya ${me?.email} belum ter-assign undangan. Mohon dibantu, ID: ${me?.id}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="admin-btn-primary"
              style={{ display: "inline-block", textDecoration: "none", padding: "10px 20px", width: "auto" }}
            >
              📱 Hubungi Admin
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-header">
        <h1>Undangan Anda</h1>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table admin-table-stack">
          <thead>
            <tr>
              <th>Mempelai</th>
              <th>Slug</th>
              <th>Tamu</th>
              <th>RSVP</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {invitations.map((inv) => (
              <tr key={inv.id}>
                <td data-label="Mempelai">
                  <strong>{inv.groomNickname} & {inv.brideNickname}</strong>
                </td>
                <td data-label="Slug">
                  <code style={{ fontSize: "0.8rem", color: "var(--admin-teal)" }}>{inv.slug}</code>
                </td>
                <td data-label="Tamu">{inv._count.guests}</td>
                <td data-label="RSVP">{inv._count.rsvps}</td>
                <td data-label="Status">
                  <span className={`admin-badge ${inv.isActive ? "active" : "inactive"}`}>
                    {inv.isActive ? "Aktif" : "Nonaktif"}
                  </span>
                </td>
                <td data-label="Aksi">
                  <div className="admin-actions">
                    <button
                      className="admin-btn-edit"
                      onClick={() => router.push(`/dashboard/undangan/${inv.id}`)}
                    >
                      Info
                    </button>
                    <button
                      className="admin-btn-edit"
                      onClick={() => router.push(`/dashboard/tamu/${inv.id}`)}
                    >
                      Kelola Tamu
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
