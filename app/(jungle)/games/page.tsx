import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Games",
  description: "Kingdom Kids Bible games — fun adventures through God's Word!",
};

const TEASER_GAMES = [
  { emoji: "🧩", title: "Bible Trivia Trek", desc: "How well do you know God's Word? Race through questions on your safari!" },
  { emoji: "🎯", title: "Verse Finder Quest", desc: "Track down hidden Bible verses across the Kingdom Kids jungle map." },
  { emoji: "🃏", title: "Character Match-Up", desc: "Match the Kingdom Kids explorers to their Bible verse and animal!" },
];

export default function GamesPage() {
  return (
    <div style={{ padding: "4px 0" }}>
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <div style={{ fontSize: "2.8rem", marginBottom: "6px" }}>🎮</div>
        <h1 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.4rem", fontWeight: 900, margin: "0 0 6px" }}>
          Game Time on the Safari!
        </h1>
        <p style={{ color: "#8b5e3c", fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>
          Bible adventures disguised as <strong>really, really fun games.</strong><br />
          Shhh — the kids won&apos;t even know they&apos;re learning! 😄
        </p>
      </div>

      <div style={{
        background: "linear-gradient(135deg, #1a5c22, #0e3d16)",
        borderRadius: "18px", padding: "18px 16px", marginBottom: "14px",
        border: "3px solid #f5c842", textAlign: "center",
        boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
      }}>
        <div style={{ fontSize: "1.8rem", marginBottom: "6px" }}>🚧</div>
        <h2 style={{ fontFamily: "Georgia, serif", color: "#f5c842", fontSize: "1.1rem", fontWeight: 900, margin: "0 0 8px" }}>
          Games Are Loading Up!
        </h2>
        <p style={{ color: "rgba(253,246,227,0.9)", fontSize: "0.82rem", lineHeight: 1.65, margin: "0 0 12px" }}>
          Our team is deep in the jungle building games that will knock your safari boots off.
          Bible knowledge meets wild adventure — totally free, totally fun!
        </p>
        <div style={{
          display: "inline-block", background: "rgba(245,200,66,0.2)",
          border: "1px solid rgba(245,200,66,0.5)", borderRadius: "999px",
          padding: "5px 18px", color: "#f5c842", fontSize: "0.72rem",
          fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em",
        }}>🌟 Coming Very Soon</div>
      </div>

      <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "0.95rem", fontWeight: 900, margin: "0 0 9px" }}>
        👀 Sneak Peek — Games in the Works
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {TEASER_GAMES.map((game) => (
          <div key={game.title} style={{
            background: "rgba(196,146,58,0.13)", borderRadius: "12px",
            border: "1px solid rgba(196,146,58,0.45)", padding: "10px 12px",
            display: "flex", gap: "10px", alignItems: "flex-start",
          }}>
            <span style={{ fontSize: "1.6rem", flexShrink: 0 }}>{game.emoji}</span>
            <div>
              <p style={{ color: "#3d2008", fontWeight: 900, fontSize: "0.8rem", margin: "0 0 2px", fontFamily: "Georgia, serif" }}>{game.title}</p>
              <p style={{ color: "#5c3d1e", fontSize: "0.72rem", lineHeight: 1.45, margin: 0 }}>{game.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
