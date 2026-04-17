"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


const TOP_NAV = [
  { label: "Home", href: "/", cx: "10%", cy: "4.8%", w: "5%", h: "4%", ext: false },
  { label: "Store", href: "/store", cx: "21.7%", cy: "4.8%", w: "5%", h: "4%", ext: false },
  { label: "Games", href: "/games", cx: "30.8%", cy: "4.8%", w: "5%", h: "4%", ext: false },
  { label: "Videos", href: "/bookshelf", cx: "42.3%", cy: "4.8%", w: "5%", h: "4%", ext: false },
  { label: "Contact", href: "/contact", cx: "53.3%", cy: "4.8%", w: "5%", h: "4%", ext: false },
];

const EXTRA_NAV = [
  { label: "About", href: "/about" },
  { label: "Rhino Corner", href: "/rhino-corner" },
  { label: "Store", href: "/store" },
];

const CIRCLES = [
  { label: "Latest Video", href: "/bookshelf", cx: "26%", cy: "87%", d: "11%", ext: false },
  { label: "Fun Games", href: "/games", cx: "50%", cy: "87%", d: "11%", ext: false },
  { label: "About Us", href: "/about", cx: "74%", cy: "87%", d: "11%", ext: false },
];

const pillStyle = (b: { cx: string; cy: string; w: string; h: string }) => ({
  position: "absolute" as const,
  left: b.cx, top: b.cy, width: b.w, height: b.h,
  transform: "translate(-50%, -50%)",
  borderRadius: "999px", background: "transparent",
});

const circleStyle = (b: { cx: string; cy: string; d: string }) => ({
  position: "absolute" as const,
  left: b.cx, top: b.cy, width: b.d,
  aspectRatio: "1 / 1" as const,
  transform: "translate(-50%, -50%)",
  borderRadius: "50%", background: "transparent",
});

const PILL_CLASS = "transition-all duration-150 cursor-pointer hover:ring-2 hover:ring-white/70 hover:bg-white/10";
const CIRCLE_CLASS = "transition-all duration-200 cursor-pointer hover:ring-4 hover:ring-white/60 hover:bg-white/10 hover:scale-110";

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
    <div style={{ overflow: "hidden", lineHeight: 0 }}>
      <Image
        src="/images/page banner template.png"
        alt=""
        width={900}
        height={350}
        style={{ width: "100%", height: "auto", display: "block", mixBlendMode: "multiply" }}
        sizes="900px"
      />
    </div>
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
  const isHome = pathname === "/";

  return (
    <>
      {/* ═══════════════════════════════════════════════
          MOBILE  (≤ 699 px)
      ═══════════════════════════════════════════════ */}
      <div className="kk-mobile" style={{ minHeight: "100dvh", flexDirection: "column", background: "#0a2c10" }}>

        <div style={{ position: "relative", height: "195px", flexShrink: 0, overflow: "hidden" }}>
          <Image src="/images/The Kingdom Kids Jungle Adventures Page v3.png"
            alt="The Kingdom Kids" fill style={{ objectFit: "cover", objectPosition: "50% 0%" }}
            priority sizes="100vw" />
        </div>

        <nav style={{
          display: "flex", alignItems: "stretch", justifyContent: "space-around",
          background: "linear-gradient(180deg, #a86a36 0%, #8b5327 40%, #6e3f1d 100%)",
          borderTop: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.4)", flexShrink: 0,
        }}>
          {TOP_NAV.map((b) => b.ext
            ? <a key={b.label} href={b.href} target="_blank" rel="noopener noreferrer" style={MOB_LINK}>{b.label}</a>
            : <Link key={b.label} href={b.href} style={MOB_LINK}>{b.label}</Link>
          )}
        </nav>

        <nav style={{
          display: "flex", alignItems: "stretch", justifyContent: "center",
          background: "linear-gradient(180deg, #8b5327 0%, #6e3f1d 60%, #5a3318 100%)",
          borderBottom: "3px solid #3d2008",
          boxShadow: "0 4px 12px rgba(0,0,0,0.5)", flexShrink: 0,
        }}>
          {EXTRA_NAV.map((b) => (
            <Link key={b.label} href={b.href} style={MOB_LINK}>{b.label}</Link>
          ))}
        </nav>

        {isHome ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "18px 16px 28px", gap: "16px" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
              {CIRCLES.map((b) => {
                const icon = b.label === "Latest Video" ? "📺" : b.label === "Fun Games" ? "🎮" : "👥";
                const inner = (
                  <>
                    <div style={{
                      width: "76px", height: "76px", borderRadius: "50%",
                      background: "linear-gradient(135deg, #f5c842, #d4a853)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.4)", border: "3px solid rgba(255,255,255,0.3)",
                      fontSize: "1.7rem",
                    }}>{icon}</div>
                    <span style={{
                      color: "#f7d88d", fontSize: "0.62rem", fontWeight: 800,
                      textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center",
                      marginTop: "6px",
                    }}>{b.label}</span>
                  </>
                );
                return b.ext
                  ? <a key={b.label} href={b.href} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none" }}>{inner}</a>
                  : <Link key={b.label} href={b.href}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none" }}>{inner}</Link>;
              })}
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, overflowY: "auto", background: "rgba(192,148,58,0.97)", display: "flex", flexDirection: "column" }}>
            <PanelHeader />
            <div style={{ padding: "0 14px 20px" }}>{children}</div>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════
          DESKTOP  (≥ 700 px)
      ═══════════════════════════════════════════════ */}
      <div className="kk-desktop" style={{ width: "100%", alignItems: "center", justifyContent: "center", background: "#0a2c10", minHeight: "100vh" }}>
        <div className="relative" style={{ width: "min(100vw, calc(100vh * 1.5))", aspectRatio: "3 / 2" }}>

          <Image src="/images/The Kingdom Kids Jungle Adventures Page v3.png"
            alt="The Kingdom Kids – Jungle Adventure"
            fill className="object-fill" priority sizes="100vw" />

          {TOP_NAV.map((b) => <NavLink key={b.label} b={b} />)}
          {CIRCLES.map((b) => <CircleLink key={b.label} b={b} />)}

          {/* VBS Zone — upper right corner → Rhino Corner */}
          <Link href="/rhino-corner" aria-label="VBS Zone" title="VBS Zone" style={{
            position: "absolute", right: "1%", top: "1%", width: "10%",
            aspectRatio: "1 / 1" as const, display: "block", borderRadius: "10px",
          }} className={CIRCLE_CLASS}>
            <span className="sr-only">VBS Zone</span>
          </Link>

          {!isHome && (
            <div style={{
              position: "absolute", top: "14%", left: "8%", right: "8%", bottom: "23%",
              overflowY: "auto", borderRadius: "16px",
              background: "rgba(192,148,58,0.97)",
              backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
              border: "2px solid rgba(140,100,20,0.8)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,220,100,0.3)",
              zIndex: 10,
            }}>
              <PanelHeader />
              <div style={{ padding: "0 18px 18px" }}>{children}</div>
            </div>
          )}

          {isHome && children}
        </div>
      </div>
    </>
  );
}
