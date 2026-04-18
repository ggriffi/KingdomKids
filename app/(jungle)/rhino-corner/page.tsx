import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Rhino Corner",
  description: "Meet Ms. Rose and the Kingdom Kids Safari Rules!",
};

const RULES = [
  { emoji: "👂", color: "#f07c2a", text: "Listen with open ears and an open heart" },
  { emoji: "🤝", color: "#3ab5e6", text: "Treat every explorer with kindness and respect" },
  { emoji: "🙋", color: "#22c55e", text: "Be brave — ask questions and share your thoughts!" },
  { emoji: "🙏", color: "#f5c842", text: "Honor God in everything we do" },
  { emoji: "🎉", color: "#d94f2b", text: "Have a BLAST on every adventure!" },
];

export default function RhinoCornerPage() {
  return (
    <div style={{ padding: "32px 20px", maxWidth: "1100px", margin: "0 auto", color: "#fff8e7" }}>

      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <h1 style={{ fontSize: "2rem", color: "#f5c842", textShadow: "0 2px 8px rgba(0,0,0,0.6)", margin: "0 0 8px", fontFamily: "Georgia, serif", fontWeight: 900 }}>
          🦏 Rhino Corner
        </h1>
        <p style={{ fontSize: "0.95rem", opacity: 0.85, textShadow: "0 1px 4px rgba(0,0,0,0.6)", margin: 0 }}>
          Every good safari needs a guide. Ours is pretty amazing.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "36px", alignItems: "start" }}>

        {/* ── MS. ROSE ── */}
        <div style={{
          background: "#fffdf5",
          borderRadius: "30px 8px 30px 8px",
          border: "2px solid #3d2008",
          boxShadow: "10px 10px 0px rgba(0,0,0,0.3)",
          transform: "rotate(-1deg)",
          padding: "28px 24px",
          textAlign: "center",
          color: "#3d2008",
        }}>
          <div style={{ width: "130px", height: "130px", position: "relative", borderRadius: "50%", overflow: "hidden", border: "4px solid #c4923a", boxShadow: "0 6px 20px rgba(0,0,0,0.25)", margin: "0 auto 16px" }}>
            <Image src="/images/Ms Rose Transparent.png" alt="Ms. Rose" fill
              style={{ objectFit: "cover", objectPosition: "center top" }} sizes="130px" />
          </div>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.6rem", fontWeight: 900, margin: "0 0 6px" }}>
            Ms. Rose
          </h2>
          <div style={{ display: "inline-block", background: "linear-gradient(135deg, #f5c842, #d4a853)", color: "#3d2008", fontSize: "0.68rem", fontWeight: 900, padding: "4px 14px", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>
            ⭐ Lead Explorer
          </div>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.75, margin: 0, color: "#5c3d1e" }}>
            She shows up with snacks, a Bible, and more energy than anyone in the room. Ms. Rose has this gift — she makes every kid feel like the most important explorer in the jungle. ❤️ And she absolutely cannot wait to go on this adventure with YOU.
          </p>
        </div>

        {/* ── RULES & PROMISE ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

          {/* Rules poster */}
          <div style={{
            borderRadius: "8px 30px 8px 30px",
            border: "2px solid #3d2008",
            boxShadow: "10px 10px 0px rgba(0,0,0,0.3)",
            transform: "rotate(1deg)",
            overflow: "hidden",
          }}>
            <div style={{ background: "linear-gradient(135deg, #6b3f1f, #3d2008)", padding: "10px 18px" }}>
              <h2 style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1.05rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                📋 The Field Rules
              </h2>
            </div>
            <Image src="/images/rules poster.png" alt="Kingdom Kids Safari Rules" width={800} height={533}
              style={{ width: "100%", height: "auto", display: "block" }} />
          </div>

          {/* Explorer's Promise */}
          <div style={{
            background: "#fffdf5",
            borderRadius: "30px 8px",
            border: "2px dashed #c4923a",
            boxShadow: "8px 8px 0px rgba(0,0,0,0.2)",
            transform: "rotate(-0.8deg)",
            padding: "18px",
            color: "#3d2008",
          }}>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1rem", fontWeight: 900, color: "#1a5c22", margin: "0 0 14px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              🌟 The Explorer&apos;s Promise
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {RULES.map((rule) => (
                <div key={rule.text} style={{
                  display: "flex", gap: "12px", alignItems: "center",
                  background: "#fef5da",
                  border: `2px solid ${rule.color}40`,
                  borderLeft: `5px solid ${rule.color}`,
                  borderRadius: "10px", padding: "10px 14px",
                }}>
                  <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{rule.emoji}</span>
                  <p style={{ color: "#3d2008", fontSize: "0.88rem", fontWeight: 700, lineHeight: 1.45, margin: 0 }}>
                    {rule.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
