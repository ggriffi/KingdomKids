import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Rhino Corner",
  description: "Meet Ms. Rose and learn the Kingdom Kids Safari Rules.",
};

export default function RhinoCornerPage() {
  return (
    <div>
      <h1 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.35rem", fontWeight: 900, margin: "0 0 3px", textAlign: "center" }}>
        🦏 Rhino Corner
      </h1>
      <p style={{ color: "#8b5e3c", fontSize: "0.78rem", textAlign: "center", margin: "0 0 14px" }}>
        Meet your teacher &amp; learn the Safari Rules
      </p>

      {/* Teacher intro */}
      <div style={{
        background: "rgba(255,255,255,0.55)", border: "1px solid rgba(196,146,58,0.4)",
        borderRadius: "12px", padding: "12px 14px", marginBottom: "14px",
        display: "flex", gap: "12px", alignItems: "center",
      }}>
        <div style={{ flexShrink: 0, width: "72px", height: "90px", position: "relative", borderRadius: "8px", overflow: "hidden", border: "2px solid rgba(196,146,58,0.5)" }}>
          <Image
            src="/images/Ms. Rose in vibrant cartoon style.png"
            alt="Ms. Rose"
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            sizes="72px"
          />
        </div>
        <div>
          <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1rem", fontWeight: 900, margin: "0 0 4px" }}>
            Ms. Rose
          </h2>
          <p style={{ color: "#5c3d1e", fontSize: "0.75rem", lineHeight: 1.55, margin: 0 }}>
            Ms. Rose is the heart behind Kingdom Kids — guiding children through Scripture with
            warmth, creativity, and a love for God&apos;s Word. She leads every safari adventure
            with energy and faith!
          </p>
        </div>
      </div>

      {/* Safari Rules poster */}
      <h2 style={{ fontFamily: "Georgia, serif", color: "#5c3d1e", fontSize: "0.95rem", fontWeight: 800, margin: "0 0 7px", borderBottom: "2px solid rgba(196,146,58,0.3)", paddingBottom: "4px" }}>
        Safari Rules
      </h2>
      <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(196,146,58,0.4)", marginBottom: "14px" }}>
        <Image
          src="/images/rules poster.png"
          alt="Kingdom Kids Safari Rules"
          width={800}
          height={533}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* Rules list */}
      <div style={{ background: "rgba(245,200,66,0.12)", border: "1px solid rgba(196,146,58,0.35)", borderRadius: "10px", padding: "12px 14px" }}>
        <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "0.9rem", fontWeight: 900, margin: "0 0 8px" }}>
          Our Explorers Promise
        </h2>
        {[
          "Listen with open ears and an open heart",
          "Treat every explorer with kindness and respect",
          "Be brave — ask questions and share your thoughts",
          "Honor God in everything we do",
          "Have fun on every adventure!",
        ].map((rule, i) => (
          <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "6px" }}>
            <div style={{
              width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg, #f5c842, #d4a853)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.65rem", fontWeight: 900, color: "#3d2008",
            }}>{i + 1}</div>
            <p style={{ color: "#5c3d1e", fontSize: "0.75rem", lineHeight: 1.5, margin: 0 }}>{rule}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
