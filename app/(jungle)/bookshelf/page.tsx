import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Videos & Music",
  description: "Kingdom Kids videos and music — coming soon.",
};

export default function BookshelfPage() {
  return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <h1 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.35rem", fontWeight: 900, margin: "0 0 8px" }}>
        🎬 Videos &amp; Music
      </h1>
      <p style={{ color: "#8b5e3c", fontSize: "0.82rem", margin: "0 0 20px" }}>
        Exciting content is on its way!
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "380px", margin: "0 auto" }}>
        {/* Videos card */}
        <div style={{
          background: "rgba(255,255,255,0.55)", border: "1px solid rgba(196,146,58,0.4)",
          borderRadius: "12px", padding: "16px", borderTop: "4px solid #f07c2a",
        }}>
          <div style={{ fontSize: "2rem", marginBottom: "6px" }}>🎥</div>
          <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1rem", fontWeight: 900, margin: "0 0 4px" }}>
            Videos
          </h2>
          <p style={{ color: "#5c3d1e", fontSize: "0.75rem", lineHeight: 1.5, margin: 0 }}>
            Kingdom Kids adventure videos are being uploaded soon. Check back!
          </p>
        </div>

        {/* Music card */}
        <div style={{
          background: "rgba(255,255,255,0.55)", border: "1px solid rgba(196,146,58,0.4)",
          borderRadius: "12px", padding: "16px", borderTop: "4px solid #f5c842",
        }}>
          <div style={{ fontSize: "2rem", marginBottom: "6px" }}>🎵</div>
          <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1rem", fontWeight: 900, margin: "0 0 4px" }}>
            Music
          </h2>
          <p style={{ color: "#5c3d1e", fontSize: "0.75rem", lineHeight: 1.5, margin: 0 }}>
            Kingdom Kids songs and worship music coming soon!
          </p>
        </div>
      </div>
    </div>
  );
}
