import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Games",
  description: "Interactive Kingdom Kids games to help children explore God's Word.",
};

const TEASER_GAMES = [
  {
    icon: "🗺️",
    title: "Bible Trivia Trek",
    desc: "Navigate through scripture-based questions and earn badges as you cross the safari."
  },
  {
    icon: "🔍",
    title: "Verse Finder Quest",
    desc: "Search the jungle map to uncover hidden scriptures and practice memorizing God's promises."
  },
  {
    icon: "🦁",
    title: "Character Match-Up",
    desc: "Learn about the Kingdom Kids explorers, their favorite Bible heroes, and the animals they study."
  },
];

export default function GamesPage() {
  return (
    <div style={{ padding: "16px 0", maxWidth: "1200px", margin: "0 auto" }}>

      {/* ── EDITORIAL HEADER ────────────────────────────────────────── */}
      <header style={{ marginBottom: "40px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "2.2rem", fontWeight: 900, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.02em" }}>
          Jungle Games
        </h1>
        <p style={{ color: "#8b5e3c", fontSize: "0.95rem", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
          Get ready for an adventure through God&apos;s Word! Our interactive games are designed to help kids engage with scripture and grow in their faith while exploring the safari.
        </p>
      </header>

      {/* ── EDITORIAL GRID LAYOUT ────────────────────────────────────────── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "32px",
        alignItems: "stretch"
      }}>

        {/* ── COLUMN 1: DEVELOPMENT UPDATE ─────────────────────────────────── */}
        <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <header style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "2px solid #3d2008", paddingBottom: "8px" }}>
            <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.15rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Basecamp Update
            </h2>
          </header>

          <article style={{
            flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
            background: "#0a2c10", border: "1px solid rgba(196,146,58,0.5)",
            padding: "32px 24px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{ fontFamily: "Georgia, serif", color: "#f5c842", fontSize: "1.2rem", fontWeight: 900, margin: "0 0 12px" }}>
              Games in Development
            </h3>
            <p style={{ color: "rgba(253,246,227,0.9)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "24px" }}>
              Our guides are hard at work clearing the trails! We are building interactive, Bible-based games that will be completely free for families and children&apos;s ministries to use. Check back soon as we prepare these new tools for your kids.
            </p>
            <div>
              <span style={{
                background: "rgba(245,200,66,0.15)", color: "#f5c842", fontSize: "0.75rem", fontWeight: 800,
                padding: "8px 16px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.08em",
                border: "1px solid rgba(245,200,66,0.4)"
              }}>
                Releasing Soon
              </span>
            </div>
          </article>
        </section>

        {/* ── COLUMN 2: SNEAK PEEKS ─────────────────────────────── */}
        <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <header style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "2px solid #3d2008", paddingBottom: "8px" }}>
            <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.15rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Field Guide Previews
            </h2>
          </header>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
            {TEASER_GAMES.map((game) => (
              <article key={game.title} style={{
                display: "flex", gap: "16px", alignItems: "center",
                background: "rgba(196,146,58,0.05)",
                border: "1px solid rgba(196,146,58,0.3)",
                padding: "16px", borderRadius: "8px"
              }}>
                <div style={{
                  fontSize: "1.8rem", flexShrink: 0, width: "48px", height: "48px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(196,146,58,0.15)", borderRadius: "8px"
                }}>
                  {game.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1rem", fontWeight: 900, margin: "0 0 4px" }}>
                    {game.title}
                  </h3>
                  <p style={{ color: "#5c3d1e", fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>
                    {game.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}