import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { curriculum } from "@/lib/data";

export const metadata: Metadata = {
  title: "Curriculum",
  description: "36-week Bible curriculum for children ages 3–12. Download a free preview today.",
};

export default function CurriculumPage() {
  return (
    <div>
      <h1 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.35rem", fontWeight: 900, margin: "0 0 3px", textAlign: "center" }}>
        📖 {curriculum.heading}
      </h1>
      <p style={{ color: "#8b5e3c", fontSize: "0.78rem", textAlign: "center", margin: "0 0 10px" }}>
        {curriculum.subheading}
      </p>

      {/* Ms. Rose intro + overview */}
      <div style={{ background: "rgba(255,255,255,0.5)", borderRadius: "10px", padding: "9px 13px", marginBottom: "12px", border: "1px solid rgba(196,146,58,0.3)", display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ flexShrink: 0 }}>
          <Image
            src="/images/Ms. Rose in vibrant cartoon style.png"
            alt="Ms. Rose"
            width={56}
            height={70}
            style={{ objectFit: "contain", display: "block" }}
          />
        </div>
        <p style={{ color: "#5c3d1e", fontSize: "0.78rem", lineHeight: 1.6, margin: 0 }}>{curriculum.overview}</p>
      </div>

      {/* Features grid */}
      <h2 style={{ fontFamily: "Georgia, serif", color: "#5c3d1e", fontSize: "0.95rem", fontWeight: 800, margin: "0 0 7px", borderBottom: "2px solid rgba(196,146,58,0.3)", paddingBottom: "4px" }}>
        What&apos;s Included
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "7px", marginBottom: "12px" }}>
        {curriculum.features.map((feature) => (
          <div
            key={feature.title}
            style={{
              background:   "rgba(255,255,255,0.5)",
              borderRadius: "9px",
              padding:      "9px 10px",
              border:       "1px solid rgba(196,146,58,0.3)",
              display:      "flex",
              gap:          "8px",
              alignItems:   "flex-start",
            }}
          >
            <div
              style={{
                width:          "26px",
                height:         "26px",
                borderRadius:   "50%",
                background:     "linear-gradient(135deg, #f5c842, #d4a853)",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                flexShrink:     0,
                fontSize:       "0.75rem",
                color:          "#3d2008",
                fontWeight:     900,
              }}
            >✦</div>
            <div>
              <p style={{ color: "#3d2008", fontWeight: 800, fontSize: "0.75rem", margin: "0 0 2px", fontFamily: "Georgia, serif" }}>{feature.title}</p>
              <p style={{ color: "#5c3d1e", fontSize: "0.68rem", margin: 0, lineHeight: 1.4 }}>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Grade tracks */}
      <h2 style={{ fontFamily: "Georgia, serif", color: "#5c3d1e", fontSize: "0.95rem", fontWeight: 800, margin: "0 0 7px", borderBottom: "2px solid rgba(196,146,58,0.3)", paddingBottom: "4px" }}>
        Grade-Level Tracks
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "7px", marginBottom: "12px" }}>
        {curriculum.grades.map((grade) => (
          <div
            key={grade.id}
            style={{
              background:   "rgba(255,255,255,0.5)",
              borderRadius: "9px",
              padding:      "9px 10px",
              border:       "1px solid rgba(196,146,58,0.3)",
              borderLeft:   `4px solid ${grade.color}`,
            }}
          >
            <p style={{ color: "#3d2008", fontWeight: 800, fontSize: "0.75rem", margin: "0 0 3px", fontFamily: "Georgia, serif" }}>{grade.label}</p>
            <p style={{ color: "#5c3d1e", fontSize: "0.68rem", margin: 0, lineHeight: 1.4 }}>{grade.description}</p>
          </div>
        ))}
      </div>

      {/* Downloads */}
      <h2 style={{ fontFamily: "Georgia, serif", color: "#5c3d1e", fontSize: "0.95rem", fontWeight: 800, margin: "0 0 7px", borderBottom: "2px solid rgba(196,146,58,0.3)", paddingBottom: "4px" }}>
        Free Downloads
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "14px" }}>
        {curriculum.downloads.map((dl) => (
          <a
            key={dl.id}
            href={dl.href}
            style={{
              background:     "rgba(139,94,60,0.12)",
              borderRadius:   "9px",
              padding:        "9px 12px",
              border:         "1px solid rgba(139,94,60,0.35)",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "space-between",
              textDecoration: "none",
            }}
          >
            <div>
              <p style={{ color: "#3d2008", fontWeight: 800, fontSize: "0.75rem", margin: "0 0 1px" }}>{dl.title}</p>
              <p style={{ color: "#8b5e3c", fontSize: "0.65rem", margin: 0 }}>{dl.fileLabel}</p>
            </div>
            <span
              style={{
                background:    "linear-gradient(135deg, #f07c2a, #d94f2b)",
                color:         "white",
                fontSize:      "0.62rem",
                fontWeight:    700,
                padding:       "4px 10px",
                borderRadius:  "999px",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                whiteSpace:    "nowrap",
                marginLeft:    "8px",
              }}
            >
              Download
            </span>
          </a>
        ))}
      </div>

      {/* Safari Rules poster */}
      <h2 style={{ fontFamily: "Georgia, serif", color: "#5c3d1e", fontSize: "0.95rem", fontWeight: 800, margin: "0 0 7px", borderBottom: "2px solid rgba(196,146,58,0.3)", paddingBottom: "4px" }}>
        Safari Rules
      </h2>
      <div style={{ marginBottom: "14px", borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(196,146,58,0.4)" }}>
        <Image
          src="/images/rules poster.png"
          alt="Kingdom Kids Safari Rules"
          width={800}
          height={533}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      <div style={{ textAlign: "center" }}>
        <Link
          href="/shop"
          style={{
            display:       "inline-block",
            background:    "linear-gradient(135deg, #f07c2a, #d94f2b)",
            color:         "white",
            fontWeight:    800,
            fontSize:      "0.82rem",
            padding:       "9px 22px",
            borderRadius:  "999px",
            textDecoration:"none",
            textTransform: "uppercase",
            letterSpacing: "0.07em",
          }}
        >
          Order Full Curriculum
        </Link>
      </div>
    </div>
  );
}
