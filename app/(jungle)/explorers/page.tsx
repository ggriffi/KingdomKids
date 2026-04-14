import type { Metadata } from "next";
import { explorers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Meet the Explorers",
  description: "Meet Ellie, Giraffy, Stripes, and Hippo — your brave guides through God's Word.",
};

export default function ExplorersPage() {
  return (
    <div>
      <h1 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.35rem", fontWeight: 900, margin: "0 0 3px", textAlign: "center" }}>
        {explorers.heading}
      </h1>
      <p style={{ color: "#8b5e3c", fontSize: "0.78rem", textAlign: "center", margin: "0 0 12px" }}>
        {explorers.subheading}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "9px" }}>
        {explorers.explorers.map((explorer) => (
          <div
            key={explorer.id}
            style={{
              borderRadius: "12px",
              overflow:     "hidden",
              border:       "1px solid rgba(196,146,58,0.4)",
              background:   "rgba(255,255,255,0.55)",
              borderTop:    `4px solid ${explorer.color}`,
            }}
          >
            <div style={{ padding: "10px 11px" }}>
              {/* Header row */}
              <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "7px" }}>
                <div
                  style={{
                    width:          "44px",
                    height:         "44px",
                    borderRadius:   "50%",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    fontSize:       "1.5rem",
                    flexShrink:     0,
                    background:     `${explorer.color}22`,
                    border:         `2px solid ${explorer.color}`,
                  }}
                >
                  {explorer.emoji}
                </div>
                <div>
                  <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "0.92rem", fontWeight: 900, margin: "0 0 1px" }}>
                    {explorer.name}
                  </h2>
                  <p style={{ color: explorer.color, fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", margin: 0 }}>
                    {explorer.animal} · {explorer.role}
                  </p>
                </div>
              </div>

              {/* Trait chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "3px", marginBottom: "7px" }}>
                {explorer.traits.map((trait) => (
                  <span
                    key={trait}
                    style={{
                      background:    explorer.color,
                      color:         "white",
                      fontSize:      "0.58rem",
                      fontWeight:    700,
                      padding:       "2px 7px",
                      borderRadius:  "999px",
                    }}
                  >{trait}</span>
                ))}
              </div>

              {/* Bio */}
              <p style={{ color: "#5c3d1e", fontSize: "0.69rem", lineHeight: 1.5, margin: "0 0 7px" }}>
                {explorer.bio}
              </p>

              {/* Verse */}
              <blockquote
                style={{
                  borderLeft:   `3px solid ${explorer.color}`,
                  background:   `${explorer.color}12`,
                  borderRadius: "0 6px 6px 0",
                  padding:      "5px 8px",
                  margin:       0,
                }}
              >
                <p style={{ color: "#3d2008", fontSize: "0.66rem", fontStyle: "italic", lineHeight: 1.5, margin: 0 }}>
                  {explorer.verse}
                </p>
              </blockquote>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
