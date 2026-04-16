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
        <div style={{ fontSize: "2.5rem", marginBottom: "4px" }}>🦏</div>
        <h1 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.4rem", fontWeight: 900, margin: "0 0 4px" }}>
          Rhino Corner
        </h1>
        <p style={{ color: "#8b5e3c", fontSize: "0.82rem", margin: 0 }}>
          Your teacher&apos;s home base — where faith &amp; fun come together!
        </p>
      </div>

      {/* Ms. Rose intro */}
      <div style={{
        background: "linear-gradient(135deg, rgba(245,200,66,0.22), rgba(196,146,58,0.1))",
        border: "2px solid rgba(196,146,58,0.5)", borderRadius: "16px",
        padding: "14px", marginBottom: "14px",
      }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
          <div style={{
            flexShrink: 0, width: "78px", height: "96px", position: "relative",
            borderRadius: "12px", overflow: "hidden",
            border: "3px solid rgba(196,146,58,0.6)",
            boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
          }}>
            <Image
              src="/images/Ms. Rose in vibrant cartoon style.png"
              alt="Ms. Rose"
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              sizes="78px"
            />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
              <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.1rem", fontWeight: 900, margin: 0 }}>
                Ms. Rose
              </h2>
              <span style={{
                background: "linear-gradient(135deg, #f5c842, #d4a853)",
                color: "#3d2008", fontSize: "0.58rem", fontWeight: 900,
                padding: "2px 8px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.05em",
              }}>Lead Explorer</span>
            </div>
            <p style={{ color: "#5c3d1e", fontSize: "0.78rem", lineHeight: 1.65, margin: 0 }}>
              Ms. Rose is the heart and soul of Kingdom Kids! She brings the Bible alive with
              energy, creativity, and a whole lot of love. Every safari adventure is more fun
              because she&apos;s leading the way — and she can&apos;t wait to explore God&apos;s Word with you! 🌺
            </p>
          </div>
        </div>
      </div>

      {/* Safari Rules poster */}
      <h2 style={{
        fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1rem", fontWeight: 900,
        margin: "0 0 8px", display: "flex", alignItems: "center", gap: "6px",
      }}>
        🗺️ The Safari Rules
      </h2>
      <div style={{ borderRadius: "12px", overflow: "hidden", border: "2px solid rgba(196,146,58,0.4)", marginBottom: "12px", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}>
        <Image
          src="/images/rules poster.png"
          alt="Kingdom Kids Safari Rules"
          width={800}
          height={533}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* Explorer's Promise */}
      <div style={{
        background: "linear-gradient(135deg, rgba(26,92,34,0.12), rgba(245,200,66,0.1))",
        border: "2px solid rgba(90,158,78,0.4)", borderRadius: "16px", padding: "14px 16px",
      }}>
        <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1rem", fontWeight: 900, margin: "0 0 10px", textAlign: "center" }}>
          🌟 The Explorer&apos;s Promise
        </h2>
        {RULES.map((rule, i) => (
          <div key={i} style={{
            display: "flex", gap: "10px", alignItems: "center",
            background: "rgba(196,146,58,0.13)", borderRadius: "10px",
            padding: "8px 10px", marginBottom: i < RULES.length - 1 ? "6px" : 0,
            border: "1px solid rgba(196,146,58,0.4)",
          }}>
            <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{rule.emoji}</span>
            <p style={{ color: "#3d2008", fontSize: "0.78rem", fontWeight: 600, lineHeight: 1.4, margin: 0 }}>{rule.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
