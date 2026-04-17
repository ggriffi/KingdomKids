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
    <div style={{ padding: "16px 0 8px", maxWidth: "1200px", margin: "0 auto" }}>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", alignItems: "start" }}>

        {/* ── MEET MS. ROSE ── */}
        <section>
          <div style={{ background: "linear-gradient(135deg, #6b3f1f, #3d2008)", borderRadius: "12px 12px 0 0", padding: "10px 18px" }}>
            <h2 style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1.05rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              🦏 Meet Your Guide
            </h2>
          </div>
          <div style={{ background: "linear-gradient(160deg, #fffdf5, #fef5da)", border: "2px solid #c4923a", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "24px 20px", boxShadow: "0 4px 16px rgba(0,0,0,0.12)", textAlign: "center" }}>
            <div style={{ width: "130px", height: "130px", position: "relative", borderRadius: "50%", overflow: "hidden", border: "4px solid #c4923a", boxShadow: "0 6px 20px rgba(0,0,0,0.2)", margin: "0 auto 16px" }}>
              <Image src="/images/Ms. Rose in vibrant cartoon style.png" alt="Ms. Rose" fill
                style={{ objectFit: "cover", objectPosition: "center top" }} sizes="130px" />
            </div>
            <h3 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.5rem", fontWeight: 900, margin: "0 0 6px" }}>
              Ms. Rose
            </h3>
            <div style={{ display: "inline-block", background: "linear-gradient(135deg, #f5c842, #d4a853)", color: "#3d2008", fontSize: "0.7rem", fontWeight: 900, padding: "4px 14px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "14px" }}>
              Lead Explorer
            </div>
            <p style={{ color: "#5c3d1e", fontSize: "0.92rem", lineHeight: 1.75, margin: 0 }}>
              Ms. Rose is the heart and soul of Kingdom Kids! ❤️ She brings the Bible alive with energy, creativity, and a whole lot of love. Every single safari adventure is more fun because she&apos;s leading the way — and she absolutely cannot wait to explore God&apos;s Word with YOU!
            </p>
          </div>
        </section>

        {/* ── THE RULES ── */}
        <section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          <div>
            <div style={{ background: "linear-gradient(135deg, #6b3f1f, #3d2008)", borderRadius: "12px 12px 0 0", padding: "10px 18px" }}>
              <h2 style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1.05rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                📋 The Field Rules
              </h2>
            </div>
            <div style={{ border: "2px solid #c4923a", borderTop: "none", borderRadius: "0 0 12px 12px", overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
              <Image src="/images/rules poster.png" alt="Kingdom Kids Safari Rules" width={800} height={533}
                style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          </div>

          <div>
            <div style={{ background: "linear-gradient(135deg, #1a5c22, #0a2c10)", borderRadius: "12px 12px 0 0", padding: "10px 18px" }}>
              <h2 style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1.05rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                🌟 The Explorer&apos;s Promise
              </h2>
            </div>
            <div style={{ background: "linear-gradient(160deg, #fffdf5, #fef5da)", border: "2px solid #c4923a", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "14px 16px", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {RULES.map((rule) => (
                  <div key={rule.text} style={{
                    display: "flex", gap: "12px", alignItems: "center",
                    background: "linear-gradient(135deg, #fffdf5, #fff8e8)",
                    border: "1.5px solid #d4a853", borderLeft: `4px solid ${rule.color}`,
                    borderRadius: "8px", padding: "10px 14px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                  }}>
                    <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{rule.emoji}</span>
                    <p style={{ color: "#3d2008", fontSize: "0.9rem", fontWeight: 700, lineHeight: 1.45, margin: 0 }}>
                      {rule.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}
