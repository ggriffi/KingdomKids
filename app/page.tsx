import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { site, books, curriculum } from "@/lib/data";
import type { ReactNode } from "react";

export default function HomePage() {
  const featuredBooks     = books.books.filter((b) => b.available).slice(0, 2);
  const featuredDownloads = curriculum.downloads.filter((d) => d.featured).slice(0, 2);

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden"
      style={{
        background:
          "linear-gradient(170deg, #0c3412 0%, #1c6624 18%, #278c30 40%, #1e7826 62%, #14501a 82%, #0a2c10 100%)",
      }}>

      {/* ── Sunlight glow from above ─────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 45% at 50% -5%, rgba(255,215,70,.18) 0%, transparent 100%)",
          }} />
      </div>

      {/* ── Tropical leaf art ────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>

        {/* Top-left cluster */}
        <svg className="absolute -top-6 -left-6 w-72 h-88 opacity-[0.88]"
          style={{ width: 280, height: 360 }}
          viewBox="0 0 200 280" fill="none">
          <ellipse cx="22"  cy="115" rx="26" ry="112" fill="#228c38" transform="rotate(-32 22 115)"/>
          <ellipse cx="16"  cy="100" rx="7"  ry="42"  fill="#38c058" opacity=".45" transform="rotate(-32 16 100)"/>
          <ellipse cx="68"  cy="78"  rx="21" ry="92"  fill="#1a7030" transform="rotate(-14 68 78)"/>
          <ellipse cx="4"   cy="215" rx="16" ry="66"  fill="#206430" transform="rotate(-50 4 215)"/>
          <ellipse cx="108" cy="42"  rx="13" ry="56"  fill="#2a9848" opacity=".8" transform="rotate(-5 108 42)"/>
          <ellipse cx="44"  cy="18"  rx="9"  ry="38"  fill="#30b050" opacity=".6" transform="rotate(-44 44 18)"/>
          <path d="M 22,115 Q 42,80 55,40" stroke="#155c20" strokeWidth="1.2" opacity=".4" fill="none"/>
        </svg>

        {/* Top-right cluster (mirror) */}
        <svg className="absolute -top-6 -right-6 opacity-[0.88]"
          style={{ width: 280, height: 360 }}
          viewBox="0 0 200 280" fill="none">
          <ellipse cx="178" cy="115" rx="26" ry="112" fill="#228c38" transform="rotate(32 178 115)"/>
          <ellipse cx="184" cy="100" rx="7"  ry="42"  fill="#38c058" opacity=".45" transform="rotate(32 184 100)"/>
          <ellipse cx="132" cy="78"  rx="21" ry="92"  fill="#1a7030" transform="rotate(14 132 78)"/>
          <ellipse cx="196" cy="215" rx="16" ry="66"  fill="#206430" transform="rotate(50 196 215)"/>
          <ellipse cx="92"  cy="42"  rx="13" ry="56"  fill="#2a9848" opacity=".8" transform="rotate(5 92 42)"/>
          <ellipse cx="156" cy="18"  rx="9"  ry="38"  fill="#30b050" opacity=".6" transform="rotate(44 156 18)"/>
          <path d="M 178,115 Q 158,80 145,40" stroke="#155c20" strokeWidth="1.2" opacity=".4" fill="none"/>
        </svg>

        {/* Bottom foliage silhouette */}
        <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path d="M0,90V55 Q90,18 180,48 Q270,78 360,35 Q450,-5 540,38 Q630,80 720,36
                   Q810,-4 900,38 Q990,80 1080,38 Q1170,-4 1260,42 Q1350,82 1440,55V90Z"
            fill="#0a2c10" opacity=".65"/>
          <path d="M0,90V72 Q100,50 200,65 Q300,80 400,60 Q500,40 600,62
                   Q700,82 800,60 Q900,38 1000,62 Q1100,84 1200,68 Q1300,50 1440,72V90Z"
            fill="#061e09" opacity=".45"/>
        </svg>
      </div>

      {/* ══════════════════════════════════════════
          TITLE
      ══════════════════════════════════════════ */}
      <div className="relative z-10 text-center pt-7 pb-3 px-4">
        <p className="text-[#f5c842]/80 text-[11px] font-bold uppercase tracking-[0.55em] mb-2">
          Welcome to
        </p>
        <h1 className="font-black leading-none"
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(2rem, 5.5vw, 3.8rem)",
            background: "linear-gradient(175deg, #ffffff 0%, #fce57a 50%, #f0c040 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 3px 12px rgba(0,0,0,.65))",
          }}>
          The Kingdom Kids
        </h1>
        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="h-px w-20"
            style={{ background: "linear-gradient(90deg, transparent, rgba(245,200,66,.55))" }}/>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8Z" fill="#f5c842" opacity=".7"/>
          </svg>
          <div className="h-px w-20"
            style={{ background: "linear-gradient(90deg, rgba(245,200,66,.55), transparent)" }}/>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          THREE-COLUMN LAYOUT
      ══════════════════════════════════════════ */}
      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-3 pb-10 pt-2
        grid grid-cols-1 lg:grid-cols-[268px_1fr_268px] gap-5 items-start">

        {/* ── LEFT: Jungle News ─────────────────── */}
        <aside className="order-2 lg:order-1">
          <Panel title="Jungle News" sub="Latest book releases">
            <div className="flex flex-col gap-3">
              {featuredBooks.map((book) => (
                <div key={book.id}
                  className="flex overflow-hidden rounded-xl border border-black/[0.07] shadow-sm
                             hover:shadow-md transition-shadow bg-white/50 hover:bg-white/70">
                  {/* Spine colour strip */}
                  <div className="w-[5px] flex-shrink-0 rounded-l-xl"
                    style={{ background: book.coverColor }}/>
                  <div className="flex-1 px-3 py-2.5">
                    <p className="font-bold text-[#3d2008] text-sm leading-snug">{book.title}</p>
                    <p className="text-[#8b5e3c] text-xs mt-0.5 leading-tight">{book.series}</p>
                    <div className="flex items-center justify-between mt-2 gap-2">
                      <div className="flex gap-1 flex-wrap">
                        {book.tags.includes("new") && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold
                            bg-orange-100 text-orange-700 border border-orange-200">New</span>
                        )}
                        {book.tags.includes("free") && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold
                            bg-emerald-100 text-emerald-700 border border-emerald-200">Free</span>
                        )}
                      </div>
                      {book.previewLink && (
                        <Link href={book.previewLink}
                          className="text-[#f07c2a] text-xs font-bold hover:text-[#d94f2b]
                                     transition-colors whitespace-nowrap flex-shrink-0">
                          Preview →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="leaf-divider" />
            <div className="text-center">
              <Link href="/bookshelf"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#7a4a20]
                           hover:text-[#f07c2a] transition-colors uppercase tracking-wider">
                View All Books <span className="text-sm leading-none">→</span>
              </Link>
            </div>
          </Panel>
        </aside>

        {/* ── CENTER: Hero + Map + CTA ───────────── */}
        <main className="order-1 lg:order-2 flex flex-col items-center gap-5">
          {/* Hero mascot */}
          <div className="w-full max-w-2xl">
            <Image
              src="/images/KingdomKids.png"
              alt="The Kingdom Kids — Ellie, Giraffy, Stripes, and Hippo"
              width={800}
              height={500}
              className="w-full h-auto rounded-3xl"
              style={{ filter: "drop-shadow(0 14px 44px rgba(0,0,0,.65))" }}
              priority
            />
          </div>

          {/* Mission Map */}
          <MissionMapEmbed />

          {/* Tagline + CTA */}
          <div className="text-center px-4 pb-2">
            <p className="text-white/90 font-semibold text-lg sm:text-xl leading-relaxed"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,.6)" }}>
              Discover Faith. Learn Jesus. Join the Mission.
            </p>
            <Link href={site.ctaButton.href} className="btn-cta mt-5 inline-block">
              {site.ctaButton.label}
            </Link>
          </div>
        </main>

        {/* ── RIGHT: Teacher Resources ───────────── */}
        <aside className="order-3">
          <Panel title="Teacher Resources" sub="Free curriculum downloads">
            <div className="flex flex-col gap-3">
              {featuredDownloads.map((dl) => (
                <a key={dl.id} href={dl.href}
                  className="flex items-center gap-3 rounded-xl p-3 bg-white/50 hover:bg-white/72
                             transition-colors border border-black/[0.07] shadow-sm group">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #c47028, #7a3c10)" }}>
                    <Download size={16} className="text-[#f5c842]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#3d2008] text-sm leading-tight">{dl.title}</p>
                    <p className="text-[#8b5e3c] text-xs mt-0.5">{dl.fileLabel}</p>
                  </div>
                  <span className="text-[#f07c2a] font-black text-base leading-none
                                   group-hover:translate-x-0.5 transition-transform">→</span>
                </a>
              ))}
            </div>

            <div className="leaf-divider" />
            <div className="text-center">
              <Link href="/curriculum"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#7a4a20]
                           hover:text-[#f07c2a] transition-colors uppercase tracking-wider">
                All Resources <span className="text-sm leading-none">→</span>
              </Link>
            </div>
          </Panel>
        </aside>

      </div>
    </div>
  );
}

