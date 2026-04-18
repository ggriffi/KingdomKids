import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Games",
  description: "Interactive Kingdom Kids games to help children explore God's Word.",
};

const PREVIEWS = [
  { icon: "🗺️", title: "Bible Trivia Trek",  color: "#f07c2a", desc: "Answer scripture questions to move your explorer across the jungle map. Badges await the brave!" },
  { icon: "🔍", title: "Verse Finder Quest", color: "#3ab5e6", desc: "Hidden Bible verses are scattered through the jungle — your job is to track them all down." },
  { icon: "🦁", title: "Character Match-Up", color: "#22c55e", desc: "Match Kingdom Kids characters with their favorite Bible heroes. It&apos;s harder than it looks!" },
];

export default function GamesPage() {
  return (
    <div style={{ padding: "32px 20px", maxWidth: "1100px", margin: "0 auto", color: "#fff8e7" }}>

      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <h1 style={{ fontSize: "2rem", color: "#f5c842", textShadow: "0 2px 8px rgba(0,0,0,0.6)", margin: "0 0 8px", fontFamily: "Georgia, serif", fontWeight: 900 }}>
          🎮 Game Zone
        </h1>
        <p style={{ fontSize: "0.95rem", opacity: 0.85, textShadow: "0 1px 4px rgba(0,0,0,0.6)", margin: 0 }}>
          100% free. 100% Bible. Zero boring.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "36px", alignItems: "start" }}>

        {/* ── BASE CAMP CARD ── */}
        <div style={{
          background: "#1a5c22",
          color: "#fff",
          borderRadius: "30px 8px 30px 8px",
          border: "2px solid #f5c842",
          boxShadow: "10px 10px 0px rgba(0,0,0,0.35)",
          transform: "rotate(-1deg)",
          padding: "28px 24px",
          backgroundImage: "radial-gradient(#ffffff18 2px, transparent 2px)",
          backgroundSize: "20px 20px",
        }}>
          <h2 style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1.3rem", fontWeight: 900, margin: "0 0 14px" }}>
            🏕️ The guides are clearing the trails!
          </h2>
          <p style={{ lineHeight: 1.75, fontSize: "0.95rem", marginBottom: "12px", color: "rgba(253,246,227,0.95)" }}>
            We&apos;re building games that are actually FUN — not the kind that feel like homework with a jungle background.
          </p>
          <p style={{ lineHeight: 1.75, fontSize: "0.9rem", marginBottom: "20px", color: "rgba(253,246,227,0.75)" }}>
            Every game is free, made for kids&apos; ministries, and packed with scripture. Check back soon!
          </p>
          <span style={{ display: "inline-block", background: "rgba(245,200,66,0.2)", color: "#f5c842", fontSize: "0.78rem", fontWeight: 900, padding: "8px 20px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.08em", border: "2px solid rgba(245,200,66,0.5)" }}>
            Releasing Soon 🎮
          </span>
        </div>

        {/* ── COMING ATTRACTIONS ── */}
        <div style={{
          background: "#fffdf5",
          borderRadius: "8px 30px 8px 30px",
          border: "2px solid #3d2008",
          boxShadow: "10px 10px 0px rgba(0,0,0,0.3)",
          transform: "rotate(1deg)",
          padding: "24px",
          color: "#3d2008",
        }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", fontWeight: 900, margin: "0 0 6px", color: "#1a5c22" }}>
            🗺️ Coming Attractions
          </h2>
          <p style={{ color: "#8b5e3c", fontSize: "0.82rem", margin: "0 0 18px" }}>
            Peek at what&apos;s on the way — each one is a mini-safari of its own! 👀
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {PREVIEWS.map((game, i) => (
              <div key={game.title} style={{
                display: "flex", gap: "14px", alignItems: "flex-start",
                background: "#fef5da",
                border: "2px dashed #c4923a",
                borderLeft: `5px solid ${game.color}`,
                borderRadius: "12px",
                padding: "12px 14px",
                transform: `rotate(${i % 2 === 0 ? "0.5" : "-0.5"}deg)`,
              }}>
                <div style={{
                  fontSize: "1.6rem", flexShrink: 0, width: "42px", height: "42px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: `${game.color}22`, border: `2px solid ${game.color}60`,
                  borderRadius: "10px",
                }}>
                  {game.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "0.92rem", fontWeight: 900, margin: "0 0 4px" }}>
                    {game.title}
                  </h3>
                  <p style={{ color: "#5c3d1e", fontSize: "0.8rem", lineHeight: 1.5, margin: 0 }}
                    dangerouslySetInnerHTML={{ __html: game.desc }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
