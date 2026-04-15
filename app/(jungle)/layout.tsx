"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const FB = "https://www.facebook.com/";

const TOP_NAV = [
  { label: "Home",    href: "/",           cx: "10%", cy: "4%", w: "8%", h: "4.5%", ext: false },
  { label: "About",   href: FB,            cx: "22%", cy: "4%", w: "8%", h: "4.5%", ext: true  },
  { label: "Games",   href: "/games",      cx: "30%", cy: "4%", w: "8%", h: "4.5%", ext: false },
  { label: "Videos",  href: "/bookshelf",  cx: "42%", cy: "4%", w: "8%", h: "4.5%", ext: false },
  { label: "Contact", href: "/curriculum", cx: "54%", cy: "4%", w: "8%", h: "4.5%", ext: false },
];

const CIRCLES = [
  { label: "Latest Video", href: "/bookshelf", cx: "26%", cy: "87%", d: "14%", ext: false },
  { label: "Fun Games", href: "/games", cx: "50%", cy: "87%", d: "14%", ext: false },
  { label: "About Us", href: FB, cx: "74%", cy: "87%", d: "14%", ext: true },
];

const pillStyle = (b: { cx: string; cy: string; w: string; h: string }) => ({
  position: "absolute" as const,
  left: b.cx,
  top: b.cy,
  width: b.w,
  height: b.h,
  transform: "translate(-50%, -50%)",
  borderRadius: "999px",
  background: "transparent",
});

const circleStyle = (b: { cx: string; cy: string; d: string }) => ({
  position: "absolute" as const,
  left: b.cx,
  top: b.cy,
  width: b.d,
  aspectRatio: "1 / 1",
  transform: "translate(-50%, -50%)",
  borderRadius: "50%",
  background: "transparent",
});

// DEBUG: visible overlays — remove ring-* and bg-* before final deploy
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

function VbsLightbox({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 2000,
        background: "rgba(0,0,0,0.88)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <div
        style={{ position: "relative" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Crop white borders: landscape 940×788 image has white padding on sides.
            A 3:4 portrait container + object-fit:cover trims ~170px off each side. */}
        <div style={{
          position: "relative",
          width: "min(68vw, 400px)",
          aspectRatio: "3 / 4",
          overflow: "hidden",
          borderRadius: "14px",
          boxShadow: "0 12px 48px rgba(0,0,0,0.6)",
        }}>
          <Image
            src="/images/VBS Annoucement.png"
            alt="VBS Announcement"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="400px"
          />
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute", top: "-14px", right: "-14px",
            width: "34px", height: "34px", borderRadius: "50%",
            background: "#f07c2a", color: "white", border: "none",
            cursor: "pointer", fontSize: "1.1rem", fontWeight: 900,
            boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >✕</button>
      </div>
    </div>
  );
}

export default function JungleLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      {lightbox && <VbsLightbox onClose={() => setLightbox(false)} />}

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
        <nav style={{
          display: "flex", alignItems: "stretch", justifyContent: "space-around",
          background: "linear-gradient(180deg, #a86a36 0%, #8b5327 40%, #6e3f1d 100%)",
          borderBottom: "3px solid #3d2008", borderTop: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.5)", flexShrink: 0
        }}>
          {TOP_NAV.map((b) => b.ext
            ? <a key={b.label} href={b.href} target="_blank" rel="noopener noreferrer" style={MOB_LINK}>{b.label}</a>
            : <Link key={b.label} href={b.href} style={MOB_LINK}>{b.label}</Link>
          )}
        </nav>

        {/* Content */}
        {isHome ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "18px 16px 28px", gap: "16px" }}>
            {/* Quick-links row */}
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
                      fontSize: "1.7rem"
                    }}>{icon}</div>
                    <span style={{
                      color: "#f7d88d", fontSize: "0.62rem", fontWeight: 800,
                      textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center",
                      marginTop: "6px"
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

            {/* VBS Announcement — tap-to-enlarge styled panel */}
            <button
              onClick={() => setLightbox(true)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0, width: "min(280px, 80vw)" }}
              aria-label="View VBS Announcement"
            >
              <div style={{ borderRadius: "10px", overflow: "hidden", border: "2px solid #f5c842", boxShadow: "0 4px 18px rgba(0,0,0,0.5)" }}>
                <div style={{ background: "linear-gradient(90deg, #7a4520, #c4923a, #f5c842, #c4923a, #7a4520)", padding: "4px 8px", textAlign: "center" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 900, color: "#3d2008", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: '"Trebuchet MS", Arial, sans-serif' }}>
                    📢 Announcements
                  </span>
                </div>
                {/* Crop white borders with 3:4 portrait crop */}
                <div style={{ position: "relative", width: "100%", aspectRatio: "3 / 4", overflow: "hidden" }}>
                  <Image
                    src="/images/VBS Annoucement.png"
                    alt="VBS Announcement — tap to enlarge"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    sizes="280px"
                  />
                </div>
              </div>
              <p style={{ color: "#f7d88d", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", textAlign: "center", marginTop: "4px", letterSpacing: "0.06em" }}>Tap to enlarge</p>
            </button>
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

          {/* VBS Announcement — left jungle edge, styled panel, click to enlarge */}
          <button
            onClick={() => setLightbox(true)}
            aria-label="View VBS Announcement"
            style={{
              position: "absolute", left: "1%", top: "30%",
              width: "10%", zIndex: 15,
              background: "none", border: "none", cursor: "pointer", padding: 0,
            }}
          >
            <div style={{
              borderRadius: "8px", overflow: "hidden",
              border: "2px solid #f5c842",
              boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
            }}>
              {/* Header bar */}
              <div style={{
                background: "linear-gradient(90deg, #7a4520, #c4923a, #f5c842, #c4923a, #7a4520)",
                padding: "2px 4px", textAlign: "center",
              }}>
                <span style={{
                  fontSize: "0.42rem", fontWeight: 900, color: "#3d2008",
                  textTransform: "uppercase", letterSpacing: "0.06em",
                  fontFamily: '"Trebuchet MS", Arial, sans-serif'
                }}>
                  📢 Announcements
                </span>
              </div>
              {/* Crop white borders with same 3:4 technique */}
              <div style={{ position: "relative", width: "100%", aspectRatio: "3 / 4", overflow: "hidden" }}>
                <Image
                  src="/images/VBS Annoucement.png"
                  alt="VBS Announcement"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  sizes="10vw"
                />
              </div>
            </div>
          </button>

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
