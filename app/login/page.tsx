"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { api, setTokens, setStoredUser, homeForRole } from "@/lib/api";
import "../dashboard/admin.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await api("/api/auth/login", {
        method: "POST",
        body: { identifier: email, password },
      });
      setTokens(data.accessToken, data.refreshToken);
      if (data.user) setStoredUser(data.user);

      const target = homeForRole(data.user?.role);
      if (target.startsWith("http")) {
        // Admin → redirect ke main domain
        window.location.href = target;
      } else {
        router.push(target);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-bg"></div>
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <Image src="/logo-invitation.svg" alt="Invitation Savvys" width={56} height={56} />
        </div>
        <h1>Selamat Datang</h1>
        <p>Masuk ke dashboard Invitation Savvys</p>

        {error && (
          <div className="admin-error">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="admin-field">
            <label htmlFor="email">Email atau Username</label>
            <div className="admin-input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com atau username"
                required
              />
            </div>
          </div>
          <div className="admin-field">
            <label htmlFor="password">Password</label>
            <div className="admin-input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                required
              />
              <button
                type="button"
                className="admin-toggle-pw"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
          </div>
          <button type="submit" className="admin-btn-primary" disabled={loading}>
            {loading ? (
              <span className="admin-spinner"></span>
            ) : (
              "Masuk"
            )}
          </button>
        </form>

        <div className="admin-login-footer">
          <a href="/">← Kembali ke katalog tema</a>
        </div>
      </div>
    </div>
  );
}
