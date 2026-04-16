import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store",
  description: "Kingdom Kids books, curriculum & resources — grab your safari gear!",
};

const PLACEHOLDER_BOOKS = [
  { id: 1, color: "#f07c2a", emoji: "📖" },
  { id: 2, color: "#f5c842", emoji: "📚" },
  { id: 3, color: "#5a9e4e", emoji: "✝️" },
  { id: 4, color: "#4a90d9", emoji: "🗺️" },
];

export default function StorePage() {
  return (
    <div style={{ padding: "4px 0" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <div style={{ fontSize: "2.8rem", marginBottom: "6px" }}>🛒</div>
        <h1 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.4rem", fontWeight: 900, margin: "0 0 6px" }}>
          The Safari Trading Post
        </h1>
        <p style={{ color: "#8b5e3c", fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>
          Load up on Kingdom Kids books &amp; resources —<br />
          <strong>every explorer needs great gear!</strong>
        </p>
      </div>

      {/* Treasure incoming banner */}
      <div style={{
        background: "linear-gradient(135deg, rgba(245,200,66,0.25), rgba(240,124,42,0.15))",
        border: "2px dashed #f5c842", borderRadius: "14px",
        padding: "12px 16px", marginBottom: "14px", textAlign: "center",
      }}>
        <p style={{ color: "#3d2008", fontWeight: 900, fontSize: "0.88rem", margin: "0 0 3px" }}>
          🎁 Treasure is on its way!
        </p>
        <p style={{ color: "#5c3d1e", fontSize: "0.75rem", margin: 0 }}>
          Our books and resources are being loaded into the safari store. Check back soon!
        </p>
      </div>

      {/* Placeholder book grid */}
      <div className="kk-grid-2" style={{ marginBottom: "14px" }}>
        {PLACEHOLDER_BOOKS.map((book) => (
          <div key={book.id} style={{
            borderRadius: "12px", overflow: "hidden",
            border: "1px solid rgba(196,146,58,0.4)",
            background: "rgba(255,255,255,0.6)",
            borderTop: `4px solid ${book.color}`,
          }}>
            <div style={{
              height: "90px",
              background: `linear-gradient(135deg, ${book.color}40, ${book.color}18)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "2.2rem",
            }}>
              {book.emoji}
            </div>
            <div style={{ padding: "8px 10px", textAlign: "center" }}>
              <div style={{
                display: "inline-block", background: `${book.color}22`,
                border: `1px solid ${book.color}55`,
                borderRadius: "999px", padding: "3px 12px",
                fontSize: "0.65rem", color: book.color, fontWeight: 800,
                textTransform: "uppercase", letterSpacing: "0.04em",
              }}>Coming Soon!</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <div style={{
        background: "rgba(255,255,255,0.5)", border: "1px solid rgba(196,146,58,0.3)",
        borderRadius: "12px", padding: "12px 14px", textAlign: "center",
      }}>
        <p style={{ color: "#3d2008", fontWeight: 800, fontSize: "0.8rem", margin: "0 0 4px" }}>
          📬 Want to be first to know?
        </p>
        <p style={{ color: "#5c3d1e", fontSize: "0.73rem", lineHeight: 1.55, margin: 0 }}>
          Join our Facebook community and we&apos;ll let you know the moment new
          books and resources land in the trading post!
        </p>
      </div>
    </div>
  );
}
