import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { site, books, curriculum } from "@/lib/data";

export default function HomePage() {
  const featuredBooks     = books.books.filter((b) => b.available).slice(0, 2);
  const featuredDownloads = curriculum.downloads.filter((d) => d.featured).slice(0, 2);

  return (
    <div
      className="relative min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(180deg, #0b2e10 0%, #14451c 25%, #1e6128 55%, #266b30 80%, #1a5225 100%)",
      }}
    >
      {/* ── Jungle leaf overlays ───────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
        {/* Top-left leaves */}
        <div className="absolute -top-4 -left-4 w-72 h-72 opacity-70"
          style={{
            background: "radial-gradient(ellipse at 20% 20%, #1a5e1a 0%, transparent 70%)",
            filter: "blur(2px)",
          }} />
        {/* Top-right leaves */}
        <div className="absolute -top-4 -right-4 w-72 h-72 opacity-70"
          style={{
            background: "radial-gradient(ellipse at 80% 20%, #1a5e1a 0%, transparent 70%)",
            filter: "blur(2px)",
          }} />
        {/* Leafy SVG overlays */}
        <svg className="absolute top-0 left-0 w-56 h-56 opacity-60" viewBox="0 0 200 200" fill="none">
          <ellipse cx="30" cy="60"  rx="25" ry="70" fill="#1a5225" transform="rotate(-35 30 60)" />
          <ellipse cx="60" cy="40"  rx="20" ry="60" fill="#22633a" transform="rotate(-20 60 40)" />
          <ellipse cx="10" cy="90"  rx="18" ry="55" fill="#153d1c" transform="rotate(-50 10 90)" />
          <ellipse cx="80" cy="20"  rx="15" ry="45" fill="#2d7040" transform="rotate(-10 80 20)" />
        </svg>
        <svg className="absolute top-0 right-0 w-56 h-56 opacity-60" viewBox="0 0 200 200" fill="none">
          <ellipse cx="170" cy="60"  rx="25" ry="70" fill="#1a5225" transform="rotate(35 170 60)" />
          <ellipse cx="140" cy="40"  rx="20" ry="60" fill="#22633a" transform="rotate(20 140 40)" />
          <ellipse cx="190" cy="90"  rx="18" ry="55" fill="#153d1c" transform="rotate(50 190 90)" />
          <ellipse cx="120" cy="20"  rx="15" ry="45" fill="#2d7040" transform="rotate(10 120 20)" />
        </svg>
        {/* Bottom bush */}
        <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,120V70 Q60,20 120,55 Q180,90 240,45 Q300,0 360,40 Q420,80 480,35 Q540,-5 600,40 Q660,85 720,40 Q780,-5 840,40 Q900,85 960,40 Q1020,-5 1080,40 Q1140,85 1200,45 Q1260,5 1320,55 Q1380,90 1440,65V120Z"
            fill="#0b2e10" opacity="0.7" />
          <path d="M0,120V85 Q80,50 160,75 Q240,100 320,65 Q400,30 480,65 Q560,100 640,65 Q720,30 800,65 Q880,100 960,65 Q1040,30 1120,65 Q1200,100 1280,75 Q1360,50 1440,80V120Z"
            fill="#0f3d15" opacity="0.5" />
        </svg>
      </div>

      {/* ═══════════════════════════════════════════════════
          TITLE SCROLL BANNER
      ═══════════════════════════════════════════════════ */}
      <div className="relative z-10 flex justify-center pt-6 pb-2 px-4">
        <div className="relative inline-block text-center">
          {/* Scroll left curl */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-16 rounded-full opacity-80"
            style={{ background: "linear-gradient(90deg, #8b5e3c, #c49a6c)" }} />
          {/* Scroll right curl */}
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-16 rounded-full opacity-80"
            style={{ background: "linear-gradient(270deg, #8b5e3c, #c49a6c)" }} />
          {/* Scroll body */}
          <div className="px-16 py-3 rounded-sm"
            style={{
              background: "linear-gradient(135deg, rgba(212,168,83,0.25) 0%, rgba(212,168,83,0.1) 100%)",
              border: "2px solid rgba(212,168,83,0.5)",
            }}>
            <p className="text-[#f5c842] text-xs font-bold uppercase tracking-[0.4em] mb-0.5">Welcome to</p>
            <h1
              className="font-black uppercase leading-none"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                background: "linear-gradient(180deg, #ffffff 0%, #f5c842 60%, #e8a030 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "none",
                filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.6))",
              }}>
              The Kingdom Kids
            </h1>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          THREE-COLUMN MAIN LAYOUT
      ═══════════════════════════════════════════════════ */}
      <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-3 pb-6 pt-2
        grid grid-cols-1 lg:grid-cols-[240px_1fr_240px] gap-4 items-start">

        {/* ── LEFT: Jungle News ─────────────────────────── */}
        <aside className="order-2 lg:order-1">
          <div className="panel-parchment p-4">
            {/* Scroll top */}
            <div className="h-2 w-full rounded-t-full mb-3"
              style={{ background: "linear-gradient(90deg, #8b5e3c, #d4a853, #8b5e3c)" }} />
            <h2 className="section-heading text-lg">🌿 Jungle News</h2>
            <p className="text-center text-[#8b5e3c] text-[11px] uppercase tracking-wider font-bold mb-3">
              Latest book releases
            </p>

            <div className="flex flex-col gap-4">
              {featuredBooks.map((book) => (
                <div key={book.id} className="flex gap-3 items-center">
                  {/* Mini book cover */}
                  <div
                    className="w-16 h-20 rounded-lg flex-shrink-0 flex flex-col items-center justify-center shadow-md relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${book.coverColor}, ${book.coverColor}99)` }}>
                    <svg viewBox="0 0 30 38" className="w-8 h-10" fill="none">
                      <rect x="12" y="0" width="6" height="38" rx="1.5" fill="rgba(255,255,255,0.9)" />
                      <rect x="0" y="10" width="30" height="6"  rx="1.5" fill="rgba(255,255,255,0.9)" />
                    </svg>
                    {book.tags.includes("new") && (
                      <span className="absolute top-1 right-1 bg-[#f07c2a] text-white text-[7px] px-1 rounded font-bold">NEW</span>
                    )}
                    {book.tags.includes("free") && (
                      <span className="absolute top-1 right-1 bg-[#22c55e] text-white text-[7px] px-1 rounded font-bold">FREE</span>
                    )}
                  </div>
                  <div>
                    <p className="font-black text-[#3d2008] text-xs leading-tight">{book.title}</p>
                    <p className="text-[#8b5e3c] text-[10px] mt-0.5">{book.series}</p>
                    <p className="text-[#8b5e3c] text-[10px]">Page 1</p>
                    {book.previewLink && (
                      <Link href={book.previewLink}
                        className="text-[#f07c2a] text-[10px] font-bold underline hover:text-[#d94f2b] mt-0.5 block">
                        Preview →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="h-2 w-full rounded-b-full mt-3"
              style={{ background: "linear-gradient(90deg, #8b5e3c, #d4a853, #8b5e3c)" }} />

            <div className="mt-3 text-center">
              <Link href="/bookshelf"
                className="text-[#5c3d1e] text-[11px] font-bold underline hover:text-[#f07c2a] transition-colors">
                View All Books →
              </Link>
            </div>
          </div>
        </aside>

        {/* ── CENTER: Hero Image + Map + CTA ────────────── */}
        <main className="order-1 lg:order-2 flex flex-col items-center gap-4">
          {/* Hero image */}
          <div className="w-full max-w-2xl relative">
            <Image
              src="/images/KingdomKids.png"
              alt="The Kingdom Kids — Ellie, Giraffy, Stripes, and Hippo"
              width={800}
              height={500}
              className="w-full h-auto rounded-2xl"
              style={{
                filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.6))",
              }}
              priority
            />
          </div>

          {/* Mission map */}
          <MissionMapEmbed />

          {/* Tagline + CTA */}
          <div className="text-center px-4">
            <p className="text-white font-black text-xl sm:text-2xl uppercase tracking-wide leading-snug drop-shadow-lg"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
              Discover Faith. Learn Jesus.<br />Join the Mission.
            </p>
            <Link href={site.ctaButton.href}
              className="btn-cta mt-4 inline-block text-xl px-10 py-4">
              {site.ctaButton.label}
            </Link>
          </div>
        </main>

        {/* ── RIGHT: Teacher Resources ───────────────────── */}
        <aside className="order-3">
          <div className="panel-parchment p-4">
            <div className="h-2 w-full rounded-t-full mb-3"
              style={{ background: "linear-gradient(90deg, #8b5e3c, #d4a853, #8b5e3c)" }} />
            <h2 className="section-heading text-lg">📋 Teacher Resources</h2>
            <p className="text-center text-[#8b5e3c] text-[11px] uppercase tracking-wider font-bold mb-3">
              Downloadable curriculum previews
            </p>

            <div className="flex flex-col gap-4">
              {featuredDownloads.map((dl) => (
                <a key={dl.id} href={dl.href}
                  className="block rounded-xl overflow-hidden shadow-md card-lift">
                  {/* Cover */}
                  <div className="h-20 flex items-center justify-center relative"
                    style={{ background: "linear-gradient(135deg, #c47028, #8b4a10)" }}>
                    <div className="text-center">
                      <div className="text-2xl mb-0.5">📚</div>
                      <p className="text-white/90 text-[9px] font-bold uppercase px-2 leading-tight">{dl.title}</p>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-1"
                      style={{ background: "linear-gradient(90deg, #e8a030, #f5c842, #e8a030)" }} />
                  </div>
                  {/* Download row */}
                  <div className="bg-[#3d2008] px-3 py-2 flex items-center gap-2">
                    <Download size={12} className="text-[#f5c842] flex-shrink-0" />
                    <span className="text-white text-[10px] font-bold">Download Preview</span>
                    <span className="text-white/50 text-[9px] ml-auto">{dl.fileLabel}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="h-2 w-full rounded-b-full mt-3"
              style={{ background: "linear-gradient(90deg, #8b5e3c, #d4a853, #8b5e3c)" }} />

            <div className="mt-3 text-center">
              <Link href="/curriculum"
                className="text-[#5c3d1e] text-[11px] font-bold underline hover:text-[#f07c2a] transition-colors">
                Teacher Resources +
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ── Inline mission map ─────────────────────────────── */
function MissionMapEmbed() {
  return (
    <div className="w-full max-w-2xl relative rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #c8a96e 0%, #b8936a 30%, #a07850 60%, #c8a96e 100%)",
        border: "4px solid #8b6340",
        boxShadow: "inset 0 0 30px rgba(0,0,0,0.25), 0 6px 24px rgba(0,0,0,0.5)",
        aspectRatio: "4/2.2",
      }}>
      {/* Parchment texture lines */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.04) 3px,rgba(0,0,0,0.04) 4px)" }} />

      {/* Map grid */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 60" preserveAspectRatio="none">
        {[10,20,30,40,50,60,70,80,90].map(x => <line key={x} x1={x} y1="0" x2={x} y2="60" stroke="#5c3d1e" strokeWidth="0.3" />)}
        {[10,20,30,40,50].map(y => <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#5c3d1e" strokeWidth="0.3" />)}
      </svg>

      {/* Path line */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
        <path d="M15,55 L28,38 L45,25 L60,42 L72,22 L85,48"
          fill="none" stroke="#5c3d1e" strokeWidth="0.8" strokeDasharray="2,1.5" opacity="0.5" />
      </svg>

      {/* Mission dots */}
      {[
        { label: "Genesis Garden",    bibleRef: "Gen 1–3",   color: "#22c55e", x: 15, y: 55 },
        { label: "Ark Adventure",     bibleRef: "Gen 6–9",   color: "#3ab5e6", x: 28, y: 38 },
        { label: "Promised Land",     bibleRef: "Josh 1–4",  color: "#f5c842", x: 45, y: 25 },
        { label: "Shepherd Hills",    bibleRef: "Psalm 23",  color: "#f07c2a", x: 60, y: 42 },
        { label: "Galilee Shores",    bibleRef: "Matt 4",    color: "#7b3fa0", x: 72, y: 22 },
        { label: "Resurrection Ridge",bibleRef: "Luke 24",   color: "#d94f2b", x: 85, y: 48 },
      ].map((pt) => (
        <div key={pt.label}
          className="absolute w-5 h-5 rounded-full border-2 border-white mission-dot"
          title={`${pt.label} — ${pt.bibleRef}`}
          style={{ left: `calc(${pt.x}% - 10px)`, top: `calc(${pt.y}% - 10px)`, background: pt.color, boxShadow: "0 2px 6px rgba(0,0,0,0.4)" }} />
      ))}

      {/* Compass */}
      <div className="absolute top-2 left-2 w-8 h-8 opacity-60">
        <svg viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" stroke="#5c3d1e" strokeWidth="1" fill="rgba(255,255,255,0.25)" />
          <text x="20" y="8"  textAnchor="middle" fontSize="6" fill="#5c3d1e" fontWeight="bold">N</text>
          <text x="20" y="36" textAnchor="middle" fontSize="6" fill="#5c3d1e" fontWeight="bold">S</text>
          <text x="6"  y="23" textAnchor="middle" fontSize="6" fill="#5c3d1e" fontWeight="bold">W</text>
          <text x="34" y="23" textAnchor="middle" fontSize="6" fill="#5c3d1e" fontWeight="bold">E</text>
          <path d="M20,4 L22,18 L20,21 L18,18Z" fill="#d94f2b" />
          <path d="M20,36 L22,22 L20,19 L18,22Z" fill="#5c3d1e" />
        </svg>
      </div>

      {/* Label */}
      <div className="absolute bottom-2 right-3 text-[9px] font-bold text-[#3d2008] opacity-60 uppercase tracking-wider">
        Mission Map
      </div>
    </div>
  );
}
