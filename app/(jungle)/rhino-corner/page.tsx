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
    <div style={{ padding: "4px 0" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "14px" }}>
        <div style={{ fontSize: "2.4rem", marginBottom: "4px" }}>🦏</div>
        <h1 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.35rem", fontWeight: 900, margin: "0 0 4px" }}>
          Rhino Corner
        </h1>
        <p style={{ color: "#8b5e3c", fontSize: "0.82rem", margin: 0 }}>
          Your teacher&apos;s home base — where faith &amp; fun come together!
        </p>
      </div>

      {/* Ms. Rose */}
      <section style={{ marginBottom: "14px" }}>
        <header style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "2px solid #3d2008", paddingBottom: "8px", marginBottom: "10px" }}>
          <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "0.95rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Meet Your Guide
          </h2>
        </header>
        <div style={{
          background: "linear-gradient(135deg, rgba(245,200,66,0.18), rgba(196,146,58,0.08))",
          border: "1px solid rgba(196,146,58,0.45)", borderRadius: "10px", padding: "16px",
        }}>
          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
            <div style={{
              flexShrink: 0, width: "80px", height: "80px", position: "relative",
              borderRadius: "50%", overflow: "hidden",
              border: "3px solid rgba(196,146,58,0.6)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}>
              <Image src="/images/Ms. Rose in vibrant cartoon style.png" alt="Ms. Rose"
                fill style={{ objectFit: "cover", objectPosition: "center top" }} sizes="80px" />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                <h3 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.05rem", fontWeight: 900, margin: 0 }}>
                  Ms. Rose
                </h3>
                <span style={{
                  background: "linear-gradient(135deg, #f5c842, #d4a853)",
                  color: "#3d2008", fontSize: "0.58rem", fontWeight: 900,
                  padding: "2px 8px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.05em",
                }}>Lead Explorer</span>
              </div>
              <p style={{ color: "#5c3d1e", fontSize: "0.76rem", lineHeight: 1.6, margin: 0 }}>
                Ms. Rose is the heart and soul of Kingdom Kids! She brings the Bible alive with energy, creativity, and a whole lot of love. 🌺
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safari Rules Poster */}
      <section style={{ marginBottom: "14px" }}>
        <header style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "2px solid #3d2008", paddingBottom: "8px", marginBottom: "10px" }}>
          <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "0.95rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            The Field Rules
          </h2>
        </header>
        <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(196,146,58,0.4)", boxShadow: "0 2px 10px rgba(0,0,0,0.15)" }}>
          <Image src="/images/rules poster.png" alt="Kingdom Kids Safari Rules"
            width={800} height={533} style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
      </section>

      {/* Explorer's Promise */}
      <section>
        <header style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "2px solid #3d2008", paddingBottom: "8px", marginBottom: "10px" }}>
          <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "0.95rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            🌟 The Explorer&apos;s Promise
          </h2>
        </header>
        <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
          {RULES.map((rule, i) => (
            <div key={i} style={{
              display: "flex", gap: "12px", alignItems: "center",
              background: "rgba(196,146,58,0.1)", borderRadius: "8px",
              padding: "10px 12px", border: "1px solid rgba(196,146,58,0.3)",
            }}>
              <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{rule.emoji}</span>
              <p style={{ color: "#3d2008", fontSize: "0.8rem", fontWeight: 600, lineHeight: 1.4, margin: 0 }}>{rule.text}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
