import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Videos & Music",
  description: "Kingdom Kids videos, songs & adventures — coming soon!",
};

export default function BookshelfPage() {
  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <div style={{ fontSize: "2.8rem", marginBottom: "6px" }}>🎬</div>
        <h1 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.4rem", fontWeight: 900, margin: "0 0 6px" }}>
          Lights, Camera, Safari!
        </h1>
        <p style={{ color: "#8b5e3c", fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>
          Get ready for stories, songs &amp; adventures<br />
          <strong>straight from God&apos;s Word!</strong>
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* Videos */}
        <div style={{
          background: "rgba(255,255,255,0.6)", borderRadius: "16px", padding: "16px",
          border: "1px solid rgba(196,146,58,0.4)", borderTop: "4px solid #f07c2a",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <div style={{
              width: "44px", height: "44px", borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg, #f07c2a, #d94f2b)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem",
            }}>🎥</div>
            <div>
              <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.05rem", fontWeight: 900, margin: 0 }}>
                Videos
              </h2>
              <p style={{ color: "#f07c2a", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>
                Loading up the projector...
              </p>
            </div>
          </div>
          <p style={{ color: "#5c3d1e", fontSize: "0.8rem", lineHeight: 1.6, margin: 0 }}>
            We&apos;re putting together some <strong>amazing Kingdom Kids videos</strong> — Bible stories,
            character adventures, and lessons that kids will want to watch over and over.
            Check back soon! 🌟
          </p>
        </div>

        {/* Music */}
        <div style={{
          background: "rgba(255,255,255,0.6)", borderRadius: "16px", padding: "16px",
          border: "1px solid rgba(196,146,58,0.4)", borderTop: "4px solid #f5c842",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <div style={{
              width: "44px", height: "44px", borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg, #f5c842, #d4a853)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem",
            }}>🎵</div>
            <div>
              <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.05rem", fontWeight: 900, margin: 0 }}>
                Music
              </h2>
              <p style={{ color: "#d4a853", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>
                Instruments warming up...
              </p>
            </div>
          </div>
          <p style={{ color: "#5c3d1e", fontSize: "0.8rem", lineHeight: 1.6, margin: 0 }}>
            Catchy worship songs and fun Kingdom Kids tunes are on the way!
            The kind of songs kids hum all week long and parents secretly love too. 🎶
          </p>
        </div>

        {/* Coming soon banner */}
        <div style={{
          background: "linear-gradient(135deg, rgba(26,92,34,0.15), rgba(10,44,16,0.1))",
          border: "2px dashed rgba(90,158,78,0.5)", borderRadius: "14px",
          padding: "14px 16px", textAlign: "center",
        }}>
          <p style={{ color: "#3d6b2e", fontWeight: 800, fontSize: "0.82rem", margin: "0 0 4px" }}>
            🌿 New content drops soon!
          </p>
          <p style={{ color: "#5c3d1e", fontSize: "0.73rem", margin: 0 }}>
            Follow us on Facebook so you never miss a new video or song release!
          </p>
        </div>
      </div>
    </div>
  );
}
