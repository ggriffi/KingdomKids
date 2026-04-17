import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Missions",
  description: "Explore God's mission map — every lesson is a brand-new Bible adventure!",
};

const STOPS = [
  { id: 1, label: "Genesis Garden",     ref: "Genesis 1–3",     emoji: "🌿", color: "#22c55e", desc: "Creation & the Fall — where it ALL began!" },
  { id: 2, label: "Ark Adventure",      ref: "Genesis 6–9",     emoji: "🚢", color: "#3ab5e6", desc: "Noah's wild, faithful journey through the storm!" },
  { id: 3, label: "Promised Land",      ref: "Joshua 1–4",      emoji: "🏔️", color: "#f5c842", desc: "Crossing the Jordan — God always keeps His promises!" },
  { id: 4, label: "Shepherd Hills",     ref: "Psalm 23",        emoji: "🐑", color: "#f07c2a", desc: "The Lord is our Shepherd — we never walk alone." },
  { id: 5, label: "Galilee Shores",     ref: "Matthew 4:18–22", emoji: "🌊", color: "#7b3fa0", desc: "Jesus calls the disciples — and He is calling YOU too!" },
  { id: 6, label: "Resurrection Ridge", ref: "Luke 24",         emoji: "✝️", color: "#d94f2b", desc: "He is RISEN — the greatest adventure story ever told!" },
];

const CHALLENGES = [
  { emoji: "📖", color: "#f07c2a", title: "Memory Verse Challenge", desc: "Memorize the weekly verse and earn a mission badge for your explorer passport!" },
  { emoji: "🏠", color: "#3ab5e6", title: "Family Mission",         desc: "Take the adventure home! Complete the activity and share what you discovered." },
  { emoji: "🌍", color: "#22c55e", title: "Community Service",      desc: "Every unit includes a real-world mission — putting faith into action in your neighborhood!" },
];

export default function MissionsPage() {
  return (
    <div style={{ padding: "16px 0 8px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", alignItems: "start" }}>

        <section>
          <div style={{ background: "linear-gradient(135deg, #6b3f1f, #3d2008)", borderRadius: "12px 12px 0 0", padding: "10px 18px" }}>
            <h2 style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1.05rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>🧭 Safari Stops</h2>
          </div>
          <div style={{ background: "linear-gradient(160deg, #fffdf5, #fef5da)", border: "2px solid #c4923a", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
            <p style={{ color: "#5c3d1e", fontSize: "0.88rem", lineHeight: 1.7, margin: "0 0 14px" }}>
              The <strong style={{ color: "#3d2008" }}>Kingdom Kids Mission Map</strong> takes explorers on an epic journey through the whole Bible — from Creation all the way to the Resurrection! Every stop points straight back to Jesus. 🌟
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {STOPS.map((stop) => (
                <div key={stop.id} style={{ display: "flex", gap: "12px", alignItems: "center", background: "linear-gradient(135deg, #fffdf5, #fff8e8)", border: "1.5px solid #d4a853", borderLeft: `4px solid ${stop.color}`, borderRadius: "8px", padding: "10px 14px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
                  <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{stop.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: "#3d2008", fontWeight: 900, fontSize: "0.88rem", margin: "0 0 1px", fontFamily: "Georgia, serif" }}>{stop.label}</p>
                    <p style={{ color: stop.color, fontSize: "0.65rem", fontWeight: 700, margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.04em" }}>{stop.ref}</p>
                    <p style={{ color: "#5c3d1e", fontSize: "0.78rem", margin: 0, lineHeight: 1.4 }}>{stop.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <div style={{ background: "linear-gradient(135deg, #1a5c22, #0a2c10)", borderRadius: "12px 12px 0 0", padding: "10px 18px" }}>
              <h2 style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1.05rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>🏅 Explorer Challenges</h2>
            </div>
            <div style={{ background: "linear-gradient(160deg, #fffdf5, #fef5da)", border: "2px solid #c4923a", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
              <p style={{ color: "#5c3d1e", fontSize: "0.88rem", lineHeight: 1.6, margin: "0 0 14px" }}>
                Every adventure comes with challenges to take your faith even further! 💪
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {CHALLENGES.map((ch) => (
                  <div key={ch.title} style={{ display: "flex", gap: "14px", alignItems: "flex-start", background: "linear-gradient(135deg, #fffdf5, #fff8e8)", border: "1.5px solid #d4a853", borderLeft: `4px solid ${ch.color}`, borderRadius: "8px", padding: "12px 14px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
                    <div style={{ fontSize: "1.5rem", flexShrink: 0, width: "42px", height: "42px", display: "flex", alignItems: "center", justifyContent: "center", background: `${ch.color}15`, border: `1.5px solid ${ch.color}40`, borderRadius: "8px" }}>{ch.emoji}</div>
                    <div>
                      <h3 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "0.95rem", fontWeight: 900, margin: "0 0 4px" }}>{ch.title}</h3>
                      <p style={{ color: "#5c3d1e", fontSize: "0.82rem", lineHeight: 1.5, margin: 0 }}>{ch.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: "linear-gradient(135deg, #0a2c10, #1a4a18)", border: "2px solid #f5c842", borderRadius: "12px", padding: "20px", textAlign: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}>
            <p style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1rem", fontWeight: 900, margin: "0 0 14px" }}>Ready to go even deeper? 📚</p>
            <Link href="/curriculum" style={{ display: "inline-block", background: "linear-gradient(135deg, #f07c2a, #d94f2b)", color: "white", fontWeight: 800, fontSize: "0.88rem", padding: "11px 26px", borderRadius: "8px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.07em", boxShadow: "0 4px 14px rgba(240,124,42,0.4)" }}>
              See the Full Curriculum
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
