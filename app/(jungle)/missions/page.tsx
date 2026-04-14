import type { Metadata } from "next";
import Link from "next/link";
import { missions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Missions",
  description: "Explore God's mission map — every lesson is a new adventure through the Bible.",
};

export default function MissionsPage() {
  return (
    <div>
      <h1 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.35rem", fontWeight: 900, margin: "0 0 3px", textAlign: "center" }}>
        {missions.heading}
      </h1>
      <p style={{ color: "#8b5e3c", fontSize: "0.78rem", textAlign: "center", margin: "0 0 10px" }}>
        {missions.subheading}
      </p>

      {/* Map description */}
      <div style={{ background: "rgba(255,255,255,0.5)", borderRadius: "10px", padding: "9px 13px", marginBottom: "12px", border: "1px solid rgba(196,146,58,0.3)" }}>
        <p style={{ color: "#5c3d1e", fontSize: "0.78rem", lineHeight: 1.6, margin: 0, textAlign: "center" }}>
          {missions.mapDescription}
        </p>
      </div>

      {/* Mission Points */}
      <h2 style={{ fontFamily: "Georgia, serif", color: "#5c3d1e", fontSize: "0.95rem", fontWeight: 800, margin: "0 0 7px", borderBottom: "2px solid rgba(196,146,58,0.3)", paddingBottom: "4px" }}>
        Mission Points
      </h2>
      <div className="kk-grid-2" style={{ marginBottom: "12px" }}>
        {missions.missionPoints.map((point, idx) => (
          <div
            key={point.id}
            style={{
              background:   "rgba(255,255,255,0.55)",
              borderRadius: "9px",
              padding:      "9px 10px",
              border:       "1px solid rgba(196,146,58,0.3)",
              borderLeft:   `4px solid ${point.color}`,
              display:      "flex",
              gap:          "7px",
              alignItems:   "flex-start",
            }}
          >
            <div
              style={{
                width:          "22px",
                height:         "22px",
                borderRadius:   "50%",
                background:     point.color,
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                color:          "white",
                fontSize:       "0.62rem",
                fontWeight:     900,
                flexShrink:     0,
              }}
            >{idx + 1}</div>
            <div>
              <p style={{ color: "#3d2008", fontWeight: 800, fontSize: "0.73rem", margin: "0 0 1px", fontFamily: "Georgia, serif" }}>{point.label}</p>
              <p style={{ color: "#8b5e3c", fontSize: "0.6rem", margin: "0 0 3px" }}>{point.bibleRef}</p>
              <p style={{ color: "#5c3d1e", fontSize: "0.66rem", margin: 0, lineHeight: 1.4 }}>{point.shortDesc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mission Challenges */}
      <h2 style={{ fontFamily: "Georgia, serif", color: "#5c3d1e", fontSize: "0.95rem", fontWeight: 800, margin: "0 0 7px", borderBottom: "2px solid rgba(196,146,58,0.3)", paddingBottom: "4px" }}>
        Mission Challenges
      </h2>
      <div className="kk-grid-3" style={{ marginBottom: "14px" }}>
        {missions.challenges.map((challenge) => (
          <div
            key={challenge.id}
            style={{
              background:   "rgba(26,92,34,0.12)",
              borderRadius: "9px",
              padding:      "10px 8px",
              border:       "1px solid rgba(26,92,34,0.3)",
              textAlign:    "center",
            }}
          >
            <div
              style={{
                width:          "30px",
                height:         "30px",
                borderRadius:   "50%",
                background:     "linear-gradient(135deg, #f5c842, #d4a853)",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                margin:         "0 auto 5px",
                fontSize:       "0.8rem",
                color:          "#3d2008",
                fontWeight:     900,
              }}
            >✦</div>
            <p style={{ color: "#3d2008", fontWeight: 800, fontSize: "0.7rem", margin: "0 0 3px", fontFamily: "Georgia, serif" }}>{challenge.title}</p>
            <p style={{ color: "#5c3d1e", fontSize: "0.63rem", margin: 0, lineHeight: 1.4 }}>{challenge.description}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center" }}>
        <Link
          href="/curriculum"
          style={{
            display:        "inline-block",
            background:     "linear-gradient(135deg, #f07c2a, #d94f2b)",
            color:          "white",
            fontWeight:     800,
            fontSize:       "0.82rem",
            padding:        "9px 22px",
            borderRadius:   "999px",
            textDecoration: "none",
            textTransform:  "uppercase",
            letterSpacing:  "0.07em",
          }}
        >
          Get the Full Curriculum
        </Link>
      </div>
    </div>
  );
}
