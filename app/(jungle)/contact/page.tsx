import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact information for Kingdom Kids — coming soon.",
};

export default function ContactPage() {
  return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <div style={{ fontSize: "3rem", marginBottom: "10px" }}>📬</div>
      <h1 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.35rem", fontWeight: 900, margin: "0 0 8px" }}>
        Contact Us
      </h1>
      <p style={{ color: "#8b5e3c", fontSize: "0.82rem", margin: "0 0 20px" }}>
        Contact information coming soon!
      </p>
      <div style={{
        background: "rgba(245,200,66,0.15)", border: "2px dashed rgba(196,146,58,0.5)",
        borderRadius: "12px", padding: "16px 20px", maxWidth: "340px", margin: "0 auto",
      }}>
        <p style={{ color: "#5c3d1e", fontSize: "0.78rem", lineHeight: 1.6, margin: 0 }}>
          We&apos;re putting together our contact page. In the meantime, reach us through our{" "}
          <a href="https://www.facebook.com/groups/kingdomkids" target="_blank" rel="noopener noreferrer"
            style={{ color: "#f07c2a", fontWeight: 700, textDecoration: "none" }}>
            Facebook group
          </a>.
        </p>
      </div>
    </div>
  );
}
