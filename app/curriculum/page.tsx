import type { Metadata } from "next";
import Link from "next/link";
import { Download, BookOpen, Users, Star } from "lucide-react";
import { curriculum } from "@/lib/data";

export const metadata: Metadata = {
  title: "Curriculum",
  description: "36-week Bible curriculum for children ages 3–12. Download a free preview today.",
};

const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen size={28} />,
  Download: <Download size={28} />,
  Users:    <Users size={28} />,
  Star:     <Star size={28} />,
};

export default function CurriculumPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative py-16 px-4 text-center overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0e2d14 0%, #1a5225 100%)" }}>
        <div className="absolute inset-0 flex items-center justify-between px-8 opacity-20 pointer-events-none select-none text-8xl">
          <span>📖</span><span>📖</span>
        </div>
        <h1 className="text-5xl font-black text-[#f5c842] relative z-10"
          style={{ fontFamily: "Georgia, serif", textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
          {curriculum.heading}
        </h1>
        <p className="text-[#fdf6e3]/80 mt-3 text-lg max-w-2xl mx-auto relative z-10">
          {curriculum.subheading}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Overview */}
        <div className="panel-parchment p-8 mb-12 text-center">
          <p className="text-[#3d2008] text-lg leading-relaxed max-w-3xl mx-auto">
            {curriculum.overview}
          </p>
        </div>

        {/* Key Features */}
        <h2 className="text-3xl font-black text-[#f5c842] text-center mb-8"
          style={{ fontFamily: "Georgia, serif" }}>
          What&apos;s Included
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {curriculum.features.map((feature) => (
            <div key={feature.title} className="panel-parchment p-6 flex flex-col items-center text-center card-lift">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 text-[#3d2008]"
                style={{ background: "linear-gradient(135deg, #f5c842, #d4a853)" }}>
                {iconMap[feature.icon] ?? <BookOpen size={28} />}
              </div>
              <h3 className="font-black text-[#3d2008] mb-2" style={{ fontFamily: "Georgia, serif" }}>
                {feature.title}
              </h3>
              <p className="text-[#5c3d1e] text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Grade Bands */}
        <h2 className="text-3xl font-black text-[#f5c842] text-center mb-8"
          style={{ fontFamily: "Georgia, serif" }}>
          Grade-Level Tracks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {curriculum.grades.map((grade) => (
            <div key={grade.id} className="panel-parchment p-6 card-lift">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: grade.color }} />
                <h3 className="font-black text-[#3d2008] text-lg" style={{ fontFamily: "Georgia, serif" }}>
                  {grade.label}
                </h3>
              </div>
              <p className="text-[#5c3d1e] text-sm leading-relaxed">{grade.description}</p>
            </div>
          ))}
        </div>

        {/* Downloads */}
        <div className="py-10 px-6 rounded-3xl mb-8"
          style={{ background: "linear-gradient(135deg, #8b5e3c, #6b4423)" }}>
          <h2 className="text-3xl font-black text-[#f5c842] text-center mb-2"
            style={{ fontFamily: "Georgia, serif" }}>
            Free Downloads
          </h2>
          <p className="text-[#fdf6e3]/80 text-center mb-8">
            Try before you buy — download full preview packs at no cost.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {curriculum.downloads.map((dl) => (
              <a key={dl.id} href={dl.href}
                className="block rounded-2xl overflow-hidden card-lift"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-[#f5c842] mb-3">
                    <Download size={20} />
                    <span className="font-bold text-sm uppercase tracking-wider">Download</span>
                  </div>
                  <h3 className="text-white font-black text-lg mb-2" style={{ fontFamily: "Georgia, serif" }}>
                    {dl.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-4">{dl.description}</p>
                  <span className="text-[#f5c842]/80 text-xs">{dl.fileLabel}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link href="/shop" className="btn-cta mr-4">Order Full Curriculum</Link>
          <Link href="/missions" className="btn-secondary">Explore Missions</Link>
        </div>
      </div>
    </div>
  );
}