/* ── Reusable parchment panel ───────────────────────── */
function Panel({
  title,
  sub,
  children,
}: {
  title: string;
  sub: string;
  children: ReactNode;
}) {
  return (
    <div className="panel-parchment">
      <div className="panel-accent-bar" />
      <div className="px-4 pt-4 pb-5">
        <h2 className="section-heading">{title}</h2>
        <p className="text-center text-[#8b5e3c] text-[11px] uppercase tracking-[0.18em] font-semibold mb-4">
          {sub}
        </p>
        {children}
      </div>
      <div className="panel-accent-bar" />
    </div>
  );
}

/* ── Inline mission map ─────────────────────────────── */
function MissionMapEmbed() {
  const pts = [
    { label: "Genesis Garden",     ref: "Gen 1–3",   color: "#22c55e", x: 15, y: 55 },
    { label: "Ark Adventure",      ref: "Gen 6–9",   color: "#38b2e8", x: 28, y: 36 },
    { label: "Promised Land",      ref: "Josh 1–4",  color: "#f5c842", x: 45, y: 22 },
    { label: "Shepherd Hills",     ref: "Psalm 23",  color: "#f07c2a", x: 60, y: 44 },
    { label: "Galilee Shores",     ref: "Matt 4",    color: "#a855f7", x: 74, y: 20 },
    { label: "Resurrection Ridge", ref: "Luke 24",   color: "#ef4444", x: 86, y: 50 },
  ];

  return (
    <div className="w-full max-w-2xl rounded-2xl overflow-hidden relative"
      style={{
        background: "linear-gradient(145deg, #d4b870 0%, #c4a050 40%, #b08840 70%, #c4a862 100%)",
        border: "3px solid #8b6030",
        boxShadow: "inset 0 0 40px rgba(0,0,0,.2), 0 8px 32px rgba(0,0,0,.5)",
        aspectRatio: "4 / 2.2",
      }}>

      {/* Parchment lines */}
      <div className="absolute inset-0 opacity-[0.08]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 4px,rgba(0,0,0,.06) 4px,rgba(0,0,0,.06) 5px)" }}/>

      {/* Map grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.12]"
        viewBox="0 0 100 60" preserveAspectRatio="none">
        {[10,20,30,40,50,60,70,80,90].map(x =>
          <line key={x} x1={x} y1="0" x2={x} y2="60" stroke="#5c3d1e" strokeWidth="0.3"/>)}
        {[12,24,36,48].map(y =>
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#5c3d1e" strokeWidth="0.3"/>)}
      </svg>

      {/* Dashed path */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
        <path d="M15,55 Q20,44 28,36 Q36,26 45,22 Q52,32 60,44 Q66,32 74,20 Q80,34 86,50"
          fill="none" stroke="#5c3d1e" strokeWidth="0.9"
          strokeDasharray="2.2,1.8" opacity=".5"/>
      </svg>

      {/* Mission dots */}
      {pts.map((pt) => (
        <div key={pt.label}
          title={`${pt.label} — ${pt.ref}`}
          className="mission-dot absolute w-[18px] h-[18px]"
          style={{
            background: pt.color,
            left: `calc(${pt.x}% - 9px)`,
            top:  `calc(${pt.y}% - 9px)`,
          }}/>
      ))}

      {/* Compass rose */}
      <div className="absolute top-2 left-2 w-9 h-9 opacity-65">
        <svg viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" stroke="#5c3d1e" strokeWidth="1"
            fill="rgba(255,255,255,.22)"/>
          <text x="20" y="9"  textAnchor="middle" fontSize="5.5" fill="#3d2008" fontWeight="bold">N</text>
          <text x="20" y="36" textAnchor="middle" fontSize="5.5" fill="#3d2008" fontWeight="bold">S</text>
          <text x="6"  y="23" textAnchor="middle" fontSize="5.5" fill="#3d2008" fontWeight="bold">W</text>
          <text x="34" y="23" textAnchor="middle" fontSize="5.5" fill="#3d2008" fontWeight="bold">E</text>
          <path d="M20,4 L22,18 L20,22 L18,18Z" fill="#d94f2b"/>
          <path d="M20,36 L22,22 L20,18 L18,22Z" fill="#3d2008" opacity=".6"/>
        </svg>
      </div>

      {/* Label */}
      <div className="absolute bottom-2 right-3 text-[9px] font-bold text-[#3d2008] opacity-50
        uppercase tracking-widest">
        Mission Map
      </div>
    </div>
  );
}
