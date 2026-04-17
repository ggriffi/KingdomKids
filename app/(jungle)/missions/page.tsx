import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Missions",
  description: "Explore God's mission map — every lesson is a brand-new Bible adventure!",
};

const MISSION_STOPS = [
  { id: 1, label: "Genesis Garden",     bibleRef: "Genesis 1–3",     emoji: "🌿", color: "#22c55e", desc: "Creation & the Fall — where it ALL began!" },
  { id: 2, label: "Ark Adventure",      bibleRef: "Genesis 6–9",     emoji: "🚢", color: "#3ab5e6", desc: "Noah's wild, faithful journey through the storm!" },
  { id: 3, label: "Promised Land",      bibleRef: "Joshua 1–4",      emoji: "🏔️", color: "#f5c842", desc: "Crossing the Jordan — God always keeps His promises!" },
  { id: 4, label: "Shepherd Hills",     bibleRef: "Psalm 23",        emoji: "🐑", color: "#f07c2a", desc: "The Lord is our Shepherd — we never walk alone." },
  { id: 5, label: "Galilee Shores",     bibleRef: "Matthew 4:18–22", emoji: "🌊", color: "#7b3fa0", desc: "Jesus calls the disciples — and He's calling YOU too!" },
  { id: 6, label: "Resurrection Ridge", bibleRef: "Luke 24",         emoji: "✝️", color: "#d94f2b", desc: "He is RISEN — the greatest adventure story ever told!" },
];

const CHALLENGES = [
  { emoji: "📖", title: "Memory Verse Challenge", desc: "Memorize the weekly verse and earn a mission badge for your explorer passport!" },
  { emoji: "🏠", title: "Family Mission",          desc: "Take the adventure home! Complete the family activity and share what you discovered." },
  { emoji: "🌍", title: "Community Service",        desc: "Every unit includes a real-world mission — putting faith into action right in your neighborhood!" },
];

export default function MissionsPage() {
  return (
    <div style={{ padding: "16px 0", maxWidth: "1200px", margin: "0 auto" }}>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "32px",
        alignItems: "start"
      }}>

        {/* ── COLUMN 1: MISSION MAP ──────────────────────────── */}
        <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <header style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "2px solid #3d2008", paddingBottom: "8px" }}>
            <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.15rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Safari Stops
            </h2>
          </header>

          <article style={{
            background: "linear-gradient(135deg, rgba(245,200,66,0.1), rgba(196,146,58,0.05))",
            border: "1px solid rgba(196,146,58,0.35)", borderRadius: "8px",
            padding: "16px 18px",
          }}>
            <p style={{ color: "#5c3d1e", fontSize: "0.85rem", lineHeight: 1.7, margin: 0 }}>
              The <strong style={{ color: "#3d2008" }}>Kingdom Kids Mission Map</strong> takes explorers on an epic journey through the Bible.
              Each stop unlocks a Bible story, a memory verse, and a wild adventure challenge —
              and every single one points back to Jesus.
            </p>
          </article>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {MISSION_STOPS.map((stop) => (
              <div key={stop.id} style={{
                display: "flex", gap: "12px", alignItems: "center",
                background: "rgba(196,146,58,0.07)",
                border: "1px solid rgba(196,146,58,0.22)",
                borderLeft: `3px solid ${stop.color}`,
                padding: "10px 14px", borderRadius: "6px",
              }}>
                <span style={{ fontSize: "1.15rem", flexShrink: 0 }}>{stop.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: "#3d2008", fontWeight: 900, fontSize: "0.82rem", margin: "0 0 1px", fontFamily: "Georgia, serif" }}>
                    {stop.label}
                  </p>
                  <p style={{ color: stop.color, fontSize: "0.63rem", fontWeight: 700, margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    {stop.bibleRef}
                  </p>
                  <p style={{ color: "#5c3d1e", fontSize: "0.73rem", margin: 0, lineHeight: 1.4 }}>{stop.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── COLUMN 2: CHALLENGES + CTA ─────────────────────── */}
        <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <header style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "2px solid #3d2008", paddingBottom: "8px" }}>
            <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.15rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Explorer Challenges
            </h2>
          </header>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {CHALLENGES.map((ch) => (
              <article key={ch.title} style={{
                display: "flex", gap: "16px", alignItems: "flex-start",
                background: "rgba(196,146,58,0.07)",
                border: "1px solid rgba(196,146,58,0.22)",
                padding: "16px", borderRadius: "8px",
              }}>
                <div style={{
                  fontSize: "1.5rem", flexShrink: 0, width: "44px", height: "44px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "linear-gradient(135deg, rgba(245,200,66,0.25), rgba(196,146,58,0.15))",
                  borderRadius: "8px", border: "1px solid rgba(196,146,58,0.3)",
                }}>
                  {ch.emoji}
                </div>
                <div>
                  <h3 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "0.95rem", fontWeight: 900, margin: "0 0 4px" }}>
                    {ch.title}
                  </h3>
                  <p style={{ color: "#5c3d1e", fontSize: "0.82rem", lineHeight: 1.5, margin: 0 }}>
                    {ch.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div style={{
            marginTop: "4px",
            background: "rgba(26,92,34,0.06)", border: "1px solid rgba(90,158,78,0.25)",
            borderRadius: "8px", padding: "20px 18px", textAlign: "center",
          }}>
            <p style={{ color: "#3d6b2e", fontWeight: 800, fontSize: "0.82rem", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Ready to go deeper?
            </p>
            <Link
              href="/curriculum"
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #f07c2a, #d94f2b)",
                color: "white", fontWeight: 800, fontSize: "0.82rem",
                padding: "10px 24px", borderRadius: "6px", textDecoration: "none",
                textTransform: "uppercase", letterSpacing: "0.07em",
                boxShadow: "0 4px 14px rgba(240,124,42,0.35)",
              }}
            >
              See the Full Curriculum
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
