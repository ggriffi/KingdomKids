import type { Metadata } from "next";
import Link from "next/link";
import { explorers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Meet the Explorers",
  description: "Meet Ellie, Giraffy, Stripes, and Hippo — your brave guides through God's Word.",
};

export default function ExplorersPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative py-16 px-4 text-center overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0e2d14 0%, #1a5225 100%)" }}>
        <h1 className="text-5xl font-black text-[#f5c842] relative z-10"
          style={{ fontFamily: "Georgia, serif", textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
          {explorers.heading}
        </h1>
        <p className="text-[#fdf6e3]/80 mt-3 text-lg max-w-xl mx-auto relative z-10">
          {explorers.subheading}
        </p>
        {/* Explorer row */}
        <div className="flex justify-center gap-6 mt-8 text-5xl relative z-10">
          {explorers.explorers.map((e) => (
            <span key={e.id} className="animate-float" style={{ animationDelay: `${explorers.explorers.indexOf(e) * 0.5}s` }}>
              {e.emoji}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {explorers.explorers.map((explorer) => (
          <div key={explorer.id} className="panel-parchment overflow-hidden card-lift">
            {/* Color banner */}
            <div className="h-4" style={{ background: explorer.color }} />

            <div className="p-8">
              <div className="flex items-start gap-6 mb-6">
                {/* Big emoji */}
                <div className="w-24 h-24 rounded-full flex items-center justify-center text-6xl flex-shrink-0 shadow-lg"
                  style={{ background: `${explorer.color}33`, border: `3px solid ${explorer.color}` }}>
                  {explorer.emoji}
                </div>
                <div>
                  <h2 className="text-3xl font-black text-[#3d2008]" style={{ fontFamily: "Georgia, serif" }}>
                    {explorer.name}
                  </h2>
                  <p className="text-sm font-bold uppercase tracking-wider mt-0.5" style={{ color: explorer.color }}>
                    {explorer.animal} · {explorer.role}
                  </p>

                  {/* Trait chips */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {explorer.traits.map((trait) => (
                      <span key={trait} className="px-3 py-0.5 rounded-full text-xs font-bold text-white"
                        style={{ background: explorer.color }}>
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-[#5c3d1e] leading-relaxed mb-5">{explorer.bio}</p>

              {/* Verse */}
              <blockquote className="border-l-4 pl-4 py-2 rounded-r-xl mb-5"
                style={{ borderColor: explorer.color, background: `${explorer.color}18` }}>
                <p className="text-[#3d2008] italic text-sm leading-relaxed">{explorer.verse}</p>
              </blockquote>

              <div className="flex items-center gap-2 text-[#8b5e3c] text-sm">
                <span className="font-semibold">Favorite Bible Book:</span>
                <span className="font-bold text-[#3d2008]">{explorer.favoriteBook}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center pb-16 px-4">
        <h2 className="text-3xl font-black text-[#f5c842] mb-4" style={{ fontFamily: "Georgia, serif" }}>
          Join the Explorers on Their Mission!
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/curriculum" className="btn-cta">Start the Curriculum</Link>
          <Link href="/missions"   className="btn-secondary">Explore the Map</Link>
        </div>
      </div>
    </div>
  );
}
