import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach out to the Kingdom Kids team — we'd love to hear from you!",
};

export default function ContactPage() {
  return (
    <div style={{ padding: "4px 0" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <div style={{ fontSize: "2.4rem", marginBottom: "6px" }}>👋</div>
        <h1 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.35rem", fontWeight: 900, margin: "0 0 6px" }}>
          Get In Touch
        </h1>
        <p style={{ color: "#8b5e3c", fontSize: "0.82rem", lineHeight: 1.5, margin: 0 }}>
          Got a question? A big idea? Just want to say hi?<br />
          <strong>We love hearing from families!</strong>
        </p>
      </div>

      {/* Direct contact — coming soon */}
      <section style={{ marginBottom: "12px" }}>
        <header style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "2px solid #3d2008", paddingBottom: "8px", marginBottom: "10px" }}>
          <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "0.95rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Direct Message
          </h2>
          <span style={{ background: "#f5c842", color: "#3d2008", fontSize: "0.58rem", fontWeight: 900, padding: "2px 9px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Coming Soon
          </span>
        </header>
        <div style={{
          background: "linear-gradient(135deg, rgba(245,200,66,0.18), rgba(240,124,42,0.1))",
          border: "1px solid rgba(245,200,66,0.4)", borderRadius: "10px",
          padding: "18px 16px", textAlign: "center",
        }}>
          <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>🏕️</div>
          <h3 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "0.95rem", fontWeight: 900, margin: "0 0 6px" }}>
            Setting Up Camp
          </h3>
          <p style={{ color: "#5c3d1e", fontSize: "0.78rem", lineHeight: 1.6, margin: 0 }}>
            We&apos;re almost ready! A contact form is coming soon so you can reach us directly from this page.
          </p>
        </div>
      </section>

      {/* Facebook community */}
      <section>
        <header style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "2px solid #3d2008", paddingBottom: "8px", marginBottom: "10px" }}>
          <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "0.95rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            The Campfire
          </h2>
        </header>
        <div style={{
          background: "rgba(196,146,58,0.1)", border: "1px solid rgba(196,146,58,0.35)",
          borderTop: "4px solid #1877F2", borderRadius: "10px",
          padding: "18px 16px", textAlign: "center",
        }}>
          <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>🔥</div>
          <h3 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "0.95rem", fontWeight: 900, margin: "0 0 8px" }}>
            Join Our Community
          </h3>
          <p style={{ color: "#5c3d1e", fontSize: "0.78rem", lineHeight: 1.6, margin: "0 0 16px" }}>
            Parents, teachers &amp; ministry leaders — our Facebook group is the place to share ideas, get updates, and connect with other Kingdom Kids families!
          </p>
          <a
            href="https://www.facebook.com/groups/kingdomkids"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block", width: "100%",
              background: "linear-gradient(135deg, #1877F2, #0c5bc7)",
              color: "white", fontWeight: 800, fontSize: "0.82rem",
              padding: "12px 24px", borderRadius: "999px", textDecoration: "none",
              textTransform: "uppercase", letterSpacing: "0.06em",
              boxShadow: "0 4px 14px rgba(24,119,242,0.3)",
            }}
          >
            Visit Our Facebook Group
          </a>
        </div>
      </section>

    </div>
  );
}
