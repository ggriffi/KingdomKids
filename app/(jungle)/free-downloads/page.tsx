"use client";
import { useState } from "react";
import Link from "next/link";

const FREE_ITEMS = [
  { id: "snack-guide",   label: "VBS Snack Guide",  emoji: "🍎" },
  { id: "leader-guide",  label: "VBS Leader Guide",  emoji: "📋" },
];

const INPUT: React.CSSProperties = {
  width: "100%", padding: "10px 14px", borderRadius: "10px",
  border: "2px solid #c4923a", fontSize: "0.9rem", fontFamily: "Georgia, serif",
  background: "#fef5da", color: "#3d2008", outline: "none",
  boxSizing: "border-box",
};

export default function FreeDownloadsPage() {
  const [name, setName]     = useState("");
  const [email, setEmail]   = useState("");
  const [tokens, setTokens] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/free-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      const data = await res.json();
      if (data.tokens) {
        setTokens(data.tokens);
      } else {
        setError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "28px 16px", maxWidth: "520px", margin: "0 auto", color: "#fff8e7" }}>

      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>🎁</div>
        <h1 style={{
          fontFamily: "Georgia, serif", fontSize: "1.5rem", fontWeight: 900,
          color: "#f5c842", margin: "0 0 8px",
          textShadow: "0 2px 8px rgba(0,0,0,0.6)",
        }}>
          Free Downloads
        </h1>
        <p style={{ fontSize: "0.88rem", opacity: 0.85, margin: 0, lineHeight: 1.6 }}>
          Enter your name and email to unlock your free VBS guides — no payment needed!
        </p>
      </div>

      {!tokens ? (
        <div style={{
          background: "#fffdf5",
          borderRadius: "30px 8px 30px 8px",
          border: "2px solid #c4923a",
          boxShadow: "10px 10px 0px rgba(0,0,0,0.3)",
          padding: "28px 24px",
          color: "#3d2008",
        }}>
          <div style={{ display: "flex", gap: "14px", marginBottom: "20px" }}>
            {FREE_ITEMS.map(({ emoji, label }) => (
              <div key={label} style={{
                flex: 1, textAlign: "center", background: "#fef5da",
                border: "2px dashed #c4923a", borderRadius: "10px", padding: "10px 6px",
              }}>
                <div style={{ fontSize: "1.6rem" }}>{emoji}</div>
                <p style={{ fontFamily: "Georgia, serif", fontWeight: 900, fontSize: "0.75rem", margin: "4px 0 0" }}>{label}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontWeight: 900, fontSize: "0.78rem", marginBottom: "4px", color: "#5c3d1e" }}>
                Your Name
              </label>
              <input
                type="text" required value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Explorer name..."
                style={INPUT}
              />
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 900, fontSize: "0.78rem", marginBottom: "4px", color: "#5c3d1e" }}>
                Email Address
              </label>
              <input
                type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={INPUT}
              />
            </div>

            {error && (
              <p style={{ color: "#d94f2b", fontSize: "0.8rem", margin: 0, fontWeight: 700 }}>{error}</p>
            )}

            <button
              type="submit" disabled={loading}
              style={{
                padding: "12px 0", borderRadius: "999px", border: "none",
                background: loading ? "#ccc" : "linear-gradient(135deg, #1a5c22, #0a2c10)",
                color: loading ? "#666" : "#f5c842",
                fontWeight: 900, fontSize: "0.88rem", textTransform: "uppercase",
                letterSpacing: "0.06em", cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "Georgia, serif",
              }}
            >
              {loading ? "Unlocking..." : "🌿 Get My Free Downloads"}
            </button>

            <p style={{ fontSize: "0.68rem", color: "#8b5e3c", textAlign: "center", margin: 0 }}>
              We&apos;ll send updates about Kingdom Kids — unsubscribe anytime.
            </p>
          </form>
        </div>
      ) : (
        <div style={{
          background: "#fffdf5",
          borderRadius: "8px 30px 8px 30px",
          border: "2px solid #c4923a",
          boxShadow: "10px 10px 0px rgba(0,0,0,0.3)",
          padding: "28px 24px",
          color: "#3d2008",
        }}>
          <h2 style={{
            fontFamily: "Georgia, serif", fontSize: "1.1rem", fontWeight: 900,
            color: "#1a5c22", margin: "0 0 6px", textAlign: "center",
          }}>
            🎉 You&apos;re all set, {name}!
          </h2>
          <p style={{ fontSize: "0.82rem", color: "#5c3d1e", textAlign: "center", margin: "0 0 20px", lineHeight: 1.5 }}>
            Your download links are ready — they&apos;re good for 24 hours.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {FREE_ITEMS.map(({ id, label, emoji }) => (
              <a
                key={id}
                href={`/api/download/${id}?token=${encodeURIComponent(tokens[id])}`}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  background: "#fef5da",
                  border: "2px solid #c4923a",
                  borderLeft: "5px solid #1a5c22",
                  borderRadius: "10px", padding: "12px 16px",
                  textDecoration: "none", color: "#3d2008",
                  fontWeight: 900, fontSize: "0.9rem",
                  fontFamily: "Georgia, serif",
                }}
              >
                <span style={{ fontSize: "1.4rem" }}>{emoji}</span>
                <span style={{ flex: 1 }}>{label}</span>
                <span style={{
                  background: "#1a5c22", color: "#f5c842",
                  fontSize: "0.65rem", fontWeight: 900,
                  padding: "3px 10px", borderRadius: "999px",
                  textTransform: "uppercase", letterSpacing: "0.05em",
                }}>Download</span>
              </a>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Link href="/shop" style={{
              color: "#d94f2b", fontWeight: 700, fontSize: "0.8rem", textDecoration: "none",
            }}>
              ← Back to Shop
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
