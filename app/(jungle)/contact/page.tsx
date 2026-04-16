import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach out to the Kingdom Kids team — we'd love to hear from you!",
};

export default function ContactPage() {
  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <div style={{ fontSize: "2.8rem", marginBottom: "6px" }}>👋</div>
        <h1 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.4rem", fontWeight: 900, margin: "0 0 6px" }}>
          Hey There, Explorer!
        </h1>
        <p style={{ color: "#8b5e3c", fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>
          Got a question? A big idea? Just want to say hi?<br />
          <strong>We love hearing from families!</strong>
        </p>
      </div>

      {/* Coming soon card */}
      <div style={{
        background: "linear-gradient(135deg, rgba(245,200,66,0.18), rgba(240,124,42,0.12))",
        border: "2px dashed #f5c842",
        borderRadius: "16px", padding: "18px 20px", marginBottom: "14px", textAlign: "center",
      }}>
        <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🏕️</div>
        <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1rem", fontWeight: 900, margin: "0 0 6px" }}>
          Our Contact Page is Setting Up Camp!
        </h2>
        <p style={{ color: "#5c3d1e", fontSize: "0.8rem", lineHeight: 1.6, margin: 0 }}>
          We&apos;re almost ready — hang tight while we get the safari base camp ready for your messages!
          In the meantime, swing by our jungle community on Facebook. We&apos;re always there!
        </p>
      </div>

      {/* Facebook CTA */}
      <div style={{
        background: "rgba(255,255,255,0.6)", border: "1px solid rgba(196,146,58,0.4)",
        borderRadius: "14px", padding: "14px 16px", textAlign: "center",
        borderTop: "4px solid #1877F2",
      }}>
        <div style={{ fontSize: "1.8rem", marginBottom: "6px" }}>🔥</div>
        <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "0.95rem", fontWeight: 900, margin: "0 0 5px" }}>
          Join Our Campfire Community
        </h2>
        <p style={{ color: "#5c3d1e", fontSize: "0.76rem", lineHeight: 1.55, margin: "0 0 12px" }}>
          Parents, teachers & ministry leaders — our Facebook group is the place to share ideas,
          get updates, and connect with other Kingdom Kids families!
        </p>
        <a
          href="https://www.facebook.com/groups/kingdomkids"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #1877F2, #0c5bc7)",
            color: "white", fontWeight: 800, fontSize: "0.8rem",
            padding: "9px 22px", borderRadius: "999px", textDecoration: "none",
            textTransform: "uppercase", letterSpacing: "0.06em",
            boxShadow: "0 4px 14px rgba(24,119,242,0.4)",
          }}
        >
          Visit Our Facebook Group
        </a>
      </div>

      <p style={{ color: "#8b5e3c", fontSize: "0.7rem", textAlign: "center", marginTop: "14px", fontStyle: "italic" }}>
        Full contact info coming very soon — thanks for your patience, brave explorer! 🌿
      </p>
    </div>
  );
}
