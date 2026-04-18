import type { Metadata } from "next";
import Image from "next/image";
import { explorers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Meet the Explorers",
  description: "Meet Ellie, Giraffy, Stripes, and Hippo — your brave guides through God's Word.",
};

// Map explorer IDs to their character images
const CHARACTER_IMAGES: Record<string, { src: string; label: string }> = {
  ellie:   { src: "/images/timmy and drums.png",                    label: "Ellie the Elephant" },
  giraffy: { src: "/images/Ian Sophie Transparent.png",                         label: "Ian & Sophie" },
  stripes: { src: "/images/Ian Sophie Transparent.png",                         label: "Ian & Sophie" },
  hippo:   { src: "/images/Ms Rose Transparent.png",  label: "Ms. Rose" },
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

      <div className="kk-grid-2">
        {explorers.explorers.map((explorer) => {
          const img = CHARACTER_IMAGES[explorer.id];
          return (
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
                  {/* Character image */}
                  <div
                    style={{
                      width:        "52px",
                      height:       "52px",
                      borderRadius: "50%",
                      overflow:     "hidden",
                      flexShrink:   0,
                      border:       `2px solid ${explorer.color}`,
                      background:   `${explorer.color}18`,
                      position:     "relative",
                    }}
                  >
                    {img ? (
                      <Image
                        src={img.src}
                        alt={img.label}
                        fill
                        style={{ objectFit: "cover", objectPosition: "center top" }}
                        sizes="52px"
                      />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem" }}>
                        {explorer.emoji}
                      </div>
                    )}
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
                        background:   explorer.color,
                        color:        "white",
                        fontSize:     "0.58rem",
                        fontWeight:   700,
                        padding:      "2px 7px",
                        borderRadius: "999px",
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
          );
        })}
      </div>
    </div>
  );
}
