"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { shop } from "@/lib/data";

type Product = (typeof shop.products)[number] & { freeDownload?: boolean; downloadFiles?: string[] };

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState<string | null>(null);

  const filtered = activeCategory === "All"
    ? shop.products
    : shop.products.filter((p) => p.category === activeCategory);

  async function handleBuy(productId: string) {
    setLoading(productId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div>
      <h1 style={{ fontFamily: "Georgia, serif", color: "#fff8e7", fontSize: "1.35rem", fontWeight: 900, margin: "0 0 3px", textAlign: "center", textShadow: "0 2px 6px rgba(0,0,0,0.7)" }}>
        🛒 {shop.heading}
      </h1>
      <p style={{ color: "#f5e4b0", fontSize: "0.78rem", textAlign: "center", margin: "0 0 10px", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
        {shop.subheading}
      </p>

      {/* Category filter */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "5px", marginBottom: "10px" }}>
        {shop.categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "4px 13px", borderRadius: "999px", fontWeight: 700,
              fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.04em",
              border: "2px solid #d4a853", cursor: "pointer", transition: "all 0.2s",
              background: activeCategory === cat ? "#f5c842" : "rgba(0,0,0,0.45)",
              color: activeCategory === cat ? "#3d2008" : "#f5e4b0",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "7px" }}>
        {filtered.map((product) => {
          const p = product as Product;
          const btnLabel = !p.inStock ? "Out of Stock"
            : loading === p.id ? "..."
            : p.freeDownload ? "Get Free"
            : p.price === 0 ? "Download"
            : "Buy Now";

          const cardInner = (
            <>
              {/* Cover */}
              <div style={{
                height: "120px", display: "flex", alignItems: "center",
                justifyContent: "center",
                background: `linear-gradient(135deg, ${p.coverColor}cc, ${p.coverColor}88)`,
                position: "relative", overflow: "hidden",
              }}>
                {"image" in p && p.image ? (
                  <Image src={p.image as string} alt={p.name} fill style={{ objectFit: "cover" }} sizes="160px" />
                ) : (
                  <svg viewBox="0 0 40 50" style={{ width: "22px", height: "28px", opacity: 0.85 }} fill="none">
                    <rect x="16" y="0" width="8" height="50" rx="2" fill="rgba(255,255,255,0.9)" />
                    <rect x="0" y="14" width="40" height="8" rx="2" fill="rgba(255,255,255,0.9)" />
                  </svg>
                )}
                {p.badge && (
                  <span style={{
                    position: "absolute", top: "3px", right: "3px", zIndex: 1,
                    background: "linear-gradient(135deg, #f5c842, #f07c2a)",
                    color: "#3d2008", fontSize: "0.52rem", fontWeight: 700,
                    padding: "1px 5px", borderRadius: "999px", textTransform: "uppercase",
                  }}>{p.badge}</span>
                )}
                {!p.inStock && (
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                    <span style={{ color: "white", fontSize: "0.52rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: "7px 8px" }}>
                <p style={{ color: "#3d2008", fontWeight: 800, fontSize: "0.7rem", margin: "0 0 1px", fontFamily: "Georgia, serif", lineHeight: 1.2 }}>
                  {p.name}
                </p>
                <p style={{ color: "#d94f2b", fontWeight: 800, fontSize: "0.75rem", margin: "0 0 5px" }}>
                  {p.price === 0 ? "Free" : `$${p.price.toFixed(2)}`}{(p as {plusShipping?: boolean}).plusShipping ? <span style={{ fontSize: "0.6rem", fontWeight: 600, color: "#8b5e3c" }}> + s/h</span> : null}
                </p>
                {p.freeDownload ? (
                  <Link href="/free-downloads" style={{
                    display: "block", width: "100%", padding: "4px 0", borderRadius: "999px",
                    fontSize: "0.58rem", fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "0.04em", textAlign: "center", textDecoration: "none",
                    background: "linear-gradient(135deg, #1a5c22, #0a3d14)",
                    color: "#f5c842",
                  }}>
                    Get Free
                  </Link>
                ) : (
                  <button
                    disabled={!p.inStock || loading === p.id}
                    onClick={() => p.price > 0 && handleBuy(p.id)}
                    style={{
                      width: "100%", padding: "4px 0", borderRadius: "999px",
                      fontSize: "0.58rem", fontWeight: 700, textTransform: "uppercase",
                      letterSpacing: "0.04em", border: "none",
                      cursor: p.inStock && loading !== p.id ? "pointer" : "not-allowed",
                      background: p.inStock ? "linear-gradient(135deg, #f07c2a, #d94f2b)" : "#ccc",
                      color: p.inStock ? "white" : "#666",
                      opacity: loading === p.id ? 0.7 : 1,
                    }}
                  >
                    {btnLabel}
                  </button>
                )}
              </div>
            </>
          );

          return (
            <div key={p.id} style={{
              borderRadius: "10px", overflow: "hidden",
              border: "1px solid rgba(196,146,58,0.6)",
              background: "#fffdf5",
              opacity: p.inStock ? 1 : 0.65,
              boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
            }}>
              {cardInner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
