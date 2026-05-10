"use client";

import { useEffect, useState, useCallback, use } from "react";
import * as XLSX from "xlsx";
import { apiAuth } from "@/lib/api";
import {
  DEFAULT_BCAST_TEMPLATE,
  buildBroadcast,
  normalizePhoneForWa,
  generateInvitationLink,
  type BroadcastCtx,
} from "@/lib/guest-helpers";

interface Invitation {
  id: string;
  slug: string;
  theme: string;
  expiredAt: string;
  groomNickname: string;
  groomFullName: string;
  brideNickname: string;
  brideFullName: string;
  bcastTemplate: string | null;
  receptions: Array<{ code: string; title?: string; date?: string; time?: string; location?: string }>;
}

interface Guest {
  id: string;
  name: string;
  phone: string | null;
  receptions: string[];
  createdAt: string;
}

const GUESTS_PER_PAGE = 20;

export default function ClientInvitationManagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const [manualName, setManualName] = useState("");
  const [manualReception, setManualReception] = useState("");
  const [manualPhone, setManualPhone] = useState("");
  const [manualLoading, setManualLoading] = useState(false);

  const [csvText, setCsvText] = useState("");
  const [csvError, setCsvError] = useState("");
  const [csvLoading, setCsvLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [guestEditForm, setGuestEditForm] = useState({ name: "", phone: "", receptions: "" });
  const [guestEditSaving, setGuestEditSaving] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [inv, guestList] = await Promise.all([
        apiAuth(`/api/invitations/${id}/detail`),
        apiAuth(`/api/invitations/${id}/guests?limit=500`),
      ]);
      setInvitation(inv);
      setGuests(guestList);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat undangan");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  function flashInfo(msg: string) {
    setInfo(msg);
    setTimeout(() => setInfo(""), 2500);
  }

  function getBcastCtx(): BroadcastCtx | null {
    if (!invitation) return null;
    return {
      groomNickname: invitation.groomNickname,
      groomFullName: invitation.groomFullName,
      brideNickname: invitation.brideNickname,
      brideFullName: invitation.brideFullName,
      receptions: Array.isArray(invitation.receptions) ? invitation.receptions : [],
    };
  }

  function getTemplate(): string {
    return invitation?.bcastTemplate || DEFAULT_BCAST_TEMPLATE;
  }

  function generateLink(guestName: string): string {
    if (!invitation) return "";
    return generateInvitationLink(invitation.theme, invitation.slug, guestName);
  }

  async function handleAddManual() {
    if (!manualName.trim() || !manualReception.trim()) return;
    setManualLoading(true);
    setError("");
    try {
      await apiAuth(`/api/invitations/${id}/guests`, {
        method: "POST",
        body: {
          name: manualName.trim(),
          receptions: manualReception.split("|").map((s) => s.trim()).filter(Boolean),
          phone: manualPhone.trim() || null,
        },
      });
      setManualName("");
      setManualReception("");
      setManualPhone("");
      await fetchAll();
      flashInfo("Tamu ditambahkan");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal tambah tamu");
    } finally {
      setManualLoading(false);
    }
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const name = file.name.toLowerCase();
    const isExcel = name.endsWith(".xlsx") || name.endsWith(".xls");
    const reader = new FileReader();

    if (isExcel) {
      reader.onload = (ev) => {
        try {
          const data = new Uint8Array(ev.target?.result as ArrayBuffer);
          const wb = XLSX.read(data, { type: "array", cellDates: false });
          const firstSheet = wb.SheetNames[0];
          if (!firstSheet) {
            setCsvError("File Excel kosong");
            return;
          }
          const csv = XLSX.utils.sheet_to_csv(wb.Sheets[firstSheet], { blankrows: false });
          setCsvText(csv);
          setCsvError("");
        } catch (err) {
          setCsvError(err instanceof Error ? err.message : "Gagal membaca Excel");
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      reader.onload = (ev) => setCsvText((ev.target?.result as string) || "");
      reader.readAsText(file);
    }
    e.target.value = "";
  }

  async function handleUploadCsv() {
    if (!csvText.trim()) return;
    setCsvLoading(true);
    setCsvError("");
    try {
      const res = await apiAuth(`/api/invitations/${id}/guests/csv`, {
        method: "POST",
        body: { csv: csvText },
      });
      setCsvText("");
      await fetchAll();
      flashInfo(`Berhasil menambahkan ${res.count ?? "banyak"} tamu`);
    } catch (err) {
      setCsvError(err instanceof Error ? err.message : "Gagal upload");
    } finally {
      setCsvLoading(false);
    }
  }

  async function handleDelete(guestId: string) {
    if (!confirm("Hapus tamu ini?")) return;
    try {
      await apiAuth(`/api/invitations/${id}/guests/${guestId}`, { method: "DELETE" });
      setGuests((prev) => prev.filter((g) => g.id !== guestId));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Gagal hapus");
    }
  }

  async function handleDeleteAll() {
    if (!confirm("Yakin hapus SEMUA tamu? Tidak bisa di-undo.")) return;
    try {
      await apiAuth(`/api/invitations/${id}/guests`, { method: "DELETE" });
      setGuests([]);
      flashInfo("Semua tamu dihapus");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Gagal hapus");
    }
  }

  function openEditGuest(g: Guest) {
    setEditingGuest(g);
    setGuestEditForm({
      name: g.name,
      phone: g.phone || "",
      receptions: g.receptions.join("|"),
    });
  }

  async function handleSaveGuest() {
    if (!editingGuest) return;
    setGuestEditSaving(true);
    try {
      const receptions = guestEditForm.receptions.split("|").map((r) => r.trim()).filter(Boolean);
      await apiAuth(`/api/invitations/${id}/guests/${editingGuest.id}`, {
        method: "PUT",
        body: {
          name: guestEditForm.name.trim(),
          phone: guestEditForm.phone.trim() || null,
          receptions,
        },
      });
      await fetchAll();
      setEditingGuest(null);
      flashInfo("Tamu diperbarui");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Gagal menyimpan");
    } finally {
      setGuestEditSaving(false);
    }
  }

  function copyLink(guest: Guest) {
    navigator.clipboard.writeText(generateLink(guest.name));
    flashInfo("Link disalin");
  }

  async function copyBroadcast(guest: Guest) {
    const ctx = getBcastCtx();
    if (!ctx) return;
    const msg = buildBroadcast(getTemplate(), guest, generateLink(guest.name), ctx);
    await navigator.clipboard.writeText(msg);
    flashInfo("Pesan disalin");
  }

  function sendWhatsApp(guest: Guest) {
    const ctx = getBcastCtx();
    if (!ctx) return;
    if (!guest.phone) {
      alert("Tamu ini belum punya nomor WA. Edit dulu untuk tambahkan.");
      return;
    }
    const msg = buildBroadcast(getTemplate(), guest, generateLink(guest.name), ctx);
    const waNum = normalizePhoneForWa(guest.phone);
    window.open(`https://wa.me/${waNum}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  function copyAllLinksInPage() {
    if (!invitation) return;
    const links = paginatedGuests.map((g) => `${g.name}: ${generateLink(g.name)}`).join("\n");
    navigator.clipboard.writeText(links);
    flashInfo(`${paginatedGuests.length} link halaman ini disalin`);
  }

  function exportExcel() {
    if (!invitation) return;
    const ctx = getBcastCtx();
    if (!ctx) return;
    const tpl = getTemplate();
    const rows = guests.map((g) => {
      const link = generateLink(g.name);
      return {
        Nama: g.name,
        "Nomor WA": g.phone || "",
        Resepsi: g.receptions.join(", "),
        Link: link,
        "Pesan Siap Kirim": buildBroadcast(tpl, g, link, ctx),
      };
    });
    const ws = XLSX.utils.json_to_sheet(rows);
    ws["!cols"] = [{ wch: 25 }, { wch: 16 }, { wch: 12 }, { wch: 50 }, { wch: 80 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tamu");
    XLSX.writeFile(wb, `tamu-${invitation.slug}.xlsx`);
  }

  function downloadTemplate(format: "csv" | "xlsx") {
    const header = "nama_tamu,resepsi,nomor";
    const rows = [
      "Contoh Nama 1,pagi,081234567890",
      "Contoh Nama 2,malam,",
      "Contoh Nama 3,pagi|malam,6281234567891",
    ];
    if (format === "csv") {
      const csv = [header, ...rows].join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `template-tamu.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const data = [
        ["nama_tamu", "resepsi", "nomor"],
        ["Contoh Nama 1", "pagi", "081234567890"],
        ["Contoh Nama 2", "malam", ""],
        ["Contoh Nama 3", "pagi|malam", "6281234567891"],
      ];
      const ws = XLSX.utils.aoa_to_sheet(data);
      const range = XLSX.utils.decode_range(ws["!ref"] || "A1");
      for (let R = range.s.r + 1; R <= range.e.r; R++) {
        const addr = XLSX.utils.encode_cell({ r: R, c: 2 });
        if (ws[addr]) {
          ws[addr].t = "s";
          ws[addr].z = "@";
        }
      }
      ws["!cols"] = [{ wch: 24 }, { wch: 14 }, { wch: 18 }];
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Tamu");
      XLSX.writeFile(wb, `template-tamu.xlsx`);
    }
  }

  if (loading) return <div className="admin-loading">Memuat...</div>;
  if (error) return <div className="admin-error">{error}</div>;
  if (!invitation) return <div className="admin-error">Undangan tidak ditemukan</div>;

  const filteredGuests = search.trim()
    ? guests.filter(
        (g) =>
          g.name.toLowerCase().includes(search.toLowerCase()) ||
          (g.phone || "").includes(search)
      )
    : guests;

  const totalPages = Math.max(1, Math.ceil(filteredGuests.length / GUESTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginatedGuests = filteredGuests.slice(
    (currentPage - 1) * GUESTS_PER_PAGE,
    currentPage * GUESTS_PER_PAGE
  );

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>Tamu — {invitation.groomNickname} & {invitation.brideNickname}</h1>
          <p style={{ color: "var(--admin-muted)", fontSize: "0.85rem", marginTop: 4 }}>
            Slug: <code style={{ color: "var(--admin-teal)" }}>{invitation.slug}</code>
            {" · "}Expired: {new Date(invitation.expiredAt).toLocaleDateString("id-ID")}
            {" · "}Total tamu: <strong>{guests.length}</strong>
          </p>
        </div>
      </div>

      {info && (
        <div style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.4)", color: "#10b981", padding: "10px 14px", borderRadius: 8, marginBottom: 12, fontSize: "0.88rem" }}>
          ✓ {info}
        </div>
      )}

      {/* Manual Add */}
      <div className="inv-section">
        <h3 className="inv-section-title">Tambah Tamu Manual</h3>
        <div className="admin-field-row">
          <div className="admin-field" style={{ flex: 2 }}>
            <label>Nama Tamu</label>
            <input value={manualName} onChange={(e) => setManualName(e.target.value)} placeholder="Nama lengkap tamu" />
          </div>
          <div className="admin-field" style={{ flex: 1 }}>
            <label>Resepsi</label>
            <input value={manualReception} onChange={(e) => setManualReception(e.target.value)} placeholder="pagi / malam / pagi|malam" />
          </div>
          <div className="admin-field" style={{ flex: 1 }}>
            <label>Nomor WA <span style={{ color: "var(--admin-muted)", fontWeight: 400 }}>(opsional)</span></label>
            <input value={manualPhone} onChange={(e) => setManualPhone(e.target.value)} placeholder="08xx atau 62xx" />
          </div>
        </div>
        <button
          type="button"
          className="admin-btn-primary"
          onClick={handleAddManual}
          disabled={manualLoading || !manualName.trim() || !manualReception.trim()}
          style={{ width: "auto", padding: "10px 20px" }}
        >
          {manualLoading ? "Menambahkan..." : "+ Tambah Tamu"}
        </button>
      </div>

      {/* CSV / Excel Upload */}
      <div className="inv-section">
        <h3 className="inv-section-title">Upload Tamu (Bulk CSV / Excel)</h3>
        <p style={{ color: "var(--admin-muted)", fontSize: "0.82rem", marginBottom: 6 }}>
          Kolom: <code>nama_tamu</code>, <code>resepsi</code>, <code>nomor</code> — Kolom <code>nomor</code> opsional (format 08xx atau 628xx). Pisahkan kode resepsi dengan <code>|</code>.
        </p>
        <div style={{ marginBottom: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button type="button" className="admin-btn-secondary" onClick={() => downloadTemplate("csv")} style={{ width: "auto", padding: "8px 16px", fontSize: "0.82rem" }}>
            📥 Template CSV
          </button>
          <button type="button" className="admin-btn-secondary" onClick={() => downloadTemplate("xlsx")} style={{ width: "auto", padding: "8px 16px", fontSize: "0.82rem" }}>
            📥 Template Excel
          </button>
        </div>
        <div className="admin-field">
          <label>Pilih File (CSV/Excel) atau Paste Manual</label>
          <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFile} style={{ marginBottom: 8 }} />
          <textarea
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            rows={5}
            placeholder={"nama_tamu,resepsi,nomor\nBudi Santoso,pagi,081234567890\nAndi Pratama,pagi|malam,"}
          />
        </div>
        {csvError && <div className="admin-error">{csvError}</div>}
        <button
          className="admin-btn-primary"
          onClick={handleUploadCsv}
          disabled={csvLoading || !csvText.trim()}
          style={{ width: "auto", padding: "10px 20px" }}
        >
          {csvLoading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* Guest List */}
      <div className="inv-section" style={{ marginTop: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
          <h3 className="inv-section-title" style={{ marginBottom: 0 }}>Daftar Tamu ({filteredGuests.length})</h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="admin-btn-edit" onClick={exportExcel} disabled={guests.length === 0}>📊 Export Excel</button>
            <button className="admin-btn-edit" onClick={copyAllLinksInPage} disabled={paginatedGuests.length === 0}>Copy Link Halaman</button>
            <button className="admin-btn-delete" onClick={handleDeleteAll} disabled={guests.length === 0}>Hapus Semua</button>
          </div>
        </div>
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="🔍 Cari nama atau nomor..."
          style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--admin-border)", borderRadius: 8, fontSize: "0.88rem", marginBottom: 12, background: "var(--admin-card)", color: "var(--admin-text)" }}
        />
        <p style={{ fontSize: "13px", color: "#888", marginBottom: 12 }}>
          Klik <b>Copy Pesan</b> untuk copy template ke clipboard, atau <b>Kirim WA</b> untuk langsung buka WhatsApp dengan pesan siap kirim (butuh nomor WA). Export Excel untuk paste ke Google Sheets.
        </p>

        {filteredGuests.length === 0 ? (
          <div className="admin-empty" style={{ padding: 30 }}>
            {search ? "Tidak ada tamu sesuai pencarian" : "Belum ada tamu"}
          </div>
        ) : (
          <>
            <div className="admin-table-wrap">
              <table className="admin-table admin-table-stack">
                <thead>
                  <tr>
                    <th>Nama Tamu</th>
                    <th>Nomor WA</th>
                    <th>Resepsi</th>
                    <th>Link</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedGuests.map((g) => {
                    const link = generateLink(g.name);
                    return (
                      <tr key={g.id}>
                        <td data-label="Nama">{g.name}</td>
                        <td data-label="Nomor WA">
                          {g.phone ? (
                            <code style={{ fontSize: "0.78rem" }}>{g.phone}</code>
                          ) : (
                            <span style={{ color: "var(--admin-muted)", fontSize: "0.78rem" }}>—</span>
                          )}
                        </td>
                        <td data-label="Resepsi">
                          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                            {g.receptions.map((r) => (
                              <span key={r} className="inv-tag">{r}</span>
                            ))}
                          </div>
                        </td>
                        <td data-label="Link">
                          <code style={{ fontSize: "0.75rem", color: "var(--admin-muted)", wordBreak: "break-all" }}>
                            {link}
                          </code>
                        </td>
                        <td data-label="Aksi">
                          <div className="admin-actions">
                            <button className="admin-btn-edit" onClick={() => copyLink(g)}>Copy Link</button>
                            <button className="admin-btn-edit" onClick={() => copyBroadcast(g)}>Copy Pesan</button>
                            {g.phone && (
                              <button
                                className="admin-btn-edit"
                                onClick={() => sendWhatsApp(g)}
                                style={{ background: "#25d366", color: "#fff", borderColor: "#25d366" }}
                              >
                                Kirim WA
                              </button>
                            )}
                            <button className="admin-btn-edit" onClick={() => openEditGuest(g)}>Edit</button>
                            <button className="admin-btn-delete" onClick={() => handleDelete(g.id)}>Hapus</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 16 }}>
                <button
                  className="admin-btn-secondary"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  style={{ width: "auto", padding: "6px 14px", fontSize: "0.82rem" }}
                >
                  Sebelumnya
                </button>
                <span style={{ fontSize: "0.85rem", color: "var(--admin-muted)" }}>
                  Hal {currentPage} / {totalPages} ({filteredGuests.length} tamu)
                </span>
                <button
                  className="admin-btn-secondary"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  style={{ width: "auto", padding: "6px 14px", fontSize: "0.82rem" }}
                >
                  Berikutnya
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Edit Guest Modal */}
      {editingGuest && (
        <div className="admin-modal-overlay" onClick={() => setEditingGuest(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Tamu</h2>
            <div className="admin-field">
              <label>Nama</label>
              <input
                value={guestEditForm.name}
                onChange={(e) => setGuestEditForm({ ...guestEditForm, name: e.target.value })}
              />
            </div>
            <div className="admin-field">
              <label>Nomor WA</label>
              <input
                value={guestEditForm.phone}
                onChange={(e) => setGuestEditForm({ ...guestEditForm, phone: e.target.value })}
                placeholder="08xx atau 62xx"
              />
            </div>
            <div className="admin-field">
              <label>Resepsi (pisahkan dengan |)</label>
              <input
                value={guestEditForm.receptions}
                onChange={(e) => setGuestEditForm({ ...guestEditForm, receptions: e.target.value })}
                placeholder="pagi|malam"
              />
            </div>
            <div className="admin-form-actions">
              <button className="admin-btn-secondary" onClick={() => setEditingGuest(null)}>Batal</button>
              <button
                className="admin-btn-primary"
                onClick={handleSaveGuest}
                disabled={guestEditSaving || !guestEditForm.name.trim()}
              >
                {guestEditSaving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
