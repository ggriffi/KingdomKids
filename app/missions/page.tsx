import type { Metadata } from "next";
import Link from "next/link";
import { BookMarked, Heart } from "lucide-react";
import { missions } from "@/lib/data";
import MissionMap from "@/components/MissionMap";

export const metadata: Metadata = {
  title: "Missions",
  description: "Explore God's mission map — every lesson is a new adventure through the Bible.",
};

const iconMap: Record<string, React.ReactNode> = {
  BookMarked:  <BookMarked size={28} />,
  Heart:       <Heart size={28} />,
  HandHeart:   <Heart size={28} />,
};

export default function MissionsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative py-16 px-4 text-center overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0e2d14 0%, #1a5225 100%)" }}>
        <h1 className="text-5xl font-black text-[#f5c842] relative z-10"
          style={{ fontFamily: "Georgia, serif", textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
          {missions.heading}
        </h1>
        <p className="text-[#fdf6e3]/80 mt-3 text-lg max-w-xl mx-auto relative z-10">
          {missions.subheading}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Map description */}
        <div className="panel-parchment p-6 mb-10 text-center">
          <p className="text-[#3d2008] leading-relaxed max-w-2xl mx-auto">{missions.mapDescription}</p>
        </div>

        {/* Big mission map */}
        <div className="mb-12 max-w-3xl mx-auto">
          <MissionMap />
        </div>

        {/* Mission Points Grid */}
        <h2 className="text-3xl font-black text-[#f5c842] text-center mb-8"
          style={{ fontFamily: "Georgia, serif" }}>
          Mission Points
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {missions.missionPoints.map((point, idx) => (
            <div key={point.id} className="panel-parchment p-6 card-lift">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-lg flex-shrink-0"
                  style={{ background: point.color }}>
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-black text-[#3d2008]" style={{ fontFamily: "Georgia, serif" }}>
                    {point.label}
                  </h3>
                  <p className="text-[#8b5e3c] text-xs font-semibold">{point.bibleRef}</p>
                </div>
              </div>
              <p className="text-[#5c3d1e] text-sm">{point.shortDesc}</p>
              <div className="mt-3 h-1 rounded-full" style={{ background: point.color, opacity: 0.3 }} />
            </div>
          ))}
        </div>

        {/* Mission Challenges */}
        <div className="py-10 px-6 rounded-3xl"
          style={{ background: "linear-gradient(135deg, #8b5e3c, #6b4423)" }}>
          <h2 className="text-3xl font-black text-[#f5c842] text-center mb-8"
            style={{ fontFamily: "Georgia, serif" }}>
            Mission Challenges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {missions.challenges.map((challenge) => (
              <div key={challenge.id} className="rounded-2xl p-6 text-center"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-[#3d2008]"
                  style={{ background: "linear-gradient(135deg, #f5c842, #d4a853)" }}>
                  {iconMap[challenge.icon] ?? <BookMarked size={28} />}
                </div>
                <h3 className="text-white font-black text-lg mb-2" style={{ fontFamily: "Georgia, serif" }}>
                  {challenge.title}
                </h3>
                <p className="text-white/70 text-sm">{challenge.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/curriculum" className="btn-cta">Get the Full Curriculum</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
