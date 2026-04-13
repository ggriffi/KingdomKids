import Link from "next/link";
import { Download } from "lucide-react";
import { site, books, curriculum } from "@/lib/data";
import JungleBackground from "@/components/JungleBackground";
import BookCard from "@/components/BookCard";
import MissionMap from "@/components/MissionMap";

export default function HomePage() {
  const featuredBooks    = books.books.filter((b) => b.tags.includes("new") || b.tags.includes("featured") || b.tags.includes("free")).slice(0, 3);
  const featuredDownloads = curriculum.downloads.filter((d) => d.featured);

  return (
    <>
      {/* ══════════════════════════════════════════════════
          HERO BANNER
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden py-16 px-4">
        <JungleBackground />

        <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-3xl">
          {/* Title scroll */}
          <div className="relative">
            {/* Decorative scroll top */}
            <div className="w-full h-3 rounded-t-full mb-1"
              style={{ background: "linear-gradient(90deg, #8b5e3c, #d4a853, #8b5e3c)" }} />
            <div className="px-10 py-4 rounded-sm"
              style={{ background: "linear-gradient(135deg, rgba(253,246,227,0.15), rgba(253,246,227,0.05))", border: "2px solid rgba(212,168,83,0.4)" }}>
              <p className="text-[#f5c842] text-sm font-bold uppercase tracking-[0.3em] mb-1">Welcome to</p>
              <h1 className="text-5xl sm:text-7xl font-black text-white drop-shadow-lg uppercase tracking-tight"
                style={{
                  fontFamily: "Georgia, serif",
                  textShadow: "0 4px 20px rgba(0,0,0,0.6), 0 0 60px rgba(245,200,66,0.3)",
                  background: "linear-gradient(180deg, #fff 0%, #f5c842 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                The Kingdom<br />Kids
              </h1>
            </div>
            <div className="w-full h-3 rounded-b-full mt-1"
              style={{ background: "linear-gradient(90deg, #8b5e3c, #d4a853, #8b5e3c)" }} />
          </div>

          {/* Tagline */}
          <p className="text-[#fdf6e3] text-xl sm:text-2xl font-bold tracking-wide drop-shadow"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
            {site.tagline}
          </p>

          {/* CTA */}
          <Link href={site.ctaButton.href} className="btn-cta text-xl mt-2">
            {site.ctaButton.label}
          </Link>

          {/* Explorer emojis */}
          <div className="flex gap-4 text-4xl mt-2 animate-float" style={{ animationDelay: "0.5s" }}>
            <span title="Ellie the Elephant">🐘</span>
            <span title="Giraffy the Giraffe">🦒</span>
            <span title="Stripes the Tiger">🐯</span>
            <span title="Hippo the Hippo">🦛</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          THREE-COLUMN CONTENT ROW
      ══════════════════════════════════════════════════ */}
      <section className="relative max-w-7xl mx-auto px-4 pb-12 grid grid-cols-1 md:grid-cols-[260px_1fr_260px] gap-6 items-start -mt-6">

        {/* ── LEFT: Jungle News ─────────────────────────── */}
        <div className="panel-parchment p-5">
          <h2 className="section-heading text-xl">{books.jungleNews.heading}</h2>
          <p className="text-center text-[#8b5e3c] text-xs mb-4 uppercase tracking-wider font-semibold">
            {books.jungleNews.subheading}
          </p>
          <div className="flex flex-col gap-4">
            {featuredBooks.map((book) => (
              <div key={book.id} className="flex gap-3 items-start">
                <BookCard
                  title={book.title}
                  series={book.series}
                  coverColor={book.coverColor}
                  tags={book.tags}
                  available={book.available}
                  previewLink={book.previewLink}
                  compact
                />
                <div>
                  <p className="font-bold text-[#3d2008] text-sm leading-tight">{book.title}</p>
                  <p className="text-[#8b5e3c] text-xs mt-0.5">{book.series}</p>
                  {book.available ? (
                    <Link href={book.previewLink || "/bookshelf"}
                      className="text-[#f07c2a] text-xs font-bold underline hover:text-[#d94f2b] transition-colors mt-1 block">
                      Preview →
                    </Link>
                  ) : (
                    <span className="text-[#b0a080] text-xs mt-1 block italic">Coming soon</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/bookshelf" className="btn-secondary !text-xs !px-4 !py-2" style={{ borderColor: "#8b5e3c", color: "#5c3d1e" }}>
              View All Books
            </Link>
          </div>
        </div>

        {/* ── CENTER: Mission Map ────────────────────────── */}
        <div className="flex flex-col gap-4">
          <MissionMap />
          <div className="text-center">
            <Link href="/missions" className="btn-secondary">
              Explore All Missions →
            </Link>
          </div>
        </div>

        {/* ── RIGHT: Teacher Resources ───────────────────── */}
        <div className="panel-parchment p-5">
          <h2 className="section-heading text-xl">{curriculum.teacherResourcesHeading}</h2>
          <p className="text-center text-[#8b5e3c] text-xs mb-4 uppercase tracking-wider font-semibold">
            {curriculum.teacherResourcesSubheading}
          </p>
          <div className="flex flex-col gap-4">
            {featuredDownloads.map((dl) => (
              <div key={dl.id}
                className="rounded-xl overflow-hidden shadow-md cursor-pointer card-lift"
                style={{ background: "linear-gradient(135deg, #e8a030, #c07020)", border: "2px solid #a05010" }}>
                {/* Mini book cover preview */}
                <div className="h-24 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #c47028, #8b4a10)" }}>
                  <div className="text-center">
                    <div className="text-3xl mb-1">📋</div>
                    <p className="text-white/90 text-[9px] font-bold uppercase tracking-wide px-2">{dl.title}</p>
                  </div>
                </div>
                <div className="px-3 py-2 bg-black/20">
                  <a href={dl.href}
                    className="flex items-center gap-1.5 text-white text-xs font-bold hover:text-[#f5c842] transition-colors">
                    <Download size={12} />
                    Download Preview
                  </a>
                  <p className="text-white/60 text-[10px] mt-0.5">{dl.fileLabel}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/curriculum" className="btn-secondary !text-xs !px-4 !py-2" style={{ borderColor: "#8b5e3c", color: "#5c3d1e" }}>
              Curriculum Details →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════════════ */}
      <section className="py-10 px-4"
        style={{ background: "linear-gradient(90deg, #8b5e3c, #6b4423, #8b5e3c)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "36",    label: "Weeks of Curriculum" },
            { value: "4",     label: "Explorer Characters" },
            { value: "K–8",   label: "Grade Levels" },
            { value: "100%",  label: "Bible-Based Content" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-[#f5c842] text-4xl font-black" style={{ fontFamily: "Georgia, serif" }}>{value}</p>
              <p className="text-[#fdf6e3]/80 text-sm font-semibold uppercase tracking-wider mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          EXPLORERS TEASER
      ══════════════════════════════════════════════════ */}
      <section className="py-14 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-black text-center text-[#f5c842] mb-2"
          style={{ fontFamily: "Georgia, serif", textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>
          Meet Your Explorer Guides
        </h2>
        <p className="text-center text-[#fdf6e3]/70 mb-10">
          Four brave animals on an adventure through God&apos;s Word
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { emoji: "🐘", name: "Ellie",   role: "The Wise Leader",    color: "#9b8db0" },
            { emoji: "🦒", name: "Giraffy", role: "The Lookout",        color: "#d4a853" },
            { emoji: "🐯", name: "Stripes", role: "The Brave Scout",    color: "#e8700a" },
            { emoji: "🦛", name: "Hippo",   role: "The Loyal Friend",   color: "#7aadcf" },
          ].map(({ emoji, name, role, color }) => (
            <Link key={name} href="/explorers"
              className="panel-parchment p-5 flex flex-col items-center text-center card-lift group">
              <div className="text-6xl mb-3 group-hover:animate-float">{emoji}</div>
              <h3 className="font-black text-xl text-[#3d2008]" style={{ fontFamily: "Georgia, serif" }}>{name}</h3>
              <p className="text-[#8b5e3c] text-xs font-semibold uppercase tracking-wider mt-1">{role}</p>
              <div className="mt-3 w-8 h-1 rounded-full" style={{ background: color }} />
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/explorers" className="btn-cta">
            Meet the Full Team →
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BOTTOM CTA BANNER
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 px-4 text-center"
        style={{ background: "linear-gradient(135deg, #0e2d14 0%, #14401c 50%, #1a5225 100%)" }}>
        <JungleBackground />
        <div className="relative z-10">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "Georgia, serif", textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
            Ready to Start the Adventure?
          </h2>
          <p className="text-[#fdf6e3]/80 text-lg mb-8 max-w-xl mx-auto">
            Download a free curriculum preview and see why thousands of families love Kingdom Kids.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/curriculum" className="btn-cta">
              Download Free Preview
            </Link>
            <Link href="/shop" className="btn-secondary">
              Shop All Resources
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
