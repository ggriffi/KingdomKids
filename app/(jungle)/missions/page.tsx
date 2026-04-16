import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Missions",
  description: "Explore God's mission map — every lesson is a brand-new Bible adventure!",
};

const MISSION_STOPS = [
  { id: 1, label: "Genesis Garden",      bibleRef: "Genesis 1–3",     emoji: "🌿", color: "#22c55e", desc: "Creation & the Fall — where it ALL began!" },
  { id: 2, label: "Ark Adventure",       bibleRef: "Genesis 6–9",     emoji: "🚢", color: "#3ab5e6", desc: "Noah's wild, faithful journey through the storm!" },
  { id: 3, label: "Promised Land",       bibleRef: "Joshua 1–4",      emoji: "🏔️", color: "#f5c842", desc: "Crossing the Jordan — God always keeps His promises!" },
  { id: 4, label: "Shepherd Hills",      bibleRef: "Psalm 23",        emoji: "🐑", color: "#f07c2a", desc: "The Lord is our Shepherd — we never walk alone." },
  { id: 5, label: "Galilee Shores",      bibleRef: "Matthew 4:18–22", emoji: "🌊", color: "#7b3fa0", desc: "Jesus calls the disciples — and He's calling YOU too!" },
  { id: 6, label: "Resurrection Ridge",  bibleRef: "Luke 24",         emoji: "✝️", color: "#d94f2b", desc: "He is RISEN — the greatest adventure story ever told!" },
];

const CHALLENGES = [
  { emoji: "📖", title: "Memory Verse Challenge", desc: "Memorize the weekly verse and earn a mission badge for your explorer passport!" },
  { emoji: "🏠", title: "Family Mission",          desc: "Take the adventure home! Complete the family activity and share what you discovered." },
  { emoji: "🌍", title: "Community Service",        desc: "Every unit includes a real-world mission — putting faith into action right in your neighborhood!" },
];

export default function MissionsPage() {
  return (
    <div style={{ padding: "4px 0" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <div style={{ fontSize: "2.8rem", marginBottom: "6px" }}>🗺️</div>
        <h1 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.4rem", fontWeight: 900, margin: "0 0 6px" }}>
          Join the Mission!
        </h1>
        <p style={{ color: "#8b5e3c", fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>
          Every lesson is a brand-new stop on God&apos;s mission map —<br />
          <strong>grab your compass and let&apos;s go!</strong>
        </p>
      </div>

      {/* Map intro */}
      <div style={{
        background: "linear-gradient(135deg, rgba(245,200,66,0.18), rgba(255,255,255,0.6))",
        border: "2px solid rgba(196,146,58,0.4)", borderRadius: "16px",
        padding: "12px 16px", marginBottom: "16px", textAlign: "center",
      }}>
        <p style={{ color: "#5c3d1e", fontSize: "0.82rem", lineHeight: 1.7, margin: 0 }}>
          The <strong>Kingdom Kids Mission Map</strong> takes explorers on an epic journey through the Bible!
          Each stop unlocks a Bible story, a memory verse, and a wild adventure challenge.
          The best part? Every single stop points back to Jesus. 🌟
        </p>
      </div>

      {/* Mission Stops */}
      <h2 style={{
        fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1rem", fontWeight: 900,
        margin: "0 0 8px", display: "flex", alignItems: "center", gap: "6px",
      }}>
        🧭 Safari Stops on the Mission Map
      </h2>
      <div className="kk-grid-2" style={{ marginBottom: "16px" }}>
        {MISSION_STOPS.map((stop) => (
          <div key={stop.id} style={{
            background: "rgba(255,255,255,0.6)", borderRadius: "12px",
            border: "1px solid rgba(196,146,58,0.3)",
            borderLeft: `4px solid ${stop.color}`,
            padding: "10px 12px",
            display: "flex", gap: "10px", alignItems: "flex-start",
          }}>
            <div style={{
              width: "34px", height: "34px", borderRadius: "50%", flexShrink: 0,
              background: `${stop.color}22`, border: `2px solid ${stop.color}55`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem",
            }}>{stop.emoji}</div>
            <div>
              <p style={{ color: "#3d2008", fontWeight: 900, fontSize: "0.78rem", margin: "0 0 1px", fontFamily: "Georgia, serif" }}>{stop.label}</p>
              <p style={{ color: stop.color, fontSize: "0.62rem", fontWeight: 700, margin: "0 0 3px", textTransform: "uppercase", letterSpacing: "0.04em" }}>{stop.bibleRef}</p>
              <p style={{ color: "#5c3d1e", fontSize: "0.7rem", margin: 0, lineHeight: 1.45 }}>{stop.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Explorer Challenges */}
      <h2 style={{
        fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1rem", fontWeight: 900,
        margin: "0 0 8px", display: "flex", alignItems: "center", gap: "6px",
      }}>
        🏅 Explorer Challenges
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
        {CHALLENGES.map((ch) => (
          <div key={ch.title} style={{
            background: "linear-gradient(135deg, rgba(26,92,34,0.1), rgba(245,200,66,0.1))",
            border: "1px solid rgba(90,158,78,0.35)", borderRadius: "12px",
            padding: "10px 14px", display: "flex", gap: "12px", alignItems: "center",
          }}>
            <div style={{
              width: "38px", height: "38px", borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg, #f5c842, #d4a853)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem",
            }}>{ch.emoji}</div>
            <div>
              <p style={{ color: "#3d2008", fontWeight: 900, fontSize: "0.8rem", margin: "0 0 2px", fontFamily: "Georgia, serif" }}>{ch.title}</p>
              <p style={{ color: "#5c3d1e", fontSize: "0.72rem", margin: 0, lineHeight: 1.5 }}>{ch.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center" }}>
        <Link
          href="/curriculum"
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #f07c2a, #d94f2b)",
            color: "white", fontWeight: 800, fontSize: "0.82rem",
            padding: "10px 24px", borderRadius: "999px", textDecoration: "none",
            textTransform: "uppercase", letterSpacing: "0.07em",
            boxShadow: "0 4px 14px rgba(240,124,42,0.4)",
          }}
        >
          See the Full Curriculum 📚
        </Link>
      </div>
    </div>
  );
}
