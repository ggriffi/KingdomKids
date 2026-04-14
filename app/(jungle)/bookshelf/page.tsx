import type { Metadata } from "next";
import Link from "next/link";
import { books } from "@/lib/data";

export const metadata: Metadata = {
  title: "Videos",
  description: "Browse the full Kingdom Kids book series — adventure storybooks rooted in Scripture.",
};

export default function BookshelfPage() {
  const available  = books.books.filter((b) => b.available);
  const comingSoon = books.books.filter((b) => !b.available);

  return (
    <div>
      <h1 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.35rem", fontWeight: 900, margin: "0 0 3px", textAlign: "center" }}>
        📚 The Bookshelf
      </h1>
      <p style={{ color: "#8b5e3c", fontSize: "0.78rem", textAlign: "center", margin: "0 0 12px" }}>
        Every Kingdom Kids book is a new chapter in God&apos;s Word.
      </p>

      {/* Available Now */}
      <h2 style={{ fontFamily: "Georgia, serif", color: "#5c3d1e", fontSize: "0.95rem", fontWeight: 800, margin: "0 0 7px", borderBottom: "2px solid rgba(196,146,58,0.3)", paddingBottom: "4px" }}>
        Available Now
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "8px", marginBottom: "14px" }}>
        {available.map((book) => (
          <div
            key={book.id}
            style={{
              borderRadius: "10px",
              overflow:     "hidden",
              border:       "1px solid rgba(196,146,58,0.4)",
              background:   "rgba(255,255,255,0.6)",
            }}
          >
            {/* Cover */}
            <div
              style={{
                background:     `linear-gradient(135deg, ${book.coverColor}cc, ${book.coverColor}88)`,
                height:         "72px",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
              }}
            >
              <svg viewBox="0 0 40 50" style={{ width: "26px", height: "32px" }} fill="none">
                <rect x="16" y="0"  width="8"  height="50" rx="2" fill="rgba(255,255,255,0.9)" />
                <rect x="0"  y="14" width="40" height="8"  rx="2" fill="rgba(255,255,255,0.9)" />
              </svg>
            </div>
            {/* Info */}
            <div style={{ padding: "7px 8px" }}>
              <p style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "0.72rem", fontWeight: 800, margin: "0 0 1px", lineHeight: 1.2 }}>
                {book.title}
              </p>
              <p style={{ color: "#8b5e3c", fontSize: "0.62rem", margin: "0 0 5px" }}>{book.series}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#d94f2b", fontWeight: 800, fontSize: "0.75rem" }}>
                  {book.price === 0 ? "Free" : `$${book.price.toFixed(2)}`}
                </span>
                {book.shopLink && (
                  <Link
                    href={book.shopLink}
                    style={{
                      background:    "linear-gradient(135deg, #f07c2a, #d94f2b)",
                      color:         "white",
                      fontSize:      "0.58rem",
                      fontWeight:    700,
                      padding:       "2px 8px",
                      borderRadius:  "999px",
                      textDecoration:"none",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {book.price === 0 ? "Get" : "Buy"}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coming Soon */}
      {comingSoon.length > 0 && (
        <>
          <h2 style={{ fontFamily: "Georgia, serif", color: "#5c3d1e", fontSize: "0.95rem", fontWeight: 800, margin: "0 0 7px", borderBottom: "2px solid rgba(196,146,58,0.3)", paddingBottom: "4px" }}>
            Coming Soon
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "8px" }}>
            {comingSoon.map((book) => (
              <div
                key={book.id}
                style={{
                  borderRadius: "10px",
                  overflow:     "hidden",
                  border:       "1px solid rgba(196,146,58,0.3)",
                  background:   "rgba(255,255,255,0.4)",
                  opacity:       0.75,
                }}
              >
                <div
                  style={{
                    background:     `linear-gradient(135deg, ${book.coverColor}66, ${book.coverColor}44)`,
                    height:         "72px",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    position:       "relative",
                  }}
                >
                  <svg viewBox="0 0 40 50" style={{ width: "26px", height: "32px" }} fill="none">
                    <rect x="16" y="0"  width="8"  height="50" rx="2" fill="rgba(255,255,255,0.65)" />
                    <rect x="0"  y="14" width="40" height="8"  rx="2" fill="rgba(255,255,255,0.65)" />
                  </svg>
                  <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.28)" }}>
                    <span style={{ color:"white", fontSize:"0.53rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.04em", background:"rgba(0,0,0,0.45)", padding:"2px 7px", borderRadius:"999px" }}>
                      Soon
                    </span>
                  </div>
                </div>
                <div style={{ padding: "7px 8px" }}>
                  <p style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "0.72rem", fontWeight: 800, margin: "0 0 1px", lineHeight: 1.2 }}>
                    {book.title}
                  </p>
                  <p style={{ color: "#8b5e3c", fontSize: "0.62rem", margin: 0 }}>{book.series}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
