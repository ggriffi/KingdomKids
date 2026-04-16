import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Rhino Corner",
  description: "Meet Ms. Rose and the Kingdom Kids Safari Rules!",
};

const RULES = [
  { emoji: "👂", text: "Listen with open ears and an open heart" },
  { emoji: "🤝", text: "Treat every explorer with kindness and respect" },
  { emoji: "🙋", text: "Be brave — ask questions and share your thoughts!" },
  { emoji: "🙏", text: "Honor God in everything we do" },
  { emoji: "🎉", text: "Have a BLAST on every adventure!" },
];

export default function RhinoCornerPage() {
  return (
    <div style={{ padding: "16px 0", maxWidth: "1200px", margin: "0 auto" }}>

      {/* ── EDITORIAL HEADER ────────────────────────────────────────── */}
      <header style={{ marginBottom: "40px", textAlign: "center" }}>
        <div style={{ fontSize: "2.8rem", marginBottom: "8px" }}>🦏</div>
        <h1 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "2.2rem", fontWeight: 900, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.02em" }}>
          Rhino Corner
        </h1>
        <p style={{ color: "#8b5e3c", fontSize: "0.95rem", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
          Your teacher&apos;s home base — where faith &amp; fun come together!
        </p>
      </header>

      {/* ── EDITORIAL GRID LAYOUT ────────────────────────────────────────── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "32px",
        alignItems: "start"
      }}>

        {/* ── COLUMN 1: THE GUIDE ─────────────────────────────────── */}
        <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <header style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "2px solid #3d2008", paddingBottom: "8px" }}>
            <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.15rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Meet Your Guide
            </h2>
          </header>

          <article style={{
            background: "linear-gradient(135deg, rgba(245,200,66,0.1), rgba(196,146,58,0.05))",
            border: "1px solid rgba(196,146,58,0.4)", borderRadius: "8px",
            padding: "24px",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center", textAlign: "center" }}>
              <div style={{
                width: "120px", height: "120px", position: "relative",
                borderRadius: "50%", overflow: "hidden",
                border: "4px solid rgba(196,146,58,0.6)",
                boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
              }}>
                <Image
                  src="/images/Ms. Rose in vibrant cartoon style.png"
                  alt="Ms. Rose"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  sizes="120px"
                />
              </div>

              <div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
                  <h3 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.4rem", fontWeight: 900, margin: 0 }}>
                    Ms. Rose
                  </h3>
                  <span style={{
                    background: "linear-gradient(135deg, #f5c842, #d4a853)",
                    color: "#3d2008", fontSize: "0.65rem", fontWeight: 900,
                    padding: "4px 12px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.08em",
                  }}>Lead Explorer</span>
                </div>
                <p style={{ color: "#5c3d1e", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
                  Ms. Rose is the heart and soul of Kingdom Kids! She brings the Bible alive with
                  energy, creativity, and a whole lot of love. Every safari adventure is more fun
                  because she&apos;s leading the way — and she can&apos;t wait to explore God&apos;s Word with you! 🌺
                </p>
              </div>
            </div>
          </article>
        </section>

        {/* ── COLUMN 2: THE RULES ─────────────────────────────── */}
        <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <header style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "2px solid #3d2008", paddingBottom: "8px" }}>
            <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.15rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              The Field Rules
            </h2>
          </header>

          {/* Safari Rules poster */}
          <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(196,146,58,0.4)", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
            <Image
              src="/images/rules poster.png"
              alt="Kingdom Kids Safari Rules"
              width={800}
              height={533}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>

          {/* Explorer's Promise */}
          <article style={{
            background: "rgba(26,92,34,0.05)",
            border: "1px solid rgba(90,158,78,0.3)", borderRadius: "8px", padding: "20px",
          }}>
            <h3 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.05rem", fontWeight: 900, margin: "0 0 16px", textAlign: "center", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              🌟 The Explorer&apos;s Promise
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {RULES.map((rule, i) => (
                <div key={i} style={{
                  display: "flex", gap: "12px", alignItems: "center",
                  background: "rgba(196,146,58,0.08)", borderRadius: "6px",
                  padding: "10px 14px", border: "1px solid rgba(196,146,58,0.2)",
                }}>
                  <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{rule.emoji}</span>
                  <p style={{ color: "#3d2008", fontSize: "0.85rem", fontWeight: 600, lineHeight: 1.4, margin: 0 }}>
                    {rule.text}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </section>

      </div>
    </div>
  );
}