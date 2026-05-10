"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { apiAuth, getToken, clearTokens, getStoredUser, CurrentUser, MAIN_URL } from "@/lib/api";
import "./admin.css";
import "./client.css";

interface OwnedInvitation {
  id: string;
  slug: string;
  groomNickname: string;
  brideNickname: string;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [ready, setReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [invs, setInvs] = useState<OwnedInvitation[]>([]);

  useEffect(() => {
    const token = getToken();
    const storedUser = getStoredUser();

    if (!token || !storedUser) {
      router.replace("/login");
      return;
    }
    if (storedUser.role === "ADMIN") {
      // Admin tidak punya dashboard di subdomain invitation; redirect ke main
      window.location.href = `${MAIN_URL}/admin/portfolios`;
      return;
    }
    if (storedUser.role !== "CLIENT") {
      clearTokens();
      router.replace("/login");
      return;
    }
    setUser(storedUser);
    setReady(true);
  }, [router]);

  const fetchInvs = useCallback(async () => {
    try {
      const data = await apiAuth("/api/invitations/mine/list");
      setInvs(Array.isArray(data) ? data : []);
    } catch {
      setInvs([]);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    fetchInvs();
  }, [ready, fetchInvs]);

  function handleLogout() {
    clearTokens();
    router.push("/login");
  }

  if (!ready) {
    return <div style={{ padding: 40, textAlign: "center", color: "#7A9488" }}>Memuat...</div>;
  }

  const urlIdMatch = pathname.match(/^\/dashboard\/(undangan|tamu)\/([^/]+)/);
  const currentInvId = urlIdMatch ? urlIdMatch[2] : invs[0]?.id || null;
  const currentInv = currentInvId ? invs.find((i) => i.id === currentInvId) : null;

  const crumbGroup = "Undangan";
  const leafTitle = pathname.startsWith("/dashboard/tamu")
    ? "Kelola Tamu"
    : pathname.startsWith("/dashboard/undangan")
    ? "Info Undangan"
    : "Semua Undangan";

  const IconList = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  );

  const IconInfo = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );

  const IconGuests = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );

  return (
    <div className="client-layout">
      {sidebarOpen && <div className="client-overlay" onClick={() => setSidebarOpen(false)} />}

      <aside className={`client-sidebar${sidebarOpen ? " open" : ""}`}>
        <div className="client-sidebar-brand">
          <Image src="/logo-invitation-icon.svg" alt="Invitation Savvys" width={36} height={36} priority />
          <div>
            <h2>Dashboard Klien</h2>
            <span>{user?.name}</span>
          </div>
        </div>

        <nav className="client-nav">
          <div className="client-nav-label">Undangan</div>

          {invs.length > 1 && (
            <Link
              href="/dashboard"
              className={`client-nav-item${pathname === "/dashboard" ? " active" : ""}`}
              onClick={() => setSidebarOpen(false)}
            >
              {IconList}
              Semua Undangan
            </Link>
          )}

          {currentInvId && (
            <>
              <Link
                href={`/dashboard/undangan/${currentInvId}`}
                className={`client-nav-item${pathname.startsWith(`/dashboard/undangan/`) ? " active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                {IconInfo}
                Info Undangan
              </Link>
              <Link
                href={`/dashboard/tamu/${currentInvId}`}
                className={`client-nav-item${pathname.startsWith(`/dashboard/tamu/`) ? " active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                {IconGuests}
                Kelola Tamu
              </Link>
            </>
          )}

          {currentInv && (
            <div className="client-active-card">
              <div className="label">Undangan Aktif</div>
              <div className="name">
                {currentInv.groomNickname} &amp; {currentInv.brideNickname}
              </div>
              <code>{currentInv.slug}</code>
            </div>
          )}
        </nav>

        <div className="client-sidebar-footer">
          <Link href="/" className="client-nav-item client-back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Ke Katalog
          </Link>
          <button className="client-logout-btn" onClick={handleLogout}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Keluar
          </button>
        </div>
      </aside>

      <div className="client-content">
        <header className="client-topbar">
          <button className="client-menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/>
            </svg>
          </button>
          <div className="client-topbar-title">
            <span className="crumb">{crumbGroup}</span>
            <span className="sep">·</span>
            <span className="leaf">{leafTitle}</span>
          </div>
        </header>
        <main className="client-main">{children}</main>
      </div>
    </div>
  );
}
