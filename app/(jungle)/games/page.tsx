import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Games",
  description: "Interactive Kingdom Kids games to help children explore God's Word.",
};

const PREVIEWS = [
  { icon: "🗺️", title: "Bible Trivia Trek",   color: "#f07c2a", desc: "Navigate the safari with scripture questions and earn explorer badges along the way!" },
  { icon: "🔍", title: "Verse Finder Quest",  color: "#3ab5e6", desc: "Hunt through the jungle map to uncover hidden scriptures and lock them in your heart." },
  { icon: "🦁", title: "Character Match-Up", color: "#22c55e", desc: "Match the Kingdom Kids explorers with their favorite Bible heroes — can you get them all?" },
];

export default function GamesPage() {
  return (
    <div style={{ padding: "16px 0 8px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", alignItems: "start" }}>

        <section>
          <div style={{ background: "linear-gradient(135deg, #1a5c22, #0a2c10)", borderRadius: "12px 12px 0 0", padding: "10px 18px" }}>
            <h2 style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1.05rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>🏕️ Base Camp Update</h2>
          </div>
          <div style={{ background: "linear-gradient(135deg, #0a2c10, #1a4a18)", border: "2px solid #f5c842", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "28px 24px", boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}>
            <p style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1.2rem", fontWeight: 900, margin: "0 0 12px", lineHeight: 1.3 }}>The guides are clearing the trails!</p>
            <p style={{ color: "rgba(253,246,227,0.9)", fontSize: "0.92rem", lineHeight: 1.7, marginBottom: "12px" }}>
              We&apos;re building fun, totally FREE Bible games for families and kids&apos; ministries. Every game is designed to help explorers fall in love with God&apos;s Word — no boring stuff, we promise! 🌟
            </p>
            <p style={{ color: "rgba(253,246,227,0.65)", fontSize: "0.82rem", lineHeight: 1.6, marginBottom: "20px" }}>Check back soon and get ready to play!</p>
            <span style={{ display: "inline-block", background: "rgba(245,200,66,0.15)", color: "#f5c842", fontSize: "0.75rem", fontWeight: 800, padding: "8px 18px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.08em", border: "1px solid rgba(245,200,66,0.4)" }}>Releasing Soon 🎮</span>
          </div>
        </section>

        <section>
          <div style={{ background: "linear-gradient(135deg, #6b3f1f, #3d2008)", borderRadius: "12px 12px 0 0", padding: "10px 18px" }}>
            <h2 style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1.05rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>🗺️ Coming Attractions</h2>
          </div>
          <div style={{ background: "linear-gradient(160deg, #fffdf5, #fef5da)", border: "2px solid #c4923a", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
            <p style={{ color: "#5c3d1e", fontSize: "0.88rem", lineHeight: 1.6, margin: "0 0 14px" }}>
              Here&apos;s a sneak peek at what&apos;s coming — each game is packed with Bible adventure! 👀
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {PREVIEWS.map((game) => (
                <div key={game.title} style={{ display: "flex", gap: "14px", alignItems: "flex-start", background: "linear-gradient(135deg, #fffdf5, #fff8e8)", border: "1.5px solid #d4a853", borderLeft: `4px solid ${game.color}`, borderRadius: "8px", padding: "12px 14px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
                  <div style={{ fontSize: "1.8rem", flexShrink: 0, width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", background: `${game.color}20`, border: `1.5px solid ${game.color}50`, borderRadius: "8px" }}>{game.icon}</div>
                  <div>
                    <h3 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "0.95rem", fontWeight: 900, margin: "0 0 4px" }}>{game.title}</h3>
                    <p style={{ color: "#5c3d1e", fontSize: "0.82rem", lineHeight: 1.5, margin: 0 }}>{game.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
