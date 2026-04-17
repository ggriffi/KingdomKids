import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Games",
  description: "Interactive Kingdom Kids games to help children explore God's Word.",
};

const TEASER_GAMES = [
  { icon: "🗺️", title: "Bible Trivia Trek",    desc: "Navigate scripture-based questions and earn badges as you cross the safari!" },
  { icon: "🔍", title: "Verse Finder Quest",    desc: "Search the jungle map to uncover hidden scriptures and memorize God's promises." },
  { icon: "🦁", title: "Character Match-Up",    desc: "Learn about the Kingdom Kids explorers, their Bible heroes, and the animals they study." },
];

export default function GamesPage() {
  return (
    <div style={{ padding: "4px 0" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <div style={{ fontSize: "2.4rem", marginBottom: "6px" }}>🎮</div>
        <h1 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.35rem", fontWeight: 900, margin: "0 0 6px" }}>
          Jungle Games
        </h1>
        <p style={{ color: "#8b5e3c", fontSize: "0.82rem", lineHeight: 1.5, margin: 0 }}>
          Bible adventures disguised as <strong>really, really fun games.</strong><br />
          Shhh — they won&apos;t even know they&apos;re learning! 😄
        </p>
      </div>

      {/* Development update card */}
      <section style={{ marginBottom: "14px" }}>
        <header style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "2px solid #3d2008", paddingBottom: "8px", marginBottom: "10px" }}>
          <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "0.95rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Basecamp Update
          </h2>
        </header>
        <div style={{
          background: "#0a2c10", border: "1px solid rgba(196,146,58,0.5)",
          borderRadius: "10px", padding: "18px 16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}>
          <h3 style={{ fontFamily: "Georgia, serif", color: "#f5c842", fontSize: "1.05rem", fontWeight: 900, margin: "0 0 10px" }}>
            Games in Development 🚧
          </h3>
          <p style={{ color: "rgba(253,246,227,0.88)", fontSize: "0.8rem", lineHeight: 1.65, marginBottom: "14px" }}>
            Our guides are deep in the jungle building free, interactive Bible games for families and children&apos;s ministries. Check back soon!
          </p>
          <span style={{
            background: "rgba(245,200,66,0.15)", color: "#f5c842", fontSize: "0.7rem", fontWeight: 800,
            padding: "6px 14px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.08em",
            border: "1px solid rgba(245,200,66,0.4)",
          }}>
            Releasing Soon
          </span>
        </div>
      </section>

      {/* Sneak peeks */}
      <section>
        <header style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "2px solid #3d2008", paddingBottom: "8px", marginBottom: "10px" }}>
          <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "0.95rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Field Guide Previews
          </h2>
        </header>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {TEASER_GAMES.map((game) => (
            <div key={game.title} style={{
              display: "flex", gap: "12px", alignItems: "center",
              background: "rgba(196,146,58,0.1)", border: "1px solid rgba(196,146,58,0.35)",
              padding: "12px 14px", borderRadius: "10px",
            }}>
              <div style={{
                fontSize: "1.6rem", flexShrink: 0, width: "44px", height: "44px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(196,146,58,0.2)", borderRadius: "8px",
              }}>
                {game.icon}
              </div>
              <div>
                <h3 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "0.85rem", fontWeight: 900, margin: "0 0 3px" }}>
                  {game.title}
                </h3>
                <p style={{ color: "#5c3d1e", fontSize: "0.74rem", lineHeight: 1.5, margin: 0 }}>
                  {game.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
