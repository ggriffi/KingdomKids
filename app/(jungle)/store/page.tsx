import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store",
  description: "Kingdom Kids books and resources — coming soon.",
};

// Placeholder slots — replace with real data once thumbnails are uploaded
const PLACEHOLDER_BOOKS = [
  { id: 1, color: "#f07c2a" },
  { id: 2, color: "#f5c842" },
  { id: 3, color: "#5a9e4e" },
  { id: 4, color: "#4a90d9" },
];

export default function StorePage() {
  return (
    <div>
      <h1 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.35rem", fontWeight: 900, margin: "0 0 3px", textAlign: "center" }}>
        🛒 Kingdom Kids Store
      </h1>
      <p style={{ color: "#8b5e3c", fontSize: "0.78rem", textAlign: "center", margin: "0 0 14px" }}>
        Books, curriculum &amp; resources — more coming soon!
      </p>

      <div className="kk-grid-2" style={{ marginBottom: "14px" }}>
        {PLACEHOLDER_BOOKS.map((book) => (
          <div
            key={book.id}
            style={{
              borderRadius: "10px", overflow: "hidden",
              border: "1px solid rgba(196,146,58,0.4)",
              background: "rgba(255,255,255,0.55)",
              borderTop: `4px solid ${book.color}`,
            }}
          >
            {/* Thumbnail placeholder */}
            <div style={{
              height: "100px",
              background: `linear-gradient(135deg, ${book.color}33, ${book.color}11)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              borderBottom: "1px solid rgba(196,146,58,0.2)",
            }}>
              <span style={{ fontSize: "2rem", opacity: 0.4 }}>📖</span>
            </div>
            <div style={{ padding: "8px 10px" }}>
              <div style={{
                height: "10px", borderRadius: "4px", background: "rgba(196,146,58,0.2)",
                marginBottom: "5px",
              }} />
              <div style={{
                height: "8px", borderRadius: "4px", background: "rgba(196,146,58,0.12)",
                width: "70%", marginBottom: "8px",
              }} />
              <div style={{
                display: "inline-block", background: "rgba(196,146,58,0.15)",
                borderRadius: "999px", padding: "3px 10px",
                fontSize: "0.62rem", color: "#8b5e3c", fontWeight: 700,
              }}>Coming Soon</div>
            </div>
          </div>
        ))}
      </div>

      <p style={{ color: "#8b5e3c", fontSize: "0.72rem", textAlign: "center", fontStyle: "italic" }}>
        Book thumbnails and descriptions will be added soon. Check back!
      </p>
    </div>
  );
}
