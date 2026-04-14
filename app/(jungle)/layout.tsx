"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const FB = "https://www.facebook.com/groups/kingdomkids";

const TOP_NAV = [
  { label: "Home",    href: "/",           cx: "6%",  cy: "7%", w: "8%", h: "8%", ext: false },
  { label: "About",   href: FB,            cx: "14%", cy: "7%", w: "8%", h: "8%", ext: true  },
  { label: "Games",   href: "/games",      cx: "22%", cy: "7%", w: "8%", h: "8%", ext: false },
  { label: "Videos",  href: "/bookshelf",  cx: "30%", cy: "7%", w: "8%", h: "8%", ext: false },
  { label: "Contact", href: "/curriculum", cx: "38%", cy: "7%", w: "8%", h: "8%", ext: false },
];

const CIRCLES = [
  { label: "Latest Video", href: "/bookshelf", cx: "26%", cy: "87%", d: "14%", ext: false },
  { label: "Fun Games",    href: "/games",      cx: "50%", cy: "87%", d: "14%", ext: false },
  { label: "About Us",     href: FB,            cx: "74%", cy: "87%", d: "14%", ext: true  },
];

const pillStyle = (b: { cx: string; cy: string; w: string; h: string }) => ({
  position:     "absolute" as const,
  left:         b.cx,
  top:          b.cy,
  width:        b.w,
  height:       b.h,
  transform:    "translate(-50%, -50%)",
  borderRadius: "999px",
  background:   "transparent",
});

const circleStyle = (b: { cx: string; cy: string; d: string }) => ({
  position:    "absolute" as const,
  left:        b.cx,
  top:         b.cy,
  width:       b.d,
  aspectRatio: "1 / 1",
  transform:   "translate(-50%, -50%)",
  borderRadius:"50%",
  background:  "transparent",
});

const PILL_CLASS  = "transition-all duration-150 cursor-pointer hover:ring-2 hover:ring-white/70 hover:bg-white/10";
const CIRCLE_CLASS= "transition-all duration-200 cursor-pointer hover:ring-4 hover:ring-white/60 hover:bg-white/10 hover:scale-110";

export default function JungleLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome   = pathname === "/";

  return (
    <div
      className="w-full flex items-center justify-center bg-[#0a2c10]"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="relative"
        style={{ width: "min(100vw, calc(100vh * 1.5))", aspectRatio: "3 / 2" }}
      >
        {/* ── Scene ─────────────────────────────────── */}
        <Image
          src="/images/Jungle adventure with The Kingdom Kids.png"
          alt="The Kingdom Kids – Jungle Adventure"
          fill
          className="object-fill"
          priority
          sizes="100vw"
        />

        {/* ── Top nav overlays ──────────────────────── */}
        {TOP_NAV.map((b) =>
          b.ext ? (
            <a
              key={b.label}
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={b.label}
              title={b.label}
              style={pillStyle(b)}
              className={PILL_CLASS}
            >
              <span className="sr-only">{b.label}</span>
            </a>
          ) : (
            <Link
              key={b.label}
              href={b.href}
              aria-label={b.label}
              title={b.label}
              style={pillStyle(b)}
              className={PILL_CLASS}
            >
              <span className="sr-only">{b.label}</span>
            </Link>
          )
        )}

        {/* ── Circle overlays ───────────────────────── */}
        {CIRCLES.map((b) =>
          b.ext ? (
            <a
              key={b.label}
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={b.label}
              title={b.label}
              style={circleStyle(b)}
              className={CIRCLE_CLASS}
            >
              <span className="sr-only">{b.label}</span>
            </a>
          ) : (
            <Link
              key={b.label}
              href={b.href}
              aria-label={b.label}
              title={b.label}
              style={circleStyle(b)}
              className={CIRCLE_CLASS}
            >
              <span className="sr-only">{b.label}</span>
            </Link>
          )
        )}

        {/* ── Midsection content panel (inner pages) ── */}
        {!isHome && (
          <div
            style={{
              position:        "absolute",
              top:             "14%",
              left:            "8%",
              right:           "8%",
              bottom:          "23%",
              overflowY:       "auto",
              borderRadius:    "16px",
              background:      "rgba(253, 246, 227, 0.95)",
              backdropFilter:  "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              border:          "2px solid rgba(196, 146, 58, 0.65)",
              boxShadow:       "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.85)",
              zIndex:          10,
            }}
          >
            {/* Gold accent top stripe */}
            <div
              style={{
                height:       "5px",
                background:   "linear-gradient(90deg, #7a4520, #c4923a, #f5c842, #c4923a, #7a4520)",
                borderRadius: "14px 14px 0 0",
                flexShrink:   0,
              }}
            />
            <div style={{ padding: "14px 18px 18px" }}>{children}</div>
          </div>
        )}

        {/* Home page — children render without panel */}
        {isHome && children}
      </div>
    </div>
  );
}
