"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const FB = "https://www.facebook.com/groups/kingdomkids";

const TOP_NAV = [
  { label: "Home",    href: "/",           cx: "5%",  cy: "6%", w: "8%", h: "8%", ext: false },
  { label: "About",   href: FB,            cx: "12%", cy: "6%", w: "8%", h: "8%", ext: true  },
  { label: "Games",   href: "/games",      cx: "19%", cy: "6%", w: "8%", h: "8%", ext: false },
  { label: "Videos",  href: "/bookshelf",  cx: "26%", cy: "6%", w: "8%", h: "8%", ext: false },
  { label: "Contact", href: "/curriculum", cx: "33%", cy: "6%", w: "8%", h: "8%", ext: false },
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

const PILL_CLASS   = "transition-all duration-150 cursor-pointer ring-2 ring-red-500 bg-red-500/30";
const CIRCLE_CLASS = "transition-all duration-200 cursor-pointer ring-4 ring-blue-500 bg-blue-500/30";

function NavLink({ b }: { b: typeof TOP_NAV[number] }) {
  if (b.ext) return (
    <a href={b.href} target="_blank" rel="noopener noreferrer"
      aria-label={b.label} title={b.label} style={pillStyle(b)} className={PILL_CLASS}>
      <span className="sr-only">{b.label}</span>
    </a>
  );
  return (
    <Link href={b.href} aria-label={b.label} title={b.label}
      style={pillStyle(b)} className={PILL_CLASS}>
      <span className="sr-only">{b.label}</span>
    </Link>
  );
}

function CircleLink({ b }: { b: typeof CIRCLES[number] }) {
  if (b.ext) return (
    <a href={b.href} target="_blank" rel="noopener noreferrer"
      aria-label={b.label} title={b.label} style={circleStyle(b)} className={CIRCLE_CLASS}>
      <span className="sr-only">{b.label}</span>
    </a>
  );
  return (
    <Link href={b.href} aria-label={b.label} title={b.label}
      style={circleStyle(b)} className={CIRCLE_CLASS}>
      <span className="sr-only">{b.label}</span>
    </Link>
  );
}

function PanelHeader() {
  return (
    <>
      <div style={{ height: "5px", background: "linear-gradient(90deg, #7a4520, #c4923a, #f5c842, #c4923a, #7a4520)", borderRadius: "14px 14px 0 0" }} />
      <div style={{ display: "flex", justifyContent: "center", padding: "5px 0 4px", borderBottom: "1px solid rgba(196,146,58,0.25)" }}>
        <Image src="/images/circle logo.png" alt="The Kingdom Kids" width={48} height={38} style={{ objectFit: "contain" }} />
      </div>
    </>
  );
}

const MOB_LINK: React.CSSProperties = {
  color: "#f7d88d", textDecoration: "none", textTransform: "uppercase",
  fontWeight: 900, fontSize: "clamp(0.58rem, 3vw, 0.8rem)", letterSpacing: "0.02em",
  padding: "12px 2px", whiteSpace: "nowrap",
  textShadow: "0 1px 0 #5f3617, 0 2px 0 #5f3617",
  fontFamily: '"Trebuchet MS", Arial, sans-serif',
  display: "block", textAlign: "center", flex: 1,
};

export default function JungleLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome   = pathname === "/";

  return (
    <>
      {/* ═══════════════════════════════════════════════
          MOBILE  (visible ≤ 699 px, hidden on desktop)
      ═══════════════════════════════════════════════ */}
      <div className="kk-mobile" style={{ minHeight: "100dvh", flexDirection: "column", background: "#0a2c10" }}>

        {/* Image header — cropped to show characters only, no bottom circles */}
        <div style={{ position: "relative", height: "195px", flexShrink: 0, overflow: "hidden" }}>
          <Image src="/images/Jungle adventure with The Kingdom Kids.png"
            alt="The Kingdom Kids" fill style={{ objectFit: "cover", objectPosition: "50% 0%" }}
            priority sizes="100vw" />
        </div>

        {/* Wooden nav */}
        <nav style={{ display: "flex", alignItems: "stretch", justifyContent: "space-around",
          background: "linear-gradient(180deg, #a86a36 0%, #8b5327 40%, #6e3f1d 100%)",
          borderBottom: "3px solid #3d2008", borderTop: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.5)", flexShrink: 0 }}>
          {TOP_NAV.map((b) => b.ext
            ? <a key={b.label} href={b.href} target="_blank" rel="noopener noreferrer" style={MOB_LINK}>{b.label}</a>
            : <Link key={b.label} href={b.href} style={MOB_LINK}>{b.label}</Link>
          )}
        </nav>

        {/* Content */}
        {isHome ? (
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", padding: "22px 16px 28px" }}>
            {CIRCLES.map((b) => {
              const icon = b.label === "Latest Video" ? "📺" : b.label === "Fun Games" ? "🎮" : "👥";
              const inner = (
                <>
                  <div style={{ width: "76px", height: "76px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #f5c842, #d4a853)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.4)", border: "3px solid rgba(255,255,255,0.3)",
                    fontSize: "1.7rem" }}>{icon}</div>
                  <span style={{ color: "#f7d88d", fontSize: "0.62rem", fontWeight: 800,
                    textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center",
                    marginTop: "6px" }}>{b.label}</span>
                </>
              );
              return b.ext
                ? <a key={b.label} href={b.href} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none" }}>{inner}</a>
                : <Link key={b.label} href={b.href}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none" }}>{inner}</Link>;
            })}
          </div>
        ) : (
          <div style={{ flex: 1, overflowY: "auto", background: "rgba(253,246,227,0.98)", display: "flex", flexDirection: "column" }}>
            <PanelHeader />
            <div style={{ padding: "12px 14px 20px" }}>{children}</div>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════
          DESKTOP  (visible ≥ 700 px, hidden on mobile)
      ═══════════════════════════════════════════════ */}
      <div className="kk-desktop" style={{ width: "100%", alignItems: "center", justifyContent: "center", background: "#0a2c10", minHeight: "100vh" }}>
        <div className="relative" style={{ width: "min(100vw, calc(100vh * 1.5))", aspectRatio: "3 / 2" }}>

          <Image src="/images/Jungle adventure with The Kingdom Kids.png"
            alt="The Kingdom Kids – Jungle Adventure"
            fill className="object-fill" priority sizes="100vw" />

          {TOP_NAV.map((b) => <NavLink key={b.label} b={b} />)}
          {CIRCLES.map((b) => <CircleLink key={b.label} b={b} />)}

          {!isHome && (
            <div style={{
              position: "absolute", top: "14%", left: "8%", right: "8%", bottom: "23%",
              overflowY: "auto", borderRadius: "16px",
              background: "rgba(253, 246, 227, 0.95)",
              backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
              border: "2px solid rgba(196, 146, 58, 0.65)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.85)",
              zIndex: 10,
            }}>
              <PanelHeader />
              <div style={{ padding: "10px 18px 18px" }}>{children}</div>
            </div>
          )}

          {isHome && children}
        </div>
      </div>
    </>
  );
}
