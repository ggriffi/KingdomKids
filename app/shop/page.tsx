"use client";

import { useState } from "react";
import { ShoppingCart, Download } from "lucide-react";
import { shop } from "@/lib/data";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? shop.products
    : shop.products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative py-16 px-4 text-center overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0e2d14 0%, #1a5225 100%)" }}>
        <div className="absolute inset-0 flex items-center justify-between px-8 opacity-20 pointer-events-none select-none text-8xl">
          <span>🛒</span><span>🛒</span>
        </div>
        <h1 className="text-5xl font-black text-[#f5c842] relative z-10"
          style={{ fontFamily: "Georgia, serif", textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
          {shop.heading}
        </h1>
        <p className="text-[#fdf6e3]/80 mt-3 text-lg max-w-xl mx-auto relative z-10">
          {shop.subheading}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {shop.categories.map((cat) => (
            <button key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider border-2 transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#f5c842] border-[#f5c842] text-[#3d2008]"
                  : "border-[#f5c842]/50 text-[#f5c842] hover:bg-[#f5c842]/10"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <div key={product.id}
              className={`panel-parchment overflow-hidden card-lift ${!product.inStock ? "opacity-70" : ""}`}>

              {/* Cover area */}
              <div className="h-48 flex items-center justify-center relative"
                style={{ background: `linear-gradient(135deg, ${product.coverColor}cc, ${product.coverColor}88)` }}>
                {/* Decorative cross */}
                <svg viewBox="0 0 40 50" className="w-16 h-20 opacity-70" fill="none">
                  <rect x="16" y="0"  width="8" height="50" rx="2" fill="rgba(255,255,255,0.9)" />
                  <rect x="0"  y="14" width="40" height="8"  rx="2" fill="rgba(255,255,255,0.9)" />
                </svg>

                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-3 right-3 badge-jungle text-[10px]">
                    {product.badge}
                  </span>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.4)" }}>
                    <span className="text-white font-bold text-sm uppercase tracking-widest bg-black/50 px-4 py-2 rounded-full">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Product info */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-black text-[#3d2008] text-lg leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                    {product.name}
                  </h3>
                  <span className="text-[#d94f2b] font-black text-xl whitespace-nowrap">
                    {product.price === 0 ? "Free" : `$${product.price.toFixed(2)}`}
                  </span>
                </div>
                <p className="text-[#8b5e3c] text-xs font-semibold uppercase tracking-wider mb-2">{product.category}</p>
                <p className="text-[#5c3d1e] text-sm leading-relaxed mb-5">{product.description}</p>

                <button
                  disabled={!product.inStock}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-200 ${
                    product.inStock
                      ? "btn-cta !block !w-full !text-center"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}>
                  {product.price === 0
                    ? <><Download size={16} className="inline mr-1" />Download Free</>
                    : <><ShoppingCart size={16} className="inline mr-1" />Add to Cart</>
                  }
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info note */}
        <div className="mt-12 text-center">
          <p className="text-[#fdf6e3]/50 text-sm">
            All curriculum purchases include a digital download. Physical books ship within 3–5 business days.
          </p>
        </div>
      </div>
    </div>
  );
}
