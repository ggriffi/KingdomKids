import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach out to the Kingdom Kids team — we'd love to hear from you!",
};

export default function ContactPage() {
  return (
    <div style={{ padding: "16px 0", maxWidth: "1200px", margin: "0 auto" }}>

      {/* ── EDITORIAL HEADER ────────────────────────────────────────── */}
      <header style={{ marginBottom: "40px", textAlign: "center" }}>
        <div style={{ fontSize: "2.8rem", marginBottom: "8px" }}>👋</div>
        <h1 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "2.2rem", fontWeight: 900, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.02em" }}>
          Get In Touch
        </h1>
        <p style={{ color: "#8b5e3c", fontSize: "0.95rem", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
          Got a question? A big idea? Just want to say hi? <br />
          <strong>We love hearing from families!</strong>
        </p>
      </header>

      {/* ── EDITORIAL GRID LAYOUT ────────────────────────────────────────── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "32px",
        alignItems: "stretch"
      }}>

        {/* ── COLUMN 1: DIRECT CONTACT ─────────────────────────────────── */}
        <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <header style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "2px solid #3d2008", paddingBottom: "8px" }}>
            <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.15rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Direct Message
            </h2>
            <span style={{
              background: "#f5c842",
              color: "#3d2008", fontSize: "0.6rem", fontWeight: 900,
              padding: "3px 10px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.08em",
            }}>Coming Soon</span>
          </header>

          <article style={{
            flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center",
            background: "linear-gradient(135deg, rgba(245,200,66,0.1), rgba(240,124,42,0.05))",
            border: "1px solid rgba(245,200,66,0.4)",
            padding: "32px 24px", borderRadius: "8px"
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>🏕️</div>
            <h3 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.1rem", fontWeight: 900, margin: "0 0 8px" }}>
              Setting Up Camp
            </h3>
            <p style={{ color: "#5c3d1e", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>
              We&apos;re almost ready! Hang tight while we get the safari base camp fully equipped to handle your messages directly from this page.
            </p>
          </article>
        </section>

        {/* ── COLUMN 2: COMMUNITY / SOCIAL ─────────────────────────────── */}
        <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <header style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "2px solid #3d2008", paddingBottom: "8px" }}>
            <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.15rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              The Campfire
            </h2>
          </header>

          <article style={{
            flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", textAlign: "center",
            background: "rgba(196,146,58,0.05)",
            border: "1px solid rgba(196,146,58,0.3)", borderTop: "4px solid #1877F2",
            padding: "32px 24px", borderRadius: "8px"
          }}>
            <div>
              <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>🔥</div>
              <h3 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.1rem", fontWeight: 900, margin: "0 0 8px" }}>
                Join Our Community
              </h3>
              <p style={{ color: "#5c3d1e", fontSize: "0.85rem", lineHeight: 1.6, margin: "0 0 24px" }}>
                In the meantime, swing by our Facebook group! It&apos;s the perfect place for parents, teachers, and ministry leaders to share ideas and get updates. We&apos;re always there!
              </p>
            </div>

            <a
              href="https://www.facebook.com/groups/kingdomkids"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block", width: "100%", maxWidth: "260px",
                background: "linear-gradient(135deg, #1877F2, #0c5bc7)",
                color: "white", fontWeight: 800, fontSize: "0.85rem",
                padding: "12px 24px", borderRadius: "999px", textDecoration: "none",
                textTransform: "uppercase", letterSpacing: "0.06em",
                boxShadow: "0 4px 14px rgba(24,119,242,0.3)",
              }}
            >
              Visit Facebook Group
            </a>
          </article>
        </section>

      </div>
    </div>
  );
}